import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { FadeUp, SplitChars } from "../components/AnimatedText";
import { Eyebrow } from "../components/ui";
import { images, locations } from "../data/content";
import { openLabel } from "../lib/hours";
import { fetchWeather, type WeatherNow } from "../lib/weather";

export default function LocationDetail() {
  const { slug } = useParams();
  const loc = locations.find((l) => l.slug === slug);
  const [weather, setWeather] = useState<WeatherNow | null>(null);

  useEffect(() => {
    if (!loc) return;
    let live = true;
    fetchWeather(loc.lat, loc.lon).then((w) => {
      if (live) setWeather(w);
    });
    return () => {
      live = false;
    };
  }, [loc]);

  if (!loc) return <Navigate to="/locations" replace />;

  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${loc.lon - 0.01}%2C${loc.lat - 0.01}%2C${loc.lon + 0.01}%2C${loc.lat + 0.01}&layer=mapnik&marker=${loc.lat}%2C${loc.lon}`;
  const others = locations.filter((l) => l.slug !== loc.slug);
  const shots = [loc.image, images.latte, images.croissant, images.atelier];

  return (
    <div className="bg-paper">
      <section className="relative isolate h-[78vh] min-h-[520px] overflow-hidden">
        <img src={loc.image} alt={loc.name} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/35" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-16 md:px-8">
          <Eyebrow light>{loc.neighborhood}</Eyebrow>
          <h1 className="mt-4 font-serif text-5xl text-cream md:text-8xl">
            <SplitChars text={loc.name} />
          </h1>
          <div className="mt-5 flex flex-wrap gap-3 text-sm text-cream/75">
            <span className="rounded-full border border-gold/40 px-3 py-1 text-gold">{openLabel(loc)}</span>
            {weather && (
              <span className="rounded-full border border-cream/20 px-3 py-1">
                {weather.temp}°C · {weather.label}
              </span>
            )}
            <span className="rounded-full border border-cream/20 px-3 py-1">{loc.mood}</span>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-14 px-6 py-20 md:px-8 lg:grid-cols-12">
        <FadeUp className="lg:col-span-7">
          <p className="font-serif text-3xl leading-snug text-ink md:text-4xl">{loc.blurb}</p>
          <p className="mt-6 text-stone">Best for {loc.bestFor.toLowerCase()}. Order the {loc.signature.toLowerCase()}.</p>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            <div>
              <p className="text-[11px] tracking-[0.2em] uppercase text-gold">Address</p>
              <p className="mt-2 font-serif text-xl text-ink">{loc.address}</p>
            </div>
            <div>
              <p className="text-[11px] tracking-[0.2em] uppercase text-gold">Call</p>
              <a href={loc.phoneHref} className="mt-2 block font-serif text-xl text-ink hover:text-gold">
                {loc.phone}
              </a>
            </div>
            <div>
              <p className="text-[11px] tracking-[0.2em] uppercase text-gold">Seats</p>
              <p className="mt-2 text-ink">{loc.seats}</p>
            </div>
            <div>
              <p className="text-[11px] tracking-[0.2em] uppercase text-gold">Getting here</p>
              <p className="mt-2 text-sm leading-relaxed text-stone">{loc.gettingThere}</p>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {loc.amenities.map((a) => (
              <span key={a} className="rounded-full bg-cream px-3 py-1.5 text-xs text-ink">
                {a}
              </span>
            ))}
          </div>
          <Link to="/contact" className="mt-10 inline-block rounded-full bg-ink px-8 py-3.5 text-sm text-cream">
            Reserve this house
          </Link>
        </FadeUp>

        <FadeUp delay={0.1} className="lg:col-span-5">
          <div className="rounded-[2rem] bg-cream p-8">
            <p className="font-serif text-3xl text-ink">Hours</p>
            <ul className="mt-6">
              {loc.hoursTable.map((row) => (
                <li key={row.day} className="flex items-center justify-between border-b border-ink/10 py-3 last:border-0">
                  <span>{row.day}</span>
                  <span className="text-gold">{row.time}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-stone">{loc.hoursNote}</p>
          </div>
          <div className="mt-5 overflow-hidden rounded-[2rem] border border-ink/10">
            <iframe
              title={`Map of IZ ${loc.name}`}
              src={mapSrc}
              className="h-[280px] w-full grayscale-[0.35]"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>
        </FadeUp>
      </section>

      <section className="grid grid-cols-2 gap-3 px-3 pb-16 md:grid-cols-4 md:px-6">
        {shots.map((src, i) => (
          <img key={i} src={src} alt="" className="h-40 w-full rounded-2xl object-cover md:h-56" />
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 md:px-8">
        <p className="text-[11px] tracking-[0.28em] uppercase text-gold">The other houses</p>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {others.map((o) => (
            <Link key={o.slug} to={`/locations/${o.slug}`} className="group overflow-hidden rounded-[1.6rem]">
              <div className="relative h-56">
                <img src={o.image} alt={o.name} className="img-lux h-full w-full object-cover" />
                <div className="absolute inset-0 bg-ink/40" />
                <p className="absolute bottom-5 left-5 font-serif text-3xl text-cream">{o.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
