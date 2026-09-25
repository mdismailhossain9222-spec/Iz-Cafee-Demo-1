import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FadeUp, SplitChars } from "../components/AnimatedText";
import { Eyebrow } from "../components/ui";
import { menu, pairings } from "../data/content";

const fmt = (n: number) => `৳${n.toLocaleString("en-BD")}`;

export default function MenuPage() {
  const [active, setActive] = useState(menu[0].id);
  const [q, setQ] = useState("");
  const cat = menu.find((c) => c.id === active) ?? menu[0];
  const items = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return cat.items;
    return cat.items.filter((i) => `${i.name} ${i.desc}`.toLowerCase().includes(needle));
  }, [cat, q]);

  return (
    <div className="bg-paper">
      <section className="mx-auto max-w-7xl px-6 pt-28 pb-8 md:px-8 md:pt-36">
        <Eyebrow>The board</Eyebrow>
        <h1 className="mt-5 font-serif text-5xl text-ink md:text-7xl">
          <SplitChars text="What we’re pouring." />
        </h1>
        <FadeUp className="mt-5 max-w-lg text-stone">
          One plate, one picture. Prices in BDT. Milk alternatives on request.
        </FadeUp>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 md:px-8">
        <div className="sticky top-20 z-20 flex flex-wrap items-center gap-2 bg-paper/90 py-4 backdrop-blur">
          {menu.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className={`rounded-full px-5 py-2 text-sm tracking-wide transition ${
                active === c.id ? "bg-ink text-cream" : "bg-cream text-ink hover:bg-cream-dark"
              }`}
            >
              {c.name}
            </button>
          ))}
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search the board…"
            className="ml-auto w-full rounded-full border border-ink/10 bg-cream px-4 py-2 text-sm outline-none focus:border-gold sm:w-56"
          />
        </div>

        <p className="mt-4 font-serif text-4xl text-ink">{cat.name}</p>
        <p className="mt-1 text-sm text-stone">{items.length} plates · each photographed on its own</p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <FadeUp key={item.name} delay={i * 0.04} className="group overflow-hidden rounded-[1.6rem] bg-cream">
              <div className="overflow-hidden">
                <img src={item.image} alt={item.name} className="img-lux h-56 w-full object-cover" />
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <p className="font-serif text-2xl text-ink">{item.name}</p>
                  <p className="shrink-0 text-gold">{fmt(item.price)}</p>
                </div>
                {item.tag && (
                  <p className="mt-2 text-[10px] tracking-[0.18em] uppercase text-gold">{item.tag}</p>
                )}
                <p className="mt-2 text-sm text-stone">{item.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
        {items.length === 0 && <p className="py-10 text-stone">Nothing on the board matches that.</p>}

        <div className="mt-16 rounded-[2rem] bg-ink px-8 py-10 text-cream md:px-12">
          <p className="text-[11px] tracking-[0.28em] uppercase text-gold">Suggested pairings</p>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {pairings.map((p) => (
              <div key={p.cup} className="border-t border-gold/20 pt-4">
                <p className="font-serif text-xl">{p.cup} + {p.plate}</p>
                <p className="mt-1 text-sm text-cream/55">{p.why}</p>
              </div>
            ))}
          </div>
          <Link to="/contact" className="mt-8 inline-block text-sm text-gold">
            Reserve a table to linger →
          </Link>
        </div>
      </section>
    </div>
  );
}
