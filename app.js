/* =========================================================
   Bruno das Tintas — comportamento do site
   Depende de dados.js (carregado antes).
   ========================================================= */
'use strict';

const d0 = document;
const $  = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));
const brl = v => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const esc = s => String(s).replace(/[&<>"']/g,
  c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));

/* Banner, logo e capa continuam em base64 no MAPA_IMG porque aparecem sempre.
   Foto de PRODUTO resolve para arquivo em fotos/<chave>.webp — base64 dentro
   do JS anula o loading="lazy": o cliente baixaria as 26 fotos antes de ver a
   primeira. Em arquivo ele baixa só a que rolar até enxergar.
   Chave nula devolve undefined, e aí entra o selo de marca do fotoOu(). */
const img = nome => !nome ? undefined : (MAPA_IMG[nome] || `fotos/${nome}.webp`);

/* Produto sem foto cadastrada: devolve um selo com a inicial da marca em vez
   de <img src="undefined">, que renderiza como imagem quebrada. Some sozinho
   quando a foto entrar no MAPA_IMG. */
const semFoto = p => `<span class="sem-foto" aria-hidden="true">${esc(inicialDe(p))}</span>`;
const inicialDe = p => (p.marca && p.marca !== '—' ? p.marca : p.nome).trim().charAt(0).toUpperCase();
const fotoOu = (p, alt, extra = '') => img(p.foto)
  ? `<img src="${img(p.foto)}" width="400" height="400" alt="${esc(alt)}"
      data-inicial="${esc(inicialDe(p))}" ${extra}>`
  : semFoto(p);

/* Se a foto falhar em carregar — arquivo faltando, deploy pela metade, rede
   ruim — o card mostra o selo da marca em vez de deixar o texto alternativo
   escrito por cima do azul, que é o que o cliente lê como "site quebrado".
   O evento error não borbulha, por isso o listener é na fase de captura. */
document.addEventListener('error', e => {
  const el = e.target;
  if (!el || el.tagName !== 'IMG' || !el.dataset.inicial) return;
  el.outerHTML = `<span class="sem-foto" aria-hidden="true">${esc(el.dataset.inicial)}</span>`;
}, true);
const imgMarca = nome => MAPA_IMG['marcas/' + nome];
const unidade = id => UNIDADES.find(u => u.id === id) || UNIDADES[0];
const linkWhatsUnidade = (id, txt) =>
  `https://wa.me/${unidade(id).whatsapp}` + (txt ? `?text=${encodeURIComponent(txt)}` : '');
const nomeSetor = id => (SETORES.find(s => s.id === id) || {}).nome || '';
/* `set` aceita string ou lista: tem produto que serve mais de um setor. A
   Rende Muito, por exemplo, é de parede e teto (interna) e também de fachada
   e muro (externa) — o Bruno confirmou que vale nos dois. */
const setoresDe = p => Array.isArray(p.set) ? p.set : [p.set];
const eDoSetor  = (p, id) => setoresDe(p).includes(id);
const temProduto = setId => PRODUTOS.some(p => eDoSetor(p, setId));
const itensDaMarca = m => PRODUTOS.filter(p => p.marca === m).length;

const ICO_WPP = '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2m0 1.8a8.2 8.2 0 1 1-4.2 15.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 0 1 12 3.8m-2.5 4c-.2 0-.5 0-.7.4-.3.4-.9 1-.9 2.2s.9 2.5 1 2.7c.1.2 1.7 2.8 4.3 3.8 2.1.8 2.6.7 3 .6.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4l-.7-.4-1.5-.7c-.2-.1-.4-.1-.5.1l-.8 1c-.1.2-.3.2-.5.1-1.4-.6-2.3-1.9-2.6-2.3-.1-.2 0-.4.1-.5l.4-.5c.1-.2.2-.3.2-.5v-.4l-.8-1.9c-.2-.5-.4-.4-.6-.5z"/></svg>';
const ICO_PIN = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>';

const ICONES = {
  interna:'<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/></svg>',
  externa:'<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M9 4v16"/></svg>',
  madeira:'<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="3" width="14" height="18" rx="1.5"/><circle cx="15.5" cy="12" r="1"/></svg>',
  preparacao:'<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 16 14.5 4.5a2.1 2.1 0 0 1 3 3L6 19H3z"/><path d="M13 6l5 5"/></svg>',
  imper:'<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3s6 6.4 6 10a6 6 0 0 1-12 0c0-3.6 6-10 6-10"/></svg>',
  acessorios:'<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="14" height="6" rx="2"/><path d="M10 10v4H7v7"/></svg>'
};

/* ---------------- estado ---------------- */
let carrinho = [];
/* cor escolhida por produto, antes de ir para o carrinho */
let corEscolhida = {};
let filtro = 'todos';
let termo = '';
const pedidoVazio = () => ({
  numero: '', nome: '', tel: '',
  entrega: 'retirar-araruama', unidade: 'araruama', destino: 'araruama',
  pagamento: 'pix', vezes: 1, endereco: '', cor: '', obs: ''
});

let pedido = pedidoVazio();

/* Qual loja atende este pedido.
   Retirada define sozinha; na entrega o cliente escolhe a mais perto. */
function unidadeDoPedido() {
  if (pedido.entrega === 'retirar-araruama') return 'araruama';
  if (pedido.entrega === 'retirar-iguaba')   return 'iguaba';
  return destino().loja || pedido.unidade;   // entrega: a cidade define a loja
}

/* ---------------- catálogo ---------------- */

function renderSetores() {
  const visiveis = SETORES.filter(s => temProduto(s.id));
  $('#setores-grid').innerHTML = visiveis.map(s => `
    <button class="setor" data-set="${s.id}">
      <span class="setor__ico" aria-hidden="true">${ICONES[s.id]}</span>
      <span><h3>${esc(s.nome)}</h3><p>${esc(s.desc)}</p></span>
    </button>`).join('');

  $$('.setor[data-set]').forEach(b => b.onclick = () => {
    filtro = b.dataset.set; termo = ''; $('#busca').value = '';
    renderFiltros(); renderGrade();
    $('#catalogo').scrollIntoView({ behavior: 'smooth' });
  });
}

function renderMarcas() {
  const visiveis = MARCAS.filter(m => itensDaMarca(m.nome) > 0);
  $('#trilhoMarcas').innerHTML = visiveis.map(m => {
    const n = itensDaMarca(m.nome);
    const miolo = m.logo
      ? `<img class="marca-card__logo" src="${imgMarca(m.logo)}" width="200" height="104" alt="${esc(m.nome)}" loading="lazy">`
      : `<b>${esc(m.nome)}</b>`;
    return `<button class="marca-card" data-marca="${esc(m.nome)}" title="${esc(m.nome)}">
      <span>${miolo}<small>${n} ${n === 1 ? 'item' : 'itens'}</small></span>
    </button>`;
  }).join('');

  $$('.marca-card[data-marca]').forEach(b => b.onclick = () => {
    filtro = 'todos'; termo = b.dataset.marca; $('#busca').value = termo;
    renderFiltros(); renderGrade();
    $('#catalogo').scrollIntoView({ behavior: 'smooth' });
  });
}

