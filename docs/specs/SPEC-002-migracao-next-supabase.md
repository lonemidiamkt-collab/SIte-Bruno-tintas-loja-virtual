# SPEC-002 — Migração para Next.js + Supabase

- **Estado:** **Proposta** — aguardando aprovação do Roberto. **Não implementar.**
- **Criada em:** 06/08/2026
- **Relacionadas:** SPEC-001, ADR-001, ADR-003, ADR-004

---

## Problema

Hoje o catálogo mora em `dados.js`. Consequência: **toda alteração de preço
precisa de alguém que saiba mexer em código e fazer deploy.** O Bruno não
consegue mudar o preço da tinta sozinho — ele avisa alguém, que edita o
arquivo, commita e publica. Preço errado no ar é uma corrente de três pessoas
para consertar.

Dois problemas seguem junto:

1. **`imagens.js` tem 1,1 MB** e desce inteiro em toda visita, mesmo a foto que
   o cliente nunca vai rolar até ver. Em 4G da Região dos Lagos isso é tempo de
   tela branca — e o público chega de anúncio, no celular.
2. **Nenhum pedido é registrado.** Ninguém sabe quantos pedidos o site gerou,
   quais viraram venda, nem quais ficaram sem resposta. O site não tem como
   provar que funciona.

## Por que agora

O site saiu de protótipo e vai receber a tabela de preços real. A partir daí a
frequência de alteração sobe — preço muda, produto entra e sai, promoção
aparece. O modelo de "editar arquivo e fazer deploy" não escala nesse ritmo, e
o custo de migrar depois, com mais produto cadastrado, só cresce.

O `dados.js` já foi escrito prevendo isso — o comentário no topo do arquivo diz
literalmente que aquilo vira tabela do banco.

## Resultado esperado

1. O Bruno muda preço, adiciona produto e sobe foto por um painel, sem ninguém
   no meio e sem deploy.
2. A página carrega só a imagem que vai aparecer, no tamanho da tela de quem
   está olhando.
3. Todo pedido montado no site fica registrado, respondido ou não.
4. O cliente **não percebe diferença nenhuma** — o site continua com o mesmo
   visual e o mesmo fluxo de pedido pelo WhatsApp.

O ponto 4 é o critério mais importante. Migração que muda a experiência do
cliente não é migração, é redesign — e isso não está sendo pedido.

## Comportamento

### O que muda para o cliente

Nada. Mesmo layout, mesmo catálogo, mesmo checkout de 3 passos, mesma nota
indo para o WhatsApp da unidade certa. **SPEC-001 continua valendo inteira.**

Ganho perceptível: a página abre mais rápido.

### O que muda para o Bruno

Ganha um painel, protegido por login, onde ele:

- muda preço e nome de produto
- adiciona e remove produto
- marca produto como oferta ou fora de linha
- sobe foto (sem precisar converter para base64)
- edita endereço, WhatsApp e horário das unidades

Só o painel tem login. **O site continua sem cadastro para o cliente** —
Constituição, princípio 1.

### O que muda por baixo

| Hoje | Depois |
|---|---|
| `dados.js` | Tabelas no Supabase: `produtos`, `setores`, `marcas`, `unidades`, `pagamentos`, `destinos`, `upsell` |
| `imagens.js` (base64) | Supabase Storage + `next/image` |
| `app.js` | Componentes React; carrinho no client |
| `index.html` + `styles.css` | App Router; CSS aproveitado |
| nada | `pedidos` — registro do que foi montado |

Catálogo renderizado no servidor com revalidação, para a página não depender do
banco a cada visita e continuar rápida se o Supabase oscilar.

### Casos de borda

| Situação | Comportamento |
|---|---|
| Supabase fora do ar | Serve a última versão do catálogo em cache. O site **não** mostra tela de erro. |
| Produto sem foto | Placeholder, e o card não quebra |
| Produto sem estoque | Fora de escopo nesta spec — o site não sabe de estoque |
| Preço alterado com carrinho aberto | O carrinho do cliente mantém o preço que ele viu ao adicionar |
| Painel fora do ar | Não afeta a loja. São aplicações separadas. |

