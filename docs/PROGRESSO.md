# Progresso

> Diário do projeto. **Só se acrescenta, nunca se reescreve.** Entrada nova
> vai no topo. Se algo registrado aqui se provou errado depois, escreva uma
> entrada nova corrigindo — não edite a antiga.
>
> Formato: data, o que mudou, por quê, e o que ficou aberto.

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
