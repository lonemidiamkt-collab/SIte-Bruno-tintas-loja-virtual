# Backlog

> Fila priorizada. Item concluído sai daqui e vira entrada no
> [PROGRESSO.md](PROGRESSO.md). Item que tem spec aponta para ela.

Prioridades: **P0** trava o projeto · **P1** próximo ciclo · **P2** depois ·
**P3** ideia registrada, sem data.

---

## P0 — travando

### Apontar o brunodastintas.com para a Vercel
O domínio foi **registrado em 25/08/2026** na Hostinger. Falta o DNS: hoje os
NS são os de parking (`apollo`/`athena.dns-parking.com`) e o domínio não resolve
para lugar nenhum.

Ordem certa: adicionar o domínio no projeto da Vercel primeiro (ela mostra os
registros exatos), depois criar esses registros na zona DNS da Hostinger.
Tipicamente `A` no apex para `76.76.21.21` e `CNAME` do `www` para
`cname.vercel-dns.com` — mas **vale o que a Vercel mostrar**, não este texto.

Quando resolver, aí sim: **tirar o `X-Robots-Tag: noindex` do `vercel.json`**
(ADR-003) e a tarja "v7 · Versão para aprovação" do topo. Enquanto o DNS não
estiver de pé, os dois ficam.

Duas decisões que vieram junto:

- **É `.com`, não `.com.br`.** As 9 referências do HTML já foram trocadas.
- **`brunotintas.com.br` continua vencido e em `on-hold`**, no CNPJ do Bruno.
  É o que o Google conhece, e casa com o `@brunotintas` e com o nome do perfil
  do Google Business. Vale renovar nem que seja para redirecionar — se for
  liberado, qualquer um pega um domínio com a marca dele.

**Depende do Roberto.**

### Ligar os perfis do Google Business ao site
Os dois perfis **já existem** — eu tinha registrado "criar" por engano, o
Roberto corrigiu e eu confirmei no Google Maps em 24/08:

| Perfil | Nota | Site declarado |
|---|---|---|
| BRUNO TINTAS (Araruama) | 4,8 · 164 avaliações | aponta para o **Instagram** |
| Bruno Tintas - Iguaba Grande | 5,0 · 1 avaliação | **nenhum** |

O que falta, e só o dono do perfil pode fazer:

1. **Pôr o domínio no campo "site" dos dois perfis**, quando ele existir. Hoje
   Araruama manda o cliente para o Instagram e Iguaba não manda para lugar
   nenhum. É o elo que liga 164 avaliações reais ao catálogo.
2. **Iguaba tem 1 avaliação.** Os vizinhos têm 237 (Tintas 1000), 55 (Casa das
   Tintas) e 33 (Celinho). Nessa praça o perfil praticamente não existe, e
   nenhuma linha de código conserta isso — é pedir avaliação a quem compra.
3. **Nome do perfil.** Araruama está como "BRUNO TINTAS" e Iguaba como "Bruno
   Tintas - Iguaba Grande"; o site e a logo dizem "Bruno das Tintas". Para
   busca local, nome igual em todo lugar conta. Decidir qual é o certo e
   uniformizar — inclusive no site, se for o caso.

**Depende do Roberto.**

---

## P1 — próximo ciclo

### Perguntas para o Bruno sobre as cartas de cor
Cada uma muda o que o cliente vê na tela:

1. ~~Qual acabamento da Lukscolor a loja estoca?~~ **Respondido em 24/08** —
   estoca os **três**, e não tem Algodão Egípcio nem Marrom Barroco em nenhum
   deles. As duas cores saíram da tela; as três cartas estão medidas. Virou a
   pergunta de preço, logo abaixo.
2. **Foto nova da carta da Maza.** A atual pegou só "CORES LISAS", cortou a
   borda direita e não tem as **metálicas**, que a lata anuncia. Com foto nova,
   as cores se remedem com `docs/ferramentas/extrai-cores.py`.
