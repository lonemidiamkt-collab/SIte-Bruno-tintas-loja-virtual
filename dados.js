/* =========================================================
   Bruno das Tintas — dados do catálogo e das lojas
   Único arquivo a editar para incluir/tirar produto, marca,
   setor ou loja. Quando migrar para Next.js + Supabase,
   isto aqui vira as tabelas do banco.
   ========================================================= */

/* -------- unidades --------
   whatsapp : só números, com 55 na frente
   maps     : troque pelo link curto do perfil da loja no Google
              Business (Compartilhar → Copiar link) quando tiver.
              Até lá, a busca por endereço resolve. */
const UNIDADES = [
  {
    id: 'araruama',
    nome: 'Araruama',
    endereco: 'RJ-106, Vila Capri',
    enderecoCurto: 'RJ-106, Vila Capri',
    cidade: 'Araruama / RJ',
    cep: '28981-630',   // Rod. Amaral Peixoto (RJ-106), Vila Capri — ViaCEP/Correios
    whatsapp: '5522998224630',
    whatsappVisivel: '(22) 99822-4630',
    prontoEm: '15 min',
    instagram: 'https://www.instagram.com/brunotintas/',
    maps: 'https://www.google.com/maps/search/?api=1&query=' +
          encodeURIComponent('Bruno das Tintas, RJ-106, Vila Capri, Araruama - RJ')
  },
  {
    id: 'iguaba',
    nome: 'Iguaba Grande',
    endereco: 'R. Capitão Jorge Soares, 102 — Loja A, Estação',
    enderecoCurto: 'R. Cap. Jorge Soares, 102',
    cidade: 'Iguaba Grande / RJ',
    cep: '28960-514',   // R. Capitão Jorge Soares, Estação — ViaCEP/Correios
    whatsapp: '5522992272479',
    whatsappVisivel: '(22) 99227-2479',
    prontoEm: '15 min',
    instagram: 'https://www.instagram.com/brunotintasiguaba/',
    maps: 'https://www.google.com/maps/search/?api=1&query=' +
          encodeURIComponent('Bruno das Tintas, Rua Capitão Jorge Soares, 102, Estação, Iguaba Grande - RJ')
  }
];

const LOJA = {
  razaoSocial: 'Bruno de Figueiredo Tintas',
  cnpj: '21.744.703/0001-02',
  anos: 10,
  parcelas: 12,           // máximo de vezes no crédito
  parcelaMinima: null,    // valor mínimo por parcela; null = sem mínimo
  semJuros: true,         // confirmado pelo Bruno em 17/08/2026
  descontoAvista: 0.10,   // 10% no PIX, dinheiro e débito (Bruno, 17/08/2026)

  /* Horário de corte para entregar no mesmo dia.
     Deixe null enquanto o cliente não confirmar o horário real.
     Com um valor ('15:00'), o site mostra quanto falta para o corte. */
  corteEntregaHoje: null,

  /* Horário confirmado pelo Bruno em 17/08/2026. Domingo não foi citado —
     está como fechado; confirmar se abre. */
  horario: {
    semana: 'Segunda a sexta, 7h30 às 18h',
    sabado: 'Sábado, 8h às 14h',
    domingo: 'Domingo fechado'
  }
};

/* Para onde vai a entrega. frete: 0 = grátis, null = combinado no WhatsApp.
   loja = unidade que atende; null significa que o cliente escolhe. */
const DESTINOS = [
  { id: 'araruama', nome: 'Araruama',            frete: 0,    loja: 'araruama', nota: 'Frete grátis' },
  { id: 'iguaba',   nome: 'Iguaba Grande',       frete: 0,    loja: 'iguaba',   nota: 'Frete grátis' },
  { id: 'lagos',    nome: 'Outra cidade da Região dos Lagos', frete: null, loja: null, nota: 'Frete e data combinados no WhatsApp' }
];

/* Sugestão de itens ao adicionar produto de cada setor (aumenta o ticket).
   Vale o id do produto. Item já no carrinho não é sugerido de novo. */
