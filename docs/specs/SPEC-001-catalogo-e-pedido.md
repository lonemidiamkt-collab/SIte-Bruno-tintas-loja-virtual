# SPEC-001 — Catálogo e pedido pelo WhatsApp

- **Estado:** Implementada
- **Criada em:** 06/08/2026
- **Natureza:** spec **retroativa** — descreve o que já existe no site, escrita
  depois do código para servir de base de comparação. Toda mudança daqui em
  diante parte deste documento.
- **Relacionadas:** ADR-001, ADR-002, ADR-003, SPEC-002

---

## Problema

O cliente vê o anúncio no Instagram, quer saber preço, e cai direto no
WhatsApp perguntando "quanto é a tinta?". A loja gasta atendimento repetindo
preço e tirando dúvida básica, e o cliente que chega fora do horário não é
respondido. Quem está com pressa desiste.

## Resultado esperado

O cliente monta o pedido sozinho, vê preço e condição antes de falar com
alguém, e chega no WhatsApp da loja certa com o pedido pronto. O atendente
recebe uma mensagem organizada em vez de "bom dia, quanto é?".

## Comportamento

### Catálogo

- O site mostra os produtos agrupados em **setores**: área interna, área
  externa, madeira, impermeabilizantes e acessórios.
- **Setor sem nenhum produto cadastrado não aparece.** O site nunca mostra
  categoria vazia.
- **Marca sem produto cadastrado não aparece** na faixa de marcas.
- Marca sem logo cai no nome escrito, sem quebrar o layout.
- O cliente filtra por setor, por marca, ou busca por texto.
- Produto marcado como `tinta: true` mostra o aviso de tingimento na hora.
- Produto marcado como `oferta: true` recebe destaque.

### Carrinho

- Ao adicionar um produto, o site **sugere itens complementares** conforme o
  setor (rolo, pincel, lona). Item que já está no carrinho não é sugerido de
  novo.
- O cliente muda quantidade e remove item.
- Uma barra fixa mostra quantidade e total enquanto ele navega.

### Preço e condição

- **5% de desconto** no PIX e no dinheiro. O desconto aparece no total assim
  que a forma de pagamento é escolhida — não é surpresa no fim.
- Crédito em até **12x**, sem valor mínimo de parcela.
- O site **não afirma se o parcelamento tem juros**, porque a loja ainda não
  confirmou. Ver Constituição, princípio 6.

### Entrega

- Araruama e Iguaba Grande: **frete grátis**.
- Outra cidade da Região dos Lagos: **"frete e data combinados no WhatsApp"**.
  O site não inventa valor.
- Retirada na loja: pronto em 15 minutos.

### Checkout

Modal de **3 passos**:

1. **Quem é e como recebe** — nome, e retirada ou entrega
2. **Como paga** — forma de pagamento e, se for crédito, as parcelas
3. **Detalhes e envio** — confirma e dispara

Ao fim, o site gera uma **nota de pedido em texto**, com número gerado na hora,
e abre o WhatsApp **da unidade que atende aquele pedido** já com a mensagem
montada.

### Escolha da unidade

- Quando o destino define a loja (Araruama → loja de Araruama), o site resolve
  sozinho.
- Quando não define — outra cidade, ou contato genérico — o site **pergunta com
  qual loja o cliente quer falar**. Nunca chuta.

### Casos de borda

| Situação | Comportamento |
|---|---|
| Carrinho vazio | Não deixa avançar para o checkout |
| Setor sem produto | Setor não aparece |
| Marca sem produto | Marca não aparece na faixa |
| Marca sem logo | Mostra o nome escrito |
| Frete `null` | Mostra "combinado no WhatsApp", soma zero no total |
| `corteEntregaHoje: null` | Não mostra contagem para o corte |
| `semJuros: null` | Não afirma nada sobre juros |
| Destino sem loja definida | Pergunta ao cliente qual unidade |

## Fora de escopo

- **Pagamento online.** O pedido é fechado no WhatsApp. Ver Constituição,
  princípio 2.
- **Login ou cadastro.** Ver Constituição, princípio 1.
- **Estoque.** O site não sabe se o produto acabou; quem sabe é a loja.
- **Persistência do pedido.** Nada é gravado. Ver "Riscos".

## Impacto

| Área | O que |
|---|---|
| `dados.js` | Fonte única de produtos, unidades, pagamento, frete, upsell |
| `imagens.js` | `MAPA_IMG`, fotos em base64 |
| `app.js` | Render do catálogo, carrinho, nota do pedido, checkout, WhatsApp |
| `index.html` / `styles.css` | Estrutura e visual |
| Operação | Toda venda cai no WhatsApp da unidade certa |

## Como verificar

1. `python3 -m http.server 8080` e abrir `http://localhost:8080`
2. Console sem erro
3. Adicionar produto → badge do carrinho sobe, total confere
4. Escolher PIX → total cai 5%
5. Escolher crédito → aparecem as parcelas
6. Escolher "outra cidade" → frete vira "combinado no WhatsApp"
7. Fechar o pedido → WhatsApp abre no número da unidade certa, com a nota
8. Esvaziar `PRODUTOS` de um setor → o setor some do site

## Riscos

| Risco | Mitigação atual |
|---|---|
| Preços de exemplo no ar | Aviso "v6 · MVP para aprovação interna" no topo |
| Pedido não persiste | Nenhuma. Se o WhatsApp não abrir, o pedido some sem rastro. Endereçado na SPEC-002. |
| Catálogo em arquivo | Nenhuma. Toda mudança de preço exige código e deploy. Razão de ser da SPEC-002. |

## Decisões em aberto

Nenhuma nesta spec. As pendências de dado (preço, corte de entrega, juros)
estão no [BACKLOG](../BACKLOG.md), não aqui — são informação que falta, não
comportamento indefinido.
