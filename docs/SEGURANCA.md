# Segurança — auditoria e testes

> Última auditoria: 17/08/2026. Repetir a cada mudança que toque em entrada do
> cliente, `innerHTML` ou headers.

## Superfície de ataque

O site é **estático**: HTML, CSS e JS servidos por CDN. Isso elimina classes
inteiras de risco antes de qualquer teste:

| Risco comum | Se aplica? | Por quê |
|---|---|---|
| SQL injection | **Não** | Não há banco |
| Falha de autenticação | **Não** | Não há login nem sessão |
| Vazamento de dados de cliente | **Não** | Nada é gravado; o pedido vai direto ao WhatsApp |
| Cadeia de suprimentos (npm) | **Não** | Zero dependências, zero build |
| Upload malicioso | **Não** | Não há upload |
| CSRF | **Não** | Não há formulário que envie para servidor |

O que sobra: **XSS** (entrada do cliente virando HTML) e **configuração de
headers**.

## Testes de injeção — 17/08/2026

Cinco payloads pelos campos que o cliente digita (nome, telefone, endereço,
cor, observação):

| Payload | Resultado |
|---|---|
| `<img src=x onerror=alert(1)>` | escapado |
| `"><script>alert(2)</script>` | escapado |
| `'><svg onload=alert(3)>` | escapado |
| `<b onclick=alert(4)>palha</b>` | escapado |
| `javascript:alert(5)` | escapado |

**Tags injetadas vivas no DOM: 0.** Os payloads aparecem como texto escapado
(`&lt;`). O link do WhatsApp sai sem `<`, `"` ou `>` crus.

**Por que resiste:** todo campo do cliente passa por `esc()` antes de virar
HTML, e a nota do pedido nunca vai para `innerHTML` — só para
`encodeURIComponent` dentro do link do WhatsApp.

## Corrigido nesta auditoria

**`window.open` sem `noopener`.** A aba do WhatsApp recebia `window.opener` e
poderia mexer na janela do site. `window.open` **não** assume `noopener`
sozinho — só a tag `<a target="_blank">` assume. Corrigido explicitamente.

## Headers (vercel.json)

| Header | Para quê |
|---|---|
| `Content-Security-Policy` | Só executa script do próprio domínio. Bloqueia script injetado mesmo que um XSS passasse. |
| `X-Frame-Options: DENY` + `frame-ancestors 'none'` | Impede o site ser posto em iframe (clickjacking) |
| `X-Content-Type-Options: nosniff` | Impede o navegador adivinhar tipo de arquivo |
| `Referrer-Policy` | Não vaza a URL completa para terceiros |
| `Permissions-Policy` | Desliga câmera, microfone, geolocalização e pagamento |
| `Cross-Origin-Opener-Policy` | Isola a janela de outras abas |

**CSP testada com o site rodando atrás dela**: 26 produtos, fontes do Google,
logos, carrinho, detalhe do produto e checkout — tudo funcionou, zero violação
no console.

## Terceiros

Só **Google Fonts** (`fonts.googleapis.com` e `fonts.gstatic.com`). O Google vê
o IP de quem visita. É comum e está liberado na CSP. Se quiser zerar isso por
LGPD, dá para hospedar as fontes no próprio domínio.

## Dados pessoais (LGPD)

O cliente digita nome, telefone e endereço. **Nada disso é gravado em lugar
nenhum** — vira texto e vai para o WhatsApp da loja. O site não tem banco, não
tem cookie de rastreio e não manda dados para terceiros.

Consequência boa: o site não é controlador de dados em repouso. O tratamento
acontece no WhatsApp, sob responsabilidade da loja.

## O que ainda não foi testado

- Teste em navegador real com CSP em produção (só foi testado local, com os
  mesmos headers do `vercel.json`)
- Proteção contra abuso de volume no WhatsApp (alguém disparar muitos pedidos
  falsos). Hoje não há limite — o filtro é humano, no atendimento.
