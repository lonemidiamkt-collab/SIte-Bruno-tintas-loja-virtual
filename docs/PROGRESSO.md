# Progresso

> Diário do projeto. **Só se acrescenta, nunca se reescreve.** Entrada nova
> vai no topo. Se algo registrado aqui se provou errado depois, escreva uma
> entrada nova corrigindo — não edite a antiga.
>
> Formato: data, o que mudou, por quê, e o que ficou aberto.

---

## 25/08/2026 — Tirar o `noindex` abriu a URL da Vercel junto

Efeito colateral que só existe porque o `noindex` saiu: o
`s-ite-bruno-tintas-loja-virtual.vercel.app` serve exatamente o mesmo site, e
até hoje de manhã ele estava protegido pelo mesmo header. Agora está aberto — e
vira conteúdo duplicado competindo com o domínio que acabou de nascer.

O `canonical` ajuda o Google a consolidar, mas não impede a URL feia de
aparecer, nem impede alguém de compartilhar aquele link achando que é o
endereço da loja.

Entrou um `redirects` no `vercel.json`: quem chega pelo host exato de produção
da Vercel leva **308** para `https://www.brunodastintas.com/`, preservando o
caminho.

**Por que o host exato, e não `*.vercel.app`:** deploy de preview também mora em
`vercel.app`, com host diferente. Regra genérica redirecionaria os previews e
tiraria a única forma de testar uma mudança antes de publicar.

**A primeira versão da regra não pegou a raiz.** Só `/:path*`: `/dados.js`
redirecionava com 308, mas `/` continuava servindo 200 — o padrão não casa com
o caminho vazio. Ou seja, a única URL que alguém realmente compartilharia era
justamente a que escapava. Só apareceu porque testei o caminho **e** a raiz;
testar um dos dois teria dado tudo certo.

Corrigido com uma segunda entrada explícita para `/`.

Detalhe que confundiu no meio do caminho: `/index.html` já dava 308 para `/`
antes disso — mas era o `cleanUrls`, não o redirecionamento novo.

**Consequência a lembrar:** se o projeto for renomeado na Vercel, o host de
produção muda e esta regra silenciosamente deixa de casar. Não quebra nada —
só volta a existir a URL duplicada, sem aviso.

**De passagem, uma confirmação que vale registrar:** o desconto à vista é **10%**,
e vale em **PIX, dinheiro e cartão de débito** — os três estão marcados com
`desconto: true` em `PAGAMENTOS`. A arte 02, além de dizer 5%, também **omite o
débito**. Os dois erros vão para o designer juntos.

---

## 25/08/2026 — O site foi para o ar em www.brunodastintas.com

Domínio apontado e `noindex` removido. O site deixou de ser link de teste e
virou a loja do Bruno.

**O que foi feito no DNS**, na zona da Hostinger (nameservers dela, sem trocar):

| Tipo | Nome | Valor |
|---|---|---|
| `A` | `@` | `216.198.79.1` |
| `CNAME` | `www` | `c04a1a6546dc7122.vercel-dns-017.com` |

Antes, os dois registros de parking (`A @ → 2.57.91.91` e `CNAME www →
brunodastintas.com`) foram apagados. O `CNAME www` velho apontava para o
próprio apex — deixá-lo junto com o `A` novo daria loop de resolução.

Conferido nos três resolvedores públicos antes de considerar pronto, e não só
no cache local — o resolvedor da máquina ainda respondia vazio quando o 8.8.8.8,
o 1.1.1.1 e o 9.9.9.9 já tinham a resposta certa. Confiar no `dig` sem `@` teria
me feito dizer que não estava propagado.

**O que saiu do código:**

- `X-Robots-Tag: noindex, nofollow` do `vercel.json`. Era o que a ADR-003 mandava
  fazer "no momento exato em que o domínio for apontado", e o momento chegou.
- a tarja **"v7 · Versão para aprovação"** do topo, com o CSS `.mvp-bar` junto.
  Ela existia para você mostrar internamente; cliente real lendo "versão para
  aprovação" desconfia do resto da página.

**Estado verificado em produção:** `https://www.brunodastintas.com/` responde
200, o apex responde 308 para o `www`, certificado emitido, servindo de `gru1`,
com CSP e `X-Frame-Options: DENY` aplicados.

**O que a ADR-003 evitou, agora que dá para medir:** entre 06/08 e hoje o site
esteve no ar com preço de exemplo, depois com catálogo em formação, e com o
`canonical` apontando para `brunodastintas.com.br` — domínio que nunca existiu.
Indexar em qualquer ponto desse intervalo teria colocado preço errado no
resultado de busca e um canonical apontando para o nada.

**Uma pendência mudou de gravidade.** A arte "Pedido pelo site" diz *"Pix e
dinheiro com 5% de desconto"*, e três seções acima o número grande diz **10% OFF
À VISTA**. Enquanto era URL de teste, era detalhe. Agora é contradição sobre
preço, em público, na mesma página — argumento pronto para o cliente pedir
desconto no balcão. Subiu de P1 para **P0**.

**Aberto e com relógio:** o `brunotintas.com.br` segue vencido e em `on-hold`,
no CNPJ do Bruno. Continua sendo o domínio que o Google conhece.

---

## 25/08/2026 — O domínio saiu, e é `.com` — não o `.com.br` que o código declarava

O Roberto registrou **`brunodastintas.com`** na Hostinger. Confirmei no whois
(`clientTransferProhibited`, NS de parking em `*.dns-parking.com`).

**O código declarava outro domínio.** `canonical`, `og:url`, `og:image` e o
`@id`/`url`/`image` das duas unidades no `schema.org` apontavam todos para
`www.brunodastintas.com.br`, com `.br`. Nove referências no `index.html`, mais
três na documentação. Trocadas.

Isso tinha que ser feito **antes** de indexar: trocar domínio depois que o
Google leu a página custa redirecionamento, reindexação e queda temporária.
Como o `noindex` ainda está de pé, não custou nada.

**O `noindex` continua.** O domínio existe mas não resolve — os NS ainda são os
de parking da Hostinger. A ADR-003 diz que o `noindex` sai "no momento exato em
que o domínio for apontado para a Vercel", e apontado ele não está. Sai num
segundo commit, junto com a tarja "v7 · Versão para aprovação", quando o DNS
estiver de pé.

