# Brasa & Arte - Restaurante Delivery

Projeto de site para restaurante com páginas de Início, Cardápio, Delivery, Reservas e Cadastro.

## Framework/biblioteca adicionada

Foi adicionado **jQuery 3.7.1** via CDN em todas as páginas HTML.

## Organização aplicada

O JavaScript deixou de ficar em um único arquivo grande e foi separado por responsabilidade:

```text
assets/js/
├── data.js
├── utils.js
├── navegacao.js
├── cardapio.js
├── delivery.js
├── reservas.js
├── cadastro.js
└── main.js
```

O CSS também foi separado em arquivos menores, carregados pelo `assets/css/main.css`:

```text
assets/css/
├── base.css
├── navbar.css
├── layout.css
├── hero.css
├── buttons.css
├── home.css
├── page-hero-tabs.css
├── cardapio.css
├── delivery.css
├── forms.css
├── tables.css
├── footer.css
├── reservas.css
└── responsive.css
```

## O que o jQuery impactou no projeto

- A lógica foi adaptada para usar seletores e eventos com jQuery, como `$(document).ready()`, `.on()`, `.html()`, `.text()`, `.val()`, `.show()` e `.hide()`.
- O funcionamento principal foi mantido: cardápio por categorias, carrinho do delivery, reservas e cadastro de clientes.
- O armazenamento continua usando `localStorage`, então os dados de pedidos, reservas e clientes continuam funcionando no navegador.
- A estrutura ficou mais organizada e fácil de apresentar, pois cada arquivo cuida de uma parte do site.

## Como executar

Abra o arquivo `index.html` no navegador.