3. **Preço da cor** nas 4 linhas sem `precoCorIgual` — hoje o site diz "confirme
   o valor da cor com a loja", que funciona mas gasta atendimento. Confirmado na
   Coral Rende Muito (está impresso na carta) e na Qualyvinil Econômica.
4. **A Massa Acrílica 3,6L é da linha Klasse?** A foto do produto mostra Klasse;
   o nome cadastrado não diz.

### Os três acabamentos da Lukscolor custam o mesmo?
É o que trava a [SPEC-003 fase 4](specs/SPEC-003-escolha-de-cores.md) e, com
ela, **7 cores** que só existem no Acetinado e hoje não aparecem para o cliente.

O cupom lista um preço por volume (3,6L R$ 166,90 · 900ml R$ 49,90) sem separar
acabamento. Um seletor de acabamento na tela **afirma que o preço não muda** —
e se mudar, o site mente sobre preço, que é o erro mais caro que este projeto
já cometeu duas vezes.

- **preço igual** → seletor de acabamento no box, e as três cartas entram
- **preço diferente** → viram produtos separados no catálogo, com preço próprio

**Depende do Bruno.**

### Correção nas artes 01 e 02
Erros que só designer resolve, porque estão dentro da imagem:
- **título duplicado** — a arte já traz o título, e a página repetia em texto
  (o texto já saiu da capa no celular, mas as artes internas seguem assim)
- **"5%"** — o desconto à vista virou **10%**
- **"tinge na máquina"** na arte da Rende Muito, que é linha de cor pronta

### Ficha técnica do Klasse Massa Acrílica 18L
É o único dos 26 sem ficha (25 de 26). O box mostra a ficha só de quem tem, e
ignora quem não tem, então não quebra nada — só fica mais pobre que os vizinhos.

### Migração para Next.js + Supabase
Catálogo sai do arquivo e vai para o banco, com painel para o Bruno editar
preço sem depender de ninguém. → [SPEC-002](specs/SPEC-002-migracao-next-supabase.md)
· estado: **Proposta**, com 4 perguntas em aberto, aguardando o Roberto.

### Apagar o projeto Vercel duplicado
Existem **dois** projetos Vercel ligados neste mesmo repositório, e todo push
dispara build nos dois:

- `s-ite-bruno-tintas-loja-virtual` ← **este é o bom**, serve a versão atual
- `s-ite-bruno-tintas-loja-virtual-b1hj` ← duplicado, a URL limpa dele dá 404

Riscos de deixar como está: build dobrado a cada push, e alguém compartilhar a
URL do projeto errado. Antes de apagar, confirme que o domínio real não está
apontado para o `-b1hj`. **Depende do Roberto.**

### Número da rua no endereço de Araruama
O perfil do Google e o cadastro do CNPJ dizem **RJ-106, 89920** — Vila Capri. O
site diz só "RJ-106, Vila Capri", sem o número. Endereço igual em todo lugar
(site, Google, redes) é critério de busca local, e este é o único campo que
diverge. Não mexi por conta própria porque é dado de loja. **Confirmar e eu
ajusto** em `dados.js` e no `schema.org`.

### Fechar os dois dados que o site ainda omite
- `corteEntregaHoje` — sem isso o site não mostra "peça até X e receba hoje"
- `parcelaMinima` — hoje declara "sem valor mínimo"

**Depende do cliente.**

### Produtos mandados sem preço
- **Qualyvinil Colorit Eco** (esmalte base água, 900ml) — não está no cupom
- **Qualyvinil Complementos Premium** — provavelmente é a embalagem das massas
  já cadastradas; se for produto separado, falta o preço

---

## P2 — depois

### Registro dos pedidos
Hoje o pedido vira texto no WhatsApp e some. Não existe forma de saber quantos
pedidos o site gerou, nem quais não foram respondidos. Entra naturalmente com
o Supabase (SPEC-002).

### Cor no card da grade, não só na ficha
Hoje o bloco de cor só aparece depois de abrir a ficha. Um resumo na grade
("27 cores" com uma fita das mais vendidas) encurtaria o caminho — mas mexe na
densidade da grade, que já está apertada no celular. Precisa de spec.

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
