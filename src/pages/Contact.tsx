import { FormEvent, useMemo, useState } from "react";
import { FadeUp, SplitChars } from "../components/AnimatedText";
import { Eyebrow, Faq } from "../components/ui";
import { faqs, images, locations } from "../data/content";
import { canSubmitContact, isValidEmail, recordContactSubmit, sanitize } from "../lib/security";

const occasions = ["Coffee for two", "Brunch", "Dessert after ten", "Work table", "Celebration"];
const slots = ["08:30", "10:00", "12:00", "15:30", "18:00", "20:30"];

export default function ContactPage() {
  const token = useMemo(() => crypto.getRandomValues(new Uint32Array(2)).join("-"), []);
  const [form, setForm] = useState({
    name: "",
    email: "",
    house: locations[0].slug,
    guests: "2",
    date: "",
    slot: "10:00",
    occasion: occasions[0],
    message: "",
    company: "",
    token,
  });
  const [status, setStatus] = useState<"idle" | "sent" | "error" | "limited">("idle");
  const [error, setError] = useState("");
  const onChange = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (form.company) return;
    if (form.token !== token) {
      setStatus("error");
      setError("Session expired. Refresh and try again.");
      return;
    }
    const name = sanitize(form.name, 80);
    const email = sanitize(form.email, 120);
    const note = sanitize(form.message, 800);
    void note;
    if (name.length < 2) {
      setError("Please tell us your name.");
      setStatus("error");
      return;
    }
    if (!isValidEmail(email)) {
      setError("Please enter a valid email.");
      setStatus("error");
      return;
    }
    const gate = canSubmitContact();
    if (!gate.ok) {
      setStatus("limited");
      setError("Too many messages from this session. Please try later.");
      return;
    }
    recordContactSubmit();
    setStatus("sent");
    setError("");
  };

  return (
    <div className="bg-paper">
      <section className="relative isolate overflow-hidden">
        <img src={images.gulshan} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-paper via-paper/92 to-paper" />
        <div className="relative mx-auto max-w-7xl px-6 pt-28 pb-10 md:px-8 md:pt-36">
          <Eyebrow>Contact</Eyebrow>
          <h1 className="mt-5 font-serif text-5xl text-ink md:text-7xl">
            <SplitChars text="Save a seat." />
          </h1>
          <p className="mt-5 max-w-lg text-stone">
            Parties of six or more, call the house. We confirm by email within the hour. Walk-ins until the room fills.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-16 px-6 pb-20 md:px-8 lg:grid-cols-2">
        <div>
          <div className="space-y-2">
            {locations.map((loc) => (
              <div key={loc.slug} className="rounded-[1.4rem] bg-cream p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-serif text-2xl">{loc.name}</p>
                    <p className="mt-1 text-sm text-stone">{loc.address}</p>
                  </div>
                  <a href={loc.phoneHref} className="shrink-0 text-sm text-gold">
                    {loc.phone}
                  </a>
                </div>
                <p className="mt-3 text-xs tracking-wide text-stone">{loc.hours}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-stone">info@iz.cafe · Instagram @izpatisserieandcafe</p>

          <div className="mt-12">
            <p className="font-serif text-3xl text-ink">Before you write</p>
            <div className="mt-4">
              {faqs.map((f) => (
                <Faq key={f.q} q={f.q} a={f.a} />
              ))}
            </div>
          </div>
        </div>

        <FadeUp className="rounded-[2rem] bg-cream p-8 md:p-10">
          {status === "sent" ? (
            <div className="py-16 text-center">
              <p className="font-serif text-5xl text-ink">Saved.</p>
              <p className="mt-4 text-stone">We’ll write you shortly. Caffeine & kindness until then.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4" noValidate>
              <input
                tabIndex={-1}
                autoComplete="off"
                value={form.company}
                onChange={(e) => onChange("company", e.target.value)}
                className="absolute -left-[9999px] h-0 w-0 opacity-0"
                aria-hidden="true"
              />
              <p className="font-serif text-3xl text-ink">Request a table</p>
              <label className="block text-sm">
                Name
                <input required value={form.name} onChange={(e) => onChange("name", e.target.value)} className="mt-1 w-full rounded-xl border border-ink/10 bg-paper px-4 py-3 outline-none focus:border-gold" />
              </label>
              <label className="block text-sm">
                Email
                <input type="email" required value={form.email} onChange={(e) => onChange("email", e.target.value)} className="mt-1 w-full rounded-xl border border-ink/10 bg-paper px-4 py-3 outline-none focus:border-gold" />
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="block text-sm">
                  House
                  <select value={form.house} onChange={(e) => onChange("house", e.target.value)} className="mt-1 w-full rounded-xl border border-ink/10 bg-paper px-4 py-3 outline-none focus:border-gold">
                    {locations.map((l) => (
                      <option key={l.slug} value={l.slug}>{l.name}</option>
                    ))}
                  </select>
                </label>
                <label className="block text-sm">
                  Guests
                  <select value={form.guests} onChange={(e) => onChange("guests", e.target.value)} className="mt-1 w-full rounded-xl border border-ink/10 bg-paper px-4 py-3 outline-none focus:border-gold">
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n}>{n}</option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <label className="block text-sm">
                  Date
                  <input type="date" required value={form.date} onChange={(e) => onChange("date", e.target.value)} className="mt-1 w-full rounded-xl border border-ink/10 bg-paper px-4 py-3 outline-none focus:border-gold" />
                </label>
                <label className="block text-sm">
                  Time
                  <select value={form.slot} onChange={(e) => onChange("slot", e.target.value)} className="mt-1 w-full rounded-xl border border-ink/10 bg-paper px-4 py-3 outline-none focus:border-gold">
                    {slots.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </label>
              </div>
              <label className="block text-sm">
                Occasion
                <select value={form.occasion} onChange={(e) => onChange("occasion", e.target.value)} className="mt-1 w-full rounded-xl border border-ink/10 bg-paper px-4 py-3 outline-none focus:border-gold">
                  {occasions.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </label>
              <label className="block text-sm">
                Note
                <textarea rows={3} value={form.message} onChange={(e) => onChange("message", e.target.value)} placeholder="Window table, oat milk, a birthday tart…" className="mt-1 w-full rounded-xl border border-ink/10 bg-paper px-4 py-3 outline-none focus:border-gold" />
              </label>
              {error && <p className="text-sm text-gold-deep">{error}</p>}
              <button type="submit" disabled={status === "limited"} className="w-full rounded-full bg-ink py-3.5 text-sm text-cream disabled:opacity-50">
                Request table
              </button>
              <p className="text-center text-[11px] text-stone">Protected · 3 messages / hour · fields sanitised</p>
            </form>
          )}
        </FadeUp>
      </section>
    </div>
  );
}