/* Refeito em 17/08/2026 com os ids do catálogo real.
   Atenção técnica: massa corrida é SÓ para interior. Por isso a área externa
   sugere massa acrílica, e não massa corrida. */
const UPSELL = {
  interna:    [22, 25],   // massa corrida 3,6L + massa acrílica 3,6L
  externa:    [25],       // só massa acrílica
  madeira:    [],
  preparacao: [],
  imper:      [],
  acessorios: []
};

/* Formas de pagamento. desconto = aplica o desconto à vista.
   O pagamento é combinado no WhatsApp; o site só registra a escolha. */
const PAGAMENTOS = [
  { id: 'pix',      nome: 'PIX',              desconto: true,  nota: 'Desconto à vista' },
  { id: 'dinheiro', nome: 'Dinheiro',         desconto: true,  nota: 'Desconto à vista' },
  { id: 'debito',   nome: 'Cartão de débito', desconto: true,  nota: 'Desconto à vista' },
  { id: 'credito',  nome: 'Cartão de crédito',desconto: false, nota: 'Em até 12x sem juros', parcelavel: true }
];

/* Setores. Setor sem produto não aparece no site. */
const SETORES = [
  { id: 'interna',    nome: 'Área interna',       desc: 'Sala, quarto, cozinha e teto' },
  { id: 'externa',    nome: 'Área externa',       desc: 'Fachada, muro e área aberta' },
  { id: 'madeira',    nome: 'Madeira e metal',    desc: 'Porta, janela, portão e móvel' },
  { id: 'preparacao', nome: 'Preparação',         desc: 'Massa corrida, massa acrílica e selador' },
  { id: 'imper',      nome: 'Impermeabilizantes', desc: 'Laje, telhado e infiltração' },
  { id: 'acessorios', nome: 'Acessórios',         desc: 'Rolo, pincel, lona e fita' }
];

/* Marcas confirmadas pelo cliente.
   logo = arquivo em assets/img/marcas (sem extensão). Sem logo, cai no nome escrito.
   Marca sem produto cadastrado não aparece na faixa. */
const MARCAS = [
  { nome: 'Coral',            logo: 'coral' },
  { nome: 'Qualyvinil',       logo: null },
  { nome: 'Lukscolor',        logo: null },
  { nome: 'Maza',             logo: null },
  { nome: 'Sherwin Williams', logo: 'sherwin-williams' },
  { nome: 'Atlas',            logo: 'atlas' },
  { nome: 'Textura Rio',      logo: 'textura-rio' },
  { nome: 'Suvinil',          logo: null },
  { nome: 'Sinteplast',       logo: null },
  { nome: 'Sika',             logo: null },
  { nome: 'IF',               logo: null }
];

/* -------- cores prontas --------
   Carta padrão da linha, para o cliente escolher no site. Não é lista de
   estoque: a loja confirma a cor no WhatsApp antes de fechar — nenhum pedido
   é cobrado pelo site, então há sempre uma conferência humana antes da venda.

   Vale para os produtos com cor:'prontas'. Nos de cor:'maquina' (linha Decora)
   não existe carta: a cor é feita na hora e cada uma tem um valor, por isso
   o site abre um convite para orçamento em vez de listar opções. */
const CARTAS = {
  /* carta de parede — linha Rende Muito e acrílicas econômicas */
  parede: [
    'Branco', 'Branco Gelo', 'Palha', 'Areia', 'Pérola', 'Marfim', 'Vanilla',
    'Cromo Suave', 'Camurça', 'Concreto', 'Amarelo Canário', 'Amarelo Frevo',
    'Laranja Cítrico', 'Laranja Imperial', 'Laranja Maracatu', 'Pêssego',
    'Flamingo', 'Rosa Açaí', 'Vermelho Cardinal', 'Lilás', 'Verde Primavera',
    'Verde Limão', 'Verde Kiwi', 'Verde Angra', 'Azul Sereno', 'Oceano',
    'Azul Profundo'
  ],

  /* carta de esmalte — cores padrão de esmalte sintético e base água.
     Confirmar com o Bruno o que ele mantém na prateleira. */
  esmalte: [
    'Branco', 'Gelo', 'Creme', 'Areia', 'Amarelo', 'Laranja',
    'Vermelho', 'Marrom Conhaque', 'Tabaco', 'Preto',
    'Cinza Médio', 'Cinza Escuro', 'Platina', 'Alumínio',
    'Azul França', 'Azul Del Rey', 'Verde Folha'
  ]
};

