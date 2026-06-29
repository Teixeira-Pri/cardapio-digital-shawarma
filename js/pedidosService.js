// ============================================================
// PEDIDOS SERVICE
// ------------------------------------------------------------
// Insere o pedido e seus itens no Supabase. O RLS do projeto só
// libera INSERT para o usuário público (sem SELECT depois do
// insert), então o id do pedido é gerado aqui no frontend com
// crypto.randomUUID() e usado tanto na linha de "pedidos" quanto
// no "pedido_id" de cada linha de "itens_pedido".
// ============================================================

async function inserirPedido(pedidoId, pedido) {
  return supabaseClient.from('pedidos').insert({
    id: pedidoId,
    nome_cliente: pedido.nome_cliente,
    mesa: pedido.mesa,
    celular: pedido.celular,
    observacao: pedido.observacao,
    total: pedido.total,
    status: 'novo',
  });
}

async function inserirItensPedido(pedidoId, itens) {
  const linhas = itens.map(item => ({
    pedido_id: pedidoId,
    produto_nome: item.produto_nome,
    categoria: item.categoria,
    quantidade: item.quantidade,
    preco_unitario: item.preco_unitario,
    observacao: item.observacao,
  }));
  return supabaseClient.from('itens_pedido').insert(linhas);
}

// Envia o pedido completo ao Supabase: insere a linha em "pedidos" e,
// se der certo, insere as linhas em "itens_pedido". Lança erro se
// qualquer uma das duas inserções falhar, para o chamador decidir
// como tratar (sem limpar carrinho, por exemplo).
async function enviarPedidoSupabase(pedido) {
  const pedidoId = crypto.randomUUID();

  const { error: erroPedido } = await inserirPedido(pedidoId, pedido);
  if (erroPedido) throw erroPedido;

  const { error: erroItens } = await inserirItensPedido(pedidoId, pedido.itens);
  if (erroItens) throw erroItens;

  return pedidoId;
}
