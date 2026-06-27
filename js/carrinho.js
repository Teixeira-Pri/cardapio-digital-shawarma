// ============================================================
// CARRINHO DE COMPRAS
// ------------------------------------------------------------
// Estado em memória: [{ id, nome, preco, imagem, qtd }]. Cada visita
// começa com o carrinho vazio de propósito — é um cardápio acessado
// por QR Code na mesa, então não deve "lembrar" pedido de uma sessão
// anterior. "id" identifica o item de forma única:
// "<categoriaId>__<índice>". Todo cálculo de dinheiro passa por
// arredondar() para evitar os erros clássicos de soma de ponto
// flutuante (ex.: 0.1 + 0.2).
//
// Cada item do cardápio tem dois estados visuais, derivados sempre
// do carrinho (nunca de um valor solto na tela):
//   - zerado: mostra só o botão "Adicionar".
//   - ativo:  mostra o seletor "− qtd +" com a quantidade real no carrinho.
// Isso é o que renderizarAcoesItem() decide a cada chamada.
// ============================================================

const WHATSAPP_NUMERO = '5511987987230';

function arredondar(valor) {
  return Math.round((valor + Number.EPSILON) * 100) / 100;
}

function formatarPreco(valor) {
  return 'R$ ' + valor.toFixed(2).replace('.', ',');
}

let carrinho = [];

function buscarItemPorId(id) {
  const [catId, idx] = id.split('__');
  const categoria = cardapio.find(c => c.id === catId);
  return categoria ? categoria.itens[Number(idx)] : null;
}

function buscarCategoriaPorId(id) {
  const [catId] = id.split('__');
  return cardapio.find(c => c.id === catId);
}

function itemPermiteRetirada(id) {
  const categoria = buscarCategoriaPorId(id);
  return !!(categoria && categoria.permiteRetirarItem);
}

function obterQtdNoCarrinho(id) {
  const linha = carrinho.find(c => c.id === id);
  return linha ? linha.qtd : 0;
}

function renderizarAcoesItem(id) {
  const qtd = obterQtdNoCarrinho(id);
  if (qtd > 0) {
    return `
      <div class="item-acoes item-acoes--ativo" data-id="${id}">
        <button class="btn-qtd" data-acao="diminuir" aria-label="Diminuir quantidade">−</button>
        <span class="qtd-valor">${qtd}</span>
        <button class="btn-qtd" data-acao="aumentar" aria-label="Aumentar quantidade">+</button>
      </div>
    `;
  }
  return `
    <div class="item-acoes" data-id="${id}">
      <button class="botao-add">Adicionar</button>
    </div>
  `;
}

// Itens de categorias com "permiteRetirarItem" guardam uma pergunta
// "retirar algo?" por unidade (item.retiradas), já que cada unidade do
// mesmo produto pode ter um pedido diferente (ex.: 2x Shawarma de
// Carne, um sem picles, outro normal). Sempre que a quantidade muda,
// o array é redimensionado preservando o que já foi escolhido.
function redimensionarRetiradas(linha) {
  if (!linha.permiteRetirada) return;
  while (linha.retiradas.length < linha.qtd) linha.retiradas.push({ retirar: false, obs: '' });
  while (linha.retiradas.length > linha.qtd) linha.retiradas.pop();
}

// Define a quantidade exata de um item no carrinho. 0 (ou menos)
// remove o item e o devolve ao estado inicial ("Adicionar").
function definirQuantidadeItem(id, novaQtd) {
  novaQtd = Math.max(0, arredondar(novaQtd));

  if (novaQtd <= 0) {
    carrinho = carrinho.filter(c => c.id !== id);
  } else {
    const linha = carrinho.find(c => c.id === id);
    if (linha) {
      linha.qtd = novaQtd;
      redimensionarRetiradas(linha);
    } else {
      const item = buscarItemPorId(id);
      if (!item) return;
      const permiteRetirada = itemPermiteRetirada(id);
      carrinho.push({
        id,
        nome: item.nome,
        preco: item.preco,
        imagem: item.imagem || null,
        permiteRetirada,
        retiradas: permiteRetirada ? Array.from({ length: novaQtd }, () => ({ retirar: false, obs: '' })) : [],
        qtd: novaQtd,
      });
    }
  }

  atualizarUICarrinho();
}

// Usado apenas pelo seletor dentro do drawer: quantidade mínima 1,
// remoção é feita explicitamente pela lixeira (não ao decrementar).
function alterarQuantidadeCarrinho(id, delta) {
  const linha = carrinho.find(c => c.id === id);
  if (!linha) return;
  const novaQtd = arredondar(linha.qtd + delta);
  if (novaQtd < 1) return;
  linha.qtd = novaQtd;
  redimensionarRetiradas(linha);
  atualizarUICarrinho();
}

function removerDoCarrinho(id) {
  carrinho = carrinho.filter(c => c.id !== id);
  atualizarUICarrinho();
}

function totalCarrinho() {
  return arredondar(carrinho.reduce((soma, item) => soma + item.preco * item.qtd, 0));
}