/* Coral Rende Muito: o branco vem 18L (galão 3,6L) e as cores vêm 16L
   (galão 3,2L). O PREÇO É O MESMO — é tinta concentrada, então a colorida
   rende igual com menos litro. Confirmado pelo Bruno em 17/08/2026. */
const VOLUME_POR_COR = {
  9:  { branco: '18L',  colorido: '16L'  },
  10: { branco: '3,6L', colorido: '3,2L' }
};

/* -------- fichas técnicas --------
   Rendimento, demãos e secagem vindos do BOLETIM TÉCNICO DO FABRICANTE.
   Regra: campo sem fonte confiável fica de fora. Rendimento errado faz o
   cliente comprar lata a menos e voltar irritado — melhor não afirmar.

   O rendimento é POR EMBALAGEM, então cada tamanho tem o seu número: não dá
   para dividir o da lata pelo galão. Onde o boletim não traz a embalagem que
   a loja vende, o campo fica vazio de propósito.

   ATENÇÃO à unidade — os fabricantes usam DUAS métricas diferentes:
     "no total"   = área já pintada com todas as demãos (tintas de parede)
     "por demão"  = área de UMA demão (esmaltes e massas)
   Trocar uma pela outra infla o número em 2 a 3 vezes e faz o cliente comprar
   tinta a menos. O texto de cada ficha diz qual é. */