function renderLojas() {
  $('#lojas-grid').innerHTML = UNIDADES.map(u => `
    <div class="loja">
      <div class="loja__topo"><span>Unidade</span><b>${esc(u.nome)}</b></div>
      <div class="loja__l"><small>Endereço</small><p>${esc(u.enderecoCurto || u.endereco)}<br>${esc(u.cidade)}</p></div>
      <div class="loja__l"><small>WhatsApp</small><p>${esc(u.whatsappVisivel)}</p></div>
      <div class="loja__l"><small>Retirada</small><p>Pedido pronto em ${esc(u.prontoEm)}</p></div>
      <div class="loja__acoes">
        <a class="btn btn--azul" href="${linkWhatsUnidade(u.id, 'Oi! Vim pelo site e queria falar com a loja de ' + u.nome + '.')}" target="_blank" rel="noopener">
          ${ICO_WPP}<span>Falar com a loja</span>
        </a>
        <a class="btn btn--linha" href="${u.maps}" target="_blank" rel="noopener">
          ${ICO_PIN}<span>Mapa</span>
        </a>
        ${u.instagram ? `<a class="btn btn--linha" href="${u.instagram}" target="_blank" rel="noopener">
          ${ICO_IG}<span>Instagram</span>
        </a>` : ''}
      </div>
    </div>`).join('');
}

function renderFiltros() {
  const lista = [{ id: 'todos', nome: 'Todos' }]
    .concat(SETORES.filter(s => temProduto(s.id)));
  $('#filtros').innerHTML = lista.map(c =>
    `<button class="filtro ${filtro === c.id ? 'on' : ''}" data-f="${c.id}">${esc(c.nome)}</button>`
  ).join('');
  $$('#filtros .filtro').forEach(b => b.onclick = () => {
    filtro = b.dataset.f; renderFiltros(); renderGrade();
  });
}

/* O preço cadastrado é sempre o da base branca. Este aviso existe para o
   cliente não achar que qualquer cor sai pelo mesmo valor — em produto
   tingido na máquina a cor é orçamento à parte, e nas cores prontas o
   volume da lata muda (Coral Rende Muito: branco 18L, cor 16L).
   Produto sem `cor` definida não afirma nada, de propósito. */
/* O aviso de "outras cores podem ter volume diferente" só vale para a Coral
   Rende Muito, onde o branco vem 18L e a cor vem 16L. Nos esmaltes e nas
   demais linhas a litragem é a mesma em qualquer cor — repetir o aviso ali
   assustava o cliente com um problema que não existe naquele produto. */
/* "pelo mesmo preço do branco" só pode ser dito onde o lojista confirmou —
   hoje só na Coral Rende Muito e na Qualyvinil Econômica (precoCorIgual).
   Nos outros o site diz para confirmar, em vez de prometer um preço que
   ninguém garantiu. Prometer errado é pior que não prometer. */
const AVISO_COR = {
  maquina: 'Cor feita na máquina, na hora. O preço é o da base branca — a cor sai por orçamento.',
  prontas: 'Tem cores prontas de fábrica. Confirme o valor da cor com a loja.',
  prontasMesmoPreco: 'Tem cores prontas de fábrica, pelo mesmo preço do branco.'
};
/* O cliente escolhe pelo nome, mas o pedido leva o CÓDIGO junto quando existe:
   é o que a loja usa para separar a lata certa sem precisar perguntar. */
const rotuloCor = c => c.c ? `${c.n} (${c.c})` : c.n;
/* o bloco de cor é o hex medido na foto da carta; se faltar ou vier
   torto, cai num cinza neutro em vez de injetar CSS */
const hexSeguro = h => /^#[0-9A-Fa-f]{6}$/.test(h || '') ? h : '#E6E6E6';
/* A carta é a transcrição do papel; o que a loja tem é um subconjunto dela.
   Cor marcada `fora` some da tela — listar cor que a loja não tem manda o
   cliente até o balcão atrás de uma lata que não existe. */
const coresDe = chave => (CARTAS[chave] || []).filter(c => !c.fora);
const primeiraCor = p => { const l = coresDe(p.carta); return l.length ? rotuloCor(l[0]) : ''; };

const chaveAviso = p => p.cor === 'prontas' && p.precoCorIgual ? 'prontasMesmoPreco' : p.cor;
const avisoVolume = p => VOLUME_POR_COR[p.id]
  ? `Branco vem ${VOLUME_POR_COR[p.id].branco}; nas cores vem ${VOLUME_POR_COR[p.id].colorido}, `
    + 'pelo mesmo preço — é tinta concentrada e rende igual.'
  : '';
const avisoCor = p => AVISO_COR[chaveAviso(p)]
  ? `<span class="prod__tingir">${AVISO_COR[chaveAviso(p)]}</span>` : '';

function cardProduto(p) {
  return `<article class="prod">
    <button class="prod__img prod__abrir" data-ver="${p.id}"
            aria-label="Ver detalhes de ${esc(p.nome)}">
      ${fotoOu(p, p.marca + ' ' + p.nome, 'loading="lazy"')}
      ${p.marca !== '—' ? `<span class="prod__marca">${esc(p.marca)}</span>` : ''}
      ${p.oferta ? '<span class="prod__oferta">Oferta</span>' : ''}
    </button>
    <div class="prod__corpo">
      <span class="prod__cat">${esc(setoresDe(p).map(nomeSetor).join(" · "))}</span>
      <h3 class="prod__nome"><button class="prod__nome-btn" data-ver="${p.id}">${esc(p.nome)}</button></h3>
      ${avisoCor(p)}
      <div class="prod__preco">
        <b>${brl(p.preco)}</b>
        <span class="prod__avista">${brl(comDesconto(p.preco))} à vista</span>
        <span class="prod__parcela">ou ${LOJA.parcelas}x de ${brl(parcela(p.preco, LOJA.parcelas))}</span>
      </div>
      ${(() => {
        /* Produto com carta NÃO entra no carrinho direto: o botão abre o box
           para o cliente escolher. Antes ele adicionava calado como Branco, e
           a loja receberia quase todo pedido em branco sem o cliente saber
           que havia cor. */
        const n = coresDe(p.carta).length;
        return p.cor === 'prontas' && n
          ? `<button class="btn btn--azul btn--bloco" style="margin-top:12px" data-ver="${p.id}">
               Escolher a cor <span class="prod__ncores">${n} cores</span>
             </button>`
          : `<button class="btn btn--azul btn--bloco" style="margin-top:12px" data-add="${p.id}">Adicionar</button>`;
      })()}
    </div>
  </article>`;
}

function renderGrade() {
  const t = termo.trim().toLowerCase();
  const lista = PRODUTOS.filter(p =>
    (filtro === 'todos' || eDoSetor(p, filtro)) &&
    (!t || p.nome.toLowerCase().includes(t) ||
          p.marca.toLowerCase().includes(t) ||
          setoresDe(p).map(nomeSetor).join(' ').toLowerCase().includes(t))
  );
  $('#grade').innerHTML = lista.length
    ? lista.map(cardProduto).join('')
    : '<p style="color:var(--texto-fraco);grid-column:1/-1">Nada encontrado aqui. Chame no WhatsApp que a gente procura pra você.</p>';
}

