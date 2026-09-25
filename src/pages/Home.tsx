import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FadeUp, SplitChars } from "../components/AnimatedText";
import { Eyebrow, GoldMarquee } from "../components/ui";
import { brand, images, locations, menu, pairings, ritual, testimonials } from "../data/content";
import { openLabel } from "../lib/hours";

export default function Home() {
  const [quote, setQuote] = useState(0);
  const t = testimonials[quote];

  return (
    <div>
      <section className="relative isolate h-svh min-h-[760px] overflow-hidden grain">
        <img src={images.hero} alt="IZ café interior with warm lights and a long pastry counter" className="hero-zoom absolute inset-0 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/25 to-ink/80" />

        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-16 pt-28 md:px-8 md:pb-20">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                <Eyebrow light>{brand.tagline} · Dhaka</Eyebrow>
              </motion.div>
              <h1 className="mt-6 font-serif text-5xl leading-[0.92] text-cream sm:text-7xl md:text-8xl lg:text-[7.2rem]">
                <SplitChars text="Escape the ordinary." />
              </h1>
              <FadeUp delay={0.4} className="mt-7 max-w-md text-base font-light leading-relaxed text-cream/75 md:text-lg">
                Victorian rooms. Dough that sleeps overnight. Coffee poured for the person in front of us — Gulshan, Dhanmondi, Mirpur.
              </FadeUp>
              <FadeUp delay={0.55} className="mt-10 flex flex-wrap gap-3">
                <Link to="/menu" className="rounded-full bg-gold px-8 py-3.5 text-sm font-medium text-ink hover:bg-gold-bright">
                  Open the menu
                </Link>
                <Link to="/gallery" className="rounded-full border border-cream/30 px-8 py-3.5 text-sm text-cream hover:bg-cream/10">
                  The vitrine
                </Link>
              </FadeUp>
            </div>

            <div className="hidden flex-col gap-3 text-cream/70 sm:flex">
              {locations.map((loc) => (
                <Link key={loc.slug} to={`/locations/${loc.slug}`} className="group rounded-2xl border border-cream/15 bg-ink/40 px-4 py-3 backdrop-blur-md hover:border-gold/50">
                  <p className="font-serif text-lg text-cream">{loc.name}</p>
                  <p className="text-[11px] tracking-wide text-gold">{openLabel(loc)}</p>
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-10 flex items-center gap-3 text-[10px] tracking-[0.35em] uppercase text-cream/45">
            <span className="h-10 w-px bg-cream/30" />
            Scroll the house
          </div>
        </div>
      </section>

      <GoldMarquee items={["Laminated at dawn", "Poured without hurry", "Caffeine & Kindness", "Gulshan · Dhanmondi · Mirpur", "27 layers"]} />

      <section className="bg-paper py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 md:px-8 lg:grid-cols-12">
          <FadeUp className="lg:col-span-5">
            <Eyebrow>The atelier</Eyebrow>
            <h2 className="mt-5 font-serif text-4xl leading-[1.05] text-ink md:text-6xl">
              A European house, kept in Dhaka.
            </h2>
            <p className="mt-6 text-stone leading-relaxed">
              Israt Zisan opened IZ because Mirpur had nowhere beautiful to sit with a proper cup. She had walked ornate rooms in Europe. She wanted chandeliers, cream velvet, and pastry that belonged in a Paris vitrine — without leaving the city.
            </p>
            <p className="mt-4 text-stone leading-relaxed">
              We still laminate by hand. We still remember how you take it. Three houses now. One rule.
            </p>
            <Link to="/our-story" className="link-gold mt-8 inline-block text-sm tracking-[0.18em] uppercase text-gold">
              Read the story
            </Link>
            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-ink/10 pt-8">
              {[
                ["3", "Houses"],
                ["27", "Layers"],
                ["08:00", "Doors"],
              ].map(([n, l]) => (
                <div key={l}>
                  <p className="font-serif text-3xl text-ink md:text-4xl">{n}</p>
                  <p className="mt-1 text-[11px] tracking-[0.16em] uppercase text-stone">{l}</p>
                </div>
              ))}
            </div>
          </FadeUp>
          <FadeUp delay={0.12} className="relative lg:col-span-7">
            <img src={images.atelier} alt="Hands laminating croissant dough" className="h-[420px] w-full rounded-[2rem] object-cover md:h-[560px]" />
            <div className="absolute -bottom-5 left-6 rounded-full bg-ink px-6 py-3 text-[11px] tracking-[0.22em] uppercase text-gold shadow-xl">
              Butter stays cold
            </div>
            <img
              src={images.croissant}
              alt="Butter croissant"
              className="absolute -right-4 -top-8 hidden h-40 w-40 rounded-full object-cover ring-8 ring-paper lg:block"
            />
          </FadeUp>
        </div>
      </section>

      <section className="bg-cream py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <FadeUp className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <Eyebrow>Signatures</Eyebrow>
              <h2 className="mt-4 font-serif text-4xl text-ink md:text-6xl">The plates we are asked for twice.</h2>
            </div>
            <Link to="/menu" className="link-gold text-sm tracking-[0.16em] uppercase text-gold">The full board</Link>
          </FadeUp>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <FadeUp className="group relative overflow-hidden rounded-[2rem] md:col-span-2 lg:row-span-2">
              <img src={menu[1].items[0].image} alt="Butter croissant" className="img-lux h-[340px] w-full object-cover md:h-full md:min-h-[540px]" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-cream">
                <p className="text-[11px] tracking-[0.22em] uppercase text-gold">Classic · ৳220</p>
                <p className="mt-2 font-serif text-4xl md:text-5xl">Butter Croissant</p>
                <p className="mt-2 max-w-sm text-sm text-cream/70">27 layers. Laminated before dawn. The reason Mirpur learned to linger.</p>
              </div>
            </FadeUp>
            {[
              { img: menu[0].items[4].image, name: "Salted Caramel Latte", note: "The house cup · ৳460" },
              { img: menu[2].items[0].image, name: "Tart au Chocolat", note: "Gold leaf · ৳420" },
              { img: menu[3].items[0].image, name: "English Breakfast", note: "All day · ৳690" },
              { img: menu[1].items[9].image, name: "The Brownie", note: "Beloved · ৳175" },
            ].map((s) => (
              <FadeUp key={s.name} className="group overflow-hidden rounded-[1.8rem] bg-paper">
                <div className="overflow-hidden">
                  <img src={s.img} alt={s.name} className="img-lux h-52 w-full object-cover" />
                </div>
                <div className="p-6">
                  <p className="font-serif text-2xl text-ink">{s.name}</p>
                  <p className="mt-1 text-sm text-stone">{s.note}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink py-24 text-cream md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <FadeUp>
            <Eyebrow>A day in the house</Eyebrow>
            <h2 className="mt-4 font-serif text-4xl md:text-6xl">From cold butter to last light.</h2>
          </FadeUp>
          <div className="mt-14 grid gap-0 md:grid-cols-3 lg:grid-cols-6">
            {ritual.map((step, i) => (
              <FadeUp key={step.time} delay={i * 0.06} className="border-t border-gold/20 py-8 md:border-t-0 md:border-l md:px-5 md:first:border-l-0">
                <p className="font-serif text-3xl text-gold">{step.time}</p>
                <p className="mt-3 font-serif text-xl">{step.title}</p>
                <p className="mt-3 text-sm leading-relaxed text-cream/55">{step.body}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <FadeUp className="max-w-2xl">
            <Eyebrow>Pairings</Eyebrow>
            <h2 className="mt-4 font-serif text-4xl md:text-5xl">If you only order two things.</h2>
          </FadeUp>
          <div className="mt-12 divide-y divide-ink/10 border-y border-ink/10">
            {pairings.map((p, i) => (
              <FadeUp key={p.cup} delay={i * 0.05} className="grid gap-2 py-7 md:grid-cols-12 md:items-center">
                <p className="font-serif text-2xl text-ink md:col-span-4">{p.cup}</p>
                <p className="text-gold md:col-span-1">+</p>
                <p className="font-serif text-2xl text-ink md:col-span-4">{p.plate}</p>
                <p className="text-sm text-stone md:col-span-3">{p.why}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <FadeUp className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <Eyebrow>Three houses</Eyebrow>
              <h2 className="mt-4 font-serif text-4xl md:text-6xl">Come sit with us.</h2>
            </div>
            <Link to="/locations" className="link-gold text-sm tracking-[0.16em] uppercase text-gold">All locations</Link>
          </FadeUp>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {locations.map((loc, i) => (
              <FadeUp key={loc.slug} delay={i * 0.1}>
                <Link to={`/locations/${loc.slug}`} className="group block overflow-hidden rounded-[1.8rem] bg-paper">
                  <div className="relative h-80 overflow-hidden">
                    <img src={loc.image} alt={loc.name} className="img-lux h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
                    <span className="absolute top-4 right-4 rounded-full bg-ink/70 px-3 py-1 text-[10px] tracking-wide uppercase text-gold backdrop-blur">
                      {openLabel(loc)}
                    </span>
                    <div className="absolute bottom-6 left-6 right-6 text-cream">
                      <p className="text-[11px] tracking-[0.2em] uppercase text-gold">{loc.neighborhood}</p>
                      <p className="mt-1 font-serif text-3xl">{loc.name}</p>
                      <p className="mt-2 text-sm text-cream/65">{loc.mood}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between px-6 py-4 text-sm">
                    <span className="text-stone">{loc.bestFor.split(",")[0]}</span>
                    <span className="text-gold">{loc.phone}</span>
                  </div>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-6 text-center md:px-8">
          <Eyebrow>From the room</Eyebrow>
          <motion.blockquote
            key={t.name}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 font-serif text-3xl italic leading-snug text-ink md:text-5xl"
          >
            “{t.quote}”
          </motion.blockquote>
          <p className="mt-8 text-sm tracking-[0.18em] uppercase text-gold">
            {t.name} · {t.place}
          </p>
          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                aria-label={`Quote ${i + 1}`}
                onClick={() => setQuote(i)}
                className={`h-2 w-2 rounded-full ${i === quote ? "bg-gold" : "bg-ink/20"}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink py-28 text-center text-cream">
        <p className="text-[11px] tracking-[0.35em] uppercase text-gold">This week</p>
        <h2 className="mx-auto mt-5 max-w-3xl font-serif text-4xl md:text-7xl">
          <span className="gold-shimmer">Salted caramel</span>
          <span className="mt-2 block">and a table by the window.</span>
        </h2>
        <Link to="/contact" className="mt-10 inline-block rounded-full bg-gold px-10 py-3.5 text-sm font-medium text-ink hover:bg-gold-bright">
          Reserve a table
        </Link>
      </section>
    </div>
  );
}
