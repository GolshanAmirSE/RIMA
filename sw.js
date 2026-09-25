// [ R | M Λ ] — keeps the player available offline after the first visit. A new version replaces the old one automatically.
const CACHE = "rma-player-1197183d79";
const FILES = [
  "./assets/index-Dp7hDD4l.js",
  "./assets/index-wLnK5zmh.css",
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
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE && k.startsWith("rma-player-")).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  const url = new URL(req.url);
  if (req.mode === "navigate") {
    // The page itself: newest version when online, saved copy when offline.
    e.respondWith(fetch(req, { cache: "no-store" }).catch(() => caches.match("./index.html")));
    return;
  }
  // The version check always asks the website.
  if (url.pathname.endsWith("/version.json")) return;
  // Songs stream straight from the website.
  if (req.headers.has("range") || /\.(mp3|m4a|aac|ogg|oga|opus|wav|flac|webm)$/i.test(url.pathname)) return;
  if (url.pathname.includes("/music/")) {
    // Song list, lyrics and covers: always fresh when online, saved copy when offline.
    e.respondWith(fetch(req, { cache: "no-store" }).then((res) => { if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); } return res; }).catch(() => caches.match(req)));
    return;
  }
  e.respondWith(caches.match(req, { ignoreSearch: true }).then((hit) => hit || fetch(req)));
});
