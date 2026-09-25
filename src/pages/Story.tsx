import { Link } from "react-router-dom";
import { FadeUp, SplitChars } from "../components/AnimatedText";
import { Eyebrow } from "../components/ui";
import { images } from "../data/content";

const chapters = [
  {
    year: "The gap",
    title: "Mirpur had no room for lingering.",
    body: "Gulshan had cafés. Mirpur had meals. Israt Zisan saw a neighborhood that deserved a proper cup, a proper croissant, and a room that did not rush you out. She opened on the fifth floor of Safura Tower anyway.",
  },
  {
    year: "The rooms",
    title: "Europe, remembered in cream and gold.",
    body: "High ceilings, arched doorways, chandeliers, paintings chosen one by one. Neutral walls, then a splash of colour. Velvet sofas that still look like they belong in a Victorian salon. Hospitality, she decided, is an interior.",
  },
  {
    year: "The dough",
    title: "Laminated, not rushed.",
    body: "People preferred heavy meals over pastry. The team stayed. They taught the neighborhood to wait for 27 layers. Today the same hands bake for Gulshan’s lounge and Dhanmondi’s windows over Satmasjid Road.",
  },
];

export default function StoryPage() {
  return (
    <div className="bg-paper">
      <section className="relative isolate min-h-[70vh] overflow-hidden">
        <img src={images.mirpur} alt="Original Victorian IZ salon" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-paper via-ink/50 to-ink/60" />
        <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-7xl flex-col justify-end px-6 pb-16 pt-32 md:px-8">
          <Eyebrow light>Our story</Eyebrow>
          <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-[0.95] text-cream md:text-7xl">
            <SplitChars text="A European house for Dhaka." />
          </h1>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:px-8 lg:grid-cols-2">
        <FadeUp>
          <p className="font-serif text-3xl leading-snug text-ink md:text-4xl">
            Israt Zisan walked ornate rooms in Europe and came home with a question: why should a beautiful cup require a plane?
          </p>
          <p className="mt-6 leading-relaxed text-stone">
            She is proprietor, pastry mind, and interior obsessive. A team of twenty-two self-trained hosts now carry the house rule she wrote on a napkin: caffeine and kindness. Come as you are. Stay as long as the cup lasts.
          </p>
        </FadeUp>
        <img src={images.espresso} alt="Espresso being pulled" className="h-[320px] w-full rounded-[2rem] object-cover lg:h-[400px]" />
      </section>

      <section className="bg-cream py-24">
        <div className="mx-auto max-w-5xl px-6 md:px-8">
          {chapters.map((c, i) => (
            <FadeUp key={c.year} delay={i * 0.08} className="grid gap-6 border-t border-ink/10 py-12 md:grid-cols-12">
              <p className="text-[11px] tracking-[0.28em] uppercase text-gold md:col-span-3">{c.year}</p>
              <div className="md:col-span-9">
                <h2 className="font-serif text-3xl text-ink md:text-4xl">{c.title}</h2>
                <p className="mt-4 max-w-2xl leading-relaxed text-stone">{c.body}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-24 md:grid-cols-2 md:px-8">
        <img src={images.atelier} alt="Laminating dough" className="h-[480px] w-full rounded-[2rem] object-cover" />
        <div className="flex flex-col justify-center">
          <p className="font-serif text-3xl leading-snug text-ink md:text-4xl">
            “People here preferred heavy meals over coffee. We stayed anyway — and taught the neighborhood to linger.”
          </p>
          <p className="mt-6 text-gold">— Israt Zisan, founder</p>
          <Link to="/get-to-know-us" className="link-gold mt-10 inline-block text-sm tracking-[0.18em] uppercase text-gold">
            How we keep a house
          </Link>
        </div>
      </section>

      <section className="bg-ink py-24 text-cream">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-3 md:px-8">
          {[
            { n: "3", l: "Houses in Dhaka", s: "Mirpur first. Then Gulshan. Then Dhanmondi." },
            { n: "22", l: "Hosts in the rooms", s: "Self-trained. They remember your order." },
            { n: "27", l: "Layers in a croissant", s: "No shortcut. Butter stays cold." },
          ].map((s) => (
            <FadeUp key={s.l} className="text-center md:text-left">
              <p className="font-serif text-6xl text-gold">{s.n}</p>
              <p className="mt-3 font-serif text-2xl">{s.l}</p>
              <p className="mt-2 text-sm text-cream/50">{s.s}</p>
            </FadeUp>
          ))}
        </div>
      </section>
    </div>
  );
}
