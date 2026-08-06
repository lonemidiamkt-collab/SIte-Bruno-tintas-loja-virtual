# ADR-002 — Sem service worker nem PWA

- **Data:** 06/08/2026
- **Estado:** Aceita
- **Relacionadas:** SPEC-001

## Contexto

Versões anteriores do site tinham `manifest.json` e `sw.js`, com service worker
cacheando os arquivos — o pacote PWA completo, incluindo "adicionar à tela de
início".

O problema apareceu na prática: **o service worker servia a versão velha do
site depois do deploy.** Publicava-se a correção e o cliente continuava vendo o
site antigo, sem entender por quê. O rastro disso está no próprio histórico —
sete versões diferentes espalhadas em pastas de download e uma sucessão de
arquivos `TESTE-LOCAL-*.html`, sintoma clássico de alguém tentando descobrir
qual versão está realmente no ar.

A versão de 06/08/2026 11:47 já veio sem PWA.

## Decisão

O site não tem service worker nem manifest. Cache é responsabilidade dos
headers HTTP, configurados no `vercel.json` com `must-revalidate`.

## Alternativas consideradas

- **Manter o PWA com estratégia de cache melhor** (network-first, versionamento
  do cache) — perdeu porque o ganho não paga o risco. O "adicionar à tela de
  início" tem uso baixo num site de loja local, e o custo de errar é o cliente
  ver preço desatualizado. Preço errado no ar é problema de negócio, não de
  técnica.
- **Manter só o manifest, sem service worker** — dá o ícone sem o risco de
  cache. Foi descartado por ora para manter o conjunto simples, mas é a opção
  mais provável se o PWA voltar.

## Consequências

**A favor:**
- Deploy publica de verdade: o que está na Vercel é o que o cliente vê
- Menos arquivo, menos coisa para dar errado
- Some a classe de bug mais cara que o projeto teve

**Contra:**
- Não instala na tela de início do celular
- Não funciona offline — irrelevante para um site cujo fluxo termina no WhatsApp

## Quando revisitar

Se aparecer demanda real de instalar no celular. Nesse caso, **manifest
primeiro, service worker só depois**, e com versionamento de cache resolvido
antes de subir.
