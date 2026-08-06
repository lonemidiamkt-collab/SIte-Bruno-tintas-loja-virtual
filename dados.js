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
    cidade: 'Araruama / RJ',
    whatsapp: '5522998224630',
    whatsappVisivel: '(22) 99822-4630',
    prontoEm: '15 min',
    maps: 'https://www.google.com/maps/search/?api=1&query=' +
          encodeURIComponent('Bruno das Tintas, RJ-106, Vila Capri, Araruama - RJ')
  },
  {
    id: 'iguaba',
    nome: 'Iguaba Grande',
    endereco: 'R. Capitão Jorge Soares, 102 — Loja A, Estação',
    cidade: 'Iguaba Grande / RJ',
    whatsapp: '5522992272479',
    whatsappVisivel: '(22) 99227-2479',
    prontoEm: '15 min',
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
  semJuros: null,         // true, false ou null (null = não afirma nada)
  descontoAvista: 0.05,   // 5% no PIX e no dinheiro

  /* Horário de corte para entregar no mesmo dia.
     Deixe null enquanto o cliente não confirmar o horário real.
     Com um valor ('15:00'), o site mostra quanto falta para o corte. */
  corteEntregaHoje: null
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
const UPSELL = {
  interna:    [5, 7, 6],
  externa:    [5, 7, 6],
  madeira:    [5, 7],
  imper:      [7, 5],
  acessorios: []
};

/* Formas de pagamento. desconto = aplica o desconto à vista.
   O pagamento é combinado no WhatsApp; o site só registra a escolha. */
const PAGAMENTOS = [
  { id: 'pix',      nome: 'PIX',              desconto: true,  nota: '5% de desconto' },
  { id: 'dinheiro', nome: 'Dinheiro',         desconto: true,  nota: '5% de desconto' },
  { id: 'debito',   nome: 'Cartão de débito', desconto: false, nota: 'Na retirada ou na entrega' },
  { id: 'credito',  nome: 'Cartão de crédito',desconto: false, nota: 'Em até 12x, sem valor mínimo', parcelavel: true }
];

/* Setores. Setor sem produto não aparece no site. */
const SETORES = [
  { id: 'interna',    nome: 'Área interna',       desc: 'Sala, quarto, cozinha e teto' },
  { id: 'externa',    nome: 'Área externa',       desc: 'Fachada, muro e área aberta' },
  { id: 'madeira',    nome: 'Madeira',            desc: 'Porta, janela, portão e móvel' },
  { id: 'imper',      nome: 'Impermeabilizantes', desc: 'Laje, telhado e infiltração' },
  { id: 'acessorios', nome: 'Acessórios',         desc: 'Rolo, pincel, lona e fita' }
];

/* Marcas confirmadas pelo cliente.
   logo = arquivo em assets/img/marcas (sem extensão). Sem logo, cai no nome escrito.
   Marca sem produto cadastrado não aparece na faixa. */
const MARCAS = [
  { nome: 'Coral',            logo: 'coral' },
  { nome: 'Sherwin Williams', logo: 'sherwin-williams' },
  { nome: 'Atlas',            logo: 'atlas' },
  { nome: 'Textura Rio',      logo: 'textura-rio' },
  { nome: 'Qualyvinil',       logo: null },
  { nome: 'Suvinil',          logo: null },
  { nome: 'Sinteplast',       logo: null },
  { nome: 'Sika',             logo: null },
  { nome: 'IF',               logo: null }
];

/* Produtos.
   foto  = arquivo em assets/img (sem extensão)
   tinta = mostra o aviso de tingimento na hora
   Preços de exemplo até o cliente mandar a tabela. */
const PRODUTOS = [
  { id: 1, set: 'interna', marca: 'Coral',
    nome: 'Rende Muito Acrílico Fosco 20L', preco: 279.90,
    foto: 'coral-rende-20l', tinta: true, oferta: true },

  { id: 2, set: 'interna', marca: 'Coral',
    nome: 'Rende Muito Acrílico Fosco 16L', preco: 229.90,
    foto: 'coral-rende-16l', tinta: true, oferta: false },

  { id: 3, set: 'interna', marca: 'Sherwin Williams',
    nome: 'Novacor Paredes Pro Fosco', preco: 199.90,
    foto: 'sherwin-novacor', tinta: true, oferta: false },

  { id: 4, set: 'externa', marca: 'Textura Rio',
    nome: 'Textura Acrílica 5kg', preco: 59.90,
    foto: 'textura-rio-lata', tinta: true, oferta: false },

  { id: 5, set: 'acessorios', marca: 'Atlas',
    nome: 'Kit Completo de Pintura 7 peças', preco: 69.90,
    foto: 'kit-atlas-7', tinta: false, oferta: true },

  { id: 6, set: 'acessorios', marca: 'Atlas',
    nome: 'Kit Prático de Pintura 3 peças', preco: 39.90,
    foto: 'kit-atlas-3', tinta: false, oferta: false },

  { id: 7, set: 'acessorios', marca: '—',
    nome: 'Lona Plástica Preta', preco: 29.90,
    foto: 'lona-preta', tinta: false, oferta: false }
];
