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

/* -------- cartas de cor --------
   Transcritas das cartas físicas que o Bruno fotografou em 24/08/2026
   (as fotos estão em docs/cartas-de-cor). Cada linha tem a SUA carta: cor de
   parede e cor de esmalte não são a mesma lista, e cada marca tem a dela.

   `c` é o código da carta. O cliente escolhe pelo nome; o código viaja junto
   no pedido, para a loja separar a lata certa sem precisar perguntar. */
const CARTAS = {
  /* Coral Rende Muito — a carta diz, na tarja: "cores prontas ao mesmo preço
     do branco". É a confirmação impressa do que o Bruno tinha falado. */
  'coral-rende-muito': [
    {c:'001',n:'Branco',h:'#F6F8F0'}, {c:'002',n:'Branco Gelo',h:'#FBFDEE'},
    {c:'062',n:'Crômio',h:'#D8DAD3'}, {c:'040',n:'Cinza Alpino',h:'#ECECE6'},
    {c:'039',n:'Tubarão Branco',h:'#C2C6C4'}, {c:'844',n:'Palha',h:'#EDE9CA'},
    {c:'820',n:'Areia',h:'#F1ECD2'}, {c:'018',n:'Pérola',h:'#EEE5C6'},
    {c:'818',n:'Marfim',h:'#F9F0C7'}, {c:'814',n:'Camurça',h:'#C5B388'},
    {c:'666',n:'Concreto',h:'#A6AA89'}, {c:'858',n:'Madeira Acinzentada',h:'#C4C1B5'},
    {c:'393',n:'Suco de Goiaba',h:'#C86960'}, {c:'811',n:'Laranja Imperial',h:'#EB9A58'},
    {c:'349',n:'Laranja Maracatu',h:'#E48241'}, {c:'388',n:'Pote de Argila',h:'#D19C8A'},
    {c:'540',n:'Sino',h:'#FFFFA2'}, {c:'513',n:'Amarelo Frevo',h:'#DEBB17'},
    {c:'503',n:'Cromo Suave',h:'#EBCD82'}, {c:'636',n:'Capim Limão',h:'#CBD8AA'},
    {c:'654',n:'Verde Kiwi',h:'#B8D0A1'}, {c:'612',n:'Verde Limão',h:'#B0DD6D'},
    {c:'611',n:'Verde Angra',h:'#5DAF75'}, {c:'170',n:'Oceano',h:'#3695D7'},
    {c:'974',n:'Azul Sereno',h:'#B2CCD9'}, {c:'140',n:'Azul dos Andes',h:'#93B3D3'},
    {c:'156',n:'Azul Profundo',h:'#4380C2'}
  ],

  'qualy-rende-muito': [
    {c:'001',n:'Branco',h:'#F8F8F5'}, {c:'003',n:'Branco Gelo',h:'#F9FAED'},
    {c:'004',n:'Algodão Egípcio',h:'#E8E5D3'}, {c:'007',n:'Cinza Escala',h:'#BBC0BC'},
    {c:'030',n:'Palha',h:'#EBE4C3'}, {c:'031',n:'Pérola',h:'#F9F4DA'},
    {c:'032',n:'Areia',h:'#E7DAB0'}, {c:'033',n:'Marfim',h:'#EFDA82'},
    {c:'039',n:'Amarelo Sol',h:'#F0D334'}, {c:'042',n:'Terracota',h:'#CD7C62'},
    {c:'051',n:'Azul Índigo',h:'#1C3D70'}, {c:'055',n:'Azul Sereno',h:'#BFDBD6'},
    {c:'067',n:'Kiwi',h:'#B4C285'}, {c:'069',n:'Verde Limão',h:'#70A929'},
    {c:'072',n:'Camurça',h:'#C0A57A'}, {c:'161',n:'Crômio',h:'#BBBBB5'},
    {c:'163',n:'Cinza Urbano',h:'#C2C2B9'}
  ],

  'qualy-economica': [
    {c:'001',n:'Branco',h:'#F8F7F6'}, {c:'003',n:'Branco Gelo',h:'#E9EBDC'},
    {c:'030',n:'Palha',h:'#FCF0CC'}, {c:'031',n:'Pérola',h:'#E9E2CD'},
    {c:'032',n:'Areia',h:'#E8D7B1'}, {c:'033',n:'Marfim',h:'#EBDB8E'},
    {c:'034',n:'Amarelo Canário',h:'#F0DC5A'}, {c:'035',n:'Pêssego',h:'#D9B998'},
    {c:'047',n:'Cenoura',h:'#E4905F'}, {c:'055',n:'Azul Sereno',h:'#C0DEDB'},
    {c:'060',n:'Verde Água',h:'#CCE6C9'}, {c:'069',n:'Verde Limão',h:'#609B1A'},
    {c:'072',n:'Camurça',h:'#D0B991'}, {c:'073',n:'Concreto',h:'#9E9B78'},
    {c:'077',n:'Açaí',h:'#754F6B'}, {c:'078',n:'Amarelo Frevo',h:'#E0B80C'},
    {c:'079',n:'Rubí',h:'#B96453'}, {c:'096',n:'Pavão',h:'#369DB9'},
    {c:'160',n:'Elefante',h:'#A7AFB1'}, {c:'161',n:'Crômio',h:'#BEBFB1'}
  ],

  'qualy-esmalte': [
    {c:'001',n:'Branco',h:'#F8F8E5'}, {c:'002',n:'Branco Gelo',h:'#FFF8C8'},
    {c:'010',n:'Preto',h:'#0E1117'}, {c:'033',n:'Marfim',h:'#FFEFAB'},
    {c:'039',n:'Amarelo',h:'#EEB101'}, {c:'046',n:'Laranja',h:'#FB7339'},
    {c:'053',n:'Azul França',h:'#11328A'}, {c:'054',n:'Platina',h:'#AAAD9E'},
    {c:'057',n:'Azul Del Rey',h:'#1C2548'}, {c:'062',n:'Verde Colonial',h:'#293D2F'},
    {c:'067',n:'Verde Folha',h:'#204B18'}, {c:'074',n:'Cinza Médio',h:'#909690'},
    {c:'075',n:'Cinza Escuro',h:'#3F4144'}, {c:'080',n:'Marrom',h:'#3D231D'},
    {c:'081',n:'Marrom Conhaque',h:'#86441D'}, {c:'083',n:'Tabaco',h:'#552417'},
    {c:'085',n:'Vermelho',h:'#981B19'}
  ],

  /* Maza — a carta traz só o nome, sem código. Só a seção CORES LISAS foi
     fotografada; a lata também anuncia cores metálicas, que faltam. */
  'maza-ferrugem': [
    {n:'Branco',h:'#F3F8F7'}, {n:'Preto',h:'#0C0C11'},
    {n:'Azul',h:'#1C243C'}, {n:'Vermelho',h:'#BD2D33'},
    {n:'Platina',h:'#CDD8DF'}, {n:'Amarelo',h:'#D7A910'},
    {n:'Cinza',h:'#768D90'}, {n:'Verde',h:'#152E2D'},
    {n:'Marrom',h:'#3D343A'}, {n:'Preto Chassis SB',h:'#0B0B0D'}
  ],

  /* Lukscolor — a carta separa por ACABAMENTO, e cada um tem cores diferentes.
     O Bruno confirmou (24/08) que estoca os TRÊS: Brilhante, Fosco e Acetinado.

     `fora: true` = a cor está impressa na carta, mas a loja não tem. Ele não
     tem Algodão Egípcio nem Marrom Barroco em nenhum acabamento. A cor fica
     aqui, marcada, em vez de ser apagada: a carta é transcrição do papel, e
     estoque muda — para repor, tira a marca.

     Fosco e Acetinado ainda NÃO estão ligados a nenhum produto: falta decidir
     como o cliente escolhe o acabamento (SPEC-003 fase 4, em Proposta). */
  'lukscolor-fosco': [
    {n:'Branco',h:'#F1F8F3'}, {n:'Preto',h:'#171920'}
  ],

  'lukscolor-acetinado': [
    {n:'Branco',h:'#F3F8F2'}, {n:'Pérola',h:'#CEC59F'},
    {n:'Areia Tropical',h:'#D9D3B2'}, {n:'Gelo Alaska',h:'#C2C5BB'},
    {n:'Preto',h:'#15171F'}, {n:'Algodão Egípcio',h:'#C7C7B0',fora:true},
    {n:'Platina',h:'#A6ADAE'}, {n:'Marrom Barroco',h:'#23130F',fora:true}
  ],

  'lukscolor': [
    {n:'Branco',h:'#F6F8EF'}, {n:'Branco Gelo',h:'#CFD2BB'},
    {n:'Platina',h:'#BAC3BD'}, {n:'Preto',h:'#1D2021'},
    {n:'Algodão Egípcio',h:'#E3E6D0',fora:true}, {n:'Marfim',h:'#D9D7A6'},
    {n:'Areia',h:'#F0E5BA'}, {n:'Amarelo',h:'#EB9F13'},
    {n:'Azul Del Rey',h:'#14244C'}, {n:'Vermelho',h:'#AD1E1A'},
    {n:'Verde Folha',h:'#093F0A'}, {n:'Tabaco',h:'#422A1C'},
    {n:'Conhaque',h:'#80421D'}, {n:'Marrom Barroco',h:'#371610',fora:true}
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
  /* "alvenaria" saiu do onde usar: um trecho do boletim lista alvenaria, outro
     diz "não aplicar sobre reboco, concreto ou argamassa". Diante da dúvida,
     fica só o uso que as duas fontes concordam — mandar o cliente esmaltar a
     parede seria caro de desfazer. */
  19: { rendimento: 'até 50 m² por demão', demaos: '2 a 3 demãos', secagem: '8 a 10h entre demãos',
        onde: 'Metal e madeira',
        aviso: 'Dilua com aguarrás, nunca thinner. Não use sobre reboco, concreto ou argamassa.' },
  20: { rendimento: 'até 12 m² por demão', demaos: '2 a 3 demãos', secagem: '8 a 10h entre demãos',
        onde: 'Metal e madeira',
        aviso: 'Dilua com aguarrás, nunca thinner. Não use sobre reboco, concreto ou argamassa.' },
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
    foto: 'qualy-economica-18l', cor: 'prontas', carta: 'qualy-economica', precoCorIgual: true, oferta: false },

  { id: 8,  set: 'interna', marca: 'Qualyvinil',
    nome: 'Acrílica Cor Econômico Interior 3,6L', preco: 57.00,
    foto: 'qualy-economica-36l', cor: 'prontas', carta: 'qualy-economica', precoCorIgual: true, oferta: false },

  /* ---- alto rendimento: Rende Muito serve parede e teto (interna) E
       fachada e muro (externa). O Bruno confirmou que vale nos dois, então
       `set` é lista. O Fosco Completo segue só externa até ele confirmar. ---- */
  { id: 9,  set: ['interna', 'externa'], marca: 'Coral',
    nome: 'Rende Muito Tinta Concentrada Acrílico Fosco Branco 18L', preco: 475.00,
    foto: 'coral-rende-muito-18l', cor: 'prontas', carta: 'coral-rende-muito', temMaquina: true, precoCorIgual: true, oferta: false },

  { id: 10, set: ['interna', 'externa'], marca: 'Coral',
    nome: 'Rende Muito Tinta Concentrada Acrílico Fosco Branco 3,6L', preco: 125.00,
    foto: 'coral-rende-muito-36l', cor: 'prontas', carta: 'coral-rende-muito', temMaquina: true, precoCorIgual: true, oferta: false },

  { id: 11, set: ['interna', 'externa'], marca: 'Qualyvinil',
    nome: 'Rende Muito+ Acrílico Standard 18L', preco: 379.00,
    foto: 'qualy-rende-muito-18l', cor: 'prontas', carta: 'qualy-rende-muito', temMaquina: true, oferta: false },

  { id: 12, set: ['interna', 'externa'], marca: 'Qualyvinil',
    nome: 'Rende Muito+ Acrílico Standard 3,6L', preco: 99.00,
    foto: 'qualy-rende-muito-36l', cor: 'prontas', carta: 'qualy-rende-muito', temMaquina: true, oferta: false },

  { id: 13, set: ['interna', 'externa'], marca: 'Qualyvinil',
    nome: 'Fosco Completo Acrílico Premium 18L', preco: 490.00,
    foto: 'qualy-fosco-completo-18l', cor: 'maquina', oferta: false },

  { id: 14, set: ['interna', 'externa'], marca: 'Qualyvinil',
    nome: 'Fosco Completo Acrílico Premium 3,6L', preco: 130.00,
    foto: 'qualy-fosco-completo-36l', cor: 'maquina', oferta: false },

  /* ---- madeira e metal: esmaltes ---- */
  { id: 15, set: 'madeira', marca: 'Maza',
    nome: 'Direto na Ferrugem Esmalte Sintético Premium 3,6L', preco: 235.00,
    foto: 'maza-ferrugem-36l', cor: 'prontas', carta: 'maza-ferrugem', oferta: false },

  { id: 16, set: 'madeira', marca: 'Maza',
    nome: 'Direto na Ferrugem Esmalte Sintético Premium 900ml', preco: 65.00,
    foto: 'maza-ferrugem-900ml', cor: 'prontas', carta: 'maza-ferrugem', oferta: false },

  { id: 17, set: 'madeira', marca: 'Lukscolor',
    nome: 'Esmalte Base Água Premium Plus 3,6L', preco: 166.90,
    foto: 'lukscolor-esmalte-36l', cor: 'prontas', carta: 'lukscolor', temMaquina: true, oferta: false },

  { id: 18, set: 'madeira', marca: 'Lukscolor',
    nome: 'Esmalte Base Água Premium Plus 900ml', preco: 49.90,
    foto: 'lukscolor-esmalte-900ml', cor: 'prontas', carta: 'lukscolor', temMaquina: true, oferta: false },

  { id: 19, set: 'madeira', marca: 'Qualyvinil',
    nome: 'Esmalte Sintético Standard 3,6L', preco: 135.00,
    foto: 'qualy-esmalte-36l', cor: 'prontas', carta: 'qualy-esmalte', oferta: false },

  { id: 20, set: 'madeira', marca: 'Qualyvinil',
    nome: 'Esmalte Sintético Standard 900ml', preco: 38.50,
    foto: 'qualy-esmalte-900ml', cor: 'prontas', carta: 'qualy-esmalte', oferta: false },

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
    /* Foto enviada pelo Bruno em 18/08: é o balde KLASSE 3,6L. O cupom lista
       "MASSA ACRILICA QUALY. 3,6LTS" e "MASSA ACRILICA KLASSE 18LTS" como
       itens diferentes — confirmar se o 3,6L que a loja vende é o Klasse. */
    foto: 'massa-acrilica-36l', cor: null, oferta: false },

  { id: 26, set: 'preparacao', marca: 'Qualyvinil',
    nome: 'Massa Acrílica 900ml', preco: 18.90,
    foto: 'massa-acrilica-900ml', cor: null, oferta: false }
];
