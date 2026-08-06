# Documentação — Bruno das Tintas

Documentação viva do projeto, no modelo **SDD (Spec-Driven Development)**:
a especificação vem antes do código e a documentação anda junto com a mudança,
no mesmo commit. O objetivo prático é que qualquer sessão nova do Claude — ou
qualquer pessoa que entre no projeto — consiga se situar sem depender da
memória de ninguém.

## Mapa

| Arquivo | Responde a pergunta |
|---|---|
| [ESTADO.md](ESTADO.md) | **Como está o projeto agora?** |
| [PROGRESSO.md](PROGRESSO.md) | **O que aconteceu até aqui, e por quê?** |
| [BACKLOG.md](BACKLOG.md) | **O que falta, e o que vem primeiro?** |
| [CONSTITUICAO.md](CONSTITUICAO.md) | **O que nunca muda neste projeto?** |
| [specs/](specs/) | **Como cada funcionalidade deve se comportar?** |
| [decisoes/](decisoes/) | **Por que foi feito assim e não de outro jeito?** |

As regras de operação — quando escrever spec, quando commitar, o que atualizar —
estão no [CLAUDE.md](../CLAUDE.md) na raiz.

## O ciclo

```
ideia  →  SPEC (proposta)  →  Roberto aprova  →  implementa  →  commit
                                                                  ├── código
                                                                  ├── ESTADO.md   (sobrescreve)
                                                                  └── PROGRESSO.md (acrescenta)
```

Mudança sem alteração de comportamento — preço, produto, foto, correção de bug,
ajuste visual — pula a spec e vai direto para implementa → commit.

## Estados de uma spec

| Estado | Significa |
|---|---|
| `Proposta` | Escrita, aguardando o Roberto. **Não implementar.** |
| `Aprovada` | Liberada para implementação. |
| `Implementada` | No código. A spec passa a descrever o que existe. |
| `Descartada` | Não vai acontecer. Fica no repo com o motivo registrado. |

Spec descartada não se apaga. O motivo de não ter feito é informação tão útil
quanto o motivo de ter feito.
