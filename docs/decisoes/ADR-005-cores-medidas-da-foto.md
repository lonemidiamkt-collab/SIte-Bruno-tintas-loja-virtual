# ADR-005 — O bloco de cor sai medido da foto da carta, não escolhido a olho

- **Data:** 24/08/2026
- **Estado:** Aceita
- **Relacionadas:** ADR-004, `docs/CARTAS-DE-COR.md`

## Contexto

A carta de cores existia no site, mas só como texto: um botão escrito
"Marfim (818)". O Roberto apontou o óbvio — *"ainda não tem os blocos de
cores"*. Ninguém escolhe tinta lendo nome; escolhe olhando.

Para pintar o quadrado eu precisava de um hex por cor. Havia três caminhos:

1. **escolher a olho**, cor por cor, olhando a foto;
2. **copiar de catálogo de fabricante na internet**;
3. **medir na própria foto** que o Bruno mandou.

Os dois primeiros já tinham cobrado caro neste projeto. A carta de cores que eu
tinha montado por dedução, de catálogo da internet, errava a maioria dos nomes
da Coral — tinha Flamingo e Rosa Açaí, que não existem. Uma cor inventada é um
pedido que a loja não consegue atender.

## Decisão

**Medir na foto.** Um script lê as fotos em `docs/cartas-de-cor/`, amostra o
centro de cada cor impressa e grava o hex no campo `h` de `CARTAS`, em
`dados.js`.

Três cuidados, cada um respondendo a um jeito de a foto mentir:

- **mediana, não média**, num quadrado de 29×29 px — reflexo de flash é um
  ponto claro pequeno, e a mediana não se deixa levar por ele (foi o que salvou
  a Platina da Maza, que é metálica e no centro é puro brilho);
- **branco de referência local**, o percentil 95 numa janela de 680 px em volta
  da amostra — foto de celular não ilumina o papel por igual, e um branco único
  para a carta inteira fazia a mesma cor sair mais clara de um lado do que do
  outro;
- **calibração pelo Branco** da própria carta, no fim: tinta branca tem que sair
  branca, e esse é o único ponto de verdade que a foto oferece de graça.

A conferência foi visual e uma a uma: o script monta uma folha com o recorte da
foto ao lado da cor extraída, e as 105 cores das seis cartas foram olhadas.

## Consequência

O quadrado da tela é fiel **à foto**, e a foto é de papel impresso sob luz de
loja. Não é fiel à lata. Por isso a tela diz, embaixo da carta, que *"as cores
da tela são aproximadas — a carta impressa da loja é a referência final"* — a
mesma ressalva que a Lukscolor imprime no verso da carta dela.

Quando chegar foto melhor de alguma carta (a da Maza está cortada e sem as
metálicas), refaz-se a medição em vez de retocar hex na mão. O script mora em
`docs/ferramentas/extrai-cores.py` e as coordenadas de cada amostra estão nele
— foto nova pede coordenada nova.

**O que isso fecha:** não se edita hex de cor à mão em `dados.js`. Se a cor
está errada na tela, ou a foto está ruim, ou a coordenada da amostra está
errada — e as duas se corrigem na origem.