/* ---------------- detalhe do produto ----------------
   Reaproveita o modal do checkout — os dois nunca ficam abertos juntos.
   O que o box entrega além do card é a FOTO GRANDE: na grade a lata sai com
   uns 170px no celular e o rótulo fica ilegível, e é pelo rótulo que o
   cliente reconhece o produto que ele já usou.

   O bloco de cor está preparado mas desligado: só liga quando os preços por
   cor forem confirmados (ver SPEC-003). Melhor não mostrar cor nenhuma do que
   mostrar cor com preço errado. */
/* Bloco de cor dentro do detalhe do produto.

   Dois caminhos, porque a cor funciona de dois jeitos diferentes:

   'prontas' → carta de cores para clicar. A escolha vai junto no pedido, e o
     site avisa quando a cor muda a litragem (Coral Rende Muito: branco 18L,
     colorida 16L, mesmo preço, porque é concentrada e rende igual).

   'maquina' → NÃO tem carta. Cada cor tem um valor próprio, então listar
     opção com preço na tela seria mentira. Vira um convite para orçamento,
     que é o card "quer uma cor personalizada". */
function blocoCorDoProduto(p) {
  if (p.cor === 'prontas') {
    const carta = coresDe(p.carta);
    return `
      <div class="det__bloco">
        <h4 class="det__rotulo">Escolha a cor</h4>
        <div class="cores" role="radiogroup" aria-label="Cores disponíveis">
          ${carta.map((c, i) => `
            <button type="button" class="cor${i === 0 ? ' on' : ''}"
                    role="radio" aria-checked="${i === 0}"
                    title="${esc(rotuloCor(c))}"
                    data-cor="${esc(rotuloCor(c))}" data-prod="${p.id}">
              <span class="cor__bloco" style="background:${hexSeguro(c.h)}"></span>
              <span class="cor__nome">${esc(c.n)}${c.c ? ` <span class="cor__cod">${esc(c.c)}</span>` : ''}</span>
            </button>`).join('')}
        </div>
        <p class="det__cor-ajuda">As cores da tela são aproximadas — a carta
           impressa da loja é a referência final.</p>
        ${avisoVolume(p) ? `<p class="det__cor-ajuda">${avisoVolume(p)}</p>` : ''}
        <p class="det__cor-ajuda">A loja confirma a cor com você no WhatsApp antes de separar.</p>
        ${p.temMaquina ? `
          <p class="det__cor-ajuda">Quer uma cor que não está aqui? Esta linha também
             é tingida na máquina — a gente monta o orçamento.
             <button type="button" class="link-cor" data-cor-medida="${p.id}">Pedir orçamento de cor</button></p>` : ''}
      </div>`;
  }
  if (p.cor === 'maquina') {
    return `
      <div class="det__bloco">
        <h4 class="det__rotulo">Cor</h4>
        <div class="cor-sob-medida">
          <b>Quer uma cor personalizada?</b>
          <p>Esta linha é tingida na máquina, na hora. Dá para fazer
             praticamente qualquer cor — e como cada uma tem um valor,
             a gente monta o orçamento com você.</p>
          <button type="button" class="btn btn--azul cor-sob-medida__btn"
                  data-cor-medida="${p.id}">Pedir orçamento de cor</button>
        </div>
        <p class="det__cor-ajuda">O preço acima é o da base branca.</p>
      </div>`;
  }
  return '';
}

/* Orçamento de cor: abre a conversa com a loja já dizendo qual produto é.
   Não passa pelo carrinho porque não há preço a somar — é conversa. */
function pedirCorPersonalizada(id) {
  const p = PRODUTOS.find(x => x.id === id);
  if (!p) return;
  const texto = `Oi! Vim pelo site e queria um orçamento de cor personalizada para:\n\n`
    + `*${p.marca !== '—' ? p.marca + ' ' : ''}${p.nome}*\n`
    + `Base branca: ${brl(p.preco)}\n\n`
    + `A cor que eu queria é: `;
  escolherLoja(texto);
}

/* Ficha técnica: só mostra o que tem fonte. Produto sem ficha não abre bloco
   vazio, e campo sem dado simplesmente não aparece. */
function blocoFicha(p) {
  const f = (typeof FICHAS !== 'undefined' && FICHAS[p.id]) || null;
  if (!f) return '';
  const linhas = [
    f.rendimento && ['Rende', f.rendimento],
    f.demaos     && ['Demãos', f.demaos],
    f.secagem    && ['Secagem', f.secagem],
    f.onde       && ['Onde usar', f.onde]
  ].filter(Boolean);
  if (!linhas.length) return '';
  return `
    <div class="det__bloco">
      <h4 class="det__rotulo">Ficha técnica</h4>
      <dl class="ficha">
        ${linhas.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join('')}
      </dl>
      ${f.aviso ? `<p class="ficha__aviso">${esc(f.aviso)}</p>` : ''}
    </div>`;
}

function verProduto(id) {
  const p = PRODUTOS.find(x => x.id === id);
  if (!p) return;
  const temMarca = p.marca && p.marca !== '—';
  $('#tituloModal').textContent = temMarca ? `${p.marca} ${p.nome}` : p.nome;
  $('#corpoModal').innerHTML = `
    <div class="det">
      <div class="det__foto">${fotoOu(p, (temMarca ? p.marca + ' ' : '') + p.nome)}</div>
      <p class="det__setor">${esc(setoresDe(p).map(nomeSetor).join(" · "))}</p>
      ${blocoCorDoProduto(p)}
      ${blocoFicha(p)}
      <div class="det__bloco">
        <h4 class="det__rotulo">Preço</h4>
        <p class="det__preco">${brl(p.preco)}</p>
        <p class="det__avista">${brl(comDesconto(p.preco))} à vista</p>
        <p class="det__parcela">ou ${LOJA.parcelas}x de ${brl(parcela(p.preco, LOJA.parcelas))} no cartão</p>
      </div>
      <div class="det__acao">
        <button class="btn btn--azul btn--bloco" data-add="${p.id}">Adicionar ao pedido</button>
      </div>
    </div>`;
  abrirModal();
}

/* ---------------- destaque da semana ----------------
   Rodízio automático, misturando os setores: a cada semana entra um produto
   de um setor diferente, e a cada volta completa avança para o próximo item
   daquele setor. Com 4 setores no ar, leva meses até repetir.

   É determinístico de propósito, calculado a partir da semana do calendário —
   não é sorteio a cada carregamento. Se sorteasse, o cliente veria um produto
   diferente a cada refresh, e a seção se chama "da semana".

   Para fixar um produto à mão, basta pôr destaque:true nele no dados.js;
   isso ganha do rodízio. Note que NÃO é o mesmo que oferta:true — oferta
   mostra o selo "Oferta" ao cliente e só deve ser usado com desconto real. */
const semanaAtual = () => {
  // Ancorado em São Paulo: todo cliente vê o mesmo destaque na mesma semana,
  // independente do fuso do aparelho dele.
  const hoje = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Sao_Paulo' });
  const dias = Date.parse(hoje + 'T00:00:00Z') / 86400000;
  // O -4 põe a virada na SEGUNDA. Sem ele a conta cai na quinta, porque
  // 01/01/1970 foi quinta e a divisão por 7 herda esse começo.
  return Math.floor((dias - 4) / 7);
};

