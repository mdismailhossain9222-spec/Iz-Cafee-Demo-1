export type WeatherNow = {
  temp: number;
  code: number;
  label: string;
};

function labelFor(code: number) {
  if (code === 0) return "Clear";
  if (code <= 3) return "Partly cloudy";
  if (code <= 48) return "Mist";
  if (code <= 67) return "Rain";
  if (code <= 77) return "Snow";
  if (code <= 82) return "Showers";
  if (code <= 99) return "Thunder";
  return "Dhaka skies";
}

export async function fetchWeather(lat: number, lon: number): Promise<WeatherNow | null> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&timezone=Asia%2FDhaka`;
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 8000);
  try {
    const res = await fetch(url, { signal: ctrl.signal });
    if (!res.ok) return null;
    const data = await res.json();
    const temp = data?.current?.temperature_2m;
    const code = data?.current?.weather_code;
    if (typeof temp !== "number" || typeof code !== "number") return null;
    return { temp: Math.round(temp), code, label: labelFor(code) };
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}
