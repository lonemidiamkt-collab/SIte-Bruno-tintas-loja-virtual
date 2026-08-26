# Bruno das Tintas — loja virtual

Site estático (HTML + CSS + JS puro, sem build) das lojas de Araruama e Iguaba Grande.
O cliente monta o pedido no site e fecha pelo WhatsApp da unidade escolhida.

Publicado na Vercel a partir da branch `main`: **todo push em `main` vira deploy novo.**

## Arquivos

| arquivo | o que é |
|---|---|
| `index.html` | a página. Estrutura e textos fixos. |
| `styles.css` | todo o visual. |
| `dados.js` | **o arquivo do dia a dia**: unidades, produtos, preços, marcas, setores, formas de pagamento, frete. |
| `imagens.js` | as fotos, embutidas em base64 no objeto `MAPA_IMG`. |
| `app.js` | o comportamento: catálogo, filtros, carrinho, checkout, link do WhatsApp. |
| `vercel.json` | headers e configuração de deploy. |

Os scripts carregam nesta ordem e dependem dela: `imagens.js` → `dados.js` → `app.js`.

## Mexer no catálogo

Quase tudo do dia a dia está em `dados.js`:

- **produto novo / preço / tirar produto** → lista `PRODUTOS`
- **loja, WhatsApp, endereço** → lista `UNIDADES`
- **desconto à vista, parcelas, frete** → objeto `LOJA` e listas `PAGAMENTOS` / `DESTINOS`

Cada produto aponta para uma chave de `MAPA_IMG` (em `imagens.js`). Para foto nova, gere
o base64 da imagem (de preferência `.webp`) e coloque na chave correspondente.

## Rodar local

```bash
python3 -m http.server 8080
```

Depois abra `http://localhost:8080`. Precisa de servidor — abrir o `index.html` por
duplo clique quebra o carregamento dos scripts.

## Deploy

Conectado ao projeto da Vercel via GitHub. O fluxo é:

```bash
git add -A
git commit -m "descreve a mudança"
git push
```

A Vercel detecta o push, publica e atualiza o link de produção sozinha.

## No ar

**https://www.brunodastintas.com** — domínio apontado em 25/08/2026. O apex
redireciona para o `www` com 308, e o `X-Robots-Tag: noindex` saiu do
`vercel.json` no mesmo movimento (ver `docs/decisoes/ADR-003`). O site está
aberto para o Google.