**O que o whois mostrou de graça, e importa:** `brunodastintas.com.br` **nunca
existiu** (`No match`), e o `brunotintas.com.br` — esse sim registrado no CNPJ
do Bruno, `21.744.703/0001-02`, o mesmo do `dados.js` — está **vencido desde
26/06/2026 e em `on-hold`**. É o domínio que o Google ainda tem indexado, que
casa com o `@brunotintas` do Instagram e com o nome "BRUNO TINTAS" do perfil de
164 avaliações. Ficou no BACKLOG: vale renovar nem que seja para redirecionar,
porque quando o registro.br liberar, qualquer um registra a marca dele.

---

## 24/08/2026 — Eu tinha escrito "criar perfil no Google" para dois perfis que já existem

O Roberto desconfiou do meu item de P0 ("criar os perfis no Google Business") e
estava certo. Fui conferir no Google Maps em vez de supor, e os dois existem:

| Perfil | Nota | Site declarado |
|---|---|---|
| BRUNO TINTAS (Araruama) | 4,8 · **164 avaliações** | aponta para o Instagram |
| Bruno Tintas - Iguaba Grande | 5,0 · **1 avaliação** | nenhum |

O item estava errado no alvo, e isso importa: eu ia mandar o Roberto fazer
trabalho que já estava feito, enquanto o trabalho que **falta** é outro.

**O que era o item de verdade:** os perfis não apontam para o site. Araruama
manda o cliente para o Instagram, Iguaba não manda para lugar nenhum. Quando o
domínio existir, é pôr o endereço no campo "site" dos dois — é o elo que liga
164 avaliações reais ao catálogo, e nenhuma linha de código faz isso.

**E apareceu um buraco competitivo que eu não tinha visto.** Iguaba tem **1**
avaliação. Na mesma praça, Tintas 1000 tem 237, Casa das Tintas 55 e Celinho
33. Para "loja de tinta em Iguaba", o perfil praticamente não existe. Isso não
é problema de site — é pedir avaliação a quem compra —, mas é o que mais pesa
naquela cidade, e estava fora do radar.

**O que dava para fazer no código, feito:**

- `UNIDADES[].maps` agora é o **link do perfil real** (`?cid=`), e não uma busca
  por endereço. O botão de rota abre a ficha da loja, com nota, foto e horário.
- o `schema.org` das duas unidades ganhou **coordenadas reais**, lidas dos
  próprios perfis, e o perfil do Google entrou no `sameAs` junto do Instagram.
  Antes o `hasMap` era a mesma busca genérica.

**Divergência que não corrigi por conta própria:** o Google e o cadastro do CNPJ
dizem "RJ-106, **89920** — Vila Capri"; o site diz "RJ-106, Vila Capri", sem o
número. Endereço igual em todo lugar é critério de busca local, e é o único
campo que destoa. É dado de loja, então foi para o BACKLOG em vez de eu mudar.

**Outra coisa que apareceu na busca:** existe um `brunotintas.com.br` indexado
pelo Google, mas o domínio **não resolve DNS** — está morto ou expirado. Se for
do Bruno, vale saber antes de registrar um domínio novo do zero: reaproveitar o
que já tem histórico é diferente de começar em branco.

---

## 24/08/2026 — A resposta do Bruno sobre a Lukscolor tirou 2 cores e destravou 7

Perguntei qual dos três acabamentos da Lukscolor ele estoca, porque cada um tem
carta de cor diferente e eu tinha escolhido o Brilhante por conta própria.
Resposta: **estoca os três**, e não tem **Algodão Egípcio** nem **Marrom
Barroco** em nenhum deles.

**Duas cores saíram da tela.** Listar cor que a loja não tem é pior que não
listar cor nenhuma: manda o cliente ao balcão atrás de uma lata que não existe.
A Lukscolor caiu de 14 para 12 no botão e na carta.

Elas não foram apagadas, e sim marcadas com `fora: true`. Duas razões: `CARTAS`
é a **transcrição do papel** — podar a carta a torna outra coisa —, e estoque
muda. Para repor a cor, tira-se a marca; não precisa remedir hex nenhum. O
`coresDe()` filtra num lugar só, e o botão do card, a carta, o carrinho e a cor
padrão saem todos coerentes de graça.

**Medi os outros dois acabamentos** com o mesmo script: Fosco (branco e preto) e
Acetinado (8 cores). Estão em `CARTAS`, mas **ainda não ligados a produto
nenhum** — de propósito.

**Por que não liguei.** Ele estoca os três, então o certo seria o cliente
escolher o acabamento e a carta trocar junto. Só que os dois produtos Lukscolor
têm **um preço por volume**, sem separar acabamento, e um seletor na tela
afirma que o preço não muda. Se mudar, o site mente sobre preço — que é o erro
que este projeto já cometeu duas vezes, no desconto que dizia 5% quando era 10%
e no "mesmo preço na cor" que eu afirmei antes de ter confirmação.

Então virou [SPEC-003 fase 4](specs/SPEC-003-escolha-de-cores.md), em
**Proposta**, com a pergunta que a destrava: os três custam o mesmo? Se sim,
seletor de acabamento; se não, produtos separados com preço próprio. Estão
presas nessa resposta **7 cores** que só existem no Acetinado (Pérola, Areia
Tropical, Gelo Alaska) e hoje não existem para o cliente.

---

## 24/08/2026 — A carta de cores ganhou cor de verdade

**"Ainda não tem os blocos de cores."** A carta já estava certa nos nomes e nos
códigos, mas era só texto: um botão escrito "Marfim (818)". Ninguém escolhe
tinta lendo nome — escolhe olhando.

**O problema real não era o CSS, era de onde tirar o hex.** Eu podia escolher
as 105 cores a olho, ou copiar de catálogo de fabricante na internet. Foi
exatamente o segundo caminho que, semana passada, produziu uma carta da Coral
com Flamingo e Rosa Açaí — cores que não existem.

