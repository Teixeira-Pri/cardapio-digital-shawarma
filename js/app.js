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

function renderizarGradeCards(categoria) {
  return `
    <div class="grid-cards">
      ${categoria.itens.map((item, idx) => {
        const id = `${categoria.id}__${idx}`;
        return `
          <div class="card">
            <div class="${classeCardFoto(item)}">${renderizarFoto(item, categoria.icone)}</div>
            <div class="card-body">
              <div class="card-nome">${item.nome}</div>
              ${item.desc ? `<div class="card-desc">${item.desc}</div>` : ''}
              <div class="card-preco">${formatarPreco(item.preco)}</div>
              <div class="card-acoes">${renderizarAcoesItem(id)}</div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function renderizarBannerLista(categoria) {
  return `
    <div class="banner-categoria">
      <div class="banner-categoria-texto">
        <span class="banner-categoria-legenda">${categoria.bannerLegenda || categoria.titulo}</span>
      </div>
      <div class="banner-categoria-img-wrap">
        <img src="${categoria.banner}" alt="${categoria.titulo}" class="banner-categoria-img">
      </div>
    </div>
    <div class="lista-itens">
      ${categoria.itens.map((item, idx) => {
        const id = `${categoria.id}__${idx}`;
        return `
        <div class="item-linha">
          <div class="item-linha-info">
            <div class="item-linha-nome">${item.nome}</div>
            ${item.desc ? `<div class="item-linha-desc">${item.desc}</div>` : ''}
            <div class="item-linha-preco">${formatarPreco(item.preco)}</div>
          </div>
          ${renderizarAcoesItem(id)}
        </div>
      `;
      }).join('')}
    </div>
  `;
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
      ${categoria.banner ? renderizarBannerLista(categoria) : renderizarGradeCards(categoria)}
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

  // Calcula, na hora, qual seção está "atual": a última (em ordem de
  // documento) cujo topo já passou por baixo do menu sticky. Não depende
  // de nenhum estado intermediário (sem Set/lista acumulando entradas e
  // saídas) — é sempre recalculado do zero a partir da posição real na
  // tela, então nunca pode ficar dessincronizado.
  function obterSecaoAtual() {
    let atual = null;
    for (const sec of sections) {
      if (sec.getBoundingClientRect().top - nav.offsetHeight <= 1) {
        atual = sec.id;
      }
    }
    return atual;
  }

  function recalcularSecaoVisivel() {
    if (isClickScrolling) return;
    const id = obterSecaoAtual();
    if (id) setActiveCategory(id, { centralizarAba: true });
  }

  const observer = new IntersectionObserver(() => {
    // O IntersectionObserver só serve de "gatilho" eficiente para saber
    // quando recalcular — a decisão em si vem sempre de obterSecaoAtual().
    recalcularSecaoVisivel();
  }, {
    rootMargin: `-${nav.offsetHeight}px 0px -70% 0px`,
    threshold: 0,
  });

  sections.forEach(sec => observer.observe(sec));

  function liberarDeteccaoPorScroll() {
    if (!isClickScrolling) return; // idempotente: pode ser chamada mais de uma vez
    clearTimeout(clickScrollTimeout);
    isClickScrolling = false;
    recalcularSecaoVisivel();
  }

  // Detecta o fim do scroll suave observando a posição via requestAnimationFrame,
  // em vez de depender do evento "scrollend" (suporte inconsistente em
  // navegadores mobile). Some frames sem mudança de posição = scroll parou.
  function aguardarFimDoScroll(callback) {
    let ultimaPosicao = window.scrollY;
    let framesParado = 0;
    function checar() {
      if (!isClickScrolling) return; // já foi liberado por outra via
      const posicaoAtual = window.scrollY;
      if (posicaoAtual === ultimaPosicao) {
        framesParado++;
      } else {
        framesParado = 0;
        ultimaPosicao = posicaoAtual;
      }
      if (framesParado >= 4) {
        callback();
        return;
      }
      requestAnimationFrame(checar);
    }
    requestAnimationFrame(checar);
  }

  links.forEach(link => {
    link.addEventListener('click', (event) => {
      const id = link.getAttribute('href').slice(1);
      const destino = document.getElementById(id);
      if (!destino) return;

      event.preventDefault();

      // 1) A aba clicada já é a ativa — sem esperar o scroll terminar.
      isClickScrolling = true;
      setActiveCategory(id);

      // 2) Scroll suave até a seção, compensando a altura do menu sticky.
      const destinoY = window.scrollY + destino.getBoundingClientRect().top - nav.offsetHeight;
      window.scrollTo({ top: destinoY, behavior: 'smooth' });

      // 3) Só agora, depois de já ter atualizado o estado e iniciado o
      // scroll, removemos o foco do link — assim nenhum navegador pode
      // aplicar um estilo de foco residual sobre a aba clicada.
      link.blur();

      // 4) Enquanto o scroll automático não termina, o observer fica
      // bloqueado (isClickScrolling). Duas redes de segurança garantem
      // que ele seja sempre liberado: detecção de posição parada e um
      // timeout máximo absoluto.
      clearTimeout(clickScrollTimeout);
      clickScrollTimeout = setTimeout(liberarDeteccaoPorScroll, 2000);
      aguardarFimDoScroll(liberarDeteccaoPorScroll);
    });
  });
})();
