# Constituição do projeto

Princípios que não se quebram sem conversa com o Roberto. Se uma spec ou uma
implementação contraria algum destes pontos, o errado é a spec.

## 1. Quem usa o site

Morador da Região dos Lagos e pintor profissional de Araruama e Iguaba Grande.
Muitos chegam por anúncio, no celular, com 4G irregular, e não têm paciência
para cadastro. O site tem que funcionar para quem nunca comprou pela internet.

Consequência prática: **nada de login, cadastro ou senha.** O cliente monta o
pedido e fala com a loja. Qualquer proposta que exija criar conta para comprar
começa perdendo.

## 2. O WhatsApp é o balcão

A venda fecha no WhatsApp da unidade, com uma pessoa do outro lado. O site
qualifica e organiza o pedido; ele não substitui o vendedor. Isso é escolha de
negócio, não limitação técnica.

Se um dia entrar pagamento online, ele **convive** com o WhatsApp em vez de
substituí-lo.

## 3. Duas lojas, dois donos do atendimento

Araruama e Iguaba Grande têm WhatsApp, endereço e atendimento próprios. Todo
fluxo que fala com o cliente precisa saber de qual unidade está tratando.
Pedido que não sabe para qual loja vai é pedido perdido.

## 4. Preço é do negócio, não do código

Nenhum preço, produto, prazo ou condição de pagamento entra no site sem o Bruno
ter confirmado. Enquanto não confirmar, o dado fica marcado como exemplo e o
site avisa que é MVP.

Ninguém — inclusive o Claude — inventa número para preencher tela.

## 5. Velocidade é requisito, não enfeite

Celular ruim e 4G fraco são o cenário normal, não a exceção. Toda decisão
técnica passa por "isso deixa o site mais pesado?". Peso extra precisa se pagar
em venda.

## 6. O site é honesto sobre o que não sabe

Quando um dado não está confirmado — horário de corte, frete de outra cidade,
juros do parcelamento — o site diz "combinado no WhatsApp" em vez de afirmar
algo que a loja não vai cumprir. Prometer errado é pior que não prometer.

Por isso `LOJA.corteEntregaHoje`, `parcelaMinima` e `semJuros` aceitam `null`:
`null` significa "não afirma nada".

## 7. A documentação anda junto com o código

Commit sem atualização de `ESTADO.md` e `PROGRESSO.md` é commit incompleto.
Documentação que descreve um site que não existe mais é pior que documentação
nenhuma, porque ela mente com autoridade.