Então medi nas próprias fotos que o Bruno mandou, com script
(`docs/ferramentas/extrai-cores.py`). Três cuidados, cada um contra um jeito de
a foto mentir:

- **mediana** num quadrado de 29×29 px, não média — reflexo de flash é um ponto
  claro pequeno, e a mediana ignora. Foi o que salvou a Platina da Maza, que é
  metálica e no centro é puro brilho de flash: na primeira rodada saiu
  `#FFFFFF`.
- **branco de referência local**, percentil 95 numa janela de 680 px — com um
  branco único para a carta inteira, a mesma cor saía mais clara de um lado do
  que do outro. Foi assim que Cinza Alpino e Crômio, vizinhas na carta,
  apareceram com duas claridades incompatíveis.
- **calibração pelo Branco** da carta no fim: tinta branca tem que sair branca,
  e é o único ponto de verdade que a foto dá de graça.

Conferi cor por cor: o script monta uma folha com o recorte da foto ao lado da
cor extraída, e olhei as 105.

**Dois consertos que apareceram junto:**

O `max-height:184px` que a carta tinha no celular fazia sentido quando ela era
pastilha de texto. Com bloco de 52 px, virou uma janelinha de 1,5 fileira com
scroll dentro de modal — dois scrolls aninhados no dedo. Saiu; a carta cresce e
quem rola é o modal.

E **"Adicionar ao pedido" dentro da ficha abria o carrinho atrás do modal.** A
ficha continuava na frente, o cliente via a mesma tela de antes e concluía que
o clique não pegou. Agora a ficha sai da frente quando o item entra.

A cor escolhida também aparece no carrinho, com o quadradinho ao lado de
"Cor: Suco de Goiaba (393)" — confere a escolha sem reabrir a ficha.

**Limite, dito na tela:** é foto de papel impresso, sob luz de loja, numa tela
que ninguém calibrou. O site avisa embaixo da carta que *"as cores da tela são
aproximadas — a carta impressa da loja é a referência final"*, que é a mesma
ressalva que a Lukscolor imprime no verso da carta dela. Ver ADR-005.

**Também nesta entrada:** o `ESTADO.md` estava parado em 17/08, descrevendo uma
branch `catalogo-novo` que já não existe e um desconto de 5% que virou 10%.
Reescrito para o estado real.

**O BACKLOG também estava carregando item morto.** Saíram, todos já resolvidos
e já registrados aqui em entradas anteriores: a fila de deploy fora de ordem, o
webhook parado da Vercel, os 5 pontos do catálogo (preço de venda, desconto de
10%, 12x sem juros), o preço da Coral colorida (é o mesmo do branco, e está
impresso na carta), quais cores a loja tem prontas (as cartas reais chegaram),
a ficha técnica no box (25 de 26) e o peso dos banners (viraram arquivo; o
`imagens.js` caiu de 661 KB para 25 KB). Com eles fora, o P0 real virou o que
sempre foi: **domínio e Google Business** — sem os dois, ninguém acha a loja.

**Detalhe pequeno, mentira grande:** a tarja de topo ainda dizia "as fotos dos
produtos ainda estão entrando". As 26 entraram em 17/08. No lugar dela entrou a
ressalva das cores, que é o que hoje precisa ser dito.

**Aberto:** foto nova da carta da Maza (a atual cortou a borda direita e não tem
as metálicas) e confirmar com o Bruno qual acabamento da Lukscolor ele estoca.

---

## 24/08/2026 — A carta de cores estava escondida atrás de um botão que não abria ela

**A pergunta do Roberto ("onde o cliente escolhe a cor?") virou bug.**

A carta só existia dentro do box de detalhe, que abre clicando na foto ou no
nome. Mas o card na grade tinha um botão **"Adicionar"** logo ali — e clicando
nele o produto ia para o carrinho como **"Branco (001)"**, calado.

Na prática, quase todo pedido chegaria em branco na loja, sem o cliente saber
que existiam 27 cores. O caminho mais óbvio da tela era o que dava o resultado
errado.

**Correção:** produto com carta não entra mais no carrinho direto. O botão do
card virou **"Escolher a cor — 27 cores"** e abre o box. O número no botão faz
o trabalho de convidar: quem não sabia que havia cor, agora sabe.

Produto sem carta (massas) e de máquina (Decora) seguem com "Adicionar", porque
ali não há escolha a fazer.

**Segundo bug, no mesmo lugar:** o aviso de cor estava com `display:none`
abaixo de 560px. No celular o cliente via "Decora Diamante 18L — R$ 928,00 —
Adicionar" e **nada dizia que o preço era o da base branca e a cor saía por
orçamento**. Era informação de preço escondida por falta de espaço. Agora
aparece nas duas telas, em corpo menor no celular.

---

## 17/08/2026 — Descrições corrigidas e arquitetura do mobile refeita

**Uma promessa que o site fazia sem ter autorização.** O aviso "pelo mesmo
preço do branco" aparecia em TODOS os produtos de cor pronta. O Bruno
confirmou isso só para a Coral Rende Muito e a Qualyvinil Econômica — nos seis
esmaltes, o site estava garantindo um preço que ninguém deu.

Agora existe o campo `precoCorIgual`. Sem ele, o texto vira "Confirme o valor
da cor com a loja". Prometer errado é pior que não prometer.

**Fosco Completo estava só em Área externa**, mas o boletim diz "superfícies
externas E internas". Passou para os dois setores. Área interna foi para 14.

**Três bugs de arquitetura no celular:**

1. **O botão de comprar ficava a 1495px** numa tela de 812. Com 27 cores na
   carta, o cliente rolava tudo antes de conseguir adicionar. Agora o botão
   gruda no rodapé do box e a carta rola dentro do próprio bloco. Altura do
   modal caiu de 1518 para 1269, e o botão fica em y=752 — visível sem rolar.

2. **A página rolava por trás do modal e da gaveta.** No celular o dedo
   arrastava o catálogo de fundo e o cliente perdia o lugar ao fechar. Agora o
   fundo trava enquanto qualquer um dos dois está aberto, e destrava sozinho.

3. **As miniaturas do carrinho cortavam a lata** — estavam com `object-fit:
   cover`, que corta topo e base de uma imagem alta. Viraram `contain`.

