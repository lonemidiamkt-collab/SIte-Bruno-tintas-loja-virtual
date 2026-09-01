# ADR-006 — Dados estruturados do catálogo montados em tempo de execução

- **Data:** 25/08/2026
- **Estado:** Aceita
- **Relacionadas:** ADR-001 (site estático, sem build), ADR-003, SPEC-001

## Contexto

O site foi para o ar em domínio real e aberto ao Google em 25/08. O
`index.html` já declarava as duas lojas como `HardwareStore`, com coordenadas
reais e link do perfil do Google Business.

Faltava o catálogo. Vinte e seis produtos com marca, foto e **preço** que o
Google não tinha como ler, porque moram em `dados.js` e não na marcação. Para
loja, é justamente o preço que gera resultado rico na busca.

Havia dois caminhos:

1. **Escrever o JSON-LD à mão no `index.html`**, produto a produto.
2. **Montar de `PRODUTOS` em tempo de execução**, no `app.js`.

## Decisão

Montar em tempo de execução, de `PRODUTOS`.

**Por quê:** preço é o dado que mais muda neste projeto. Uma cópia no HTML
envelheceria calada — alguém mexe no `dados.js`, o site mostra o preço novo, e o
JSON-LD segue anunciando o velho para o Google. **Preço errado em dado
estruturado é pior que dado estruturado nenhum**, porque sai no resultado de
busca com cara de oficial e o cliente chega à loja cobrando.

Este projeto já se queimou duas vezes exatamente assim: o desconto que dizia 5%
quando era 10%, e o "mesmo preço na cor" afirmado antes de haver confirmação.
Gerando de `PRODUTOS`, existe uma fonte só, e ela é a mesma que a tela usa.

Alternativa descartada: um passo de build que gerasse o HTML. Fecharia a porta
que a ADR-001 deixou aberta de propósito — o site não tem build, e é isso que
permite editar `dados.js` e publicar com um `git push`.

## Consequência

**O custo:** dado estruturado injetado por JavaScript depende do Google renderizar
a página. Ele faz isso rotineiramente, mas numa segunda passada — a leitura é
mais lenta que a de marcação estática. Aceito, em troca de nunca anunciar preço
errado.

**`availability` fica de fora, de propósito.** O site nunca afirmou estoque:
quem confirma é a loja, no WhatsApp, antes de separar. `InStock` seria uma
promessa que o código não tem como cumprir. O campo é opcional no schema.org.
Se o Bruno confirmar que tudo que está no site ele tem, entra.

**A CSP não atrapalha.** `script-src 'self'` bloqueia script executável; um
`<script type="application/ld+json">` é bloco de dados, não é executado, e não
cai na regra. Verificado no navegador com os mesmos cabeçalhos do `vercel.json`.

**Se um dia entrar página por produto**, esta decisão deve ser revisitada: com
URL própria por produto, o JSON-LD estático passa a valer mais que a fonte única.
