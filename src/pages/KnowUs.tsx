import { FadeUp, SplitChars } from "../components/AnimatedText";
import { Eyebrow } from "../components/ui";
import { images, ingredients, philosophy, ritual } from "../data/content";

export default function KnowUsPage() {
  return (
    <div className="bg-paper">
      <section className="mx-auto max-w-7xl px-6 pt-28 pb-12 md:px-8 md:pt-36">
        <Eyebrow>Get to know us</Eyebrow>
        <h1 className="mt-5 max-w-3xl font-serif text-5xl text-ink md:text-7xl">
          <SplitChars text="How we keep a house." />
        </h1>
        <FadeUp className="mt-6 max-w-xl text-lg text-stone">
          Not a manifesto. Habits we refuse to drop — from the first bake in Mirpur to the last pour in Gulshan.
        </FadeUp>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-8 md:px-8">
        <div className="grid gap-5 md:grid-cols-2">
          {philosophy.map((card, i) => (
            <FadeUp key={card.title} delay={i * 0.07} className="relative overflow-hidden rounded-[2rem] bg-cream p-8 md:p-12">
              <p className="font-serif text-7xl text-gold/20">0{i + 1}</p>
              <h2 className="mt-2 font-serif text-3xl text-ink">{card.title}</h2>
              <p className="mt-4 max-w-md leading-relaxed text-stone">{card.body}</p>
            </FadeUp>
          ))}
        </div>
      </section>

      <section className="bg-ink py-24 text-cream">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <Eyebrow>The clock</Eyebrow>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl">A day, if you stood in the kitchen.</h2>
          <div className="mt-12 space-y-0">
            {ritual.map((step, i) => (
              <FadeUp key={step.time} className="grid items-baseline gap-4 border-t border-gold/15 py-8 md:grid-cols-12">
                <p className="font-serif text-3xl text-gold md:col-span-2">{step.time}</p>
                <p className="font-serif text-2xl md:col-span-3">{step.title}</p>
                <p className="text-cream/60 md:col-span-7">{step.body}</p>
                <span className="sr-only">{i}</span>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 md:px-8">
        <div className="grid items-end gap-8 md:grid-cols-2">
          <div>
            <Eyebrow>What we buy</Eyebrow>
            <h2 className="mt-4 font-serif text-4xl md:text-5xl">Four ingredients we will not cheapen.</h2>
          </div>
          <p className="text-stone">If it is on the plate, it earned the counter. Substitutions live in other cafés.</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {ingredients.map((ing, i) => (
            <FadeUp key={ing.name} delay={i * 0.06} className="rounded-[1.6rem] border border-ink/10 p-6">
              <p className="font-serif text-2xl text-ink">{ing.name}</p>
              <p className="mt-3 text-sm leading-relaxed text-stone">{ing.note}</p>
            </FadeUp>
          ))}
        </div>
      </section>

      <section className="grid gap-3 px-3 pb-24 md:grid-cols-3 md:px-6">
        <img src={images.bakery} alt="Pastry counter" className="h-80 w-full rounded-[1.6rem] object-cover md:h-[520px]" />
        <img src={images.espresso} alt="Barista at the espresso machine" className="h-80 w-full rounded-[1.6rem] object-cover md:h-[520px]" />
        <img src={images.dessertCase} alt="Dessert case" className="h-80 w-full rounded-[1.6rem] object-cover md:h-[520px]" />
      </section>
    </div>
  );
}
