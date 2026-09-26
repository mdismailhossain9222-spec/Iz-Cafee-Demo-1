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
        light ? "bg-transparent" : "bg-[#0f0d0b]/95 shadow-lg shadow-black/20 backdrop-blur-md"
      }`}
    >
      <nav className="relative z-50 mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <Link to="/" className="flex items-center gap-3">
          <img 
            src="/logo.png" 
            alt="IZ Logo" 
            className="h-10 w-auto object-contain brightness-200 invert" 
          />
          <span className={`font-serif text-xl tracking-wide ${light ? "text-cream" : "text-cream/90"}`}>
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
          <span className={`h-0.5 w-6 bg-cream transition-all duration-300 ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-0.5 w-6 bg-cream transition-all duration-300 ${open ? "opacity-0" : ""}`} />
          <span className={`h-0.5 w-6 bg-cream transition-all duration-300 ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex h-screen w-screen flex-col items-center justify-center gap-6 bg-[#0f0d0b] px-6 text-center backdrop-blur-xl lg:hidden"
          >
            {links.map((l, i) => (
              <motion.div
                key={l.to}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 10, opacity: 0 }}
                transition={{ delay: 0.05 * i, duration: 0.3 }}
              >
                <Link 
                  to={l.to} 
                  className="font-serif text-3xl text-cream transition-colors hover:text-gold"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              </motion.div>
            ))}

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-4"
            >
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="inline-block rounded-full bg-gold px-8 py-3 text-xs font-medium tracking-[0.16em] uppercase text-ink transition hover:bg-gold-bright"
              >
                Reserve
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}