**Verificado:** botão visível sem rolar, fundo travando e destravando nos dois
componentes, miniatura em contain.

---

## 17/08/2026 — Escolha de cor, cor sob medida e produto em dois setores

Lote de respostas do Bruno aplicado.

**Escolha de cor (SPEC-003 fase 2).** Produto com cores prontas mostra a carta
de 27 cores dentro do box. Produto tingido na máquina mostra o card **"Quer uma
cor personalizada?"**, que abre a conversa com a loja em vez de listar preço —
cada cor tem um valor, então tabela ali seria mentira. Ideia do Roberto.

**A cor faz parte da identidade do item.** Mesma tinta em duas cores são duas
linhas no carrinho, não uma com quantidade 2, e a cor vai item a item na nota
do WhatsApp — é o que a loja precisa para separar.

**Preço da colorida resolvido.** Branco 18L e colorida 16L custam o **mesmo**,
e isso não é erro: é tinta concentrada, a colorida rende igual com menos litro.
O aviso no box explica isso para o cliente não achar que está levando menos.

**`set` passou a aceitar lista.** O Bruno confirmou que Rende Muito serve
parede e teto **e** fachada e muro. O modelo só permitia um setor por produto;
agora aceita vários. Área interna foi de 6 para 12 produtos.

Isso quebrou o `sugestoes()`, que lia `.set` como string — corrigido para achatar
a lista. Bug que só apareceu porque o teste cobriu o upsell depois da mudança.

**Também:** desconto 10% (era 5%) valendo também no débito, 12x sem juros,
horário, Instagram das duas lojas e CEP das duas unidades.

**Verificado no navegador:** 27 cores clicáveis, Marfim e Palha gerando duas
linhas separadas, nota com "cor Marfim" e "cor Palha", card de orçamento
abrindo a escolha de loja com o texto certo, filtro de Área interna com 12 e
Área externa com 6, e o card do Rende Muito exibindo "Área interna · Área
externa".

---

## 17/08/2026 — Rodízio do destaque passa a virar na segunda

**O que:** o "Destaque da semana" trocava de produto na **quinta-feira**. Agora
troca na **segunda**.

**Por que estava na quinta:** a conta era dias desde 1970 divididos por 7, e
01/01/1970 caiu numa quinta — a divisão herdava esse começo. Um `-4` no cálculo
alinha a virada com a segunda.

**Por que importa:** a semana comercial da loja começa na segunda, e é quando
saem os relatórios e as mensagens nos grupos dos clientes. Um destaque que
troca no meio da quinta não conversa com nada.

**Verificado simulando o relógio** com o mesmo código: sexta, sábado e domingo
mantêm o produto; na segunda ele troca. Sem deploy, sem cron — a escolha é
calculada no navegador de quem abre o site.

---

## 17/08/2026 — 3 artes novas + faxina estrutural (desktop e mobile)

**Artes novas** entraram nos três lugares: capa do desktop, cabeçalho do
Catálogo e cabeçalho do Como comprar. Convertidas para WebP.

**Quatro bugs de estrutura encontrados no caminho, três deles antigos:**

1. **Card do destaque com 784px de vazio ao lado (desktop).** Era o que o
   Roberto viu. `.hero__card` herdava `margin-left:auto` do hero de duas
   colunas que foi removido semanas atrás — o texto saiu, a margem ficou, e o
   card de 380px ia parar encostado na direita. Virou faixa horizontal.

2. **As artes de seção apareciam no celular.** `.arte-secao{display:block}`
   vinha depois de `.so-desk{display:none}` e anulava o esconde. O celular
   mostrava a versão em texto E a arte de desktop, e baixava as duas.

3. **O bloco de CTAs e estatísticas estava duplicado literalmente** nas duas
   capas (mobile e desktop), e as duas imagens tinham `fetchpriority="high"` —
   o navegador baixava as duas em toda visita e descartava uma. Virou uma
   seção só com `<picture>`: agora baixa exatamente uma.

4. **A página ficava sem `<h1>` no desktop.** A capa de desktop era só a arte.
   Agora o texto continua no DOM e vira só-leitor-de-tela acima de 900px.

**Correção minha durante o trabalho:** ao reescrever o CSS do card sobrou uma
chave `}` a mais, que quebrou o parser dali para baixo e derrubou `.btn` —
os botões ficaram com 16px de altura. Achado contando chaves, não no olho.

**Estrutura do card do destaque refeita.** A foto era neta do card, então o
grid não a alcançava. O DOM ficou achatado (foto, topo, info e botão como
irmãos) e cada tela os recoloca: miniatura de 68px ao lado do preço no celular,
coluna de 300px no desktop.

**Peso.** Com banners e logo saindo do base64, `imagens.js` caiu de **661 KB
para 25 KB**. O que sempre desce agora são **124 KB** de HTML+CSS+JS; imagem é
sob demanda.

**Também:** alvo de toque do nome do produto de 17px para 44px; textos
alternativos reescritos para as artes novas; media query vazia removida.

**Revertido no mesmo dia — versionamento por hash na URL.** Eu tinha posto
`?v=<hash>` em CSS e JS para matar cache. Produção aceita bem, mas quebra ao
abrir o `index.html` direto do disco, por duplo clique: o `file://` não resolve
o caminho com query. O sintoma foi o site aparecendo sem CSS nem JS, com as
imagens carregando normalmente — porque imagem não levava query.

Removido. O `vercel.json` já manda `max-age=0, must-revalidate`, então o
navegador revalida a cada visita e o versionamento era redundante. Não valia
o custo de quebrar o jeito como o Roberto abre o arquivo para conferir.

**Não mexi** na fonte Inter (identidade já estabelecida) nem na borda lateral
do `.aviso` — o detector sinaliza os dois, mas são escolhas do projeto, fora
do que foi pedido.

---

## 17/08/2026 — Box de detalhe do produto (fase 1 da SPEC-003)

**O que:** clicar na foto ou no nome de um produto abre um box com foto
grande, setor, aviso de cor, preço com PIX e parcelamento, e botão de
adicionar. Ideia do Roberto.