function quantidadeTotalCarrinho() {
  return carrinho.reduce((soma, item) => soma + item.qtd, 0);
}

function renderizarFotoMini(item) {
  if (item.imagem) {
    return `<img src="${item.imagem}" alt="${item.nome}" class="drawer-item-img">`;
  }
  return `<div class="drawer-item-img drawer-item-img--placeholder">🥙</div>`;
}

function renderizarRetiradasItem(item) {
  if (!item.permiteRetirada) return '';
  return `
    <div class="drawer-item-retiradas">
      ${item.retiradas.map((retirada, i) => `
        <div class="retirada-unidade">
          <div class="retirada-pergunta">
            <span>${item.retiradas.length > 1 ? `Unidade ${i + 1} — ` : ''}Retirar algum item do pedido?</span>
            <div class="retirada-opcoes">
              <button type="button" class="btn-retirada${!retirada.retirar ? ' btn-retirada--ativo' : ''}" data-id="${item.id}" data-indice="${i}" data-valor="nao">Não</button>
              <button type="button" class="btn-retirada${retirada.retirar ? ' btn-retirada--ativo' : ''}" data-id="${item.id}" data-indice="${i}" data-valor="sim">Sim</button>
            </div>
          </div>
          ${retirada.retirar ? `<input type="text" class="campo-retirada-obs" data-id="${item.id}" data-indice="${i}" value="${retirada.obs}" placeholder="O que deseja retirar? Ex: picles, cebola...">` : ''}
        </div>
      `).join('')}
    </div>
  `;
}

function atualizarUICarrinho() {
  const badge = document.getElementById('badge-carrinho');
  const totalItens = quantidadeTotalCarrinho();
  badge.textContent = totalItens;
  badge.style.display = totalItens > 0 ? 'flex' : 'none';

  const container = document.getElementById('drawer-itens');
  if (carrinho.length === 0) {
    container.innerHTML = `<p class="drawer-vazio">Seu carrinho está vazio.<br>Escolha algo delicioso no cardápio! 🥙</p>`;
  } else {
    container.innerHTML = carrinho.map(item => `
      <div class="drawer-item" data-id="${item.id}">
        ${renderizarFotoMini(item)}
        <div class="drawer-item-info">
          <div class="drawer-item-nome">${item.nome}</div>
          ${renderizarRetiradasItem(item)}
          <div class="drawer-item-controles">
            <button class="btn-qtd btn-qtd--mini" data-acao="diminuir" data-id="${item.id}" aria-label="Diminuir quantidade">−</button>
            <span class="qtd-valor">${item.qtd}</span>
            <button class="btn-qtd btn-qtd--mini" data-acao="aumentar" data-id="${item.id}" aria-label="Aumentar quantidade">+</button>
          </div>
        </div>
        <div class="drawer-item-precos">
          <button class="btn-remover" data-id="${item.id}" aria-label="Remover item">🗑️</button>
          <span class="drawer-item-unitario">${formatarPreco(item.preco)} /un.</span>
          <span class="drawer-item-subtotal">${formatarPreco(arredondar(item.preco * item.qtd))}</span>
        </div>
      </div>
    `).join('');
  }

  document.getElementById('total-carrinho').textContent = formatarPreco(totalCarrinho());
  document.getElementById('botao-finalizar').disabled = carrinho.length === 0;

  // O cardápio é a outra "visão" do mesmo estado: sempre que o carrinho
  // muda (por aqui ou pelo drawer), os botões de cada item são
  // re-sincronizados para refletir a quantidade real.
  document.querySelectorAll('#cardapio-main .item-acoes').forEach(el => {
    el.outerHTML = renderizarAcoesItem(el.dataset.id);
  });
}

// Lista o que cada unidade pediu para retirar (ex.: "sem picles"),
// já que cada unidade do mesmo produto pode ter um pedido diferente.
function formatarRetiradas(item) {
  if (!item.permiteRetirada) return '';
  const pedidos = item.retiradas
    .map((retirada, i) => (retirada.retirar && retirada.obs ? { i, obs: retirada.obs } : null))
    .filter(Boolean);
  if (!pedidos.length) return '';
  if (item.retiradas.length === 1) return ` (retirar: ${pedidos[0].obs})`;
  return ` (retirar — ${pedidos.map(p => `un. ${p.i + 1}: ${p.obs}`).join('; ')})`;
}

function montarMensagemPedido(dadosCliente) {
  const linhas = [];
  linhas.push('🥙 *Novo pedido — Shawarma Beirut Halal*');
  linhas.push('');
  linhas.push(`*Cliente:* ${dadosCliente.nome}`);
  if (dadosCliente.telefone) linhas.push(`*Celular:* ${dadosCliente.telefone}`);
  linhas.push(`*Mesa:* ${dadosCliente.mesa}`);
  linhas.push('');
  linhas.push('*Pedido:*');
  carrinho.forEach(item => {
    linhas.push(`• ${item.qtd}x ${item.nome}${formatarRetiradas(item)} — ${formatarPreco(arredondar(item.preco * item.qtd))}`);
  });
  linhas.push('');
  linhas.push(`*Total: ${formatarPreco(totalCarrinho())}*`);
  return linhas.join('\n');
}

