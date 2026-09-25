import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className={`flex items-center gap-3 text-[11px] tracking-[0.38em] uppercase ${light ? "text-gold" : "text-gold"}`}>
      <span className="h-px w-8 bg-gold/70" />
      {children}
    </p>
  );
}

export function GoldMarquee({ items }: { items: string[] }) {
  const row = [...items, ...items, ...items];
  return (
    <div className="overflow-hidden border-y border-gold/25 bg-ink py-3.5 text-gold">
      <motion.div
        className="flex w-max gap-10 whitespace-nowrap px-6 text-[11px] tracking-[0.32em] uppercase"
        animate={{ x: ["0%", "-33.333%"] }}
        transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
      >
        {row.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center gap-10">
            {item}
            <span className="text-gold/40">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function GoldCursor() {
  const [pos, setPos] = useState({ x: -40, y: -40 });
  const [on, setOn] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer:fine)").matches;
    if (!fine) return;
    setOn(true);
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  if (!on) return null;
  return (
    <div
      className="pointer-events-none fixed z-[80] hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/70 mix-blend-difference md:block"
      style={{ left: pos.x, top: pos.y }}
    />
  );
}

export function DottedPrice({ name, price, tag, desc }: { name: string; price: string; tag?: string; desc: string }) {
  return (
    <li className="group py-5">
      <div className="flex items-baseline gap-3">
        <span className="font-serif text-2xl text-ink">{name}</span>
        {tag && (
          <span className="rounded-full border border-gold/40 px-2 py-0.5 text-[9px] tracking-[0.16em] uppercase text-gold">
            {tag}
          </span>
        )}
        <span className="mx-2 h-px flex-1 border-b border-dotted border-gold/40 translate-y-[-6px]" />
        <span className="font-medium text-gold">{price}</span>
      </div>
      <p className="mt-1 max-w-xl text-sm text-stone">{desc}</p>
    </li>
  );
}

export function Faq({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-ink/10">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="font-serif text-xl text-ink">{q}</span>
        <span className="text-gold">{open ? "–" : "+"}</span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        className="overflow-hidden"
      >
        <p className="pb-5 text-sm leading-relaxed text-stone">{a}</p>
      </motion.div>
    </div>
  );
}
