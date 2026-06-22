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

// Marca o link do menu ativo conforme a seção visível
(function () {
  const links = document.querySelectorAll('.nav-categorias a');
  const sections = document.querySelectorAll('.categoria');

  function atualizarMenu() {
    let atual = '';
    sections.forEach(sec => {
      const topo = sec.getBoundingClientRect().top;
      if (topo <= 80) atual = sec.id;
    });
    links.forEach(link => {
      link.classList.toggle('ativo', link.getAttribute('href') === '#' + atual);
    });
  }

  window.addEventListener('scroll', atualizarMenu, { passive: true });
  atualizarMenu();
})();
