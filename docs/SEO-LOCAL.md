# SEO local — Araruama e Iguaba Grande

> O objetivo é aparecer para quem digita "tinta em Araruama", "loja de tintas
> Iguaba" e variações. Não é SEO nacional: o alvo é a Região dos Lagos.

## ⚠️ Nada disso funciona enquanto o `noindex` estiver ligado

O `vercel.json` manda `X-Robots-Tag: noindex, nofollow`. É proposital, para o
Google não indexar a URL de teste com preço em aprovação. **No dia em que o
domínio for apontado, esse header sai** — senão todo o resto aqui é inútil.

## Feito

**Título:** `Loja de Tintas em Araruama e Iguaba Grande | Bruno das Tintas`.
Começa com a frase que a pessoa digita, não com a marca — quem procura tinta
não conhece a loja ainda.

**Descrição:** reescrita. A anterior citava Sherwin Williams e Textura Rio,
marcas que **saíram do catálogo** — descrição mentindo derruba a confiança de
quem clica. Agora cita Coral, Qualyvinil, Lukscolor e Maza, que é o que a loja
tem, mais frete grátis e retirada em 15 minutos.

**Título da seção de lojas:** era "Duas lojas, a mesma equipe" — bonito e
inútil para busca. Virou "Tinta em Araruama e em Iguaba Grande". `<h2>` pesa
mais que texto solto.

**Dados estruturados**, nas duas unidades: `hasMap` com o link do Google Maps,
`currenciesAccepted`, `slogan`, `knowsAbout` (tinta acrílica, esmalte
sintético, massa corrida, massa acrílica, tingimento) e `makesOffer` com área
atendida.

**Imagem de compartilhamento corrigida.** O `og:image` apontava para
`/capa.webp`, arquivo que não existe mais desde que as artes foram para
`artes/`. Quem compartilhasse o link no WhatsApp veria preview quebrado.

## O que falta, e depende do Bruno

Cada item abaixo é peso real no ranking local. Nenhum foi preenchido porque
não temos o dado — e **inventar endereço ou horário no schema é pior que
deixar vazio**, porque o Google cruza com o Google Business.

| Falta | Por que importa |
|---|---|
| **CEP das duas lojas** | Completa o `PostalAddress`. Endereço incompleto confunde o cruzamento com o Google Business. |
| **Horário de funcionamento** | `openingHours` faz o Google mostrar "aberto agora" no resultado. É dos campos que mais chamam clique. |
| **Coordenadas (latitude/longitude)** | `geo` ajuda no "perto de mim". Sai do próprio Google Business. |
| **Perfil no Google Business** | O maior fator de SEO local, maior que o site. O `hasMap` hoje é busca por endereço, não o link do perfil. |
| **Instagram e Facebook** | Vão em `sameAs` e confirmam que a loja é real. |

## Ideias de conteúdo, para depois

Página de busca local ganha com conteúdo que responde pergunta. Sem inventar
nada, dá para escrever a partir do que a loja já sabe:

- "Quanta tinta preciso para pintar minha casa" — calculadora simples por m²
- "Qual tinta usar em cada cômodo" — já existe embrionário nos setores
- Página por cidade, se um dia a loja abrir uma terceira unidade

Nada disso vale a pena antes do `noindex` sair e do Google Business estar no ar.
