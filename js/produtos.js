/*
  Para editar o cardápio: basta alterar os itens abaixo.
  Cada item pode receber uma propriedade "imagem" com o caminho do arquivo,
  ex: imagem: "imagens/shawarmas/shawarma-frango.png"
  Sem essa propriedade, o card mostra o placeholder "Foto em breve".
*/
const cardapio = [
  {
    id: 'shawarmas', titulo: 'Shawarmas', icone: '🥙',
    banner: 'imagens/shawarmas/shawarma.jpeg',
    bannerLegenda: 'Shawarma Tradicional — sabor autêntico do Líbano',
    permiteRetirarItem: true,
    itens: [
      { nome: 'Frango', preco: 22, desc: 'Batata frita, picles e pasta de alho.' },
      { nome: 'Carne', preco: 24, desc: 'Salsinha, cebolinha, tomate, picles, molho tahine.' },
      { nome: 'Misto', preco: 24, desc: 'Batata frita, tomate, alho, picles, salsinha e cebolinha.' },
      { nome: 'Kafta', preco: 24, desc: 'Homos, tomate, picles, fritas, salsinha e cebolinha.' },
      { nome: 'Araes Kafta', preco: 24, desc: 'Salada de repolho, batata frita, ketchup, milho.' },
      { nome: 'Tawook', preco: 25, desc: 'Pasta de alho, salada de repolho, picles, fritas.' },
      { nome: 'Sojok', preco: 25, desc: 'Pasta de alho, batata frita, picles, tomate.' },
      { nome: 'Ascalop', preco: 25, desc: 'Salada de repolho, batata frita, ketchup.' },
      { nome: 'Falafel (Veg)', preco: 20, desc: 'Alface, salsinha, tomate, picles, tahine.' },
      { nome: 'Batata Frita (Veg)', preco: 20, desc: 'Pasta de alho, salada de repolho, ketchup, picles.' },
    ]
  },
  {
    id: 'combo-shawarma', titulo: 'Combo Shawarma', icone: '🥙',
    permiteRetirarItem: true,
    itens: [
      { nome: 'Shawarma + Fritas', preco: 35, desc: 'Combo de shawarma acompanhado de fritas.', imagem: 'imagens/combo-shawarma/combo shawarma e fritas.png' },
    ]
  },
  {
    id: 'burgers', titulo: 'Burgers', icone: '🍔',
    observacao: 'Todos os lanches acompanham pasta de alho.',
    banner: 'imagens/burguer/Lebanese Burguer.png',
    bannerLegenda: 'Burgers Artesanais da Casa',
    permiteRetirarItem: true,
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
    permiteRetirarItem: true,
    itens: [
      { nome: '1 Lebanese Burger + Fritas', preco: 35, desc: 'Combo de burger com fritas.', imagem: 'imagens/combo-burguer/Lebanese Burguer e fritas.png' },
    ]
  },
  {
    id: 'pratos', titulo: 'Pratos', icone: '🍛',
    banner: 'imagens/pratos/pratos.jpeg',
    manterFotosItens: true,
    permiteRetirarItem: true,
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
    banner: 'imagens/porcoes/porcao.jpeg',
    itens: [
      { nome: 'Batata Frita', preco: 15, desc: 'Porção de batata frita.' },
      { nome: 'Homus', preco: 20, desc: 'Porção de homus.' },
      { nome: 'Babaghanuj', preco: 20, desc: 'Porção de babaghanuj.' },
      { nome: 'Pasta de Alho', preco: 20, desc: 'Porção de pasta de alho.' },
      { nome: 'Coleslaw (250g)', preco: 20, desc: 'Porção de coleslaw.' },
      { nome: 'Falafel (8 un)', preco: 30, desc: 'Porção com 8 unidades.' },
      { nome: 'Kibe Frito (1 un)', preco: 8, desc: '100 gramas a unidade.' },
      { nome: 'Carne', preco: 35, desc: 'Batata frita, salsinha, cebolinha, tomate, picles, molho tahine.' },
      { nome: 'Frango', preco: 35, desc: 'Batata frita, picles e pasta de alho.' },
      { nome: 'Misto', preco: 35, desc: 'Batata frita, tomate, alho, picles, salsinha e cebolinha.' },
      { nome: 'Kibe Frito (4 un)', preco: 30, desc: '4 unidades de 100g cada.' },
      { nome: 'Crispy', preco: 35, desc: 'Sassami empanado, coleslaw, fritas, picles, pasta de alho.' },
      { nome: 'Tawook', preco: 35, desc: 'Filé de frango temperado, coleslaw, fritas, picles, pasta de alho.' },
    ]
  },
  {
    id: 'bebidas', titulo: 'Bebidas', icone: '🥤',
    itens: [
      { nome: 'Água sem gás', preco: 5, desc: 'Consultar marca disponível no dia.', imagem: 'imagens/bebidas/agua.png' },
      { nome: 'Água com gás', preco: 5, desc: 'Consultar marca disponível no dia.', imagem: 'imagens/bebidas/agua com gas.png' },
      { nome: 'Suco Natural', preco: 12, desc: 'Consultar sabores disponíveis no dia.', imagem: 'imagens/bebidas/suco natural.png' },
      { nome: 'Fanta Uva (350ml)', preco: 8, imagem: 'imagens/bebidas/fanta uva 350.png' },
      { nome: 'Coca-Cola (350ml)', preco: 8, imagem: 'imagens/bebidas/coca 350.png' },
      { nome: 'Coca-Cola Zero (350ml)', preco: 8, imagem: 'imagens/bebidas/coca zero 350.png' },
      { nome: 'Fanta (350ml)', preco: 8, imagem: 'imagens/bebidas/fanta 350.png' },
      { nome: 'Guaraná (350ml)', preco: 8, imagem: 'imagens/bebidas/guarana 350.png' },
      { nome: 'Coca-Cola (600ml)', preco: 12, imagem: 'imagens/bebidas/coca 600.png' },
      { nome: 'Coca-Cola Zero (600ml)', preco: 12, imagem: 'imagens/bebidas/coca zero 600.png' },
      { nome: 'Guaraná (600ml)', preco: 12, imagem: 'imagens/bebidas/guarana 600.png' },
      { nome: 'Coca-Cola (2L)', preco: 20, imagem: 'imagens/bebidas/coca 2l.png' },
      { nome: 'Guaraná (2L)', preco: 20, imagem: 'imagens/bebidas/guarana 2l.png' },
      { nome: 'Fanta Guaraná (2L)', preco: 20, imagem: 'imagens/bebidas/fanta guarana 2l.png' },
    ]
  },
  {
    id: 'adicionais', titulo: 'Adicionais', icone: '➕',
    itens: [
      { nome: 'Pasta de Alho', preco: 3, imagem: 'imagens/adicionais/pasta de alho.png' },
    ]
  },
];