function produtoDestaque() {
  const fixo = PRODUTOS.find(p => p.destaque);
  if (fixo) return fixo;
  const setores = SETORES.filter(s => temProduto(s.id));
  if (!setores.length) return null;
  const w = semanaAtual();
  const doSetor = PRODUTOS.filter(p => eDoSetor(p, setores[w % setores.length].id));
  return doSetor[Math.floor(w / setores.length) % doSetor.length];
}

function renderDestaque() {
  const sec = $('#destaque'), alvo = $('#destaqueCard');
  if (!sec || !alvo) return;
  const p = produtoDestaque();
  if (!p) { sec.hidden = true; alvo.innerHTML = ''; return; }
  sec.hidden = false;
  const foto = img(p.foto);
  /* DOM achatado de propósito: foto, topo, info e botão são filhos diretos do
     card, para o grid poder recolocá-los. No celular a foto é uma miniatura ao
     lado do preço; no desktop ela vira a coluna da esquerda inteira. Com a foto
     aninhada dentro do corpo, como era antes, o grid não a alcançava. */
  alvo.innerHTML = `
    <article class="hero__card">
      <div class="hero__card-topo"><span>Destaque da semana</span><b>${esc(p.nome)}</b></div>
      <div class="hero__card-foto">${foto
        ? `<img src="${foto}" width="400" height="400" alt="${esc(p.nome)}">` : ''}</div>
      <div class="hero__card-info">
        ${p.marca && p.marca !== '—' ? `<p class="hero__card-marca">${esc(p.marca)}</p>` : ''}
        <p class="hero__card-preco">${brl(p.preco)}</p>
        <p class="hero__card-avista">${brl(comDesconto(p.preco))} à vista</p>
      </div>
      <button class="btn btn--azul hero__card-btn" data-add="${p.id}">Adicionar ao pedido</button>
    </article>`;
}

/* ---------------- carrinho ---------------- */

function adicionar(id) {
  const p = PRODUTOS.find(x => x.id === id);
  if (!p) return;
  /* A cor faz parte da identidade do item: a mesma tinta em duas cores são
     duas linhas no carrinho, não uma com quantidade 2. */
  const cor = p.cor === 'prontas' ? (corEscolhida[p.id] || primeiraCor(p)) : '';
  const corH = cor ? coresDe(p.carta).find(c => rotuloCor(c) === cor)?.h : '';
  const key = cor ? `${p.id}|${cor}` : String(p.id);
  const ja = carrinho.find(i => i.key === key);
  if (ja) ja.qtd++;
  else carrinho.push({
    key, id: p.id, foto: p.foto, preco: p.preco, qtd: 1, cor,
    nome: p.marca !== '—' ? p.marca + ' ' + p.nome : p.nome, corH
  });
  renderCarrinho();
  ligarTrilhos();
  /* Se veio da ficha do produto, a ficha sai da frente: senão o carrinho
     abre atrás do modal e parece que o clique não fez nada. */
  if ($('#modal').classList.contains('on')) fecharModal();
  abrirCarrinho();
}

function mudarQtd(key, d) {
  const i = carrinho.find(x => x.key === key);
  if (!i) return;
  i.qtd += d;
  if (i.qtd <= 0) carrinho = carrinho.filter(x => x.key !== key);
  renderCarrinho();
}

const totalProdutos = () => carrinho.reduce((s, i) => s + i.preco * i.qtd, 0);
const comDesconto   = v => v * (1 - LOJA.descontoAvista);
/* A porcentagem NUNCA é escrita à mão: sai de LOJA.descontoAvista. Antes o
   "5%" estava digitado em 6 lugares, então mudar a config não mudava o texto. */
const pctDesconto   = () => (LOJA.descontoAvista * 100)
  .toLocaleString('pt-BR', { maximumFractionDigits: 1 }) + '%';
const meiosComDesconto = () => PAGAMENTOS.filter(p => p.desconto).map(p => p.nome);
const formaEscolhida = () => PAGAMENTOS.find(f => f.id === pedido.pagamento) || PAGAMENTOS[0];
const temDesconto   = () => formaEscolhida().desconto;
const valorDesconto = () => temDesconto() ? totalProdutos() * LOJA.descontoAvista : 0;
const eParcelado    = () => !!formaEscolhida().parcelavel;
/* Quantas vezes cabem: respeita o teto da loja e o valor mínimo de parcela. */
const parcelasPossiveis = () => {
  const total = totalGeral();
  const max = LOJA.parcelaMinima
    ? Math.max(1, Math.min(LOJA.parcelas, Math.floor(total / LOJA.parcelaMinima)))
    : LOJA.parcelas;
  return Array.from({ length: max }, (_, i) => i + 1);
};
const parcela = (v, n) => v / (n || LOJA.parcelas);
const textoJuros = () =>
  LOJA.semJuros === true  ? ' sem juros'
: LOJA.semJuros === false ? ' com juros'
: '';
const totalItens    = () => carrinho.reduce((s, i) => s + i.qtd, 0);
const destino       = () => DESTINOS.find(d => d.id === pedido.destino) || DESTINOS[0];
const freteValor    = () => pedido.entrega !== 'entrega' ? 0 : (destino().frete === null ? 0 : destino().frete);
const freteTexto    = () => {
  if (pedido.entrega !== 'entrega') return 'Grátis (retirada)';
  if (destino().frete === null)     return 'A combinar';
  return destino().frete === 0 ? 'Grátis' : brl(destino().frete);
};
const totalGeral    = () => totalProdutos() - valorDesconto() + freteValor();

/* Sugere o que costuma faltar junto: quem leva tinta esquece rolo e lona.
   Nunca sugere o que já está no carrinho. */
function sugestoes() {
  const noCarrinho = carrinho.map(i => i.id);
  /* achatado porque `set` pode ser lista desde que produto passou a servir
     mais de um setor */
  const setoresNoCarrinho = [...new Set(
    carrinho.flatMap(i => {
      const p = PRODUTOS.find(x => x.id === i.id);
      return p ? setoresDe(p) : [];
    })
  )];
  const ids = [];
  setoresNoCarrinho.forEach(set => (UPSELL[set] || []).forEach(id => {
    if (!ids.includes(id) && !noCarrinho.includes(id)) ids.push(id);
  }));
  return ids.map(id => PRODUTOS.find(p => p.id === id)).filter(Boolean).slice(0, 3);
}

function htmlSugestoes() {
  const lista = sugestoes();
  if (!lista.length) return '';
  return `
    <div class="sugestoes">
      <p class="sugestoes__titulo">Vai precisar disso também?</p>
      ${lista.map(p => `
        <div class="sugestao">
          <div class="sugestao__img">${fotoOu(p, "", `loading="lazy"`)}</div>
          <div class="sugestao__meio">
            <p class="sugestao__nome">${esc(p.marca !== '—' ? p.marca + ' ' + p.nome : p.nome)}</p>
            <p class="sugestao__preco">${brl(p.preco)}</p>
          </div>
          <button class="sugestao__add" data-add="${p.id}" aria-label="Adicionar ${esc(p.nome)}">+</button>
        </div>`).join('')}
    </div>`;
}

