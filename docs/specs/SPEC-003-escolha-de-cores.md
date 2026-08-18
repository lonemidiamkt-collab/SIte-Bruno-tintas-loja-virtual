# SPEC-003 — Detalhe do produto e escolha de cor

- **Criada em:** 17/08/2026
- **Relacionadas:** SPEC-001, SPEC-002

**Estado por fase:**

| fase | o que é | estado |
|---|---|---|
| **1 — box de detalhe** | clicar no produto abre um box com foto grande, preço e as condições | **Implementada** (17/08) |
| **2 — escolha de cor** | escolher a cor dentro do box | **Implementada** (17/08) |

A fase 1 foi separada porque não depende de nenhum dado que falta, e entrega
sozinha o ganho da foto grande. A fase 2 mora dentro dela.

---

## Fase 1 — o box de detalhe (feita)

O card na grade mostra a lata com uns 170px no celular, e nesse tamanho o
rótulo é ilegível. Num comércio de tinta isso importa: **o cliente reconhece o
produto pelo rótulo**, porque é a lata que ele já viu na obra ou usou antes.

Clicar na foto ou no nome abre um box com a foto grande, o setor, o aviso de
cor, o preço com PIX e parcelamento, e o botão de adicionar. O botão
"Adicionar" do card continua funcionando — quem já sabe o que quer não é
obrigado a passar pelo box.

Reaproveita o modal do checkout; os dois nunca ficam abertos ao mesmo tempo.

O box é também o lugar onde a fase 2 vai morar: hoje ele mostra o aviso de cor
em texto, e é ali que entram as cores para escolher.

---

## Fase 2 — escolha de cor (feita)

Dois caminhos, porque a cor funciona de dois jeitos:

**Cores prontas** (Coral Rende Muito, Qualy Econômica) → carta de 27 cores para
clicar dentro do box. A escolha vira parte da identidade do item: a mesma tinta
em duas cores são **duas linhas** no carrinho, e a cor vai item a item na nota
do WhatsApp. Na Coral Rende Muito o box avisa que o branco vem 18L e a cor vem
16L **pelo mesmo preço** — é concentrada e rende igual.

**Tingido na máquina** (linha Decora) → **não tem carta**. Cada cor tem um valor
próprio, então listar opção com preço seria mentira. Vira o card "Quer uma cor
personalizada?", que abre a conversa com a loja já dizendo o produto e o preço
da base branca. Não passa pelo carrinho porque não há preço a somar.

A carta é a **padrão da linha**, não lista de estoque. Isso é seguro aqui porque
nada é cobrado pelo site: a loja confirma a cor no WhatsApp antes de separar,
então existe sempre uma conferência humana antes da venda.

## Fase 2 — desenho original (histórico)

---

## Problema

O site vende tinta sem perguntar a cor. Isso cria três problemas, do menor
para o maior:

1. **O cliente não termina a compra no site.** Ele escolhe a tinta, manda o
   pedido e a conversa no WhatsApp começa com "qual cor?". O site prometia
   resolver justamente isso.
2. **O preço no site é o da base branca.** Quem olha "Rende Muito 18L
   R$ 475,00" acha que leva qualquer cor por esse valor.
3. **Na Coral Rende Muito o volume muda com a cor.** Branco vem **18L**
   (galão 3,6L); as cores vêm **16L** (galão 3,2L). Produto diferente, preço
   diferente — e hoje o site mostra um preço só.

O item 3 é o mais caro: é reclamação no balcão, com o cliente com o print do
site na mão.

## Por que agora

O catálogo real entrou hoje com preços de venda de verdade. Antes eram valores
de exemplo e o risco era teórico.

## Resultado esperado

1. O cliente escolhe a cor no site e o pedido chega no WhatsApp já com ela.
2. Nenhum preço no site vale para uma cor que custa outra coisa.
3. Quando a cor pedida não existe pronta, o site diz que é orçamento em vez de
   mostrar um valor que a loja não vai honrar.

## Como a cor funciona em cada produto

Três regimes diferentes, confirmados pelo Roberto em 17/08/2026:

| regime | produtos | o que acontece |
|---|---|---|
| **Máquina** | linha Decora (Diamante, Seda, Matte) | a cor é feita na hora na máquina de tingimento. O preço do site é o da base branca; **a cor é orçamento à parte** |
| **Cores prontas** | Coral Rende Muito, Qualyvinil Acrílica Cor Econômica | vêm cores prontas de fábrica. Cor fora da lista → orçamento para produzir |
| **Sem cor** | massas, seladores | não se aplica |

Falta confirmar o regime dos esmaltes (Maza, Lukscolor, Qualyvinil), do
Qualyvinil Rende Muito+ e do Fosco Completo — hoje o site não afirma nada
sobre cor neles, de propósito.

