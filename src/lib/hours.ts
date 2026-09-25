import type { Location } from "../data/content";

export function dhakaNow() {
  return new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" }));
}

export function isOpenNow(loc: Location) {
  const now = dhakaNow();
  const day = now.getDay();
  const mins = now.getHours() * 60 + now.getMinutes();
  const late = loc.slug !== "mirpur-12" && (day === 4 || day === 5 || day === 6);
  const open = 8 * 60;
  const close = late ? 24 * 60 : 23 * 60;
  return mins >= open && mins < close;
}

export function openLabel(loc: Location) {
  return isOpenNow(loc) ? "Open now" : "Currently closed";
}