**Por que fazer só a fase 1 agora:** a escolha de cor depende de preços que
ainda não temos. O box em si não depende de nada e já entrega sozinho o ganho
que mais importa — **a foto grande**. Na grade a lata sai com uns 170px no
celular e o rótulo fica ilegível; num comércio de tinta o cliente reconhece o
produto pelo rótulo, porque é a lata que ele já usou na obra.

Eu mesmo tinha argumentado que um box "com nome e preço e mais nada" ficaria
pior que não ter. Continua valendo — o que justifica a fase 1 é a foto, não o
texto.

**Decisão de arquitetura:** reaproveita o modal do checkout em vez de criar
outro. Os dois nunca ficam abertos ao mesmo tempo, e assim herda de graça o
véu, o foco, o fechar no ESC e no clique fora.

**O botão "Adicionar" do card continua funcionando.** Quem já sabe o que quer
não é obrigado a passar pelo box.

**Preparado para a fase 2:** o bloco de cor já existe no box, hoje mostrando o
aviso em texto. É ali que as cores entram quando os preços chegarem.

**Verificado:** 26 cards com foto e nome clicáveis, box abrindo com título,
foto, preço e botão certos; bloco de cor presente nos produtos de máquina e de
cores prontas e **ausente nas massas**, como deve ser.

---

## 17/08/2026 — Produção oscilando entre versões; card blindado contra foto quebrada

**Sintoma reportado:** "deu erro no sistema" — os cards apareceram como
retângulos azuis com o nome do produto escrito por cima, que é o texto
alternativo de imagem quebrada.

**Causa:** a produção está **andando para trás**. Minutos depois de eu
confirmar o `cb39fe1` no ar, o `dados.js` servido voltou a ser o do `2cd5358`
(identificado pelo tamanho exato do arquivo, 10684b). A Vercel está
reprocessando a fila de webhooks atrasados fora de ordem, e cada deploy antigo
vira produção por sua vez.

Enquanto isso acontece existe uma janela em que o navegador tem o `dados.js`
novo em cache, apontando para `fotos/`, e o deploy servido é anterior à pasta
existir. Resultado: 404 em todas as fotos.

**Correção aplicada — não conserta a Vercel, conserta o que o cliente vê.**
Toda foto agora leva `data-inicial`, e um listener de `error` em fase de
captura troca a imagem falha pelo selo com a inicial da marca. O evento
`error` não borbulha, por isso captura e não bubbling.

Antes: retângulo azul com o nome do produto escrito por cima — lê-se como site
quebrado. Depois: o mesmo selo elegante que já existia para produto sem foto.
Vale para qualquer motivo de falha, inclusive rede ruim do cliente.

**Ainda depende do Roberto:** promover na Vercel o deploy do commit mais novo,
senão a produção continua oscilando conforme a fila drena.

---

## 17/08/2026 — Aviso de cor corrigido; escolha de cores virou SPEC-003

**Bug que estava no ar:** os 26 produtos exibiam "Cor feita na hora, na máquina
de tingimento" — inclusive massa corrida e esmalte. Eu tinha marcado
`tinta: true` para tudo que era tinta, sem saber que só a linha Decora é
tingida na máquina.

**Correção:** o booleano `tinta` virou o campo `cor`, com três estados, e o
aviso passa a ser específico:

| `cor` | produtos | aviso ao cliente |
|---|---|---|
| `'maquina'` | linha Decora (6) | cor feita na máquina; preço é da base branca, cor sai por orçamento |
| `'prontas'` | Coral Rende Muito e Qualy Econômica (4) | tem cores prontas; preço é do branco, outras cores podem ter volume e preço diferentes |
| `null` | massas e o que falta confirmar (16) | não afirma nada |

**Achado grave, informado pelo Roberto:** na Coral Rende Muito o volume muda
com a cor — branco **18L** (galão 3,6L), cores **16L** (galão 3,2L). É outro
produto, com outro preço, e o site mostrava um valor só. Por isso os dois itens
passaram a se chamar "... Branco 18L" e "... Branco 3,6L": o preço cadastrado é
só do branco. Confirmado também na carta da fabricante.

**A escolha de cores virou [SPEC-003](specs/SPEC-003-escolha-de-cores.md)**, em
`Proposta`. É mudança de comportamento, então precisa de spec antes do código
(CLAUDE.md). E está bloqueada por falta de dado: **não existe o preço da Coral
Rende Muito colorida**, que é justamente a parte que mais importa.

Levantada a carta de cores prontas da Coral Rende Muito (27 cores) como ponto
de partida — mas ela é da fabricante, não do estoque da loja. Cadastrar cor que
a loja não tem é pior que não listar cor nenhuma.

---

## 17/08/2026 — Destaque da semana virou rodízio automático

**O que:** a seção "Destaque da semana" deixou de depender de alguém escolher
um produto. Agora `produtoDestaque()` faz rodízio semanal alternando os
setores — a pedido do Roberto, "sorteios mistos".

**Determinístico, não sorteado.** A escolha vem do número da semana do
calendário, ancorado em São Paulo. Sorteio de verdade daria um produto
diferente a cada carregamento: o cliente atualizaria a página e veria outra
coisa, o que quebra a promessa da palavra "semana" e faz o site parecer
defeituoso.

**Como mistura:** a cada semana entra um setor diferente; a cada volta
completa pelos setores, avança para o próximo produto daquele setor.
Simulado: nunca repete o setor em semanas seguidas, e leva **31 semanas**
para percorrer os 26 produtos antes de repetir qualquer um.

**Override manual:** `destaque: true` em qualquer produto ganha do rodízio.
Deliberadamente separado de `oferta: true` — oferta mostra o selo "Oferta" ao
cliente e só deve ser usado quando existir desconto real. Misturar os dois
faria o rodízio anunciar promoção inexistente toda semana.

**Efeito colateral bom:** a seção parou de ficar escondida. Ela era o primeiro
bloco depois da capa e estava deixando um buraco na página.

---

## 17/08/2026 — BLOQUEIO: webhook da Vercel parou de disparar

