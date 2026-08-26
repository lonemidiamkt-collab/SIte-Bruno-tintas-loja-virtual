# ADR-003 — `noindex` até o domínio real ser apontado

- **Data:** registrada em 06/08/2026
- **Estado:** Cumprida e revertida em 25/08/2026 — era temporária por natureza
- **Relacionadas:** SPEC-001, BACKLOG (P1)

## Contexto

O site está no ar numa URL da Vercel (`*.vercel.app`) enquanto o Bruno aprova.
Ao mesmo tempo, ele já tem SEO completo montado: `canonical` apontando para
`brunodastintas.com`, dados estruturados `HardwareStore` para as duas
unidades, Open Graph.

Se o Google indexar a URL de teste, dois estragos: conteúdo duplicado
competindo com o domínio final, e — pior — **preços de exemplo aparecendo na
busca como se fossem os preços da loja.**

## Decisão

O `vercel.json` envia `X-Robots-Tag: noindex, nofollow` em todas as rotas
enquanto o site viver na URL de teste.

## Alternativas consideradas

- **`robots.txt`** — perdeu porque é mais fácil de ignorar e não cobre o caso de
  a URL ser descoberta por link externo. O header vale para a resposta inteira.
- **Proteção por senha na Vercel** — perdeu porque atrapalha o Bruno e a equipe
  verem o site para aprovar, que é exatamente o objetivo desta fase.

## Consequências

**A favor:**
- Preço de exemplo não vaza para a busca
- Domínio final começa sem concorrer com a URL de teste

**Contra:**
- **Se esquecerem de remover, o site nunca aparece no Google.** Este é o risco
  real da decisão, e ele é silencioso: nada quebra, o site simplesmente não
  recebe visita orgânica e ninguém entende por quê.

## Mitigação do risco

O aviso está em três lugares de propósito: `README.md`, `CLAUDE.md` (seção de
limites) e `BACKLOG.md` como P1, amarrado à tarefa de apontar o domínio.

## Quando revisitar — cumprido

Era "no momento exato em que `brunodastintas.com` for apontado para a Vercel".
Aconteceu em **25/08/2026**: domínio registrado na Hostinger, `A @` para
`216.198.79.1` e `CNAME www` para `c04a1a6546dc7122.vercel-dns-017.com`, apex
com 308 para o `www`, certificado emitido, `https` respondendo 200.

O `X-Robots-Tag: noindex, nofollow` saiu do `vercel.json` no mesmo commit, e a
tarja "v7 · Versão para aprovação" saiu do topo junto — ela dizia ao cliente
real que o site não estava pronto.

**O que a decisão evitou:** entre 06/08 e 25/08 o site esteve no ar com preços
de exemplo, depois com preços reais mas catálogo em formação, e com o
`canonical` apontando para `brunodastintas.com.br` — um domínio que nunca
existiu. Se o Google tivesse indexado nesse período, teríamos preço errado no
resultado de busca e um canonical apontando para o nada.