## Comportamento

### Produto com cores prontas

- O card mostra as cores disponíveis para escolher.
- **Escolher a cor pode trocar o produto**, não só um rótulo: na Coral Rende
  Muito, branco é 18L e cor é 16L, com preço próprio.
- Escolhida a cor, o preço na tela passa a ser o daquela cor. O site nunca
  mostra o preço do branco com uma cor selecionada.
- Existe a opção **"outra cor"** → não entra preço; o item vai ao pedido
  marcado como orçamento.

### Produto tingido na máquina

- O cliente escolhe a cor a partir da carta da marca, ou descreve o que quer.
- O preço mostrado continua sendo o da base branca, **sempre acompanhado do
  aviso** de que a cor é orçamento à parte.
- O item vai ao pedido com a cor anotada e sinalizado como "cor a orçar".

### No carrinho e na nota do WhatsApp

- Cada item carrega a cor escolhida.
- O mesmo produto em duas cores são **duas linhas separadas** no carrinho.
- Item com cor a orçar aparece na nota como tal, e **não entra na soma** —
  entra como "a combinar", igual ao frete de fora da cidade hoje.
- O total nunca inclui um valor que a loja ainda não deu.

### Casos de borda

| situação | comportamento |
|---|---|
| Cliente não escolhe cor | assume branco, que é o preço mostrado |
| Cor pronta sem preço cadastrado | trata como "outra cor": orçamento |
| Produto sem `cor` definido | nenhuma escolha aparece, como hoje |
| Todo o pedido é de itens a orçar | a nota vai sem total, pedindo orçamento |
| Cor escolhida some do catálogo | carrinho mantém o que o cliente viu |

## Fora de escopo

- **Simulador de ambiente** (ver a cor na parede). Outro produto.
- **Leque de cores completo da marca** para os produtos de máquina — são
  milhares. O cliente descreve ou informa o código da carta.
- **Estoque por cor.** O site continua sem saber o que acabou.
- **Preço automático de tingimento.** É orçamento humano.

## Impacto

| área | muda? | o que |
|---|---|---|
| `dados.js` | **sim** | cada produto ganha suas cores e o preço por cor |
| `app.js` | **sim** | escolha no card, carrinho por cor, nota do pedido |
| `styles.css` | **sim** | amostras de cor no card |
| Operação | **sim, para melhor** | pedido chega com a cor definida |
| SPEC-001 | complementa | o fluxo de pedido não muda de forma |

## Como verificar

1. Escolher uma cor na Coral Rende Muito muda o preço **e** o volume na tela
2. O mesmo produto em duas cores gera duas linhas no carrinho
3. Item a orçar não entra na soma e aparece como "a combinar" na nota
4. A nota que chega no WhatsApp traz a cor de cada item
5. Produto de máquina mostra o aviso de orçamento junto ao preço

## Riscos

| risco | o que fazer |
|---|---|
| Preço de cor errado no ar | só cadastrar cor com preço confirmado; sem preço, é orçamento |
| Cliente acha que a cor sai pelo preço do branco | é o problema que a spec resolve; o aviso já está no ar desde hoje |
| Carta de cores da marca ≠ o que a loja tem | cadastrar só o que a loja estoca, não o catálogo da fábrica |
| Complexidade no carrinho | cor faz parte da chave do item, como já é o id |

## Decisões em aberto

Precisam de resposta antes de sair de `Proposta`:

1. **Preço da Coral Rende Muito colorida** — 16L e galão 3,2L. Sem isso não dá
   para implementar a parte mais importante.
2. **A Qualyvinil Acrílica Cor Econômica também muda de volume na cor?** Ou o
   preço é o mesmo do branco?
3. **Quais cores a loja realmente tem prontas?** A carta da Coral Rende Muito
   traz 27 (Branco, Branco Gelo, Palha, Areia, Pérola, Marfim, Vanilla, Cromo
   Suave, Camurça, Concreto, Amarelo Canário, Amarelo Frevo, Laranja Cítrico,
   Laranja Imperial, Laranja Maracatu, Pêssego, Flamingo, Rosa Açaí, Vermelho
   Cardinal, Lilás, Verde Primavera, Verde Limão, Verde Kiwi, Verde Angra,
   Azul Sereno, Oceano, Azul Profundo). **Cadastrar só o que a loja estoca** —
   listar cor que não tem é pior que não listar.
4. **Esmaltes, Rende Muito+ e Fosco Completo**: máquina, cores prontas, ou só
   branco?
5. **Mostrar amostra de cor na tela?** Amostra em RGB nunca bate com a tinta
   real, e no celular do cliente menos ainda. Nome + código da carta pode ser
   mais honesto que um quadradinho colorido que engana.
