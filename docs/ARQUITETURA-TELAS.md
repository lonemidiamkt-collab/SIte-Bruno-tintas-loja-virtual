# Arquitetura: o que cada tela mostra

> Mapa de o que aparece no desktop e no celular, seção por seção, e **por que**
> cada diferença existe. Diferença sem motivo escrito aqui é bug, não decisão.

Ponto de corte: **900px**.

## Mapa

| # | Seção | Desktop (≥900px) | Celular (<900px) | Por quê |
|---|---|---|---|---|
| 1 | **Capa** | `capa.webp` inteira (1912×823) | A **mesma** `capa.webp` inteira, menor | Uma arte só, sem recorte, e ela é a única coisa visível: o bloco de texto fica fora da tela nas duas, só para leitor de tela e busca. |
| 2 | **Destaque da semana** | Faixa horizontal, foto de 300px à esquerda | Card, miniatura de 68px ao lado do preço | Mesmo DOM, grid recoloca. O desktop tem largura sobrando; o celular não. |
| 3 | **Setores** | 4 cards | 4 cards em trilho rolável | Igual nas duas. |
| 4 | **Catálogo** | `secao-catalogo.webp` inteira | A **mesma**, inteira, menor | Mesma regra da capa. |
| 5 | **Marcas** | Trilho | Trilho | Igual. |
| 6 | **Como comprar** | `secao-como-comprar.webp` inteira | A **mesma**, inteira, mais os 4 cards de passo em HTML | A arte aparece nas duas telas. Os 4 cards continuam no celular porque ali os passos precisam ser texto legível. |
| 7 | **Lojas** | 2 cards lado a lado | 2 cards empilhados | Igual em conteúdo. |

## Regras que valem para o site inteiro

1. **Arte nunca é recortada.** Uma imagem por arte, nas dimensões originais
   (1912×823, proporção 2.3232), igual nas duas telas. No celular ela aparece
   menor, nunca cortada. Nada de `object-fit:cover` nem `aspect-ratio` forçado
   sobre arte — a composição é do designer.
2. **Uma imagem por arte, nunca duas.** Sem `<picture>` e sem variante por
   tamanho: o mesmo arquivo serve as duas telas, então não há como uma versão
   divergir da outra com o tempo.
3. **O `<h1>` existe nas duas telas.** No desktop o bloco de texto da capa fica
   só para leitor de tela, porque a arte já mostra a mensagem.
4. **Conteúdo não desaparece numa tela.** O que muda é a forma. A única exceção
   é a linha 6, e ela está justificada acima.

## Custo assumido nessa escolha

Arte de 2.32 numa tela de 375px fica com **161px de altura**, e o texto
desenhado dentro dela fica pequeno.

A primeira tentativa foi manter o título em HTML acima da arte no celular, para
a mensagem ficar legível. O Roberto vetou (17/08): com a arte inteira, o texto
acima virava repetição do que a própria arte já diz.

**Decisão:** o bloco de texto sai da tela nas duas telas, mas continua no DOM
com a técnica de só-leitor-de-tela. Assim a página mantém o `<h1>` para busca e
acessibilidade — conferido: `display` não é `none`, `visibility` não é
`hidden`, sem `aria-hidden`, então leitor de tela lê normalmente.

O que se perde: no celular a mensagem só existe dentro da arte, em texto
pequeno. Resolve de vez quando o designer fizer uma versão vertical das artes,
composta de origem para 375px.

## Divergência conhecida, ainda aberta

**"Como comprar" conta histórias diferentes.** O celular mostra **4 passos**
começando em "Monte o pedido"; a arte de desktop mostra **3**, começando em
"Escolha como receber". Além disso, a arte traz **01 e 02 com o mesmo título**
("Escolha Como Receber"), sendo que o 02 fala de pagamento.

Isso se resolve na arte, não no código. Enquanto não vier corrigida, desktop e
celular divergem nesta seção.
