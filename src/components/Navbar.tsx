import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const links = [
  { to: "/menu", label: "Menu" },
  { to: "/our-story", label: "Our Story" },
  { to: "/get-to-know-us", label: "The House" },
  { to: "/gallery", label: "Vitrine" },
  { to: "/locations", label: "Locations" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const home = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const light = home && !scrolled && !open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        light ? "bg-transparent" : "bg-ink/95 shadow-lg shadow-black/20 backdrop-blur-md"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <Link to="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/70 font-serif text-sm text-gold">
            IZ
          </span>
          <span className={`font-serif text-xl tracking-wide ${light ? "text-cream" : "text-cream"}`}>
            Pâtisserie
          </span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `text-[11px] tracking-[0.22em] uppercase transition ${
                  isActive ? "text-gold" : "text-cream/70 hover:text-cream"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Link
            to="/contact"
            className="rounded-full bg-gold px-5 py-2 text-[11px] font-medium tracking-[0.16em] uppercase text-ink transition hover:bg-gold-bright"
          >
            Reserve
          </Link>
        </div>

        <button
          className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span className={`h-px w-6 bg-cream transition ${open ? "translate-y-1 rotate-45" : ""}`} />
          <span className={`h-px w-6 bg-cream transition ${open ? "-translate-y-1 -rotate-45" : ""}`} />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-7 bg-ink lg:hidden"
          >
            {links.map((l, i) => (
              <motion.div
                key={l.to}
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.08 * i }}
              >
                <Link to={l.to} className="font-serif text-4xl text-cream">
                  {l.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