const FICHAS = {
  /* --- Coral, BT AkzoNobel --- */
  1:  { rendimento: 'até 110 m² no total', demaos: '2 a 3 demãos', secagem: '4h entre demãos',
        onde: 'Feita para ambiente interno; também serve em área externa' },
  2:  { rendimento: 'até 22 m² no total',  demaos: '2 a 3 demãos', secagem: '4h entre demãos',
        onde: 'Feita para ambiente interno; também serve em área externa' },
  3:  { rendimento: 'até 105 m² no total', demaos: '2 a 3 demãos', secagem: '4h entre demãos',
        onde: 'Feita para ambiente interno; também serve em área externa' },
  4:  { rendimento: 'até 21 m² no total',  demaos: '2 a 3 demãos', secagem: '4h entre demãos',
        onde: 'Feita para ambiente interno; também serve em área externa' },
  5:  { rendimento: 'até 150 m² no total', demaos: '2 a 3 demãos', secagem: '4h entre demãos',
        onde: 'Feita para ambiente interno; também serve em área externa' },
  6:  { rendimento: 'até 30 m² no total',  demaos: '2 a 3 demãos', secagem: '4h entre demãos',
        onde: 'Feita para ambiente interno; também serve em área externa' },
  9:  { rendimento: 'até 170 m² no total', demaos: '2 a 3 demãos', secagem: '4h entre demãos',
        onde: 'Paredes e tetos, dentro e fora',
        aviso: 'É concentrada: dilua de 50% a 80% com água. O rendimento acima já conta a diluição.' },
  10: { rendimento: 'até 34 m² no total',  demaos: '2 a 3 demãos', secagem: '4h entre demãos',
        onde: 'Paredes e tetos, dentro e fora',
        aviso: 'É concentrada: dilua de 50% a 80% com água. O rendimento acima já conta a diluição.' },

  /* --- Maza, BT do fabricante --- */
  15: { rendimento: 'até 36 m² por demão', demaos: '2 a 3 demãos', secagem: '4 a 6h entre demãos',
        onde: 'Portas, portões e estruturas de metal, dentro e fora',
        aviso: 'Vai direto sobre o metal, mesmo enferrujado — dispensa fundo anticorrosivo.' },
  16: { demaos: '2 a 3 demãos', secagem: '4 a 6h entre demãos',
        onde: 'Portas, portões e estruturas de metal, dentro e fora',
        aviso: 'Vai direto sobre o metal, mesmo enferrujado — dispensa fundo anticorrosivo.' },

  /* --- Lukscolor, BT rev. 07 --- */
  17: { rendimento: 'até 75 m² por demão', demaos: '2 demãos, ou mais se precisar', secagem: '2h entre demãos',
        onde: 'Madeira, metal, alumínio, azulejo, PVC e alvenaria, dentro e fora' },
  18: { rendimento: 'até 20 m² por demão', demaos: '2 demãos, ou mais se precisar', secagem: '2h entre demãos',
        onde: 'Madeira, metal, alumínio, azulejo, PVC e alvenaria, dentro e fora' },

  /* --- Qualyvinil, BT do fabricante --- */
  7:  { rendimento: 'até 70 m² no total',  demaos: '2 a 3 demãos', secagem: '3 a 4h entre demãos',
        onde: 'Paredes internas de reboco, massa, gesso e concreto' },
  8:  { rendimento: 'até 14 m² no total',  demaos: '2 a 3 demãos', secagem: '3 a 4h entre demãos',
        onde: 'Paredes internas de reboco, massa, gesso e concreto' },
  11: { rendimento: 'até 140 m² no total', demaos: '2 a 3 demãos', secagem: '4h entre demãos',
        onde: 'Paredes de reboco, massa, textura e concreto, dentro e fora' },
  12: { rendimento: 'até 28 m² no total',  demaos: '2 a 3 demãos', secagem: '4h entre demãos',
        onde: 'Paredes de reboco, massa, textura e concreto, dentro e fora' },
  13: { rendimento: 'até 120 m² no total', demaos: '2 a 3 demãos', secagem: '4h entre demãos',
        onde: 'Paredes de reboco, massa, textura e concreto, dentro e fora' },
  14: { rendimento: 'até 24 m² no total',  demaos: '2 a 3 demãos', secagem: '4h entre demãos',
        onde: 'Paredes de reboco, massa, textura e concreto, dentro e fora' },
  19: { rendimento: 'até 50 m² por demão', demaos: '2 a 3 demãos', secagem: '8 a 10h entre demãos',
        onde: 'Metal, madeira, cerâmica não vitrificada e alvenaria',
        aviso: 'Dilua com aguarrás. Nunca use thinner.' },
  20: { rendimento: 'até 12 m² por demão', demaos: '2 a 3 demãos', secagem: '8 a 10h entre demãos',
        onde: 'Metal, madeira, cerâmica não vitrificada e alvenaria',
        aviso: 'Dilua com aguarrás. Nunca use thinner.' },
  21: { rendimento: 'até 60 m² por demão', demaos: '2 a 3 demãos', secagem: '3h entre demãos',
        onde: 'Nivelar paredes internas de reboco, massa fina, gesso e concreto' },

  /* Massa corrida 3,6L e 900ml, massa acrílica e a linha Klasse: o boletim dá
     rendimento por QUILO (6 kg, 25 kg) e a loja vende por litro. Sem
     equivalência confiável, o rendimento fica de fora em vez de estimado. */
  22: { demaos: '2 a 3 demãos', secagem: '3h entre demãos',
        onde: 'Nivelar paredes internas de reboco, massa fina, gesso e concreto' },
  23: { demaos: '2 a 3 demãos', secagem: '3h entre demãos',
        onde: 'Nivelar paredes internas de reboco, massa fina, gesso e concreto' },
  25: { demaos: '2 a 3 demãos', secagem: '3h entre demãos',
        onde: 'Nivelar paredes internas e externas, inclusive área molhável' },
  26: { demaos: '2 a 3 demãos', secagem: '3h entre demãos',
        onde: 'Nivelar paredes internas e externas, inclusive área molhável' }
};

