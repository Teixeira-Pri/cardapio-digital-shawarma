/*
  Para editar o cardápio: basta alterar os itens abaixo.
  Cada item pode receber uma propriedade "imagem" com o caminho do arquivo,
  ex: imagem: "imagens/shawarmas/shawarma-frango.png"
  Sem essa propriedade, o card mostra o placeholder "Foto em breve".
*/
const cardapio = [
  {
    id: 'shawarmas', titulo: 'Shawarmas', icone: '🥙',
    banner: 'imagens/shawarmas/shawarma misto.png',
    bannerLegenda: 'Shawarma Tradicional — sabor autêntico do Líbano',
    itens: [
      { nome: 'Frango', preco: 22, desc: 'Batata frita, picles e pasta de alho.', imagem: 'imagens/shawarmas/shawarma de frango.png' },
      { nome: 'Carne', preco: 24, desc: 'Salsinha, cebolinha, tomate, picles, molho tahine.', imagem: 'imagens/shawarmas/shawarma de carne.png' },
      { nome: 'Misto', preco: 24, desc: 'Batata frita, tomate, alho, picles, salsinha e cebolinha.', imagem: 'imagens/shawarmas/shawarma misto.png' },
      { nome: 'Kafta', preco: 24, desc: 'Homos, tomate, picles, fritas, salsinha e cebolinha.', imagem: 'imagens/shawarmas/shawarma de kafta.png' },
      { nome: 'Araes Kafta', preco: 24, desc: 'Salada de repolho, batata frita, ketchup, milho.', imagem: 'imagens/shawarmas/shawarma Araes Kafta.png' },
      { nome: 'Tawook', preco: 25, desc: 'Pasta de alho, salada de repolho, picles, fritas.', imagem: 'imagens/shawarmas/shawarma Tawook.png' },
      { nome: 'Sojok', preco: 25, desc: 'Pasta de alho, batata frita, picles, tomate.', imagem: 'imagens/shawarmas/shawarma Sojok.png' },
      { nome: 'Ascalop', preco: 25, desc: 'Salada de repolho, batata frita, ketchup.', imagem: 'imagens/shawarmas/shawarma Ascalop.png' },
      { nome: 'Falafel (Veg)', preco: 20, desc: 'Alface, salsinha, tomate, picles, tahine.', imagem: 'imagens/shawarmas/Falafel-Veg.png' },
      { nome: 'Batata Frita (Veg)', preco: 20, desc: 'Pasta de alho, salada de repolho, ketchup, picles.', imagem: 'imagens/shawarmas/shawarma Batata Frita Veg.png' },
    ]
  },
  {
    id: 'combo-shawarma', titulo: 'Combo Shawarma', icone: '🥙',
    itens: [
      { nome: 'Shawarma + Fritas', preco: 35, desc: 'Combo de shawarma acompanhado de fritas.', imagem: 'imagens/combo-shawarma/combo shawarma e fritas.png' },
    ]
  },
  {
    id: 'burgers', titulo: 'Burgers', icone: '🍔',
    observacao: 'Todos os lanches acompanham pasta de alho.',
    banner: 'imagens/burguer/Lebanese Burguer.png',
    bannerLegenda: 'Burgers Artesanais da Casa',
    itens: [
      { nome: 'Lebanese Burger', preco: 25, desc: 'Salada de repolho, batata frita, ketchup.', imagem: 'imagens/burguer/Lebanese Burguer.png' },
      { nome: 'Kafta Burger', preco: 25, desc: 'Salada de repolho, batata frita, ketchup.', imagem: 'imagens/burguer/Kafta Burger.png' },
      { nome: 'Sojok Burger', preco: 25, desc: 'Salada de repolho, batata frita, pasta de alho.', imagem: 'imagens/burguer/Sojok Burger.png' },
      { nome: 'Burger c/Cheddar', preco: 30, desc: 'Salada de repolho, batata frita, cheddar, ketchup.', imagem: 'imagens/burguer/Burger c Cheddar.png' },
      { nome: 'Frango Burger', preco: 25, desc: 'Alface, molho rose, picles, fritas, pasta de alho.', imagem: 'imagens/burguer/Frango Burger.png' },
      { nome: 'Burger Duplo', preco: 40, desc: '2 hamburgers, repolho, batata frita, ketchup.', imagem: 'imagens/burguer/Burger Duplo.png' },
      { nome: 'Veg Burger', preco: 25, desc: 'Tomate, picles, alface, batata frita.', imagem: 'imagens/burguer/Veg Burger.png' },
    ]
  },
  {
    id: 'combo-burger', titulo: 'Combo Burger', icone: '🍔',
    itens: [
      { nome: '1 Lebanese Burger + Fritas', preco: 35, desc: 'Combo de burger com fritas.', imagem: 'imagens/combo-burguer/Lebanese Burguer e fritas.png' },
    ]
  },
  {
    id: 'pratos', titulo: 'Pratos', icone: '🍛',
    banner: 'imagens/pratos/Tawook.png',
    itens: [
      { nome: 'Carne', preco: 35, desc: 'Batata frita, salsinha, cebolinha, tomate, picles, molho tahine.', imagem: 'imagens/pratos/carne.png' },
      { nome: 'Frango', preco: 35, desc: 'Batata frita, picles e pasta de alho.', imagem: 'imagens/pratos/frango.png' },
      { nome: 'Misto', preco: 35, desc: 'Batata frita, tomate, alho, picles, salsinha e cebolinha.', imagem: 'imagens/pratos/misto.png' },
      { nome: 'Kafta', preco: 35, desc: 'Batata frita, homus, tomate, picles, salsinha e cebolinha.', imagem: 'imagens/pratos/kafta.png' },
      { nome: 'Tawook', preco: 35, desc: 'Batata frita, pasta de alho, salada de repolho, picles.', imagem: 'imagens/pratos/Tawook.png' },
      { nome: 'Crispy', preco: 35, desc: 'Batata frita, pasta de alho, salada de repolho, picles.', imagem: 'imagens/pratos/Crispy.png' },
    ]
  },
  {
    id: 'porcoes', titulo: 'Porções', icone: '🍟',
    itens: [
      { nome: 'Batata Frita', preco: 15, desc: 'Porção de batata frita.', imagem: 'imagens/porcoes/batata frita.png' },
      { nome: 'Homus', preco: 20, desc: 'Porção de homus.', imagem: 'imagens/porcoes/Homus.png' },
      { nome: 'Babaghanuj', preco: 20, desc: 'Porção de babaghanuj.', imagem: 'imagens/porcoes/Babaghanuj.png' },
      { nome: 'Pasta de Alho', preco: 20, desc: 'Porção de pasta de alho.', imagem: 'imagens/porcoes/Pasta de Alho.png' },
      { nome: 'Coleslaw (250g)', preco: 20, desc: 'Porção de coleslaw.', imagem: 'imagens/porcoes/Coleslaw.png' },
      { nome: 'Falafel (8 un)', preco: 30, desc: 'Porção com 8 unidades.', imagem: 'imagens/porcoes/Falafel.png' },
      { nome: 'Kibe Frito (1 un)', preco: 8, desc: '100 gramas a unidade.', imagem: 'imagens/porcoes/kibe.png' },
      { nome: 'Carne', preco: 35, desc: 'Batata frita, salsinha, cebolinha, tomate, picles, molho tahine.', imagem: 'imagens/porcoes/carne.png' },
      { nome: 'Frango', preco: 35, desc: 'Batata frita, picles e pasta de alho.', imagem: 'imagens/porcoes/frango.png' },
      { nome: 'Misto', preco: 35, desc: 'Batata frita, tomate, alho, picles, salsinha e cebolinha.', imagem: 'imagens/porcoes/misto.png' },
      { nome: 'Kibe Frito (4 un)', preco: 30, desc: '4 unidades de 100g cada.', imagem: 'imagens/porcoes/kibe 4.png' },
      { nome: 'Crispy', preco: 35, desc: 'Sassami empanado, coleslaw, fritas, picles, pasta de alho.', imagem: 'imagens/porcoes/Crispy.png' },
      { nome: 'Tawook', preco: 35, desc: 'Filé de frango temperado, coleslaw, fritas, picles, pasta de alho.', imagem: 'imagens/porcoes/Tawook.png' },
    ]
  },
  {
    id: 'esfihas', titulo: 'Esfihas e Salgados', icone: '🫓',
    banner: 'imagens/esfihas-salgados/esfiha de carne.png',
    itens: [
      { nome: 'Carne', preco: 5, desc: 'Esfiha/salgado de carne.', imagem: 'imagens/esfihas-salgados/esfiha de carne.png' },
      { nome: 'Zaatar', preco: 5, desc: 'Esfiha de zaatar.', imagem: 'imagens/esfihas-salgados/Esfiha de zaatar.png' },
      { nome: 'Mohamare', preco: 5, desc: 'Esfiha de mohamare.', imagem: 'imagens/esfihas-salgados/esfiha de Mohamare.png' },
      { nome: 'Pizza', preco: 7, desc: 'Esfiha sabor pizza.', imagem: 'imagens/esfihas-salgados/esfiha de pizza.png' },
      { nome: 'Queijo', preco: 7, desc: 'Esfiha de queijo.', imagem: 'imagens/esfihas-salgados/esfiha de queijo.png' },
      { nome: 'Carne c/ Queijo', preco: 7, desc: 'Esfiha de carne com queijo.', imagem: 'imagens/esfihas-salgados/esfiha carne com queijo.png' },
      { nome: '2 Queijos', preco: 7, desc: 'Esfiha de dois queijos.', imagem: 'imagens/esfihas-salgados/esfiha dois queijos.png' },
      { nome: 'Queijo com Palmito', preco: 7, desc: 'Esfiha de queijo com palmito.', imagem: 'imagens/esfihas-salgados/esfiha de palmito.png' },
      { nome: 'Queijo com Milho', preco: 7, desc: 'Esfiha de queijo com milho.', imagem: 'imagens/esfihas-salgados/esfiha de milho.png' },
      { nome: 'Prestígio', preco: 7, desc: 'Esfiha doce sabor prestígio.', imagem: 'imagens/esfihas-salgados/esfiha de Prestígio.png' },
      { nome: 'Brigadeiro', preco: 7, desc: 'Esfiha doce de brigadeiro.', imagem: 'imagens/esfihas-salgados/esfiha de brigadeiro.png' },
    ]
  },
  {
    id: 'bebidas', titulo: 'Bebidas', icone: '🥤',
    itens: [
      { nome: 'Água sem gás', preco: 5, desc: 'Consultar marca disponível no dia.', imagem: 'imagens/bebidas/agua.png' },
      { nome: 'Água com gás', preco: 5, desc: 'Consultar marca disponível no dia.', imagem: 'imagens/bebidas/agua com gas.png' },
      { nome: 'Suco Natural', preco: 12, desc: 'Consultar sabores disponíveis no dia.', imagem: 'imagens/bebidas/suco natural.png' },
      { nome: 'Refri Lata (350ml)', preco: 8, imagem: 'imagens/bebidas/refri 350ml.png', pedeSabor: true },
      { nome: 'Refri 600ml', preco: 12, imagem: 'imagens/bebidas/refri 600ml.png', pedeSabor: true },
      { nome: 'Refri 2L', preco: 20, imagem: 'imagens/bebidas/refri 2l.png', pedeSabor: true },
    ]
  },
  {
    id: 'adicionais', titulo: 'Adicionais', icone: '➕',
    itens: [
      { nome: 'Pasta de Alho', preco: 3, imagem: 'imagens/adicionais/pasta de alho.png' },
    ]
  },
];
