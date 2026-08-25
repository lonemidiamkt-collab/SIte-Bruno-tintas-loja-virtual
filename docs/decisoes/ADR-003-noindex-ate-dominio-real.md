# ADR-003 — `noindex` até o domínio real ser apontado

- **Data:** registrada em 06/08/2026
- **Estado:** Aceita — temporária por natureza
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

## Quando revisitar

No momento exato em que `brunodastintas.com` for apontado para a Vercel.
Aí este ADR é revertido e o header sai.
