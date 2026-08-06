# ADR-004 — Documentação SDD versionada junto com o código

- **Data:** 06/08/2026
- **Estado:** Aceita
- **Relacionadas:** todas

## Contexto

O projeto vinha sendo tocado em sessões de Claude sem documentação. Cada sessão
começava do zero, sem saber o que já tinha sido decidido nem por quê.

O custo apareceu concretamente: **sete versões do site espalhadas em pastas de
download** (`2026brunotintasfiles`, `ultimotestbrunofiles`,
`verselbrunotintasfiles`, `lojabrunotintasfiles`, `indexbrunofiles`,
`sitebrunottintasfiles`, `Brunotintastestesembancofiles`), todas subidas cruas
para o repositório, sem que ninguém soubesse qual era a boa. O `index.html` da
raiz — o arquivo que a Vercel efetivamente publica — ficou meses servindo uma
versão antiga enquanto as novas existiam no repositório, presas dentro dessas
pastas.

Isso não foi descuido pontual. É o resultado previsível de trabalhar sem
registro de estado.

## Decisão

Adotar **SDD (Spec-Driven Development)** com a documentação versionada no
próprio repositório e atualizada **no mesmo commit** da mudança de código.

Quatro peças:

| Peça | Papel |
|---|---|
| `CLAUDE.md` | O motor. Instrui toda sessão a ler o estado antes de agir e atualizar depois. |
| `docs/ESTADO.md` | Retrato do agora. Sobrescrito a cada commit. |
| `docs/PROGRESSO.md` | Histórico append-only. Nunca reescrito. |
| `docs/specs/` + `docs/decisoes/` | Comportamento esperado e o porquê das escolhas. |

Regras que sustentam:

- Spec obrigatória para **mudança de comportamento**; preço, foto e correção
  de bug passam direto
- Documentação no mesmo commit do código — commit sem doc é commit incompleto
- Commit automático ao concluir tarefa; **push continua manual**, porque push
  publica na loja ao vivo

## Alternativas consideradas

- **Documentação fora do repo** (Notion, Google Docs) — perdeu porque
  desincroniza. Doc que descreve um site que não existe mais é pior que doc
  nenhuma: mente com autoridade. No repo, ela anda no mesmo commit e é revisável
  no mesmo diff.
- **Só um README** — perdeu porque mistura três coisas com ciclos de vida
  diferentes: o que é o projeto (raro), como está agora (todo commit) e o que
  aconteceu (acumula). Junto, nada fica confiável.
- **Confiar na memória do Claude entre sessões** — perdeu porque memória não é
  versionada, não é revisável e não acompanha o repositório. Se outra pessoa
  entrar no projeto, ela não herda a memória; herda o repo.
- **SDD com ferramenta pronta** (Spec Kit e afins) — perdeu por ora: traz
  estrutura demais para um site de duas lojas. O formato aqui é o mínimo que
  resolve, e pode crescer.

## Consequências

**A favor:**
- Sessão nova se situa lendo `ESTADO.md`, sem arqueologia
- Decisão fica registrada com o motivo, evitando rediscussão
- Qualquer commit do histórico tem a documentação daquele momento
- Quem entrar no projeto não depende de ninguém para entender

**Contra:**
- Todo commit fica mais caro — tem que atualizar dois arquivos
- Documentação desatualizada continua possível se a regra for ignorada; a
  disciplina vive no `CLAUDE.md`, não é imposta por ferramenta
- Risco de burocratizar. Mitigado por deixar explícito o que **não** precisa de
  spec.

## Quando revisitar

Se a documentação começar a ficar para trás do código — sinal de que a regra
está pesada demais e precisa afrouxar. Ou se o projeto crescer a ponto de
justificar ferramenta de SDD de verdade.