**Sintoma:** dois commits chegaram ao GitHub e **nenhuma build foi criada** —
`7a851ac` (as 26 fotos) e `b4521fa` (commit vazio para tentar acordar o
webhook). Na lista de Deployments da Vercel o topo continua sendo o `fe61fcb`.

**Não é build com erro** — é build que nunca existiu. Nenhum dos dois aparece
na lista.

**Como confirmar de fora, sem acesso à Vercel:** a Vercel invalida o cache de
borda a cada deploy. O `dados.js` em produção volta com `x-vercel-cache: HIT`
e `age` que só cresce (541s → 932s), e o conteúdo ainda é `foto: null`. Cache
envelhecendo sem parar = nenhum deploy novo.

**Efeito:** o catálogo de 26 produtos está no ar (foi com o `fe61fcb`), mas
sem foto — os cards mostram o selo com a inicial da marca.

**Possível relação:** pouco antes disso o projeto passou a responder 403 com
"Vercel Security Checkpoint", o modo anti-bot, provavelmente disparado pelas
checagens repetidas de produção durante a verificação de deploy. Se a Vercel
sinalizou o projeto, pode ter mexido também na automação. Não dá para
confirmar de fora.

**Depende do Roberto** (não tem CLI da Vercel nem token nesta máquina):
Settings → Git, desconectar e reconectar o repositório. Ver BACKLOG P0.

**Lição registrada:** verificar deploy com curl em rajada tem custo. Espaçar,
ou conferir pelo cabeçalho `age` em vez de repetir requisição.

---

## 17/08/2026 — 26 fotos de produto entraram, como arquivo e não base64

**O que:** as 26 fotos de `~/Desktop/Bruno tintas site versel` foram
normalizadas e cadastradas. Todo produto tem foto; nenhum card mostra mais o
selo com a inicial da marca.

**Tratamento:** cada imagem foi achatada sobre branco (algumas vinham com
transparência), encaixada num quadrado de 520px sem cortar, com respiro, e
salva em WebP q80. Precisava ser quadrada porque o card usa `object-fit:cover`
— com as originais em retrato, a lata seria cortada em cima e embaixo.

**Decisão de arquitetura: foto de produto virou ARQUIVO, não base64.**
`imagens.js` continua com banner, logo e capa, que aparecem sempre. As fotos
de produto ficam em `fotos/<chave>.webp` e o `img()` resolve o caminho.

O motivo é direto: **base64 dentro do JS anula o `loading="lazy"`.** Em base64
as 26 fotos viriam junto com o `imagens.js`, antes de a primeira tela pintar —
1276 KB obrigatórios. Em arquivo, são 753 KB fixos e 382 KB sob demanda, e no
celular o cliente vê 4 ou 6 cards, então baixa 4 ou 6 fotos.

**Conferência:** o mapa foto→produto casa 1:1 com a pasta (26 e 26), todo `foto`
aponta para um arquivo que existe, nenhum arquivo ficou sem dono. Render
headless: 26 cards, 26 `<img>` com lazy, zero `src="undefined"`, zero selo de
foto ausente.

Detalhe do caminho: os nomes com acento vinham em NFD do macOS e o mapa em
NFC, o que fazia a comparação falhar mesmo com o arquivo existindo. Resolvido
normalizando os dois lados.

**Ponto de atenção:** a foto do *Esmalte Qualyvinil 900ml* tem nome de arquivo
"Esmalte Premium Base Água Branco Acetinado", que é linha diferente do
"Esmalte Sintético Standard" cadastrado a partir do cupom. Vale confirmar se
é o mesmo produto.

---

## 17/08/2026 — Preços confirmados como de venda; catálogo real publicado

**O que:** o Roberto confirmou que os preços do cupom são **de venda** — a nota
foi puxada só para trazer os produtos. Com isso a branch `catalogo-novo` foi
para a `main` e publicada.

**Aviso do topo corrigido junto.** A faixa dizia *"produtos e preços são de
teste. Nada aqui foi confirmado com a loja"* — o que virou mentira no instante
em que os preços reais entraram, e é a primeira linha que o cliente lê. Agora
diz que os preços vêm do sistema da loja em 17/08/2026 e que as fotos ainda
estão entrando. Continua marcada como versão para aprovação, porque o Bruno
ainda não validou.

**Segue em aberto** (BACKLOG P0): fotos dos produtos, escolha do Destaque da
semana, e as dúvidas de desconto 5% × 10%, parcelamento sem juros, tingimento
incluso e o volume da Coral Rende Muito.

---

## 17/08/2026 — Catálogo real cadastrado: 26 produtos

**O que:** entraram os 26 produtos do cupom de 17/08/2026, com os preços reais.
Marcas: Coral (8), Qualyvinil (14), Lukscolor (2), Maza (2).

**Como a transcrição foi validada:** os 26 itens foram transcritos do cupom e
a soma deu **R$ 6.054,70**, exatamente o total impresso. Cada preço também foi
conferido um a um contra o cupom, com multiplicidade. Se algum valor tivesse
sido lido errado, o total não fecharia.

**Setor novo — `preparacao`.** O catálogo real tem 6 massas (corrida, acrílica,
Klasse) e não havia setor para elas: "Acessórios" é rolo, pincel e lona. Sem
isso as massas ficariam sem casa.

**Distribuição:** interna 8 · externa 6 · madeira e metal 6 · preparação 6.
Impermeabilizantes e Acessórios ficaram sem produto e por isso não aparecem.
"Madeira" virou "Madeira e metal", já que os esmaltes Maza e Lukscolor são
para portão e ferrugem.

**Fallback de foto.** Nenhum produto tem foto: as imagens foram mandadas por
chat e não existem em arquivo. Sem tratamento, `img(p.foto)` devolvia
`undefined` e o card renderizava ícone de imagem quebrada — em 26 cards. Agora
`fotoOu()` mostra a inicial da marca sobre o azul da marca, no catálogo, no
upsell e no carrinho. Some sozinho quando a foto for cadastrada.

**UPSELL refeito** com os ids novos. Detalhe técnico deliberado: massa corrida
é só para interior, então a área externa sugere massa acrílica e a interna
sugere as duas.