/* No celular, o carrinho fica fora da vista ao rolar; a barra fixa
   mantém total e acesso ao pedido sempre à mão. */
function renderBarra() {
  const n = totalItens();
  const barra = $('#barraPedido');
  if (!barra) return;
  barra.hidden = n === 0;
  d0.body.classList.toggle('com-barra', n > 0);
  if (n) {
    $('#barraQtd').textContent = n === 1 ? '1 item no pedido' : n + ' itens no pedido';
    $('#barraTotal').textContent = brl(totalProdutos());
  }
}

function renderCarrinho() {
  const n = totalItens();
  const badge = $('#badgeCarrinho');
  badge.textContent = n;
  badge.classList.toggle('on', n > 0);
  renderBarra();

  if (!carrinho.length) {
    $('#itensCarrinho').innerHTML =
      '<div class="vazio"><b>Seu pedido está vazio</b><p>Escolha os produtos no catálogo e eles aparecem aqui.</p></div>';
    $('#peCarrinho').style.display = 'none';
    return;
  }

  $('#itensCarrinho').innerHTML = carrinho.map(i => `
    <div class="item">
      <div class="item__img">${fotoOu(i, "")}</div>
      <div class="item__meio">
        <p class="item__nome">${esc(i.nome)}</p>
        ${i.cor ? `<p class="item__cor">${i.corH
              ? `<span class="item__bloco" style="background:${hexSeguro(i.corH)}"></span>` : ''
            }Cor: ${esc(i.cor)}</p>` : ''}
        <p class="item__preco">${brl(i.preco * i.qtd)}</p>
        <div class="qtd">
          <button data-q="-1" data-k="${esc(i.key)}" aria-label="Diminuir">−</button>
          <span>${i.qtd}</span>
          <button data-q="1" data-k="${esc(i.key)}" aria-label="Aumentar">+</button>
        </div>
      </div>
      <button class="item__x" data-rm="${esc(i.key)}" aria-label="Remover">✕</button>
    </div>`).join('') + htmlSugestoes();

  $('#totalCarrinho').textContent = brl(totalProdutos());
  $('#peCarrinho').style.display = 'block';
  $$('[data-q]').forEach(b => b.onclick = () => mudarQtd(b.dataset.k, +b.dataset.q));
  $$('[data-rm]').forEach(b => b.onclick = () => {
    carrinho = carrinho.filter(x => x.key !== b.dataset.rm);
    renderCarrinho();
  });
}

/* Guarda quem abriu para devolver o foco ao fechar — quem navega por
   teclado ou leitor de tela fica perdido sem isso. */
let focoAnterior = null;

const abrirCarrinho = () => {
  travarFundo();
  focoAnterior = d0.activeElement;
  $('#gaveta').classList.add('on');
  $('#veu').classList.add('on');
  $('#gaveta').focus();
};
const fecharCarrinho = () => {
  setTimeout(destravarFundo, 0);
  $('#gaveta').classList.remove('on');
  if (!$('#modal').classList.contains('on')) {
    $('#veu').classList.remove('on');
    if (focoAnterior) { focoAnterior.focus(); focoAnterior = null; }
  }
};

/* ---------------- nota do pedido ---------------- */

function gerarNumero() {
  return 'BT-' + String(Math.floor(Math.random() * 9000) + 1000);
}

function textoRecebimento() {
  const u = unidade(unidadeDoPedido());
  if (pedido.entrega === 'entrega') {
    return `Entrega — ${pedido.endereco}  (loja ${u.nome})`;
  }
  return `Retirada — Loja ${u.nome} (${u.endereco})`;
}

function notaPedido() {
  /* a cor escolhida vai item a item: é o que a loja precisa para separar */
  const linhas = carrinho.map(i =>
    `• ${i.qtd}x ${i.nome}${i.cor ? ` — cor ${i.cor}` : ''}`
    + `\n   ${brl(i.preco)} un — ${brl(i.preco * i.qtd)}`
  ).join('\n');

  return `*PEDIDO ${pedido.numero} — BRUNO DAS TINTAS*
━━━━━━━━━━━━━━━━━━━
*Cliente:* ${pedido.nome}
*WhatsApp:* ${pedido.tel}
*Recebimento:* ${textoRecebimento()}
${pedido.cor ? `*Cor pedida:* ${pedido.cor}  _(confirmar antes de tingir)_\n` : ''}${pedido.obs ? `*Obs.:* ${pedido.obs}\n` : ''}━━━━━━━━━━━━━━━━━━━
*ITENS*
${linhas}
━━━━━━━━━━━━━━━━━━━
Produtos: ${brl(totalProdutos())}
${temDesconto() ? `Desconto ${formaEscolhida().nome} (${pctDesconto()}): − ${brl(valorDesconto())}\n` : ''}Entrega: ${freteTexto()}
*TOTAL: ${brl(totalGeral())}*

*Forma de pagamento:* ${formaEscolhida().nome}${eParcelado() && pedido.vezes > 1 ? ` — ${pedido.vezes}x de ${brl(parcela(totalGeral(), pedido.vezes))}${textoJuros()}` : ''}

Pedido feito pelo site. Aguardando a loja confirmar.`;
}

const ICO_IG = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none"/></svg>';

/* Cada loja tem o seu Instagram, então o botão do topo pergunta qual — mesma
   lógica do WhatsApp. Mandar todo mundo para um perfil só faria o cliente de
   Iguaba ver o conteúdo de Araruama. */
