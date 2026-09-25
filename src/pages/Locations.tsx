import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FadeUp, SplitChars } from "../components/AnimatedText";
import { Eyebrow } from "../components/ui";
import { locations } from "../data/content";
import { openLabel } from "../lib/hours";
import { fetchWeather, type WeatherNow } from "../lib/weather";

export default function LocationsPage() {
  const [weather, setWeather] = useState<Record<string, WeatherNow | null>>({});

  useEffect(() => {
    let live = true;
    (async () => {
      const entries = await Promise.all(
        locations.map(async (loc) => [loc.slug, await fetchWeather(loc.lat, loc.lon)] as const)
      );
      if (live) setWeather(Object.fromEntries(entries));
    })();
    return () => {
      live = false;
    };
  }, []);

  return (
    <div className="bg-paper">
      <section className="mx-auto max-w-7xl px-6 pt-28 pb-10 md:px-8 md:pt-36">
        <Eyebrow>Locations</Eyebrow>
        <h1 className="mt-5 font-serif text-5xl text-ink md:text-7xl">
          <SplitChars text="Three houses, one table." />
        </h1>
        <FadeUp className="mt-5 max-w-xl text-stone">
          Same pastry, same espresso, three moods. Live Dhaka weather sits on each card so you know if the window will glow.
        </FadeUp>
      </section>

      <section className="mx-auto max-w-7xl space-y-8 px-6 pb-10 md:px-8">
        {locations.map((loc, i) => {
          const w = weather[loc.slug];
          const reverse = i % 2 === 1;
          return (
            <FadeUp key={loc.slug} delay={i * 0.05}>
              <Link
                to={`/locations/${loc.slug}`}
                className={`group grid overflow-hidden rounded-[2rem] bg-cream md:grid-cols-2 ${reverse ? "md:[&>img]:order-2" : ""}`}
              >
                <div className="relative h-72 overflow-hidden md:h-auto md:min-h-[420px]">
                  <img src={loc.image} alt={loc.name} className="img-lux h-full w-full object-cover" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="rounded-full bg-ink/80 px-3 py-1 text-[10px] tracking-wide uppercase text-gold backdrop-blur">
                      {openLabel(loc)}
                    </span>
                    {w && (
                      <span className="rounded-full bg-ink/80 px-3 py-1 text-[10px] text-cream backdrop-blur">
                        {w.temp}°C · {w.label}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col justify-center p-8 md:p-12">
                  <p className="text-[11px] tracking-[0.22em] uppercase text-gold">{loc.neighborhood}</p>
                  <h2 className="mt-2 font-serif text-4xl md:text-5xl">{loc.name}</h2>
                  <p className="mt-4 text-stone">{loc.blurb}</p>
                  <p className="mt-5 text-sm text-ink">{loc.bestFor}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {loc.amenities.slice(0, 4).map((a) => (
                      <span key={a} className="rounded-full bg-paper px-3 py-1 text-xs text-stone">
                        {a}
                      </span>
                    ))}
                  </div>
                  <p className="mt-8 text-sm text-gold">
                    {loc.phone} · Enter house →
                  </p>
                </div>
              </Link>
            </FadeUp>
          );
        })}
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 md:px-8">
        <div className="overflow-hidden rounded-[2rem] border border-ink/10">
          <div className="grid bg-ink px-6 py-4 text-[11px] tracking-[0.2em] uppercase text-gold md:grid-cols-4">
            <span>House</span>
            <span className="hidden md:block">Best for</span>
            <span className="hidden md:block">Seats</span>
            <span className="hidden md:block">Hours</span>
          </div>
          {locations.map((loc) => (
            <Link
              key={loc.slug}
              to={`/locations/${loc.slug}`}
              className="grid gap-1 border-t border-ink/10 px-6 py-5 text-sm hover:bg-cream md:grid-cols-4"
            >
              <span className="font-serif text-xl">{loc.name}</span>
              <span className="text-stone">{loc.bestFor}</span>
              <span className="text-stone">{loc.seats}</span>
              <span className="text-stone">{loc.hours}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