## Fora de escopo

- **Pagamento online.** Continua no WhatsApp. Vira e-commerce se entrar, e isso
  é outro projeto — está registrado como P3 no backlog.
- **Estoque.** O site continua sem saber se acabou.
- **Redesign.** Nenhuma mudança visual. Migração e redesign na mesma tacada
  tornam impossível saber o que quebrou o quê.
- **Multi-idioma, cupom, frete calculado por CEP.** Nada disso foi pedido.

## Impacto

| Área | Muda? | O que |
|---|---|---|
| Stack | **sim** | HTML estático → Next.js (App Router) |
| Dados | **sim** | Arquivo → Supabase |
| Imagens | **sim** | base64 → Storage + `next/image` |
| Visual | **não** | CSS aproveitado |
| Fluxo de pedido | **não** | SPEC-001 continua valendo |
| Deploy | pouco | Continua Vercel; passa a ter build e variáveis de ambiente |
| Operação | **sim, para melhor** | Bruno muda preço sozinho |

## Migração — ordem sugerida

Cada fase fecha em commit próprio e deixa o site funcionando. **Nenhuma fase
pode deixar a loja no ar quebrada.**

1. **Next rodando com o site atual** — App Router servindo o mesmo HTML/CSS,
   ainda lendo de `dados.js`. Nada muda para ninguém. Valida deploy e build.
2. **Componentizar** — catálogo, card, carrinho e checkout viram componentes,
   ainda lendo do arquivo. Aqui o risco é maior; comparar tela a tela com hoje.
3. **Imagens** — sair do base64 para Storage + `next/image`. É onde o ganho de
   velocidade aparece.
4. **Banco** — criar as tabelas, migrar o conteúdo do `dados.js`, ler do
   Supabase com revalidação. `dados.js` vira semente e sai do caminho.
5. **Painel** — CRUD para o Bruno, com login.
6. **Pedidos** — gravar o pedido antes de abrir o WhatsApp.

Fases 1 a 3 não dependem do Supabase e já entregam velocidade. Se o projeto
parar no meio, parar depois da 3 deixa o site melhor do que está.

## Como verificar

- Cada fase: o site abre, catálogo monta, carrinho soma, WhatsApp abre na
  unidade certa, console limpo
- Fase 3: página inicial mais leve que a atual — é o objetivo declarado
- Fase 4: mudar um preço no banco reflete no site sem deploy
- Fase 5: o Bruno consegue cadastrar um produto sozinho, sem instrução
- Fase 6: pedido montado aparece na tabela `pedidos` mesmo se o WhatsApp não abrir

## Riscos

| Risco | O que fazer |
|---|---|
| Migração vira redesign no meio do caminho | Fora de escopo é explícito acima. Mudança visual entra como spec separada. |
| Fase 2 quebra comportamento sutil de carrinho ou frete | Comparar contra SPEC-001 caso a caso, não "no olho" |
| Supabase vira ponto único de falha da loja | Revalidação com cache: catálogo velho é melhor que site fora do ar |
| Custo do Supabase | Volume da loja cabe folgado no plano gratuito. Reavaliar se mudar. |
| Projeto para no meio | A ordem das fases garante que qualquer parada deixa o site funcionando |

## Decisões em aberto

Precisam de resposta antes desta spec sair de `Proposta`:

1. **Supabase novo ou o do Lone OS?** Projeto separado isola o cliente e evita
   que um problema na agência derrube a loja. Reaproveitar economiza setup.
   *Recomendação: projeto separado.*
2. **Quem entra no painel?** Só o Bruno, ou a equipe da Lone também?
3. **O painel fica no mesmo domínio** (`/admin`) ou em subdomínio separado?
4. **Prazo.** Isso concorre com a tabela de preços real e com apontar o
   domínio, que são P0 e P1 no backlog. Entra antes ou depois?
