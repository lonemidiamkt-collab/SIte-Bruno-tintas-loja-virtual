# Arquitetura: o que cada tela mostra

> Mapa de o que aparece no desktop e no celular, seção por seção, e **por que**
> cada diferença existe. Diferença sem motivo escrito aqui é bug, não decisão.

Ponto de corte: **900px**.

## Mapa

| # | Seção | Desktop (≥900px) | Celular (<900px) | Por quê |
|---|---|---|---|---|
| 1 | **Capa** | Arte inteira `capa-desktop.webp`, com título desenhado | Título em HTML + `capa-mobile.webp` (só as latas) | Texto embutido em arte de 2.32 fica com ~5px numa tela de 375px. No celular o título é HTML de verdade e a arte entra só como imagem. |
| 2 | **Destaque da semana** | Faixa horizontal, foto de 300px à esquerda | Card, miniatura de 68px ao lado do preço | Mesmo DOM, grid recoloca. O desktop tem largura sobrando; o celular não. |
| 3 | **Setores** | 4 cards | 4 cards em trilho rolável | Igual nas duas. |
| 4 | **Catálogo** | Arte `secao-catalogo.webp`, com título desenhado | Título em HTML + `secao-catalogo-mobile.webp` (motoboy e lata) | Mesma lógica da capa. |
| 5 | **Marcas** | Trilho | Trilho | Igual. |
| 6 | **Como comprar** | Arte `secao-como-comprar.webp` — os 3 passos estão desenhados nela | 4 cards de passo em HTML, **sem arte** | Aqui os passos são conteúdo, não enfeite. No celular eles precisam ser texto legível e selecionável. Uma imagem a mais só empurraria os passos para baixo. |
| 7 | **Lojas** | 2 cards lado a lado | 2 cards empilhados | Igual em conteúdo. |

## Regras que valem para o site inteiro

1. **Arte com texto embutido nunca vai inteira para o celular.** O celular recebe
   o recorte da imagem, e o texto vira HTML.
2. **Uma imagem por tela, nunca duas.** Toda troca de arte usa `<picture>` com
   `media`, então o navegador baixa exatamente a que vai mostrar. Antes existiam
   duas `<img>` com `display:none` e as duas eram baixadas.
3. **O `<h1>` existe nas duas telas.** No desktop o bloco de texto da capa fica
   só para leitor de tela, porque a arte já mostra a mensagem.
4. **Conteúdo não desaparece numa tela.** O que muda é a forma. A única exceção
   é a linha 6, e ela está justificada acima.

## Divergência conhecida, ainda aberta

**"Como comprar" conta histórias diferentes.** O celular mostra **4 passos**
começando em "Monte o pedido"; a arte de desktop mostra **3**, começando em
"Escolha como receber". Além disso, a arte traz **01 e 02 com o mesmo título**
("Escolha Como Receber"), sendo que o 02 fala de pagamento.

Isso se resolve na arte, não no código. Enquanto não vier corrigida, desktop e
celular divergem nesta seção.