/* Produtos.
   foto = chave da foto em fotos/<chave>.webp

   cor  = COMO A COR FUNCIONA NESTE PRODUTO. Define o aviso que o cliente lê.
     'maquina' → tingido na máquina, na hora. O preço é o da base branca;
                 a cor sai por orçamento à parte. (linha Decora)
     'prontas' → existem cores prontas de fábrica. O preço mostrado é o do
                 branco; outra cor pode ter volume e preço diferentes.
     null      → não se afirma nada (massas, e o que ainda falta confirmar).

   ATENÇÃO — Coral Rende Muito: o branco vem 18L (galão 3,6L) e as cores
   vêm 16L (galão 3,2L). Volume diferente, então NÃO pode ser o mesmo preço.
   Por isso o nome diz "Branco": o preço cadastrado é só do branco.

   CATÁLOGO REAL — 26 itens, preços do cupom de 17/08/2026.
   A soma dos 26 confere com o total impresso no cupom (R$ 6.054,70).

   Todos os preços são da BASE BRANCA.

   O "Destaque da semana" é automático: rodízio semanal que alterna os
   setores (ver produtoDestaque() no app.js). Não precisa marcar nada.
   Para fixar um produto à mão, ponha destaque:true nele — isso ganha do
   rodízio. Não confunda com oferta:true, que mostra o selo "Oferta" ao
   cliente e só vale com desconto de verdade. */