function escolherInstagram() {
  $('#tituloModal').textContent = 'Instagram de qual loja?';
  $('#corpoModal').innerHTML = `
    <p style="color:var(--texto-fraco);font-size:.92rem;margin-bottom:18px">
      Cada loja tem o seu perfil, com as novidades e as promoções dela.
    </p>
    ${UNIDADES.filter(u => u.instagram).map(u => `
      <a class="escolha-loja" href="${u.instagram}" target="_blank" rel="noopener">
        <span class="escolha-loja__ico">${ICO_IG}</span>
        <span class="escolha-loja__txt">
          <b>${esc(u.nome)}</b>
          <small>${esc(u.instagram.replace(/https?:\/\/(www\.)?instagram\.com\//, '@').replace(/\/$/, ''))}</small>
        </span>
      </a>`).join('')}`;
  abrirModal();
}

/* -------- escolher com qual loja falar -------- */

function escolherLoja(assunto) {
  const texto = assunto || 'Oi! Vim pelo site e queria tirar uma dúvida.';
  $('#tituloModal').textContent = 'Falar com qual loja?';
  $('#corpoModal').innerHTML = `
    <p style="color:var(--texto-fraco);font-size:.92rem;margin-bottom:18px">
      A gente tem duas lojas. Escolha a mais perto de você que o atendimento é direto com ela.
    </p>
    ${UNIDADES.map(u => `
      <a class="escolha-loja" href="${linkWhatsUnidade(u.id, texto)}" target="_blank" rel="noopener">
        <span class="escolha-loja__ico">${ICO_WPP}</span>
        <span class="escolha-loja__txt">
          <b>${esc(u.nome)}</b>
          <small>${esc(u.endereco)}</small>
          <small>${esc(u.whatsappVisivel)}</small>
        </span>
      </a>`).join('')}
    <p style="font-size:.78rem;color:var(--texto-fraco);text-align:center;margin-top:14px">
      Prefere ir até lá? <a href="#lojas" id="verMapas" style="color:var(--azul);font-weight:600">Ver as duas no mapa</a>
    </p>`;
  abrirModal();
  $('#verMapas').onclick = () => { fecharModal(); };
}

/* ---------------- checkout ---------------- */

/* Sem travar o body, o dedo que rola o modal no celular arrasta a página de
   trás junto — o cliente perde o lugar no catálogo ao fechar. */
const travarFundo   = () => d0.body.style.overflow = 'hidden';
const destravarFundo = () => {
  if (!$('#modal').classList.contains('on') && !$('#gaveta').classList.contains('on'))
    d0.body.style.overflow = '';
};

const abrirModal = () => {
  if (!$('#modal').classList.contains('on')) focoAnterior = focoAnterior || d0.activeElement;
  $('#modal').classList.add('on');
  $('#veu').classList.add('on');
  travarFundo();
  $('#modal').focus();
};
const fecharModal = () => {
  $('#modal').classList.remove('on');
  destravarFundo();
  if (!$('#gaveta').classList.contains('on')) {
    $('#veu').classList.remove('on');
    if (focoAnterior) { focoAnterior.focus(); focoAnterior = null; }
  }
};

function htmlResumo() {
  return `
    <div class="resumo__l"><span>Produtos (${totalItens()})</span><span>${brl(totalProdutos())}</span></div>
    ${temDesconto() ? `<div class="resumo__l resumo__l--desconto"><span>Desconto ${formaEscolhida().nome} (${pctDesconto()})</span><span>− ${brl(valorDesconto())}</span></div>` : ''}
    <div class="resumo__l"><span>Entrega</span><span>${freteTexto()}</span></div>
    <div class="resumo__l resumo__l--total"><span>Total</span><span>${brl(totalGeral())}</span></div>
    ${eParcelado() && pedido.vezes > 1 ? `<div class="resumo__l" style="color:var(--texto-fraco);font-size:.85rem"><span>${pedido.vezes}x de</span><span>${brl(parcela(totalGeral(), pedido.vezes))}${textoJuros()}</span></div>` : ''}`;
}

const PASSOS = ['Dados', 'Pagamento', 'Enviar'];

/* Só aparece se o cliente confirmar um horário de corte real em
   LOJA.corteEntregaHoje. Sem isso, nenhuma promessa de prazo é feita. */
function htmlCorte() {
  if (!LOJA.corteEntregaHoje || destino().frete === null) return '';
  const [h, m] = LOJA.corteEntregaHoje.split(':').map(Number);
  const agora = new Date();
  const corte = new Date(agora); corte.setHours(h, m, 0, 0);
  const faltam = Math.floor((corte - agora) / 60000);
  if (faltam <= 0) {
    return `<p class="aviso-corte aviso-corte--off">Hoje já passou do horário de ${LOJA.corteEntregaHoje}. Pedidos feitos agora saem para entrega amanhã.</p>`;
  }
  const txt = faltam >= 60
    ? `${Math.floor(faltam / 60)}h${String(faltam % 60).padStart(2, '0')}`
    : `${faltam} min`;
  return `<p class="aviso-corte">Faltam <b>${txt}</b> para o corte das ${LOJA.corteEntregaHoje} — pedindo até lá, sua entrega sai hoje.</p>`;
}

function htmlPassos(atual) {
  return `<div class="passos-nav" aria-label="Etapa ${atual} de 3">
    ${PASSOS.map((nome, i) => {
      const n = i + 1;
      const estado = n < atual ? ' feito' : n === atual ? ' on' : '';
      return `${i ? '<i class="passos-nav__linha"></i>' : ''}
        <span class="passo-bola${estado}">
          <b>${n < atual ? '✓' : n}</b><small>${nome}</small>
        </span>`;
    }).join('')}
  </div>`;
}

/* -------- passo 1: quem é e como recebe -------- */

function passo1() {
  $('#tituloModal').textContent = 'Seus dados';
  $('#corpoModal').innerHTML = `
    ${htmlPassos(1)}
    <div class="campo">
      <label for="fNome">Seu nome</label>
      <input id="fNome" value="${esc(pedido.nome)}" placeholder="Como podemos te chamar" autocomplete="name">
      <span class="campo__erro">Informe seu nome</span>
    </div>
    <div class="campo">
      <label for="fTel">WhatsApp</label>
      <input id="fTel" value="${esc(pedido.tel)}" placeholder="(22) 90000-0000" inputmode="tel" autocomplete="tel">
      <span class="campo__erro">Informe um WhatsApp válido</span>
    </div>

    <p class="rotulo-grupo">Como quer receber?</p>
    <div class="opcoes">
      ${UNIDADES.map(u => `
        <label class="opcao"><input type="radio" name="ent" value="retirar-${u.id}">
          <span><b>Retirar em ${esc(u.nome)}</b><small>${esc(u.endereco)} — pronto em ${esc(u.prontoEm)}</small></span></label>`).join('')}
      <label class="opcao"><input type="radio" name="ent" value="entrega">
        <span><b>Entrega</b><small>Frete grátis em Araruama e Iguaba Grande</small></span></label>
    </div>

    <div id="blocoEntrega" style="display:none">
      <div class="campo">
        <label for="fEnd">Endereço de entrega</label>
        <textarea id="fEnd" rows="2" placeholder="Rua, número, bairro e cidade">${esc(pedido.endereco)}</textarea>
        <span class="campo__erro">Informe o endereço</span>
      </div>
      <p class="rotulo-grupo">Para qual cidade?</p>
      <div class="opcoes">
        ${DESTINOS.map(dd => `
          <label class="opcao"><input type="radio" name="dest" value="${dd.id}">
            <span><b>${esc(dd.nome)}</b><small>${esc(dd.nota)}</small></span></label>`).join('')}
      </div>
      <div id="blocoLoja" style="display:none">
        <p class="rotulo-grupo">Qual loja fica mais perto de você?</p>
        <div class="opcoes">
          ${UNIDADES.map(u => `
            <label class="opcao"><input type="radio" name="uni" value="${u.id}">
              <span><b>${esc(u.nome)}</b><small>${esc(u.endereco)}</small></span></label>`).join('')}
        </div>
      </div>
      <div id="avisoCorte"></div>
    </div>

    <button class="btn btn--azul btn--bloco" id="btP1">Continuar →</button>`;

  ligarRadios('ent', v => {
    pedido.entrega = v;
    $('#blocoEntrega').style.display = v === 'entrega' ? 'block' : 'none';
  }, pedido.entrega);
  ligarRadios('dest', v => {
    pedido.destino = v;
    $('#blocoLoja').style.display = destino().loja ? 'none' : 'block';
    $('#avisoCorte').innerHTML = htmlCorte();
  }, pedido.destino);
  ligarRadios('uni', v => { pedido.unidade = v; }, pedido.unidade);
  $('#blocoEntrega').style.display = pedido.entrega === 'entrega' ? 'block' : 'none';
  $('#blocoLoja').style.display = destino().loja ? 'none' : 'block';
  $('#avisoCorte').innerHTML = htmlCorte();

  $('#btP1').onclick = () => {
    pedido.nome = $('#fNome').value.trim();
    pedido.tel  = $('#fTel').value.trim();
    if (pedido.entrega === 'entrega') pedido.endereco = $('#fEnd').value.trim();

    let ok = true;
    const marcar = (sel, cond) => {
      $(sel).closest('.campo').classList.toggle('erro', cond);
      if (cond) ok = false;
    };
    marcar('#fNome', pedido.nome.length < 2);
    marcar('#fTel',  pedido.tel.replace(/\D/g, '').length < 10);
    if (pedido.entrega === 'entrega') marcar('#fEnd', pedido.endereco.length < 8);
    if (ok) passo2();
  };
}

/* -------- passo 2: como paga -------- */

function passo2() {
  $('#tituloModal').textContent = 'Como pagar';
  $('#corpoModal').innerHTML = `
    ${htmlPassos(2)}
    <p class="rotulo-grupo">Como prefere pagar?</p>
    <div class="opcoes">
      ${PAGAMENTOS.map(f => `
        <label class="opcao"><input type="radio" name="pag" value="${f.id}">
          <span><b>${esc(f.nome)}</b><small>${esc(f.nota)}</small></span></label>`).join('')}
    </div>
    <div id="blocoParcelas"></div>

    <p class="dica-desconto">${meiosComDesconto().join(", ")} têm ${pctDesconto()} de desconto. O pagamento é combinado direto com a loja no WhatsApp — nada é cobrado pelo site.</p>

    <div class="resumo" id="resumo">${htmlResumo()}</div>

    <button class="btn btn--azul btn--bloco" id="btP2">Continuar →</button>
    <button class="btn btn--linha btn--bloco" id="voltarP1" style="margin-top:10px">← Voltar</button>`;

  ligarRadios('pag', v => {
    pedido.pagamento = v;
    if (!eParcelado()) pedido.vezes = 1;
    renderParcelas();
    $('#resumo').innerHTML = htmlResumo();
  }, pedido.pagamento);
  renderParcelas();

  $('#voltarP1').onclick = passo1;
  $('#btP2').onclick = passo3;
}

/* -------- passo 3: detalhes e envio -------- */

function renderParcelas() {
  const bloco = $('#blocoParcelas');
  if (!bloco) return;
  if (!eParcelado()) { bloco.innerHTML = ''; return; }

  const opcoes = parcelasPossiveis();
  if (pedido.vezes > opcoes.length) pedido.vezes = opcoes.length;

  bloco.innerHTML = `
    <div class="campo" style="margin-top:var(--e2)">
      <label for="fVezes">Em quantas vezes?</label>
      <select id="fVezes">
        ${opcoes.map(n => `
          <option value="${n}" ${n === pedido.vezes ? 'selected' : ''}>
            ${n}x de ${brl(parcela(totalGeral(), n))}${n === 1 ? ' (à vista no cartão)' : textoJuros()}
          </option>`).join('')}
      </select>
      <span class="campo__ajuda">As condições finais do parcelamento a loja confirma com você no WhatsApp.</span>
    </div>`;

  $('#fVezes').onchange = e => {
    pedido.vezes = +e.target.value;
    $('#resumo').innerHTML = htmlResumo();
  };
}

function passo3() {
  const u = unidade(unidadeDoPedido());
  $('#tituloModal').textContent = 'Enviar pedido';
  $('#corpoModal').innerHTML = `
    ${htmlPassos(3)}
    <div class="campo">
      <label for="fCor">Cor da tinta (se for o caso)</label>
      <input id="fCor" value="${esc(pedido.cor)}" placeholder="Ex.: Palha, ou o código do leque">
      <span class="campo__ajuda">A gente confirma a cor com você no WhatsApp antes de tingir — na tela do celular a cor nunca sai igual à da parede.</span>
    </div>
    <div class="campo">
      <label for="fObs">Quer avisar mais alguma coisa?</label>
      <textarea id="fObs" rows="2" placeholder="Ex.: preciso para amanhã de manhã">${esc(pedido.obs)}</textarea>
    </div>

    <div class="resumo" style="margin-bottom:var(--e4)">
      <div class="resumo__l"><span>Recebimento</span><span>${esc(pedido.entrega === 'entrega' ? 'Entrega' : 'Retirada em ' + u.nome)}</span></div>
      <div class="resumo__l"><span>Pagamento</span><span>${esc(formaEscolhida().nome)}${eParcelado() && pedido.vezes > 1 ? ' — ' + pedido.vezes + 'x' : ''}</span></div>
      ${htmlResumo()}
    </div>

    <button class="btn btn--azul btn--bloco" id="btEnviar">Enviar pedido no WhatsApp →</button>
    <p style="font-size:.76rem;color:var(--texto-fraco);text-align:center;margin-top:10px">
      Vai direto para a loja de <b>${esc(u.nome)}</b>. A gente confere, confirma o valor e combina o pagamento.
    </p>
    <button class="btn btn--linha btn--bloco" id="voltarP2" style="margin-top:10px">← Voltar</button>`;

  $('#voltarP2').onclick = () => { salvarP3(); passo2(); };
  $('#btEnviar').onclick = () => {
    salvarP3();
    pedido.numero = gerarNumero();
    // 'noopener' explícito: window.open NÃO assume isso sozinho (só a tag <a> com
    // target=_blank assume). Sem ele, a aba do WhatsApp recebe window.opener e
    // poderia mexer na janela do site.
    const aba = window.open(linkWhatsUnidade(unidadeDoPedido(), notaPedido()), '_blank', 'noopener');
    etapaFim(!aba);
  };
}

function salvarP3() {
  pedido.cor = $('#fCor').value.trim();
  pedido.obs = $('#fObs').value.trim();
}

/* marca o radio certo, aplica a classe e liga o onchange */
function ligarRadios(nome, aoMudar, valorAtual) {
  $$(`input[name="${nome}"]`).forEach(r => {
    r.checked = r.value === valorAtual;
    r.closest('.opcao').classList.toggle('on', r.checked);
    r.onchange = () => {
      $$(`input[name="${nome}"]`).forEach(x => x.closest('.opcao').classList.toggle('on', x.checked));
      aoMudar(r.value);
    };
  });
}

function etapaFim(precisaEnvioManual) {
  const u = unidade(unidadeDoPedido());
  const nota = notaPedido();
  $('#tituloModal').textContent = precisaEnvioManual ? 'Falta mandar o pedido' : 'Pedido enviado';
  $('#corpoModal').innerHTML = `
    ${precisaEnvioManual ? `
      <div class="aviso">Seu navegador bloqueou a abertura do WhatsApp. Toque no botão abaixo para mandar o pedido para a loja.</div>`
    : `
      <div class="ok-selo"><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></div>
      <p style="text-align:center;font-family:var(--display);font-size:1.7rem;font-weight:800;text-transform:uppercase;line-height:1;margin-bottom:8px">Pedido ${esc(pedido.numero)}</p>
      <p style="text-align:center;color:var(--texto-fraco);font-size:.9rem;margin-bottom:20px">
        Mandamos tudo para a loja de <b>${esc(u.nome)}</b>. A gente confere o estoque, confirma o valor e combina o pagamento em ${esc(formaEscolhida().nome)} com você.
      </p>`}

    <div class="resumo" style="margin-bottom:16px">
      <div class="resumo__l"><span>Pedido</span><span><b>${esc(pedido.numero)}</b></span></div>
      <div class="resumo__l"><span>Loja</span><span>${esc(u.nome)}</span></div>
      <div class="resumo__l"><span>Pagamento</span><span>${esc(formaEscolhida().nome)}${eParcelado() && pedido.vezes > 1 ? ' — ' + pedido.vezes + 'x' : ''}</span></div>
      <div class="resumo__l resumo__l--total"><span>Total</span><span>${brl(totalGeral())}</span></div>
    </div>

    <a class="btn btn--azul btn--bloco" href="${linkWhatsUnidade(unidadeDoPedido(), nota)}" target="_blank" rel="noopener">
      ${precisaEnvioManual ? 'Enviar pedido para ' + esc(u.nome) : 'Abrir a conversa de novo'}
    </a>
    <button class="btn btn--linha btn--bloco" id="btVoltarDados" style="margin-top:10px">← Corrigir alguma coisa</button>
    <button class="btn btn--linha btn--bloco" id="btNovo" style="margin-top:10px;border:none;color:var(--texto-fraco)">Fazer outro pedido</button>`;

  $('#btVoltarDados').onclick = passo1;
  $('#btNovo').onclick = () => {
    carrinho = [];
    pedido = pedidoVazio();
    renderCarrinho();
    fecharModal();
  };
}

/* ---------------- ligações ---------------- */

document.addEventListener('click', e => {
  const cor = e.target.closest('[data-cor]');
  if (cor) {
    corEscolhida[+cor.dataset.prod] = cor.dataset.cor;
    cor.parentElement.querySelectorAll('.cor').forEach(b => {
      b.classList.toggle('on', b === cor);
      b.setAttribute('aria-checked', b === cor);
    });
    return;
  }
  const medida = e.target.closest('[data-cor-medida]');
  if (medida) { pedirCorPersonalizada(+medida.dataset.corMedida); return; }
  const ver = e.target.closest('[data-ver]');
  if (ver) { verProduto(+ver.dataset.ver); return; }
  const add = e.target.closest('[data-add]');
  if (add) adicionar(+add.dataset.add);
});

$('#busca').addEventListener('input', e => { termo = e.target.value; renderGrade(); });
$('#abrirCarrinho').onclick = abrirCarrinho;
$('#barraPedido').onclick = abrirCarrinho;
$$('[data-insta]').forEach(b => b.onclick = e => { e.preventDefault(); escolherInstagram(); });
$$('[data-falar]').forEach(b => b.onclick = e => {
  e.preventDefault();
  escolherLoja(b.dataset.falar || null);
});
$('#fecharCarrinho').onclick = fecharCarrinho;
$('#continuarComprando').onclick = () => {
  fecharCarrinho();
  $('#catalogo').scrollIntoView({ behavior: 'smooth' });
};
$('#veu').onclick = () => { fecharCarrinho(); fecharModal(); };
$('#fecharModal').onclick = fecharModal;
$('#irCheckout').onclick = () => { fecharCarrinho(); passo1(); abrirModal(); };

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { fecharCarrinho(); fecharModal(); }
});

/* -------- setas dos carrosséis --------
   A seta só aparece quando o conteúdo não cabe na tela. Arrastar
   com o dedo continua funcionando; a seta é para quem não percebe
   que dá para rolar. */
function ligarTrilhos() {
  $$('[data-rola]').forEach(bt => {
    const trilho = document.getElementById(bt.dataset.rola);
    if (!trilho) return;
    bt.onclick = () => {
      const passo = trilho.clientWidth * 0.8;
      trilho.scrollBy({ left: passo * (+bt.dataset.dir), behavior: 'smooth' });
    };
  });

  $$('.trilho-caixa').forEach(caixa => {
    const trilho = caixa.querySelector('[id]');
    if (!trilho) return;
    const atualizar = () => {
      const cabe = trilho.scrollWidth <= trilho.clientWidth + 4;
      caixa.classList.toggle('tem-overflow', !cabe);
      const esq = caixa.querySelector('.trilho-seta--esq');
      const dir = caixa.querySelector('.trilho-seta--dir');
      if (esq) esq.disabled = trilho.scrollLeft <= 2;
      if (dir) dir.disabled = trilho.scrollLeft + trilho.clientWidth >= trilho.scrollWidth - 2;
    };
    trilho.addEventListener('scroll', atualizar, { passive: true });
    addEventListener('resize', atualizar);
    atualizar();
  });
}

/* ---------------- dados estruturados do catálogo ----------------

   O `index.html` já declara as duas lojas como HardwareStore. Faltava o
   catálogo: 26 produtos com marca, foto e preço que o Google não tinha como
   ler, porque estão em `dados.js` e não na marcação.

   Por que montado aqui, em vez de escrito à mão no HTML: preço é o dado que
   mais muda neste projeto, e uma cópia no HTML iria envelhecer calada. Preço
   errado em dado estruturado é pior que dado estruturado nenhum — sai no
   resultado de busca com a cara de oficial. Gerando de `PRODUTOS`, existe uma
   fonte só. Ver ADR-006.

   Não declaro `availability`. O site nunca afirmou estoque — quem confirma é
   a loja, no WhatsApp, antes de separar. `InStock` seria uma promessa que o
   código não tem como cumprir. O campo é opcional no schema.org. */
const SITE = 'https://www.brunodastintas.com';

function descricaoDe(p) {
  const f = FICHAS[p.id];
  if (!f) return '';
  return [f.onde, f.rendimento && `Rende ${f.rendimento}.`].filter(Boolean).join('. ');
}

function dadosEstruturadosDoCatalogo() {
  const lista = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Catálogo — Bruno das Tintas',
    numberOfItems: PRODUTOS.length,
    itemListElement: PRODUTOS.map((p, i) => {
      const prod = {
        '@type': 'Product',
        name: p.marca !== '—' ? `${p.marca} ${p.nome}` : p.nome,
        offers: {
          '@type': 'Offer',
          price: p.preco.toFixed(2),
          priceCurrency: 'BRL',
          url: SITE + '/',
          seller: { '@id': SITE + '/#araruama' }
        }
      };
      if (p.marca !== '—') prod.brand = { '@type': 'Brand', name: p.marca };
      if (p.foto) prod.image = `${SITE}/fotos/${p.foto}.webp`;
      const desc = descricaoDe(p);
      if (desc) prod.description = desc;
      return { '@type': 'ListItem', position: i + 1, item: prod };
    })
  };
  const el = d0.createElement('script');
  el.type = 'application/ld+json';
  el.textContent = JSON.stringify(lista);
  d0.head.appendChild(el);
}

/* ---------------- start ---------------- */
renderSetores();
renderMarcas();
renderLojas();
renderFiltros();
renderGrade();
renderDestaque();
renderCarrinho();
ligarTrilhos();
dadosEstruturadosDoCatalogo();

/* O logo e as artes vêm direto no src do HTML. O MAPA_IMG guarda só os logos
   de marca, que o renderMarcas() resolve. */
