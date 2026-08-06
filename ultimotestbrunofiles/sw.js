/* Bruno das Tintas — service worker
   Rede primeiro: quem instalou o app não fica preso numa versão
   antiga do catálogo. O cache serve só de rede de segurança quando
   a conexão cai. */
const CACHE = 'bruno-tintas-v3';
const ESSENCIAL = ['./', './index.html', './styles.css', './imagens.js', './dados.js', './app.js', './manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(ESSENCIAL))
      .catch(() => {})
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(nomes => Promise.all(nomes.filter(n => n !== CACHE).map(n => caches.delete(n))))
      .then(() => self.clients.claim())
  );
});

/* Se o HTML mudou, avisa as abas abertas para recarregarem uma vez.
   Sem isso o Safari fica preso na versão antiga por muito tempo. */
self.addEventListener('message', e => {
  if (e.data === 'pular-espera') self.skipWaiting();
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;   // fontes e WhatsApp passam direto

  e.respondWith(
    fetch(req)
      .then(res => {
        const copia = res.clone();
        caches.open(CACHE).then(c => c.put(req, copia)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(req).then(r => r || caches.match('./index.html')))
  );
});