**Nenhum produto foi marcado como oferta.** O card com `oferta:true` mostra o
selo "Oferta" ao cliente, e não existe desconto real definido — seria promessa
falsa (Constituição, princípio 6). Consequência: a seção "Destaque da semana"
fica escondida até o Roberto escolher o produto.

**Verificado** (headless, com DOM stub, porque o navegador passou a bloquear
localhost): execução completa sem erro, 26 cards, 4 setores, 4 marcas, 5
filtros, zero `src="undefined"`, zero "undefined" solto no HTML, 26 selos de
foto ausente, destaque vazio. Integridade: ids únicos, todo setor existe em
SETORES, toda marca existe em MARCAS, UPSELL sem id órfão.

**Aberto — precisa de resposta:** ver a lista de pendências no BACKLOG (P0).
As principais: se os preços são de venda ou de custo, se o preço vale para a
base branca sem o tingimento, e o volume da Coral Rende Muito (lata diz 3,2L,
cupom diz 3,6L).

---

## 17/08/2026 — Catálogo de exemplo removido (branch `catalogo-novo`)

**O que:** os 7 produtos de exemplo saíram do `dados.js`, junto com as 7 fotos
correspondentes no `imagens.js` e os ids do `UPSELL` que apontavam para eles.

**Por quê:** a pedido do Roberto, para entrar o catálogo real (Coral, Lukscolor,
Qualyvinil, Maza). Os preços que estavam no ar eram de exemplo — ver
Constituição, princípio 4.

**Em branch, não na main.** Com `PRODUTOS` vazio o site não mostra setor,
marca, catálogo nem destaque — comportamento correto pela SPEC-001, mas
significa loja vazia no ar. A `main` fica em `15dc6d3`, publicável, até o
catálogo real entrar.

**Correção que veio junto, e era obrigatória:** o card "Destaque da semana"
estava **escrito à mão no index.html** — marca, nome, preço, preço no PIX e o
`data-add="1"`. Com os produtos removidos ele viraria um produto fantasma com
botão morto. Agora é montado por `renderDestaque()` a partir do primeiro
produto com `oferta:true`, e a seção inteira some quando não há nenhum.

Isso também mata um bug silencioso que já existia: mudar o preço no `dados.js`
**não** mudava o preço mostrado nesse card.

**Peso:** `imagens.js` de 768 KB para **661 KB**.

**Verificado** (headless, invariantes do estado vazio): PRODUTOS vazio, nenhum
setor/marca aparecendo, destaque escondido, UPSELL sem id órfão, e o que não
podia sumir continua — 2 unidades, 4 formas de pagamento, 3 destinos, 5
setores e 9 marcas prontos para receber produto, desconto de 5% intacto,
nenhuma foto órfã no `imagens.js`. Sintaxe dos três arquivos validada.

Não deu para conferir no navegador: o pane passou a bloquear localhost.

**Aberto:** falta o catálogo real. Ver BACKLOG, P0.

---

## 06/08/2026 — Topo do celular reconstruído (arte remontada resolvida)

**O que:** o título do topo no celular deixou de ser imagem e virou texto de
verdade. Só a foto continua como imagem.

**Por quê:** a arte `capa-mobile@2x` era um remonte — pedaços recortados do
banner horizontal, empilhados. As emendas estavam dentro do arquivo, então
nenhum ajuste de CSS resolveria (ver entrada anterior).

**Como foi feito:**
- Extraída do arquivo antigo apenas a faixa da foto (y 1444–2592), cortando
  125px da esquerda para eliminar o fragmento do "OBRA." que tinha sobrado
- Redimensionada para 1080×609 e recodificada em WebP q84
- Entra como chave nova `capa-foto-mobile@2x`; a `capa-mobile@2x` saiu
- Título, selo e subtítulo agora são HTML, usando a fonte display do site
- `.capa--mob` ganhou o gradiente que o hero antigo usava; `.capa__ctas` ficou
  transparente no celular para não pintar por cima do gradiente

**Ganho de peso:** `imagens.js` caiu de **1101 KB para 768 KB** — a arte
pesava 319 KB e a foto limpa pesa 69 KB. São 333 KB a menos antes da primeira
tela, na conexão de quem chega de anúncio no celular.

**Ganho junto:** o título virou texto indexável e selecionável, nítido em
qualquer densidade de tela, e o logo parou de aparecer duas vezes (a navbar
já mostra ele logo acima).

**Verificado:** celular e desktop; desktop não mudou (continua com o
`banner@2x` inteiro, que é composição única e está impecável). Checklist da
SPEC-001 passou: 7 produtos, 3 setores, 4 marcas, 2 lojas, carrinho soma
R$ 279,90, PIX cai para R$ 265,91, WhatsApp abre na unidade certa, nenhuma
imagem quebrada, console limpo.

Sem spec, conforme CLAUDE.md: correção visual que não muda fluxo.

---

## 06/08/2026 — Card de destaque solto no celular (corrigido)

**Sintoma:** no celular o card do "Destaque da semana" parecia solto na
página, colado na faixa de cima.

**Causa:** `.destaque` estava com `padding: 0 0 var(--e8)` — sem respiro no
topo abaixo de 900px. O card encostava direto no bloco dos CTAs/estatísticas,
e como `.destaque` usa `--azul-profundo` enquanto `.capa__ctas` usa
`--azul-noite`, a troca de azul caía exatamente na borda do card. Duas coisas
somadas faziam ele parecer descolado do resto.

**Correção:** `padding: var(--e6) 0 var(--e8)`. Desktop não muda — a media
query de 900px vem depois e sobrescreve com o mesmo valor de antes.

Sem spec, conforme CLAUDE.md: ajuste visual que não muda fluxo.

---

## 06/08/2026 — Arte de capa do celular está remontada, não redesenhada

**Sintoma:** o topo do site no celular aparece "mal encaixado", com retângulos
de azuis diferentes e bordas visíveis entre logo, título e foto.

**Causa — não é CSS.** O defeito está dentro do arquivo `capa-mobile@2x`
(2160×2700). Ele foi montado recortando pedaços do banner horizontal
(`banner@2x`, 2048×868) e empilhando na vertical. Ficaram no arquivo:

