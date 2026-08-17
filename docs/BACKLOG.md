# Backlog

> Fila priorizada. Item concluído sai daqui e vira entrada no
> [PROGRESSO.md](PROGRESSO.md). Item que tem spec aponta para ela.

Prioridades: **P0** trava o projeto · **P1** próximo ciclo · **P2** depois ·
**P3** ideia registrada, sem data.

---

## P0 — travando

### Confirmar 6 pontos do catálogo novo
Os 26 produtos estão cadastrados na branch `catalogo-novo` com os preços do
cupom (soma confere no centavo). Falta confirmar, e cada um destes muda o que
o cliente vê:

1. **Os preços são de venda?** O cupom parece orçamento, mas se for nota de
   compra, a loja estaria vendendo a preço de custo. É o risco mais caro
   desta lista.
2. **O preço vale para a base branca sem tingimento?** Todos os itens do cupom
   são "BRANCO". Se tingir custa à parte, o preço no site engana quem quer cor.
3. **Coral Rende Muito: 3,6L ou 3,2L?** A lata nova diz "NOVO VOLUME: DE 3,6L
   PARA 3,2L" e "3,2L rende = branco 3,6L". O cupom ainda diz 3,6LTS. Está
   cadastrado como 3,6L, seguindo o cupom.
4. **Desconto: 5% ou 10%?** O `dados.js` diz 5% no PIX; o cabeçalho do cupom
   parece dizer 10%. O site está mostrando 5%.
5. **Parcelamento é sem juros?** O cupom parece dizer "12x sem juros". Hoje o
   site não afirma nada (`semJuros: null`). Confirmando, dá para afirmar.
6. **Qual produto é o Destaque da semana?** Nenhum foi marcado — o selo
   "Oferta" sem desconto real seria promessa falsa. A seção está escondida.

### Produtos mandados sem preço
- **Qualyvinil Colorit Eco** (esmalte base água, 900ml) — não está no cupom
- **Qualyvinil Complementos Premium** — provavelmente é a embalagem das massas
  já cadastradas; se for produto separado, falta o preço

---

## P1 — próximo ciclo

### Migração para Next.js + Supabase
Catálogo sai do arquivo e vai para o banco, com painel para o Bruno editar
preço sem depender de ninguém. → [SPEC-002](specs/SPEC-002-migracao-next-supabase.md)
· estado: **Proposta**, aguardando aprovação.

### Apagar o projeto Vercel duplicado
Existem **dois** projetos Vercel ligados neste mesmo repositório, e todo push
dispara build nos dois:

- `s-ite-bruno-tintas-loja-virtual` ← **este é o bom**, serve a versão atual
- `s-ite-bruno-tintas-loja-virtual-b1hj` ← duplicado, a URL limpa dele dá 404

Riscos de deixar como está: build dobrado a cada push, e alguém compartilhar a
URL do projeto errado. Antes de apagar, confirme que o domínio real não está
apontado para o `-b1hj`. **Depende do Roberto.**

### Apontar o domínio brunodastintas.com.br
Ao apontar, **remover o `X-Robots-Tag: noindex`** do `vercel.json`, senão o
site não indexa. O `canonical` no HTML já aponta para o domínio final.

### Fechar os dados que o site hoje omite
Três campos estão em `null` de propósito, e cada um esconde uma informação que
converte venda:
- `corteEntregaHoje` — sem isso o site não mostra "peça até X e receba hoje"
- `semJuros` — o site não afirma se o parcelamento tem juros
- `parcelaMinima` — hoje declara "sem valor mínimo"

**Depende do cliente.**

---

## P2 — depois

### Peso das imagens
`imagens.js` tem 768 KB em base64 e desce inteiro em toda visita, inclusive
foto de produto que o cliente nunca vai rolar até ver. Já caiu 333 KB com a
troca da arte de capa (06/08), mas o problema de fundo continua: base64 não
tem lazy-load nem tamanho por tela. A migração para Next resolve de graça com
`next/image`; se a migração demorar, vale atacar antes.

Os 3 banners restantes (`banner@2x` 207 KB, `banner-comprar@2x` 95 KB,
`banner-pedido@2x` 82 KB) somam 384 KB e **só aparecem no desktop** — o
celular baixa os três à toa.

### Links do Google Business
`UNIDADES[].maps` hoje cai em busca por endereço. Com o link do perfil, o
cliente vai direto para a ficha da loja, com avaliação e rota.

### Registro dos pedidos
Hoje o pedido vira texto no WhatsApp e some. Não existe forma de saber quantos
pedidos o site gerou, nem quais não foram respondidos. Entra naturalmente com
o Supabase (SPEC-002).

---

## P3 — registrado, sem data

### Pagamento online
Sairia do "combina no WhatsApp" para Pix/cartão no site. Muda a natureza do
produto — vira e-commerce, com estoque e conciliação. Foi considerado e
**deixado de fora** do escopo atual: ver SPEC-002, seção "Fora de escopo".

### Volta do PWA
Removido de propósito (ADR-002). Se voltar, precisa de estratégia de cache que
não sirva site velho — foi esse o problema que motivou a remoção.

### Busca com tolerância a erro de digitação
A busca atual é por substring. "corla" não acha "Coral".
