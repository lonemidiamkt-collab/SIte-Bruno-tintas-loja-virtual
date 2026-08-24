# Estado do projeto

> Retrato do agora. Este arquivo é **sobrescrito** a cada commit — não é
> histórico. O histórico está em [PROGRESSO.md](PROGRESSO.md).

**Atualizado em:** 24/08/2026
**Branch ativa:** `main` — é a que a Vercel publica. Não há branch de trabalho
aberta; `catalogo-novo` já foi incorporada.
**Último commit publicado:** `3a937df`
**Versão no site:** v7 · catálogo real, aguardando domínio
**Stack:** HTML + CSS + JS puro, sem build
**Deploy:** Vercel, branch `main`

---

## No ar

| Área | Estado | Observação |
|---|---|---|
| Catálogo por setor | ✅ funcionando | 4 setores com produto; setor vazio não aparece |
| Filtro e busca | ✅ funcionando | por setor, marca e texto |
| Faixa de marcas | ✅ funcionando | 11 cadastradas, 4 com produto |
| Ficha do produto | ✅ funcionando | modal com foto, ficha técnica, cor e preço |
| Ficha técnica | ⚠️ 25 de 26 | falta a do Klasse Massa Acrílica 18L |
| Carta de cores | ✅ funcionando | 6 cartas reais, 105 cores, com bloco de cor visível |
| Cor sob medida | ✅ funcionando | card "quer uma cor personalizada" nas 8 linhas de máquina |
| Carrinho | ✅ funcionando | cor faz parte da identidade do item; upsell por setor |
| Checkout em 3 passos | ✅ funcionando | termina em mensagem no WhatsApp |
| Escolha de unidade | ✅ funcionando | Araruama e Iguaba, com CEP e Instagram próprios |
| Botão de Instagram | ✅ funcionando | por unidade, ao lado do WhatsApp |
| Destaque da semana | ✅ funcionando | sorteio determinístico, vira toda segunda (fuso SP) |
| Cálculo de frete | ⚠️ parcial | grátis nas 2 cidades; fora é "combinado no WhatsApp" |
| Desconto à vista | ✅ funcionando | 10% no PIX, dinheiro e débito |
| Parcelamento | ✅ funcionando | até 12x sem juros |
| Corte de entrega no mesmo dia | ⛔ desligado | `corteEntregaHoje: null` — falta o Bruno confirmar o horário |
| Cabeçalhos de segurança | ✅ funcionando | CSP, X-Frame-Options, Permissions-Policy, COOP, CORP |
| SEO regional | ✅ funcionando | título, descrição e LocalBusiness com Araruama e Iguaba |
| PWA / instalar no celular | ⛔ removido | decisão consciente, ver ADR-002 |
| Indexação no Google | ⛔ bloqueada | `noindex` proposital enquanto for URL de teste (ADR-003) |

## Pendente de terceiro

Coisas que não dependem de código, e sim de informação ou ação de fora:

- **Domínio `brunodastintas.com.br`** apontado para a Vercel. Enquanto não for,
  o `noindex` fica, e o SEO regional não vale nada na prática.
- **Perfis no Google Business** das duas lojas — é o item de SEO local de maior
  retorno, e não tem substituto no código. `dados.js` já tem o campo.
- **Horário de corte** para entrega no mesmo dia. `dados.js` → `LOJA.corteEntregaHoje`
- **Acabamento da Lukscolor** que a loja estoca (Brilhante, Fosco ou Acetinado —
  são cartas diferentes). O site usa o Brilhante.
- **Foto nova da carta da Maza** — a atual pegou só "CORES LISAS", cortou a
  borda direita e não tem as metálicas.
- **Preço da cor** nas 4 linhas sem `precoCorIgual`: hoje o site diz "confirme
  o valor da cor com a loja".
- **Artes 01 e 02** com correção de designer: título duplicado, "5%" que virou
  10% e "tinge na máquina" que não vale para a Rende Muito.

## Números do catálogo

- **26 produtos**: Qualyvinil 14 · Coral 8 · Lukscolor 2 · Maza 2
- Por setor: interna 14 · externa 6 · madeira e metal 6 · preparação 6
  (produto pode servir mais de um setor)
- Impermeabilizantes e Acessórios sem produto, portanto escondidos
- Faixa de preço: R$ 16,70 (Massa Corrida 900ml) a R$ 928,00 (Decora Diamante 18L)
- **26 fotos**, uma por produto, em `fotos/` (460 KB, lazy)
- **6 cartas de cor, 105 cores**, cada uma com hex medido na foto da carta
- 12 produtos com cores prontas · 8 tingidos na máquina
- 6 setores e 11 marcas cadastrados, 2 unidades
- 4 formas de pagamento, 3 destinos de entrega
- Artes e logo em `artes/` (424 KB); `imagens.js` tem só os logos de marca (25 KB)
- Código: `app.js` 48 KB · `styles.css` 38 KB · `dados.js` 24 KB · `index.html` 19 KB

## Riscos conhecidos

| Risco | Impacto |
|---|---|
| Cor da tela ≠ cor da lata | O hex sai de foto de papel sob luz de loja. O site avisa embaixo da carta, mas cliente que decidir só pela tela pode se frustrar. Ver ADR-005. |
| Sem persistência de pedido | Se o WhatsApp não abrir, o pedido evapora. Ninguém fica sabendo que existiu. |
| Catálogo em arquivo | Toda mudança de preço exige alguém que saiba mexer em código e fazer deploy. É a razão de ser da SPEC-002. |
| Preço da cor não confirmado em 4 linhas | O site não afirma; empurra para o WhatsApp. Funciona, mas gasta atendimento. |

## Bloqueio ativo

Nenhum.

## Fluxo de deploy — funcionando ponta a ponta

```
git add -A  →  git commit  →  git push  →  Vercel publica sozinha
```

**URL de produção:** https://s-ite-bruno-tintas-loja-virtual.vercel.app

A credencial do GitHub está salva no keychain do macOS, então o push não pede
senha. **Push publica na loja ao vivo** — por isso o `CLAUDE.md` manda commitar
automático mas nunca dar push sozinho.

⚠️ Existe um **segundo projeto Vercel duplicado** (`...-b1hj`) ligado no mesmo
repositório, que builda junto a cada push. Ver BACKLOG, P1.

## Como rodar local

```
python3 -m http.server 8080
```

Ou, com os mesmos cabeçalhos do `vercel.json` (é o que vale para testar CSP):
o preview `bruno-local`, definido em `.claude/launch.json` na pasta de projetos.
Abrir o `index.html` por duplo clique não funciona — os scripts não carregam.
