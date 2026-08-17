# Backlog

> Fila priorizada. Item concluído sai daqui e vira entrada no
> [PROGRESSO.md](PROGRESSO.md). Item que tem spec aponta para ela.

Prioridades: **P0** trava o projeto · **P1** próximo ciclo · **P2** depois ·
**P3** ideia registrada, sem data.

---

## P0 — travando

### Fixar a versão certa em produção
A Vercel está reprocessando a fila de deploys atrasados **fora de ordem**, e a
produção anda para trás: chegou a servir o commit mais novo e depois voltou
dois atrás. Enquanto a fila drena, o site oscila entre versões.

Correção: em **Deployments**, achar o deploy do commit mais recente e clicar em
**Promote to Production**. Isso fixa e para a oscilação.

Como saber qual está no ar sem abrir o painel — o tamanho do `dados.js`
identifica o commit:

```bash
curl -s https://s-ite-bruno-tintas-loja-virtual.vercel.app/dados.js | wc -c
```

### Webhook da Vercel parou de disparar
Vários commits estão no GitHub sem build correspondente, a partir do `7a851ac`
(as 26 fotos). Enquanto não destravar, **nada que for commitado chega ao
site** — o deploy contínuo está morto. O último deploy que saiu foi o
`fe61fcb`, com o catálogo mas sem as fotos.

Como conferir se voltou, sem abrir a Vercel:

```bash
curl -sI https://s-ite-bruno-tintas-loja-virtual.vercel.app/dados.js | grep -i age
```

Se o `age` só cresce, nenhum deploy novo saiu. Deploy novo zera esse número.

Caminho de correção, na ordem: **Settings → Git**, desconectar e reconectar o
repositório; se não resolver, checar a permissão do GitHub App da Vercel no
repo; e conferir se o projeto duplicado `-b1hj` está atrapalhando.
**Depende do Roberto** — não há CLI da Vercel nem token nesta máquina.

### Confirmar 5 pontos do catálogo novo
Os 26 produtos estão na `main`, com os preços do cupom (soma confere no
centavo). Falta confirmar, e cada um destes muda o que o cliente vê:

1. **Os preços são de venda?** O cupom parece orçamento, mas se for nota de
   compra, a loja estaria vendendo a preço de custo. É o risco mais caro
   desta lista.
2. ~~O preço vale para a base branca sem tingimento?~~ **Respondido** — vale.
   Linha Decora é tingida na máquina e a cor é orçamento à parte; Coral Rende
   Muito e Qualy Econômica têm cores prontas. Já está no aviso de cada card.
3. ~~Coral Rende Muito: 3,6L ou 3,2L?~~ **Respondido** — são os dois: branco
   18L / galão 3,6L, cores 16L / galão 3,2L. Os itens cadastrados são o branco.
   **Falta o preço da versão colorida** → SPEC-003.
4. **Desconto: 5% ou 10%?** O `dados.js` diz 5% no PIX; o cabeçalho do cupom
   parece dizer 10%. O site está mostrando 5%.
5. **Parcelamento é sem juros?** O cupom parece dizer "12x sem juros". Hoje o
   site não afirma nada (`semJuros: null`). Confirmando, dá para afirmar.
6. ~~Qual produto é o Destaque da semana?~~ **Resolvido** — virou rodízio
   semanal automático entre os setores, não precisa escolher.

### Preço da Coral Rende Muito colorida
Bloqueia a [SPEC-003](specs/SPEC-003-escolha-de-cores.md). Falta o preço da
lata **16L** e do galão **3,2L** — a versão colorida, que tem menos volume que
o branco e portanto não pode custar o mesmo. Enquanto não vier, o site só
consegue vender a cor por orçamento.

Junto com isso: a **Qualyvinil Acrílica Cor Econômica** também muda de volume
quando é colorida, ou o preço é o mesmo do branco?

### Quais cores a loja tem prontas
A carta da Coral Rende Muito tem 27 cores, mas o que vale é o que a loja
estoca. **Listar cor que não tem é pior que não listar cor nenhuma** — vira
cliente indo à loja atrás de um produto que não existe.

### Produtos mandados sem preço
- **Qualyvinil Colorit Eco** (esmalte base água, 900ml) — não está no cupom
- **Qualyvinil Complementos Premium** — provavelmente é a embalagem das massas
  já cadastradas; se for produto separado, falta o preço

---

## P1 — próximo ciclo

### Ficha técnica dentro do box
O box de detalhe já existe (SPEC-003 fase 1), mas hoje só tem foto, preço e o
aviso de cor. O que daria corpo a ele é rendimento em m², número de demãos,
tempo de secagem e onde aplicar.

Está na ficha técnica de cada fabricante, mas alguém precisa cadastrar
**produto a produto — são 26**. Dá para fazer aos poucos: o box mostra a ficha
só de quem já tiver, e ignora quem não tem.

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

### Peso dos banners
As fotos de produto já saíram do base64 e viraram arquivo com lazy-load
(17/08), então o problema agora é só o `imagens.js`, com 661 KB.

O grosso são 3 banners — `banner@2x` 207 KB, `banner-comprar@2x` 95 KB,
`banner-pedido@2x` 82 KB — que somam 384 KB e **só aparecem no desktop**. O
celular baixa os três à toa. Mesmo tratamento das fotos resolve: virar
arquivo e carregar sob demanda.

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
