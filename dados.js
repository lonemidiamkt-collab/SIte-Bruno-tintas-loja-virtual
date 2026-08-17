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
    enderecoCurto: 'R. Cap. Jorge Soares, 102',
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
  { id: 'pix',      nome: 'PIX',              desconto: true,  nota: '5% de desconto' },
  { id: 'dinheiro', nome: 'Dinheiro',         desconto: true,  nota: '5% de desconto' },
  { id: 'debito',   nome: 'Cartão de débito', desconto: false, nota: 'Na retirada ou na entrega' },
  { id: 'credito',  nome: 'Cartão de crédito',desconto: false, nota: 'Em até 12x, sem valor mínimo', parcelavel: true }
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

/* Produtos.
   foto   = chave em MAPA_IMG (imagens.js)
   tinta  = mostra o aviso de tingimento na hora
   oferta = o primeiro com oferta:true vira o "Destaque da semana"

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
    foto: 'decora-diamante-18l', tinta: true, oferta: false },

  { id: 2,  set: 'interna', marca: 'Coral',
    nome: 'Decora Diamante Semi Brilho Acrílico Premium 3,6L', preco: 220.00,
    foto: 'decora-diamante-36l', tinta: true, oferta: false },

  { id: 3,  set: 'interna', marca: 'Coral',
    nome: 'Decora Seda Acetinado Acrílico Premium 18L', preco: 846.00,
    foto: 'decora-seda-18l', tinta: true, oferta: false },

  { id: 4,  set: 'interna', marca: 'Coral',
    nome: 'Decora Seda Acetinado Acrílico Premium 3,6L', preco: 220.00,
    foto: 'decora-seda-36l', tinta: true, oferta: false },

  { id: 5,  set: 'interna', marca: 'Coral',
    nome: 'Decora Matte Fosco Acrílico Premium 18L', preco: 670.00,
    foto: 'decora-fosco-18l', tinta: true, oferta: false },

  { id: 6,  set: 'interna', marca: 'Coral',
    nome: 'Decora Matte Fosco Acrílico Premium 3,6L', preco: 177.00,
    foto: 'decora-fosco-36l', tinta: true, oferta: false },

  { id: 7,  set: 'interna', marca: 'Qualyvinil',
    nome: 'Acrílica Cor Econômico Interior 18L', preco: 197.00,
    foto: 'qualy-economica-18l', tinta: true, oferta: false },

  { id: 8,  set: 'interna', marca: 'Qualyvinil',
    nome: 'Acrílica Cor Econômico Interior 3,6L', preco: 57.00,
    foto: 'qualy-economica-36l', tinta: true, oferta: false },

  /* ---- área externa: linhas de alto rendimento (servem dentro também) ---- */
  { id: 9,  set: 'externa', marca: 'Coral',
    nome: 'Rende Muito Tinta Concentrada Acrílico Fosco 18L', preco: 475.00,
    foto: 'coral-rende-muito-18l', tinta: true, oferta: false },

  { id: 10, set: 'externa', marca: 'Coral',
    nome: 'Rende Muito Tinta Concentrada Acrílico Fosco 3,6L', preco: 125.00,
    foto: 'coral-rende-muito-36l', tinta: true, oferta: false },

  { id: 11, set: 'externa', marca: 'Qualyvinil',
    nome: 'Rende Muito+ Acrílico Standard 18L', preco: 379.00,
    foto: 'qualy-rende-muito-18l', tinta: true, oferta: false },

  { id: 12, set: 'externa', marca: 'Qualyvinil',
    nome: 'Rende Muito+ Acrílico Standard 3,6L', preco: 99.00,
    foto: 'qualy-rende-muito-36l', tinta: true, oferta: false },

  { id: 13, set: 'externa', marca: 'Qualyvinil',
    nome: 'Fosco Completo Acrílico Premium 18L', preco: 490.00,
    foto: 'qualy-fosco-completo-18l', tinta: true, oferta: false },

  { id: 14, set: 'externa', marca: 'Qualyvinil',
    nome: 'Fosco Completo Acrílico Premium 3,6L', preco: 130.00,
    foto: 'qualy-fosco-completo-36l', tinta: true, oferta: false },

  /* ---- madeira e metal: esmaltes ---- */
  { id: 15, set: 'madeira', marca: 'Maza',
    nome: 'Direto na Ferrugem Esmalte Sintético Premium 3,6L', preco: 235.00,
    foto: 'maza-ferrugem-36l', tinta: true, oferta: false },

  { id: 16, set: 'madeira', marca: 'Maza',
    nome: 'Direto na Ferrugem Esmalte Sintético Premium 900ml', preco: 65.00,
    foto: 'maza-ferrugem-900ml', tinta: true, oferta: false },

  { id: 17, set: 'madeira', marca: 'Lukscolor',
    nome: 'Esmalte Premium Plus Base Água 3,6L', preco: 166.90,
    foto: 'lukscolor-esmalte-36l', tinta: true, oferta: false },

  { id: 18, set: 'madeira', marca: 'Lukscolor',
    nome: 'Esmalte Premium Plus Base Água 900ml', preco: 49.90,
    foto: 'lukscolor-esmalte-900ml', tinta: true, oferta: false },

  { id: 19, set: 'madeira', marca: 'Qualyvinil',
    nome: 'Esmalte Sintético Standard 3,6L', preco: 135.00,
    foto: 'qualy-esmalte-36l', tinta: true, oferta: false },

  { id: 20, set: 'madeira', marca: 'Qualyvinil',
    nome: 'Esmalte Sintético Standard 900ml', preco: 38.50,
    foto: 'qualy-esmalte-900ml', tinta: true, oferta: false },

  /* ---- preparação: massas (não vão para a máquina de tingimento) ---- */
  { id: 21, set: 'preparacao', marca: 'Qualyvinil',
    nome: 'Massa Corrida 25kg', preco: 75.90,
    foto: 'massa-corrida-25kg', tinta: false, oferta: false },

  { id: 22, set: 'preparacao', marca: 'Qualyvinil',
    nome: 'Massa Corrida 3,6L', preco: 27.90,
    foto: 'massa-corrida-36l', tinta: false, oferta: false },

  { id: 23, set: 'preparacao', marca: 'Qualyvinil',
    nome: 'Massa Corrida 900ml', preco: 16.70,
    foto: 'massa-corrida-900ml', tinta: false, oferta: false },

  { id: 24, set: 'preparacao', marca: 'Qualyvinil',
    nome: 'Klasse Massa Acrílica 18L', preco: 166.00,
    foto: 'klasse-massa-acrilica-18l', tinta: false, oferta: false },

  { id: 25, set: 'preparacao', marca: 'Qualyvinil',
    nome: 'Massa Acrílica 3,6L', preco: 46.00,
    foto: 'massa-acrilica-36l', tinta: false, oferta: false },

  { id: 26, set: 'preparacao', marca: 'Qualyvinil',
    nome: 'Massa Acrílica 900ml', preco: 18.90,
    foto: 'massa-acrilica-900ml', tinta: false, oferta: false }
];
