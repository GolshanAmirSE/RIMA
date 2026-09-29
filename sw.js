// [ R | M Λ ] — keeps the player available offline after the first visit. A new version replaces the old one automatically.
const CACHE = "rma-player-47c4ccac33";
const ART = "rma-art-47c4ccac33";
const FILES = [
  "./assets/index-BnIBLBmX.css",
  "./assets/index-D29apYEg.js",
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icons/icon.svg",
  "./icons/icon-192.png",
  "./icons/apple-touch-icon.png"
];
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => (k !== CACHE && k.startsWith("rma-player-")) || (k !== ART && k.startsWith("rma-art-"))).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  // The app's fonts: kept on the device after the first visit, so they are always the same (and work offline).
  if (/\.woff2$/i.test(url.pathname)) {
    e.respondWith(caches.open("rma-fonts").then((c) => c.match(req).then((hit) => hit || fetch(req).then((res) => { if (res.ok) c.put(req, res.clone()); return res; }))));
    return;
  }
  if (url.origin !== location.origin) return;
  if (req.mode === "navigate") {
    // The page itself: newest version when online, saved copy when offline.
    e.respondWith(fetch(req, { cache: "no-store" }).catch(() => caches.match("./index.html")));
    return;
  }
  // The version check always asks the website.
  if (url.pathname.endsWith("/version.json")) return;
  // Songs stream straight from the website.
  if (req.headers.has("range") || /\.(mp3|m4a|aac|ogg|oga|opus|wav|flac|webm)$/i.test(url.pathname)) return;
  if (url.pathname.includes("/music/") && url.searchParams.has("rima-art")) {
    // Small square cover for the lock screen and the car (made on the phone, kept for next time).
    e.respondWith(smallCover(req, url));
    return;
  }
  if (url.pathname.includes("/music/")) {
    // Song list, lyrics and covers: always fresh when online, saved copy when offline.
    e.respondWith(fetch(req, { cache: "no-store" }).then((res) => { if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); } return res; }).catch(() => caches.match(req)));
    return;
  }
  e.respondWith(caches.match(req, { ignoreSearch: true }).then((hit) => hit || fetch(req)));
});
async function smallCover(req, url) {
  const cache = await caches.open(ART);
  const hit = await cache.match(req);
  if (hit) return hit;
  const src = new URL(url.href);
  src.searchParams.delete("rima-art");
  let res = null;
  try { res = await fetch(src.href, { cache: "no-store" }); } catch (_) { res = await caches.match(src.href); }
  if (!res || !res.ok) return res || Response.error();
  try {
    if (typeof OffscreenCanvas === "undefined" || typeof createImageBitmap === "undefined") return res;
    const size = Math.max(64, Math.min(1024, parseInt(url.searchParams.get("rima-art"), 10) || 512));
    const bmp = await createImageBitmap(await res.clone().blob());
    const side = Math.min(bmp.width, bmp.height);
    const canvas = new OffscreenCanvas(size, size);
    canvas.getContext("2d").drawImage(bmp, (bmp.width - side) / 2, (bmp.height - side) / 2, side, side, 0, 0, size, size);
    const blob = await canvas.convertToBlob({ type: "image/jpeg", quality: 0.88 });
    const out = new Response(blob, { headers: { "Content-Type": "image/jpeg" } });
    await cache.put(req, out.clone());
    return out;
  } catch (_) {
    return res;
  }
}
