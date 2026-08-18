# Auditoria visual das fotos de produto — 17/08/2026

> Conferência de **todas as 26 fotos** contra o nome do produto cadastrado,
> olhando o rótulo de cada lata. Método: folhas de contato com foto + nome +
> chave do arquivo, lado a lado.

## 4 fotos mostravam OUTRO produto

Retiradas do site. O card passa a mostrar o selo com a inicial da marca —
melhor não ter foto do que ter a foto errada, porque foto errada faz o cliente
pedir o produto que não é.

| # | Produto no site | O que a foto mostrava |
|---|---|---|
| 14 | Qualyvinil Fosco Completo 3,6L | **Acrílica Cor Econômico** (a mesma foto do #8), com marca d'água "Loja das Tintas" |
| 18 | Lukscolor Esmalte Base Água 900ml | a versão **base SOLVENTE** — outro produto do catálogo Lukscolor |
| 20 | Qualyvinil Esmalte Sintético 900ml | **Colorit Eco base água**, com selo "Pintura Artística" |
| 25 | Qualyvinil Massa Acrílica 3,6L | balde **Klasse**, com selo "Terminação de Superfícies" |

O caso 18 é o mais traiçoeiro: as duas latas são Lukscolor, quase iguais, e só
o dizer "BASE ÁGUA" no rótulo separa uma da outra. São produtos com diluente
diferente — água contra solvente.

## Problemas menores, não corrigidos

**Fundo fora do padrão** (#3, #4, #12): faixa bege ou cinza atrás da lata, em
vez do branco das outras 22. Não é produto errado, é inconsistência visual.

**Embalagem genérica** (#22, #23, #26): as massas aparecem no balde
"Complementos Premium", que é a embalagem comum da linha. Massa corrida e massa
acrílica ficam indistinguíveis na foto — o rótulo não diz qual é.

## Fotos que faltam pedir ao Bruno

1. Qualyvinil Fosco Completo **3,6L**
2. Lukscolor Esmalte **Base Água** 900ml (conferir se é a lata base água)
3. Qualyvinil Esmalte Sintético Standard **900ml**
4. Qualyvinil Massa Acrílica **3,6L**

Ideal: fundo branco, produto centralizado, sem marca d'água nem selo de
campanha.

## Como refazer esta conferência

As folhas de contato são geradas a partir do `dados.js` e da pasta `fotos/`.
Vale repetir sempre que entrar foto nova — os quatro erros acima só apareceram
quando as 26 foram vistas juntas, com o nome ao lado.