const PRODUTOS = [
  /* ---- área interna: linha Decora (premium) + econômica de interior ---- */
  { id: 1,  set: 'interna', marca: 'Coral',
    nome: 'Decora Diamante Semi Brilho Acrílico Premium 18L', preco: 928.00,
    foto: 'decora-diamante-18l', cor: 'maquina', oferta: false },

  { id: 2,  set: 'interna', marca: 'Coral',
    nome: 'Decora Diamante Semi Brilho Acrílico Premium 3,6L', preco: 220.00,
    foto: 'decora-diamante-36l', cor: 'maquina', oferta: false },

  { id: 3,  set: 'interna', marca: 'Coral',
    nome: 'Decora Seda Acetinado Acrílico Premium 18L', preco: 846.00,
    foto: 'decora-seda-18l', cor: 'maquina', oferta: false },

  { id: 4,  set: 'interna', marca: 'Coral',
    nome: 'Decora Seda Acetinado Acrílico Premium 3,6L', preco: 220.00,
    foto: 'decora-seda-36l', cor: 'maquina', oferta: false },

  { id: 5,  set: 'interna', marca: 'Coral',
    nome: 'Decora Matte Fosco Acrílico Premium 18L', preco: 670.00,
    foto: 'decora-fosco-18l', cor: 'maquina', oferta: false },

  { id: 6,  set: 'interna', marca: 'Coral',
    nome: 'Decora Matte Fosco Acrílico Premium 3,6L', preco: 177.00,
    foto: 'decora-fosco-36l', cor: 'maquina', oferta: false },

  { id: 7,  set: 'interna', marca: 'Qualyvinil',
    nome: 'Acrílica Cor Econômico Interior 18L', preco: 197.00,
    foto: 'qualy-economica-18l', cor: 'prontas', carta: 'parede', oferta: false },

  { id: 8,  set: 'interna', marca: 'Qualyvinil',
    nome: 'Acrílica Cor Econômico Interior 3,6L', preco: 57.00,
    foto: 'qualy-economica-36l', cor: 'prontas', carta: 'parede', oferta: false },

  /* ---- alto rendimento: Rende Muito serve parede e teto (interna) E
       fachada e muro (externa). O Bruno confirmou que vale nos dois, então
       `set` é lista. O Fosco Completo segue só externa até ele confirmar. ---- */
  { id: 9,  set: ['interna', 'externa'], marca: 'Coral',
    nome: 'Rende Muito Tinta Concentrada Acrílico Fosco Branco 18L', preco: 475.00,
    foto: 'coral-rende-muito-18l', cor: 'prontas', carta: 'parede', oferta: false },

  { id: 10, set: ['interna', 'externa'], marca: 'Coral',
    nome: 'Rende Muito Tinta Concentrada Acrílico Fosco Branco 3,6L', preco: 125.00,
    foto: 'coral-rende-muito-36l', cor: 'prontas', carta: 'parede', oferta: false },

  { id: 11, set: ['interna', 'externa'], marca: 'Qualyvinil',
    nome: 'Rende Muito+ Acrílico Standard 18L', preco: 379.00,
    foto: 'qualy-rende-muito-18l', cor: 'prontas', carta: 'parede', oferta: false },

  { id: 12, set: ['interna', 'externa'], marca: 'Qualyvinil',
    nome: 'Rende Muito+ Acrílico Standard 3,6L', preco: 99.00,
    foto: 'qualy-rende-muito-36l', cor: 'prontas', carta: 'parede', oferta: false },

  { id: 13, set: 'externa', marca: 'Qualyvinil',
    nome: 'Fosco Completo Acrílico Premium 18L', preco: 490.00,
    foto: 'qualy-fosco-completo-18l', cor: 'maquina', oferta: false },

  { id: 14, set: 'externa', marca: 'Qualyvinil',
    nome: 'Fosco Completo Acrílico Premium 3,6L', preco: 130.00,
    foto: 'qualy-fosco-completo-36l', cor: 'maquina', oferta: false },

  /* ---- madeira e metal: esmaltes ---- */
  { id: 15, set: 'madeira', marca: 'Maza',
    nome: 'Direto na Ferrugem Esmalte Sintético Premium 3,6L', preco: 235.00,
    foto: 'maza-ferrugem-36l', cor: 'prontas', carta: 'esmalte', oferta: false },

  { id: 16, set: 'madeira', marca: 'Maza',
    nome: 'Direto na Ferrugem Esmalte Sintético Premium 900ml', preco: 65.00,
    foto: 'maza-ferrugem-900ml', cor: 'prontas', carta: 'esmalte', oferta: false },

  { id: 17, set: 'madeira', marca: 'Lukscolor',
    nome: 'Esmalte Premium Plus Base Água 3,6L', preco: 166.90,
    foto: 'lukscolor-esmalte-36l', cor: 'prontas', carta: 'esmalte', oferta: false },

  { id: 18, set: 'madeira', marca: 'Lukscolor',
    nome: 'Esmalte Premium Plus Base Água 900ml', preco: 49.90,
    foto: 'lukscolor-esmalte-900ml', cor: 'prontas', carta: 'esmalte', oferta: false },

  { id: 19, set: 'madeira', marca: 'Qualyvinil',
    nome: 'Esmalte Sintético Standard 3,6L', preco: 135.00,
    foto: 'qualy-esmalte-36l', cor: 'prontas', carta: 'esmalte', oferta: false },

  { id: 20, set: 'madeira', marca: 'Qualyvinil',
    nome: 'Esmalte Sintético Standard 900ml', preco: 38.50,
    foto: 'qualy-esmalte-900ml', cor: 'prontas', carta: 'esmalte', oferta: false },

  /* ---- preparação: massas (não vão para a máquina de tingimento) ---- */
  { id: 21, set: 'preparacao', marca: 'Qualyvinil',
    nome: 'Massa Corrida 25kg', preco: 75.90,
    foto: 'massa-corrida-25kg', cor: null, oferta: false },

  { id: 22, set: 'preparacao', marca: 'Qualyvinil',
    nome: 'Massa Corrida 3,6L', preco: 27.90,
    foto: 'massa-corrida-36l', cor: null, oferta: false },

  { id: 23, set: 'preparacao', marca: 'Qualyvinil',
    nome: 'Massa Corrida 900ml', preco: 16.70,
    foto: 'massa-corrida-900ml', cor: null, oferta: false },

  { id: 24, set: 'preparacao', marca: 'Qualyvinil',
    nome: 'Klasse Massa Acrílica 18L', preco: 166.00,
    foto: 'klasse-massa-acrilica-18l', cor: null, oferta: false },

  { id: 25, set: 'preparacao', marca: 'Qualyvinil',
    nome: 'Massa Acrílica 3,6L', preco: 46.00,
    foto: 'massa-acrilica-36l', cor: null, oferta: false },

  { id: 26, set: 'preparacao', marca: 'Qualyvinil',
    nome: 'Massa Acrílica 900ml', preco: 18.90,
    foto: 'massa-acrilica-900ml', cor: null, oferta: false }
];