- a caixa do logo com borda visível e um pedaço cortado da pincelada branca
- o bloco do título como outro retângulo, com azul diferente do fundo
- um fragmento solto de letra na borda esquerda da foto — é o resto do "OBRA."
  do título na composição horizontal original

O banner do desktop está intacto: composição única, sem emenda. Ou seja, a
arte original é boa; a versão de celular é que foi recortada dela.

**Não corrigido ainda** — precisa de decisão: nova arte vertical feita de
origem, ou montar o topo do celular em HTML/CSS com texto de verdade (é o que
a versão das 03:20 fazia, antes de trocarem pelo recorte). Registrado no
BACKLOG como P0.

---

## 06/08/2026 — Deploy contínuo confirmado funcionando

**O que:** verificado que a Vercel já estava ligada ao repositório. Os dois
commits de hoje viraram deploy automático, sem intervenção.

**Produção conferida** em https://s-ite-bruno-tintas-loja-virtual.vercel.app —
servindo a versão nova (os três `<script src>` no lugar do bundle único), todos
os assets em 200, headers do `vercel.json` aplicados (incluindo o `noindex`),
7 produtos e 2 lojas renderizando, nenhuma imagem quebrada. Setores e marcas
sem produto corretamente escondidos, conforme SPEC-001.

**Achado:** existem **dois** projetos Vercel ligados no mesmo repositório —
`s-ite-bruno-tintas-loja-virtual` (o bom) e `s-ite-bruno-tintas-loja-virtual-b1hj`
(duplicado, cuja URL limpa dá 404). Todo push builda nos dois. Foi para o
backlog como P1: risco de build dobrado e de alguém divulgar a URL errada.

**Fecha o ciclo:** a cadeia commit → push → deploy → site no ar está inteira e
verificada. O problema original — "o site no ar não é o que a gente fez" —
está resolvido.

---

## 06/08/2026 — Push destravado

**O que:** o token do GitHub foi recriado com `Contents: Read and write` e o
push passou. A reorganização do repositório (commit `1388eb3`) chegou ao
GitHub. Credencial salva no keychain do macOS, então os próximos pushes não
pedem senha.

**Diagnóstico do que era:** o token anterior era fine-grained e autenticava
normalmente — a API confirmava `admin: true` e `push: true` no repositório —
mas voltava 403 em qualquer escrita. A causa era o **Repository access** em
*Public repositories (read-only)*, que é o padrão do GitHub e ignora as
permissões marcadas abaixo. Corrigido com *Only select repositories* +
`Contents: Read and write`.

**Fica registrado para não se repetir:** repositório público faz o token
**ler** sem nenhuma permissão, o que dá a impressão de que ele funciona.
A leitura passar não diz nada sobre a escrita.

**Aberto:** conectar o repositório ao projeto na Vercel, para o push virar
deploy automático.

---

## 06/08/2026 — Escopo de documentação SDD

**O que:** criado o esqueleto de documentação orientada a especificação —
`CLAUDE.md` na raiz com as regras de operação, e `docs/` com constituição,
estado, progresso, backlog, specs e decisões.

**Por quê:** o projeto vinha sendo tocado em sessões soltas de Claude, cada
uma começando do zero. O contexto morria junto com a sessão, e o resultado
apareceu na prática: sete versões diferentes do site espalhadas em pastas de
download, sem ninguém saber qual era a boa.

**Decisões tomadas junto:**
- Spec obrigatória para mudança de comportamento; preço e foto passam direto
- Documentação atualizada no mesmo commit do código
- Commit automático ao concluir tarefa; push continua manual, porque push
  publica na loja ao vivo

**Registrado como estava:** SPEC-001 documenta o comportamento atual do site
como ele já é (spec retroativa), para servir de base de comparação. ADR-001 a
ADR-003 registram decisões que já tinham sido tomadas mas nunca escritas.

**Aberto:** SPEC-002 (migração para Next + Supabase) nasce como `Proposta` e
depende de aprovação do Roberto.

---

## 06/08/2026 — Reorganização do repositório para deploy contínuo

**O que:** a raiz do repositório virou o site de verdade. A versão mais nova
(bundle de 06/08 11:47) foi promovida para a raiz e fatiada de volta em
`index.html`, `styles.css`, `imagens.js`, `dados.js` e `app.js`.

**Por quê:** o `index.html` da raiz — que é justamente o que a Vercel publica —
era uma versão antiga de 2,8 MB. As versões novas existiam no repositório, mas
presas dentro de pastas de download (`2026brunotintasfiles`,
`ultimotestbrunofiles`, `verselbrunotintasfiles` e outras) subidas cruas pela
interface web do GitHub. Ou seja: o trabalho estava no repo, mas o site no ar
era o velho.

**Como foi escolhida a versão:** comparadas as 7 versões. A de 11:47 é a mais
recente e traz mudança real de layout — a arte de capa passa a aparecer também
no celular, no lugar do hero em texto, e os CTAs viraram grade responsiva.

**Verificação:** markup, CSS e JavaScript conferidos como idênticos ao bundle
de origem após o fatiamento (a única diferença é 1 `<script>` virando 3).
Testado no navegador: renderiza igual, catálogo monta, carrinho soma, link do
WhatsApp correto, zero erro de console.

**Também:** removidas do working tree as pastas duplicadas e o zip — o
histórico do git continua guardando tudo. Criados `README.md`, `.gitignore` e
`vercel.json` com headers.

**Efeito colateral registrado:** a versão nova não tem service worker nem
manifest. Ver ADR-002.

**Aberto:** o commit não foi publicado. O push volta **403** — o token
fine-grained da conta `lonemidiamkt-collab` autentica (a API confirma
`admin: true` e `push: true` no repositório) mas não tem permissão
`Contents: Read and write`. Teste de escrita direto na API também deu 403.
Precisa recriar o token com a permissão certa.

---

## Antes de 06/08/2026

Sem registro. O site foi construído em sessões de Claude sem documentação de
progresso — essa lacuna é exatamente o que este arquivo passa a resolver.

O que dá para reconstruir pelo histórico do git: o repositório recebeu 8
commits do tipo "Add files via upload", todos por upload manual pela web do
GitHub, entre a versão inicial e 06/08/2026.
