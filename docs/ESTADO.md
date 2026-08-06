# Estado do projeto

> Retrato do agora. Este arquivo é **sobrescrito** a cada commit — não é
> histórico. O histórico está em [PROGRESSO.md](PROGRESSO.md).

**Atualizado em:** 06/08/2026
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

## Pendente de terceiro

Coisas que não dependem de código, e sim de informação que a loja precisa mandar:

- **Tabela de preços real.** Os 7 produtos hoje são exemplo. `dados.js:109`
- **Horário de corte** para entrega no mesmo dia. `dados.js:52`
- **Juros do parcelamento** — hoje o site não afirma nada. `dados.js:46`
- **Links do Google Business** das duas lojas. Hoje cai em busca por endereço. `dados.js:10`
- **Domínio `brunodastintas.com.br`** apontado para a Vercel.

## Números do catálogo hoje

- 7 produtos, 5 setores, 9 marcas, 2 unidades
- 4 formas de pagamento, 3 destinos de entrega
- 18 imagens, todas em base64 dentro de `imagens.js` (1,1 MB)

## Riscos conhecidos

| Risco | Impacto |
|---|---|
| Preços de exemplo no ar | Se o link vazar antes da tabela real, cliente cobra preço que não existe. O aviso de MVP no topo é a proteção atual. |
| `imagens.js` com 1,1 MB | Toda visita baixa tudo, inclusive foto que ninguém vai ver. Some com a migração para Next (SPEC-002). |
| Sem persistência de pedido | Se o WhatsApp não abrir, o pedido evapora. Ninguém fica sabendo que existiu. |
| Catálogo em arquivo | Toda mudança de preço exige alguém que saiba mexer em código e fazer deploy. É a razão de ser da SPEC-002. |

## Bloqueio ativo

Nenhum. O push para o GitHub foi destravado em 06/08/2026 — ver PROGRESSO.

## Fluxo de deploy

```
git add -A  →  git commit  →  git push  →  Vercel publica
```

A credencial do GitHub está salva no keychain do macOS, então o push não pede
senha. **Push publica na loja ao vivo** — por isso o `CLAUDE.md` manda commitar
automático mas nunca dar push sozinho.

Falta ainda conectar o repositório ao projeto na Vercel para o deploy sair
automático a cada push. Ver BACKLOG, P0.
