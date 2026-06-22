# Cardápio Digital — Shawarma Beirut Halal

Cardápio digital responsivo do **Shawarma Beirut Halal**, construído em HTML, CSS e JavaScript puros (sem frameworks ou build step).

## Demo

Abra o arquivo [`index.html`](index.html) diretamente no navegador, ou publique a pasta no GitHub Pages.

## Estrutura do projeto

```
cardapio-digital-shawarma/
├── index.html        # Estrutura semântica da página (header, nav, main, footer)
├── css/
│   └── styles.css     # Estilos (variáveis, header, navegação, cards, responsividade)
├── js/
│   ├── produtos.js    # Array de produtos do cardápio (categoria, nome, descrição, preço, imagem)
│   └── app.js         # Renderização dos cards e destaque do menu de categorias ativo
└── imagens/
    ├── shawarmas/
    ├── combo-shawarma/
    ├── burguer/
    ├── combo-burguer/
    ├── pratos/
    ├── porcoes/
    ├── esfihas-salgados/
    ├── bebidas/
    ├── adicionais/
    └── logo.jpg
```

## Como editar o cardápio

Todos os itens (categoria, nome, descrição, preço e foto) ficam centralizados em [`js/produtos.js`](js/produtos.js), no array `cardapio`. Basta editar esse arquivo — o HTML é gerado automaticamente por [`js/app.js`](js/app.js).

```js
{
  id: 'shawarmas', titulo: 'Shawarmas', icone: '🥙',
  itens: [
    { nome: 'Frango', preco: 22, desc: 'Batata frita, picles e pasta de alho.', imagem: 'imagens/shawarmas/shawarma de frango.png' },
    // ...
  ]
}
```

- Itens sem a propriedade `imagem` exibem o placeholder "Foto em breve".
- Categorias podem ter uma `observacao` opcional (texto exibido abaixo do título).

## Tecnologias

- HTML5 semântico
- CSS3 (variáveis CSS, Grid, responsividade mobile-first)
- JavaScript (ES6+), sem dependências externas
- Google Fonts (Playfair Display + Nunito)

## Contato do estabelecimento

- 📍 Av. Conceição, 2074 — Vila Paiva
- 📲 WhatsApp: [(11) 98798-7230](https://wa.me/5511987987230)
- 📸 Instagram: [@_shawarmabeirut_](https://instagram.com/_shawarmabeirut_)

## Licença

Projeto de uso interno do Shawarma Beirut Halal.
