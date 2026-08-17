# Estado do projeto

> Retrato do agora. Este arquivo é **sobrescrito** a cada commit — não é
> histórico. O histórico está em [PROGRESSO.md](PROGRESSO.md).

**Atualizado em:** 17/08/2026
**Branch ativa:** `catalogo-novo` — 26 produtos reais cadastrados, sem foto e
com 6 pontos a confirmar (ver BACKLOG P0). A `main` (`15dc6d3`) é o que está
publicado e ainda mostra o catálogo de exemplo.
**Versão no site:** v6 · MVP para aprovação interna
**Stack:** HTML + CSS + JS puro, sem build
**Deploy:** Vercel, branch `main`

---

## No ar

| Área | Estado | Observação |
|---|---|---|
| Catálogo por setor | ✅ funcionando | 5 setores; setor sem produto não aparece |
| Filtro e busca | ✅ funcionando | por setor, marca e texto |
| Faixa de marcas | ✅ funcionando | 9 marcas, 4 com logo |
| Carrinho | ✅ funcionando | com upsell por setor |
| Checkout em 3 passos | ✅ funcionando | termina em mensagem no WhatsApp |
| Escolha de unidade | ✅ funcionando | Araruama e Iguaba |
| Cálculo de frete | ⚠️ parcial | grátis nas 2 cidades; fora é "combinado no WhatsApp" |
| Desconto à vista | ✅ funcionando | 5% no PIX e dinheiro |
| Parcelamento | ⚠️ parcial | até 12x; não afirma se tem juros (`semJuros: null`) |
| Corte de entrega no mesmo dia | ⛔ desligado | `corteEntregaHoje: null` — falta o Bruno confirmar o horário |
| PWA / instalar no celular | ⛔ removido | decisão consciente, ver ADR-002 |
| Indexação no Google | ⛔ bloqueada | `noindex` proposital enquanto for URL de teste |
| Topo do site no celular | ✅ funcionando | título em texto + foto limpa; a arte remontada saiu |

## Pendente de terceiro

Coisas que não dependem de código, e sim de informação que a loja precisa mandar:

- **Tabela de preços real.** Os 7 produtos hoje são exemplo. `dados.js:109`
- **Horário de corte** para entrega no mesmo dia. `dados.js:52`
- **Juros do parcelamento** — hoje o site não afirma nada. `dados.js:46`
- **Links do Google Business** das duas lojas. Hoje cai em busca por endereço. `dados.js:10`
- **Domínio `brunodastintas.com.br`** apontado para a Vercel.

## Números do catálogo (branch `catalogo-novo`)

- **26 produtos**: Coral 8 · Qualyvinil 14 · Lukscolor 2 · Maza 2
- Por setor: interna 8 · externa 6 · madeira e metal 6 · preparação 6
- Impermeabilizantes e Acessórios sem produto, portanto escondidos
- Faixa de preço: R$ 16,70 (Massa Corrida 900ml) a R$ 928,00 (Decora Diamante 18L)
- **26 fotos**, uma por produto, em `fotos/<chave>.webp` (382 KB, lazy)
- 6 setores e 11 marcas cadastrados, 2 unidades
- 4 formas de pagamento, 3 destinos de entrega
- Banner, logo e capa seguem em base64 no `imagens.js` (661 KB)
- Peso do primeiro acesso: **753 KB fixos** + foto só do que o cliente rolar

## Riscos conhecidos

| Risco | Impacto |
|---|---|
| Preços de exemplo no ar | Se o link vazar antes da tabela real, cliente cobra preço que não existe. O aviso de MVP no topo é a proteção atual. |
| `imagens.js` com 1,1 MB | Toda visita baixa tudo, inclusive foto que ninguém vai ver. Some com a migração para Next (SPEC-002). |
| Sem persistência de pedido | Se o WhatsApp não abrir, o pedido evapora. Ninguém fica sabendo que existiu. |
| Catálogo em arquivo | Toda mudança de preço exige alguém que saiba mexer em código e fazer deploy. É a razão de ser da SPEC-002. |

## Bloqueio ativo

Nenhum.

## Fluxo de deploy — funcionando ponta a ponta

```
git add -A  →  git commit  →  git push  →  Vercel publica sozinha
```

**URL de produção:** https://s-ite-bruno-tintas-loja-virtual.vercel.app
Verificada em 06/08/2026 servindo a versão atual, com os headers do
`vercel.json` aplicados.

A credencial do GitHub está salva no keychain do macOS, então o push não pede
senha. **Push publica na loja ao vivo** — por isso o `CLAUDE.md` manda commitar
automático mas nunca dar push sozinho.

⚠️ Existe um **segundo projeto Vercel duplicado** (`...-b1hj`) ligado no mesmo
repositório, que builda junto a cada push. Ver BACKLOG, P1.
