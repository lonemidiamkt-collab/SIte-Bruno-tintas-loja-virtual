# Backlog

> Fila priorizada. Item concluído sai daqui e vira entrada no
> [PROGRESSO.md](PROGRESSO.md). Item que tem spec aponta para ela.

Prioridades: **P0** trava o projeto · **P1** próximo ciclo · **P2** depois ·
**P3** ideia registrada, sem data.

---

## P0 — travando

### Cadastrar o catálogo real
Branch `catalogo-novo` está com `PRODUTOS` vazio, esperando. Para cada
produto é preciso: **nome, preço, setor, marca** e a **foto em arquivo**
(não serve imagem colada no chat — precisa estar em disco para virar base64).

Marcas que as fotos já indicam e ainda **não estão** em `MARCAS`:
**Lukscolor** e **Maza**. Coral e Qualyvinil já estão.

Enquanto isso, `UPSELL` está zerado e precisa ser refeito com os ids novos.

### Tabela de preços real
Os 7 produtos em `dados.js` são exemplo. O site não pode sair de MVP sem os
números confirmados pelo Bruno. **Depende do cliente.**

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
