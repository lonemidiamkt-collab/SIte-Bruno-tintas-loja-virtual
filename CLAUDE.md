# CLAUDE.md — como trabalhar neste repositório

Site da loja Bruno das Tintas. Este arquivo é a instrução operacional para
qualquer sessão do Claude neste repo. **Leia `docs/ESTADO.md` antes de fazer
qualquer coisa** — é ali que está o retrato do projeto agora.

Este projeto segue **SDD (Spec-Driven Development)**: a especificação vem antes
do código, e a documentação é atualizada junto com a mudança, no mesmo commit.
Sem isso, cada sessão nova começa cega.

---

## 1. Início de sessão — obrigatório

Antes da primeira alteração, leia nesta ordem:

1. `docs/ESTADO.md` — o que está no ar, o que está em andamento, o que está quebrado
2. `docs/BACKLOG.md` — o que está na fila e com que prioridade
3. `docs/PROGRESSO.md` — só as últimas entradas, para pegar o fio da meada
4. A spec da área que você vai mexer, em `docs/specs/`

Se o que o usuário pediu já tem spec, siga a spec. Se contradiz a spec,
**pare e aponte a contradição** antes de codar.

---

## 2. Quando escrever spec antes de codar

Regra: **spec é obrigatória para mudança de comportamento.**

| Situação | Precisa de spec? |
|---|---|
| Preço, produto, foto, endereço, WhatsApp (`dados.js`) | Não. Só entra no PROGRESSO. |
| Corrigir bug sem mudar o comportamento esperado | Não. Entra no PROGRESSO. |
| Ajuste visual que não muda fluxo | Não. Entra no PROGRESSO. |
| Funcionalidade nova | **Sim** |
| Mudança em fluxo existente (checkout, carrinho, frete) | **Sim** |
| Refatoração estrutural ou troca de stack | **Sim** |
| Integração com serviço externo | **Sim** |

A spec nasce em `docs/specs/SPEC-NNN-nome.md` a partir de
`docs/specs/_TEMPLATE.md`, e começa com status `Proposta`. Só vira
`Aprovada` quando o Roberto disser. **Não implemente spec em `Proposta`.**

---

## 3. Regra de commit automático

**Ao concluir uma tarefa, commite sem pedir autorização.** Tarefa concluída é:

- a alteração que a sessão se propôs a fazer está funcionando e verificada
- ou um bloco coerente terminou (um layout novo, uma spec escrita, uma área refatorada)

Não acumule várias tarefas num commit só, e não commite trabalho pela metade.
Se a tarefa é grande, quebre em commits coerentes conforme cada parte fecha.

**Todo commit de código carrega a atualização da documentação junto.** Nunca
commite código sem atualizar `docs/ESTADO.md` e `docs/PROGRESSO.md` no mesmo
commit. Qualquer commit do histórico tem que ter a documentação correspondente
àquele momento.

### Push é diferente de commit

`git push` publica na Vercel e **muda a loja que o cliente vê**. Portanto:

- **commit:** automático, sem perguntar
- **push:** só quando o Roberto pedir

Ao terminar, diga o que foi commitado e pergunte se pode publicar.

### Antes de todo commit

- [ ] Site abre sem erro no console
- [ ] `dados.js` alterado → catálogo renderiza e carrinho soma certo
- [ ] `ESTADO.md` e `PROGRESSO.md` atualizados
- [ ] Decisão relevante virou ADR em `docs/decisoes/`

Rode local com `python3 -m http.server 8080`. Abrir o `index.html` por duplo
clique não funciona — os scripts não carregam.

Mensagem de commit: primeira linha curta no imperativo, corpo explicando
**por quê**. Em português.

---

## 4. O que atualizar em cada arquivo

| Arquivo | Quando | O que entra |
|---|---|---|
| `docs/ESTADO.md` | todo commit | Sobrescreve. É um retrato do agora, não um histórico. |
| `docs/PROGRESSO.md` | todo commit | Acrescenta no topo. Nunca apaga nem reescreve entrada antiga. |
| `docs/BACKLOG.md` | quando item nasce, muda de prioridade ou é concluído | Item concluído sai daqui e vira linha no PROGRESSO. |
| `docs/specs/` | antes de implementar comportamento novo | Uma spec por funcionalidade. |
| `docs/decisoes/` | quando uma escolha técnica fecha uma porta | ADR curto: contexto, decisão, consequência. |
| `docs/CONSTITUICAO.md` | quase nunca | Só com autorização explícita do Roberto. |

---

## 5. Arquitetura atual (resumo)

Site estático, sem build. HTML + CSS + JS puro, servido direto pela Vercel.

```
index.html    estrutura e textos fixos
styles.css    todo o visual
imagens.js    fotos em base64 no objeto MAPA_IMG
dados.js      catálogo, unidades, pagamento, frete  ← o arquivo do dia a dia
app.js        catálogo, filtros, carrinho, checkout, link do WhatsApp
```

Os scripts dependem desta ordem de carga: `imagens.js` → `dados.js` → `app.js`.
Todos usam `const` no topo de script clássico, então compartilham escopo global.

Detalhe importante: **não existe backend.** O pedido vira texto e vai para o
WhatsApp da unidade escolhida. Nada é persistido. Ver `docs/specs/SPEC-001`.

---

## 6. Limites — não faça sem autorização

- Não altere preço, produto ou dado de loja por conta própria. Esses números
  são do negócio do Bruno, não do código.
- Não remova o `X-Robots-Tag: noindex` do `vercel.json` sem o Roberto mandar.
  Ele só sai quando o domínio real for apontado.
- Não faça push.
- Não reintroduza service worker / PWA sem ADR. Ver `docs/decisoes/ADR-002`.
- Não suba token, credencial ou `.env` para o repositório.
