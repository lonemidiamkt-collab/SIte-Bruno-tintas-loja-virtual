# ADR-001 — Site estático, sem build

- **Data:** registrada em 06/08/2026 (decisão original é anterior, nunca escrita)
- **Estado:** Aceita — em revisão pela [SPEC-002](../specs/SPEC-002-migracao-next-supabase.md)
- **Relacionadas:** SPEC-001, SPEC-002

## Contexto

O site nasceu como MVP para aprovação do Bruno. O objetivo era colocar algo no
ar rápido, para o cliente ver e opinar, sem saber ainda se o projeto seguiria.

## Decisão

HTML, CSS e JavaScript puro, sem framework e sem etapa de build. A Vercel serve
os arquivos como estão.

## Alternativas consideradas

- **Next.js desde o começo** — perdeu porque, para um MVP de aprovação,
  build e deploy configurados eram custo antes da validação. Voltou à mesa
  agora que o projeto se provou: SPEC-002.
- **Construtor visual (Wix, Webflow)** — perdeu porque o fluxo de pedido com
  upsell, desconto por forma de pagamento e roteamento entre duas unidades não
  sai pronto em construtor, e o que sai fica preso na ferramenta.

## Consequências

**A favor:**
- Qualquer editor de texto edita o site
- Deploy é copiar arquivo; não existe build para quebrar
- Rápido de carregar, sem framework no caminho

**Contra:**
- Catálogo em arquivo: mudar preço exige código e deploy
- Sem otimização automática de imagem — daí o `imagens.js` de 1,1 MB
- Sem componente: mudança repetida em vários lugares do HTML
- Sem lugar natural para backend, então nenhum pedido é registrado

## Quando revisitar

Quando a frequência de alteração de catálogo passar a exigir que o Bruno mexa
sozinho. **Esse momento chegou** — é o que motiva a SPEC-002.
