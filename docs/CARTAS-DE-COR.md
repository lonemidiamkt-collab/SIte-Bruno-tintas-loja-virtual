# Cartas de cor — origem e o que ficou aberto

> Transcritas das **cartas físicas** que o Bruno fotografou em 24/08/2026.
> As fotos estão em `docs/cartas-de-cor/`. Nada foi inventado.

## O que existia antes

O site oferecia duas cartas que **eu montei por dedução**: 27 cores "de parede"
e 17 "de esmalte", tiradas de catálogo de fabricante na internet e de padrão de
mercado. Comparando com as cartas reais, a de parede errava a maioria dos
nomes — tinha Vanilla, Flamingo, Rosa Açaí e Vermelho Cardinal, que não existem
na carta da Coral; e não tinha Cinza Alpino, Tubarão Branco, Madeira
Acinzentada, Suco de Goiaba, Pote de Argila, Sino, Capim Limão nem Azul dos
Andes, que existem.

Um cliente que escolhesse "Flamingo" pediria uma cor inexistente.

## As cartas reais

| Linha | Cores | Código? |
|---|---|---|
| Coral Rende Muito | 27 | sim |
| Qualyvinil Acrílica Econômica | 20 | sim |
| Qualyvinil Rende Muito+ | 17 | sim |
| Qualyvinil Esmalte Sintético | 17 | sim |
| Lukscolor Brilhante | 14 (12 em estoque) | não |
| Lukscolor Fosco | 2 | não |
| Lukscolor Acetinado | 8 (6 em estoque) | não |
| Maza Direto na Ferrugem | 10 | não |

**O código viaja no pedido.** O cliente escolhe "Marfim"; a loja recebe
"Marfim (818)" e separa a lata certa sem precisar perguntar.

## O que as cartas confirmaram

**As seis linhas têm cores prontas.** As classificações que eu tinha deduzido
estavam certas — mas eram dedução, e agora são fato.

**"Cores prontas ao mesmo preço do branco"** está impresso na tarja da carta da
Coral Rende Muito. É a confirmação do que o Bruno tinha dito.

**Três linhas também tingem na máquina**, além das cores prontas: Coral Rende
Muito ("mais de 1000 cores do leque"), Qualyvinil Rende Muito+ ("mais de 6.000
cores") e Lukscolor ("sistema tintométrico Luksystem"). Nessas, o box mostra a
carta **e** oferece orçamento para cor fora dela.

## De onde vem o bloco de cor da tela

Cada cor tem um `h` (hex) em `CARTAS`, e é ele que pinta o quadrado no site.
Esse hex **não foi escolhido a olho nem copiado de catálogo da internet**: foi
medido nas mesmas fotos que o Bruno mandou, por
`docs/ferramentas/extrai-cores.py` (o porquê está no
`docs/decisoes/ADR-005-cores-medidas-da-foto.md`).

Resumo do que o script faz, por cor:

1. tira a mediana de um quadrado de 29×29 px no centro da amostra impressa —
   mediana, e não média, para o brilho do flash não puxar a cor;
2. procura o branco do papel numa janela de 680 px em volta (percentil 95) e
   usa esse branco como referência, o que corrige a luz desigual da foto;
3. no fim, calibra a carta inteira pelo **Branco**, que é a única cor que a
   gente sabe de antemão como tem que sair.

A conferência foi visual: para cada carta o script montou uma folha com o
recorte da foto ao lado da cor extraída, e as 105 cores foram olhadas uma a uma.

**Limite honesto:** é foto de papel impresso, sob luz de loja, vista numa tela
que ninguém calibrou. O site diz isso na própria carta — *"as cores da tela são
aproximadas — a carta impressa da loja é a referência final"* —, que é a mesma
ressalva que a Lukscolor imprime no verso da dela.

## Cor que a loja não tem

O Bruno não estoca **Algodão Egípcio** nem **Marrom Barroco** em nenhum
acabamento da Lukscolor. As duas continuam em `CARTAS`, marcadas com
`fora: true`, e o site não as mostra.

Ficam marcadas em vez de apagadas por dois motivos: a carta aqui é a
**transcrição do papel** e não pode ser podada sem virar outra coisa; e estoque
muda — para repor a cor, tira-se a marca, sem precisar remedir hex nenhum.

A regra por trás: **listar cor que a loja não tem é pior que não listar cor
nenhuma**, porque manda o cliente ao balcão atrás de uma lata que não existe.

## Aberto

**Lukscolor: os três acabamentos estão em estoque** (Brilhante, Fosco e
Acetinado), confirmado pelo Bruno em 24/08. As três cartas estão transcritas e
medidas, mas **só o Brilhante está ligado aos produtos**: falta decidir como o
cliente escolhe o acabamento, e isso depende de saber se os três custam o mesmo.
→ [SPEC-003, fase 4](specs/SPEC-003-escolha-de-cores.md), em **Proposta**.

**Maza está incompleta.** A foto pegou só a seção "CORES LISAS", e a lata
também anuncia **cores metálicas**. A borda direita da foto está cortada, então
pode faltar uma coluna. Vale refotografar.

**Preço da cor** segue confirmado só na Coral Rende Muito e na Qualyvinil
Econômica. Nas outras quatro o site diz "confirme o valor da cor com a loja".
