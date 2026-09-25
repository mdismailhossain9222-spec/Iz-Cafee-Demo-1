import { useState } from "react";
import { FadeUp, SplitChars } from "../components/AnimatedText";
import { Eyebrow } from "../components/ui";
import { gallery } from "../data/content";

export default function GalleryPage() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="bg-ink min-h-screen text-cream">
      <section className="mx-auto max-w-7xl px-6 pt-28 pb-10 md:px-8 md:pt-36">
        <Eyebrow>The vitrine</Eyebrow>
        <h1 className="mt-5 font-serif text-5xl md:text-7xl">
          <SplitChars text="Rooms, dough, steam." />
        </h1>
        <FadeUp className="mt-5 max-w-lg text-cream/55">
          A few frames from an ordinary week — the salon, the pass, the 06:30 bake.
        </FadeUp>
      </section>

      <section className="columns-1 gap-4 px-4 pb-24 sm:columns-2 lg:columns-3 lg:px-8">
        {gallery.map((shot, i) => (
          <button
            key={shot.title}
            onClick={() => setActive(i)}
            className="group mb-4 block w-full break-inside-avoid overflow-hidden rounded-[1.4rem] text-left"
          >
            <img src={shot.src} alt={shot.caption} className="img-lux w-full object-cover" />
            <div className="flex items-baseline justify-between px-1 py-3">
              <p className="font-serif text-xl">{shot.title}</p>
              <p className="text-xs text-cream/40">{shot.caption}</p>
            </div>
          </button>
        ))}
      </section>

      {active !== null && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/90 p-6" onClick={() => setActive(null)}>
          <img src={gallery[active].src} alt={gallery[active].caption} className="max-h-[86vh] max-w-5xl rounded-lg object-contain" />
          <p className="absolute bottom-8 left-0 right-0 text-center font-serif text-2xl text-gold">
            {gallery[active].title}
          </p>
        </div>
      )}
    </div>
  );
}
