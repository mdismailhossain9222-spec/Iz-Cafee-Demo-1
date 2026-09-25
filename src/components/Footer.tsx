import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { brand, locations } from "../data/content";
import { isValidEmail, sanitize } from "../lib/security";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const clean = sanitize(email, 120);
    if (!isValidEmail(clean)) {
      setError("Please enter a valid email.");
      return;
    }
    setError("");
    setDone(true);
  };

  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/60 font-serif text-sm text-gold">
                IZ
              </span>
              <span className="font-serif text-2xl">Pâtisserie</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/55">
              {brand.tagline}. Three houses in Dhaka — laminated at dawn, poured without hurry.
            </p>
          </div>

          <div>
            <p className="text-[11px] tracking-[0.25em] uppercase text-gold">Visit</p>
            <ul className="mt-4 space-y-3 text-sm text-cream/75">
              {locations.map((loc) => (
                <li key={loc.slug}>
                  <Link to={`/locations/${loc.slug}`} className="hover:text-gold">
                    {loc.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[11px] tracking-[0.25em] uppercase text-gold">House</p>
            <ul className="mt-4 space-y-3 text-sm text-cream/75">
              <li><Link to="/menu" className="hover:text-gold">Menu</Link></li>
              <li><Link to="/our-story" className="hover:text-gold">Our Story</Link></li>
              <li><Link to="/get-to-know-us" className="hover:text-gold">The House</Link></li>
              <li><Link to="/gallery" className="hover:text-gold">Vitrine</Link></li>
              <li><Link to="/contact" className="hover:text-gold">Contact</Link></li>
              <li><a href={brand.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-gold">Instagram</a></li>
            </ul>
          </div>

          <div>
            <p className="text-[11px] tracking-[0.25em] uppercase text-gold">The weekly note</p>
            <p className="mt-4 text-sm text-cream/55">Origins, pastry specials, quiet hours.</p>
            {done ? (
              <p className="mt-4 font-serif text-xl text-gold">You’re on the list.</p>
            ) : (
              <form onSubmit={submit} className="mt-4 flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  autoComplete="email"
                  className="w-full rounded-full border border-cream/20 bg-transparent px-4 py-2.5 text-sm outline-none placeholder:text-cream/35 focus:border-gold"
                />
                <button type="submit" className="shrink-0 rounded-full bg-gold px-4 py-2.5 text-sm text-ink hover:bg-gold-bright">
                  Join
                </button>
              </form>
            )}
            {error && <p className="mt-2 text-xs text-gold">{error}</p>}
          </div>
        </div>

        <div className="mt-14 flex flex-col justify-between gap-3 border-t border-cream/10 pt-8 text-xs text-cream/35 md:flex-row">
          <p>© {new Date().getFullYear()} IZ Pâtisserie & Café · info@iz.cafe</p>
          <Link to="/admin/login" className="hover:text-cream/60">Atelier</Link>
        </div>
      </div>
    </footer>
  );
}
