const MENU = {
  carnes: [
    { id: 1, nome: "Picanha na Brasa", desc: "Corte nobre grelhado no fogo vivo, servido com farofa da casa e vinagrete.", preco: 89.90 },
    { id: 2, nome: "Costela 12 Horas", desc: "Costela bovina assada por 12 horas, desfiada, macia e irresistível.", preco: 74.90 },
    { id: 3, nome: "Fraldinha Especial", desc: "Fraldinha temperada na vinha d'alho, grelhada na temperatura ideal.", preco: 69.90 },
    { id: 4, nome: "Ancho Black Angus", desc: "Corte premium importado, ponto perfeito garantido pelo nosso chef.", preco: 109.90 },
    { id: 5, nome: "Maminha com Alho", desc: "Maminha suculenta com molho de alho dourado e cheiro-verde.", preco: 62.90 },
    { id: 6, nome: "Mix de Carnes", desc: "Seleção com picanha, fraldinha e linguiça artesanal para 2 pessoas.", preco: 119.90 },
  ],
  peixes: [
    { id: 7, nome: "Tambaqui Grelhado", desc: "Peixe amazônico temperado com ervas da floresta e limão cravo.", preco: 65.00 },
    { id: 8, nome: "Tucunaré na Brasa", desc: "Filé de tucunaré grelhado com manteiga de castanha-do-pará.", preco: 72.00 },
    { id: 9, nome: "Filé de Pirarucu", desc: "O maior peixe de escamas do mundo, preparado com molho de açaí.", preco: 89.00 },
    { id: 10, nome: "Camarão Brasa", desc: "Camarão jumbo grelhado na brasa com molho de alho e limão.", preco: 94.90 },
  ],
  entradas: [
    { id: 11, nome: "Bolinho de Bacalhau", desc: "Bolinhos crocantes recheados com bacalhau desfiado e salsa.", preco: 29.90 },
    { id: 12, nome: "Caldo de Mocotó", desc: "Caldo tradicional bem temperado, servido com pão de alho.", preco: 22.00 },
    { id: 13, nome: "Pão de Alho Recheado", desc: "Pão artesanal recheado com queijo, alho e ervas finas.", preco: 18.90 },
    { id: 14, nome: "Mandioca Frita", desc: "Mandioca da região frita na hora, crocante e macia por dentro.", preco: 16.90 },
    { id: 15, nome: "Salada da Casa", desc: "Mix de folhas, tomate cereja, palmito e molho de mostarda mel.", preco: 24.90 },
  ],
  bebidas: [
    { id: 16, nome: "Cerveja Artesanal Brasa", desc: "IPA exclusiva produzida para o restaurante. 500ml.", preco: 22.00 },
    { id: 17, nome: "Caipirinha de Jambu", desc: "Caipirinha com cachaça artesanal e folhas de jambu frescos.", preco: 26.00 },
    { id: 18, nome: "Suco de Cupuaçu", desc: "Suco natural da polpa de cupuaçu, servido gelado.", preco: 14.00 },
    { id: 19, nome: "Refrigerante 350ml", desc: "Coca-Cola, Guaraná Antarctica ou Fanta Laranja.", preco: 9.00 },
    { id: 20, nome: "Água com/sem gás 500ml", desc: "Agua mineral gelada.", preco: 7.00 },
    { id: 21, nome: "Vinho da Casa (taça)", desc: "Vinho tinto ou branco selecionado pelo sommelier.", preco: 28.00 },
  ],
  sobremesas: [
    { id: 22, nome: "Pudim de Leite Condensado", desc: "Pudim artesanal caramelizado, receita da avó.", preco: 18.00 },
    { id: 23, nome: "Mousse de Açaí", desc: "Mousse cremoso de açaí puro com granola crocante.", preco: 21.00 },
    { id: 24, nome: "Petit Gâteau com Sorvete", desc: "Bolo de chocolate com centro derretido e sorvete de creme.", preco: 26.00 },
    { id: 25, nome: "Tacacá Doce", desc: "Releitura criativa com creme de tapioca, frutas amazônicas e mel.", preco: 19.00 },
  ],
};

let cart = {};
let deliveryCat = "carnes";
let cardapioActive = "carnes";
