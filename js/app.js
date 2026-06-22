function formatarPreco(valor) {
  return 'R$ ' + valor.toFixed(2).replace('.', ',');
}

function renderizarFoto(item, icone) {
  if (item.imagem) {
    return `<img src="${item.imagem}" alt="${item.nome}" class="foto-img">`;
  }
  return `
    <div class="foto-placeholder">
      <span class="icone-foto">${icone}</span>
      <span class="label-foto">Foto em breve</span>
    </div>
  `;
}

function classeCardFoto(item) {
  return item.imagem ? 'card-foto card-foto--img' : 'card-foto card-foto--placeholder';
}

function renderizarCardapio() {
  const main = document.getElementById('cardapio-main');
  const html = cardapio.map(categoria => `
    <section class="categoria" id="${categoria.id}">
      <div class="categoria-titulo">
        <span class="icone">${categoria.icone}</span>
        <h2>${categoria.titulo}</h2>
      </div>
      ${categoria.observacao ? `<p class="categoria-obs">${categoria.observacao}</p>` : ''}
      <div class="grid-cards">
        ${categoria.itens.map(item => `
          <div class="card">
            <div class="${classeCardFoto(item)}">${renderizarFoto(item, categoria.icone)}</div>
            <div class="card-body">
              <div class="card-nome">${item.nome}</div>
              ${item.desc ? `<div class="card-desc">${item.desc}</div>` : ''}
              <div class="card-preco">${formatarPreco(item.preco)}</div>
            </div>
          </div>
        `).join('')}
      </div>
    </section>
  `).join('');
  main.innerHTML = html;
}

renderizarCardapio();

// ============================================================
// NAVEGAÇÃO POR CATEGORIA — fonte única de verdade: activeCategory
// ------------------------------------------------------------
// Tanto o clique numa aba quanto o scroll da página só fazem uma
// coisa: chamar setActiveCategory(id). É essa função, sozinha, que
// decide qual aba recebe a classe "ativo". Não existe nenhum outro
// estado (ex.: "clicado") aplicando estilo em paralelo.
// ============================================================
(function () {
  const nav = document.querySelector('.nav-categorias');
  const links = Array.from(document.querySelectorAll('.nav-categorias a'));
  const sections = Array.from(document.querySelectorAll('.categoria'));
  const linkPorId = {};
  links.forEach(link => { linkPorId[link.getAttribute('href').slice(1)] = link; });

  let activeCategory = null;
  // Enquanto o scroll suave disparado por um clique está em andamento,
  // o observer não pode sobrescrever a aba ativa.
  let isClickScrolling = false;
  let clickScrollTimeout = null;
  // Ids das seções atualmente dentro da faixa "visível" (logo abaixo do menu sticky)
  const secoesVisiveis = new Set();

  function setActiveCategory(id, { centralizarAba = false } = {}) {
    if (!id || id === activeCategory) return;
    activeCategory = id;

    links.forEach(link => {
      const linkId = link.getAttribute('href').slice(1);
      link.classList.toggle('ativo', linkId === activeCategory);
    });

    if (centralizarAba) {
      const linkAtivo = linkPorId[activeCategory];
      if (linkAtivo) {
        linkAtivo.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }

  // Entre as seções atualmente visíveis, a primeira na ordem do documento
  // é considerada "a seção atual" (comportamento clássico de scrollspy).
  function recalcularSecaoVisivel() {
    if (isClickScrolling) return;
    const secaoAtual = sections.find(sec => secoesVisiveis.has(sec.id));
    if (secaoAtual) setActiveCategory(secaoAtual.id, { centralizarAba: true });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        secoesVisiveis.add(entry.target.id);
      } else {
        secoesVisiveis.delete(entry.target.id);
      }
    });
    recalcularSecaoVisivel();
  }, {
    // Considera "visível" a seção que está cruzando a faixa logo abaixo do menu sticky
    rootMargin: `-${nav.offsetHeight}px 0px -70% 0px`,
    threshold: 0,
  });

  sections.forEach(sec => observer.observe(sec));

  function liberarDeteccaoPorScroll() {
    clearTimeout(clickScrollTimeout);
    isClickScrolling = false;
    recalcularSecaoVisivel();
  }

  links.forEach(link => {
    link.addEventListener('click', (event) => {
      const id = link.getAttribute('href').slice(1);
      const destino = document.getElementById(id);
      if (!destino) return;

      event.preventDefault();
      link.blur();

      // 1) A aba clicada já é a ativa — sem esperar o scroll terminar.
      isClickScrolling = true;
      setActiveCategory(id);

      // 2) Scroll suave até a seção, compensando a altura do menu sticky.
      const destinoY = window.scrollY + destino.getBoundingClientRect().top - nav.offsetHeight;
      window.scrollTo({ top: destinoY, behavior: 'smooth' });

      // 3) Só depois que o scroll automático terminar o observer volta a
      // decidir a aba ativa a partir da seção realmente visível.
      clearTimeout(clickScrollTimeout);
      if ('onscrollend' in window) {
        window.addEventListener('scrollend', liberarDeteccaoPorScroll, { once: true });
        clickScrollTimeout = setTimeout(liberarDeteccaoPorScroll, 1500); // rede de segurança
      } else {
        clickScrollTimeout = setTimeout(liberarDeteccaoPorScroll, 700);
      }
    });
  });
})();