function enviarPedidoWhatsApp(dadosCliente) {
  const mensagem = montarMensagemPedido(dadosCliente);
  const url = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensagem)}`;
  window.open(url, '_blank', 'noopener');
}

// ============================================================
// INTERAÇÕES
// ============================================================
(function () {
  atualizarUICarrinho();

  // ---- Botão "Adicionar" / seletor "− qtd +" de cada item do cardápio ----
  document.getElementById('cardapio-main').addEventListener('click', (e) => {
    const acoes = e.target.closest('.item-acoes');
    if (!acoes) return;
    const id = acoes.dataset.id;

    if (e.target.closest('.botao-add')) {
      definirQuantidadeItem(id, 1);
      return;
    }

    const btnQtd = e.target.closest('.btn-qtd');
    if (btnQtd) {
      const delta = btnQtd.dataset.acao === 'aumentar' ? 1 : -1;
      definirQuantidadeItem(id, obterQtdNoCarrinho(id) + delta);
    }
  });

  // ---- Drawer do carrinho ----
  const overlayCarrinho = document.getElementById('overlay-carrinho');
  const drawerCarrinho = document.getElementById('drawer-carrinho');

  function abrirCarrinho() {
    drawerCarrinho.classList.add('aberto');
    overlayCarrinho.classList.add('visivel');
    drawerCarrinho.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function fecharCarrinho() {
    drawerCarrinho.classList.remove('aberto');
    overlayCarrinho.classList.remove('visivel');
    drawerCarrinho.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.getElementById('botao-carrinho').addEventListener('click', abrirCarrinho);
  document.getElementById('fechar-carrinho').addEventListener('click', fecharCarrinho);
  document.getElementById('continuar-escolhendo').addEventListener('click', fecharCarrinho);
  overlayCarrinho.addEventListener('click', fecharCarrinho);

  document.getElementById('drawer-itens').addEventListener('click', (e) => {
    const btnQtd = e.target.closest('.btn-qtd--mini');
    if (btnQtd) {
      const delta = btnQtd.dataset.acao === 'aumentar' ? 1 : -1;
      alterarQuantidadeCarrinho(btnQtd.dataset.id, delta);
      return;
    }
    const btnRemover = e.target.closest('.btn-remover');
    if (btnRemover) {
      removerDoCarrinho(btnRemover.dataset.id);
      return;
    }
    const btnRetirada = e.target.closest('.btn-retirada');
    if (btnRetirada) {
      const linha = carrinho.find(c => c.id === btnRetirada.dataset.id);
      if (!linha) return;
      const indice = Number(btnRetirada.dataset.indice);
      linha.retiradas[indice].retirar = btnRetirada.dataset.valor === 'sim';
      atualizarUICarrinho();
    }
  });

  // Campo "O que deseja retirar?": atualiza direto no carrinho, sem
  // redesenhar o drawer a cada tecla (perderia o foco/cursor do campo).
  document.getElementById('drawer-itens').addEventListener('input', (e) => {
    if (!e.target.classList.contains('campo-retirada-obs')) return;
    const linha = carrinho.find(c => c.id === e.target.dataset.id);
    if (!linha) return;
    const indice = Number(e.target.dataset.indice);
    linha.retiradas[indice].obs = e.target.value.trim();
  });

  // ---- Formulário de finalização ----
  const overlayFormulario = document.getElementById('overlay-formulario');
  const modalFormulario = document.getElementById('modal-formulario');

  function abrirFormulario() {
    if (carrinho.length === 0) return;
    modalFormulario.classList.add('aberto');
    overlayFormulario.classList.add('visivel');
    modalFormulario.setAttribute('aria-hidden', 'false');
  }

  function fecharFormulario() {
    modalFormulario.classList.remove('aberto');
    overlayFormulario.classList.remove('visivel');
    modalFormulario.setAttribute('aria-hidden', 'true');
  }

  document.getElementById('botao-finalizar').addEventListener('click', abrirFormulario);
  document.getElementById('fechar-formulario').addEventListener('click', fecharFormulario);
  overlayFormulario.addEventListener('click', fecharFormulario);

  // Filtra a digitação em tempo real: nome só aceita texto, celular e
  // mesa só aceitam números (o atributo "pattern" sozinho só validaria
  // no envio, não impediria o caractere errado de aparecer no campo).
  document.getElementById('campo-nome').addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[0-9]/g, '');
  });
  ['campo-telefone', 'campo-mesa'].forEach(id => {
    document.getElementById(id).addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/[^0-9]/g, '');
    });
  });

  document.getElementById('form-pedido').addEventListener('submit', (e) => {
    e.preventDefault();
    const dadosCliente = {
      nome: document.getElementById('campo-nome').value.trim(),
      telefone: document.getElementById('campo-telefone').value.trim(),
      mesa: document.getElementById('campo-mesa').value.trim(),
    };

    enviarPedidoWhatsApp(dadosCliente);

    carrinho = [];
    atualizarUICarrinho();
    e.target.reset();
    fecharFormulario();
    fecharCarrinho();
  });
})();
