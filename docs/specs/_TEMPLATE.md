# SPEC-NNN — <título curto>

- **Estado:** Proposta | Aprovada | Implementada | Descartada
- **Criada em:** DD/MM/AAAA
- **Última mudança de estado:** DD/MM/AAAA
- **Relacionadas:** SPEC-XXX, ADR-XXX

---

## Problema

Qual dor real existe hoje. Descreva o problema pela ótica de quem sofre com
ele — o cliente da loja, o Bruno, ou quem mantém o código. Nada de solução
aqui.

## Por que agora

O que mudou para isso virar prioridade. Se a resposta é "não mudou nada",
provavelmente é backlog, não spec.

## Resultado esperado

O que passa a ser verdade quando isso estiver pronto. Escreva de forma que dê
para verificar depois se aconteceu ou não.

## Comportamento

O que o sistema faz, em cenários concretos. Use o formato "quando X, então Y".
Cubra o caminho feliz e o que acontece quando dá errado.

### Casos de borda
O que acontece com carrinho vazio, sem internet, dado faltando, valor zero,
duas lojas ao mesmo tempo.

## Fora de escopo

O que esta spec **não** vai fazer, e por quê. Esta seção evita que a spec
cresça sozinha no meio da implementação.

## Impacto

| Área | Muda? | O que |
|---|---|---|
| `dados.js` | | |
| `app.js` | | |
| `index.html` / `styles.css` | | |
| Deploy / Vercel | | |
| Operação da loja | | |

## Como verificar

Passos concretos para conferir que funcionou. Alguém que não escreveu a spec
tem que conseguir seguir.

## Riscos

O que pode dar errado, e o que fazer se der.

## Decisões em aberto

Perguntas que precisam de resposta do Roberto ou do Bruno antes de implementar.
Spec com pergunta aberta não sai de `Proposta`.
