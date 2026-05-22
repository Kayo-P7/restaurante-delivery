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

// ── STATE ──────────────────────────────────────────────────────
let cart = {}; // { itemId: { item, qty } }
let deliveryCat = "carnes";

// ── NAVIGATION ────────────────────────────────────────────────
function goTo(pageId) {
  const routes = {
    home: "index.html",
    cardapio: "cardapio.html",
    delivery: "delivery.html",
    reservas: "reservas.html",
    cadastro: "cadastro.html",
  };

  if (routes[pageId]) {
    window.location.href = routes[pageId];
  }
}

// Fecha/abre o menu mobile
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
}

// Sombra no menu ao rolar
window.addEventListener("scroll", () => {
  const nav = document.getElementById("nav");
  if (nav) nav.classList.toggle("scrolled", window.scrollY > 10);
});

// ── CARDÁPIO ──────────────────────────────────────────────────
let cardapioActive = "carnes";

function initCardapio() {
  if (!document.getElementById("cardapioTabs") || !document.getElementById("menuGrid")) return;
  renderMenuGrid(cardapioActive);
  document.querySelectorAll("#cardapioTabs .tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll("#cardapioTabs .tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      cardapioActive = tab.dataset.cat;
      renderMenuGrid(cardapioActive);
    });
  });
}

function renderMenuGrid(cat) {
  const grid = document.getElementById("menuGrid");
  if (!grid) return;
  const items = MENU[cat] || [];
  grid.innerHTML = items.map(item => `
    <div class="menu-item">
      <div class="menu-item__info">
        <h4>${item.nome}</h4>
        <p>${item.desc}</p>
      </div>
      <div class="menu-item__price">R$ ${item.preco.toFixed(2).replace(".", ",")}</div>
    </div>
  `).join("");
}

// ── DELIVERY ──────────────────────────────────────────────────
function initDelivery() {
  if (!document.getElementById("deliveryTabs") || !document.getElementById("deliveryItems")) return;
  renderDeliveryItems(deliveryCat);
  document.querySelectorAll("#deliveryTabs .tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll("#deliveryTabs .tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      deliveryCat = tab.dataset.dcat;
      renderDeliveryItems(deliveryCat);
    });
  });
  renderCart();
}

function renderDeliveryItems(cat) {
  const container = document.getElementById("deliveryItems");
  if (!container) return;
  const items = MENU[cat] || [];
  container.innerHTML = items.map(item => `
    <div class="delivery-card">
      <h4>${item.nome}</h4>
      <p>${item.desc}</p>
      <div class="delivery-card__footer">
        <span class="delivery-card__price">R$ ${item.preco.toFixed(2).replace(".", ",")}</span>
        <button class="btn btn--primary btn--sm" onclick="addToCart(${item.id}, this)">+ Adicionar</button>
      </div>
    </div>
  `).join("");
}

function addToCart(itemId, button) {
  // Find item in all categories
  let found = null;
  for (const cat of Object.values(MENU)) {
    const item = cat.find(i => i.id === itemId);
    if (item) { found = item; break; }
  }
  if (!found) return;
  if (cart[itemId]) {
    cart[itemId].qty += 1;
  } else {
    cart[itemId] = { item: found, qty: 1 };
  }
  renderCart();
  // Animate button feedback
  if (button) {
    button.textContent = "✓ Adicionado";
    button.style.background = "#16a34a";
    button.style.borderColor = "#16a34a";
    setTimeout(() => {
      button.textContent = "+ Adicionar";
      button.style.background = "";
      button.style.borderColor = "";
    }, 1200);
  }
}

function changeQty(itemId, delta) {
  if (!cart[itemId]) return;
  cart[itemId].qty += delta;
  if (cart[itemId].qty <= 0) delete cart[itemId];
  renderCart();
}

function renderCart() {
  const list = document.getElementById("cartList");
  const totalWrap = document.getElementById("cartTotal");
  const formWrap = document.getElementById("cartForm");
  if (!list || !totalWrap || !formWrap) return;

  const items = Object.values(cart);
  if (items.length === 0) {
    list.innerHTML = "<p class='cart-empty'>Nenhum item adicionado ainda.</p>";
    totalWrap.style.display = "none";
    formWrap.style.display = "none";
    return;
  }

  let subtotal = 0;
  list.innerHTML = items.map(({ item, qty }) => {
    const total = item.preco * qty;
    subtotal += total;
    return `
      <div class="cart-list-item">
        <span class="cart-item-name">${item.nome}</span>
        <div class="cart-item-qty">
          <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
          <span>${qty}</span>
          <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
        </div>
        <span class="cart-item-price">R$ ${total.toFixed(2).replace(".", ",")}</span>
      </div>`;
  }).join("");

  const delivery = 8.00;
  const total = subtotal + delivery;

  totalWrap.style.display = "block";
  formWrap.style.display = "flex";
  document.getElementById("subtotalVal").textContent = `R$ ${subtotal.toFixed(2).replace(".", ",")}`;
  document.getElementById("totalVal").textContent = `R$ ${total.toFixed(2).replace(".", ",")}`;
}

function finalizarPedido() {
  const nome = document.getElementById("delivName").value.trim();
  const phone = document.getElementById("delivPhone").value.trim();
  const addr = document.getElementById("delivAddr").value.trim();
  const pay = document.getElementById("delivPay").value;

  if (!nome || !phone || !addr || !pay) {
    alert("Por favor, preencha todos os campos antes de finalizar o pedido.");
    return;
  }
  if (Object.keys(cart).length === 0) {
    alert("Adicione pelo menos um item ao carrinho.");
    return;
  }

  const itens = Object.values(cart).map(({ item, qty }) => `${qty}x ${item.nome}`).join(", ");
  const subtotal = Object.values(cart).reduce((s, { item, qty }) => s + item.preco * qty, 0);
  const total = (subtotal + 8).toFixed(2).replace(".", ",");

  // Save to localStorage
  const pedidos = JSON.parse(localStorage.getItem("brasaPedidos") || "[]");
  pedidos.push({
    nome, phone, addr, pay, itens,
    total: `R$ ${total}`,
    data: new Date().toLocaleString("pt-BR"),
  });
  localStorage.setItem("brasaPedidos", JSON.stringify(pedidos));

  alert(`✅ Pedido confirmado!\n\nOlá, ${nome}! Seu pedido foi recebido.\nItens: ${itens}\nTotal: R$ ${total}\nTempo estimado: 35–45 min\n\nObrigado! 🔥`);

  cart = {};
  ["delivName", "delivPhone", "delivAddr"].forEach(id => document.getElementById(id).value = "");
  document.getElementById("delivPay").value = "";
  renderCart();
}

// ── RESERVAS ──────────────────────────────────────────────────
function initReservas() {
  const resData = document.getElementById("resData");
  if (!resData) return;
  // Set min date to today
  const today = new Date().toISOString().split("T")[0];
  resData.min = today;
}

function submeterReserva(e) {
  e.preventDefault();
  const nome = document.getElementById("resNome").value.trim();
  const tel = document.getElementById("resTel").value.trim();
  const data = document.getElementById("resData").value;
  const horario = document.getElementById("resHorario").value;
  const pessoas = document.getElementById("resPessoas").value;
  const ocasiao = document.getElementById("resOcasiao").value;
  const obs = document.getElementById("resObs").value.trim();

  if (!nome || !tel || !data || !horario || !pessoas) {
    alert("Preencha todos os campos obrigatórios.");
    return;
  }

  const reserva = {
    nome, tel, data, horario, pessoas,
    ocasiao: ocasiao || "—",
    obs: obs || "—",
    registradoEm: new Date().toLocaleString("pt-BR"),
  };

  // Save to localStorage
  const reservas = JSON.parse(localStorage.getItem("brasaReservas") || "[]");
  reservas.push(reserva);
  localStorage.setItem("brasaReservas", JSON.stringify(reservas));

  // Show success
  document.getElementById("reservaForm").style.display = "none";
  const msg = document.getElementById("reservaSuccess");
  msg.classList.add("show");
  const dataFmt = new Date(data + "T12:00:00").toLocaleDateString("pt-BR");
  document.getElementById("reservaResumo").textContent =
    `${nome}, sua mesa para ${pessoas} pessoa(s) está reservada para ${dataFmt} às ${horario}. Aguardamos você!`;

  // Show list
  renderReservaList();
}

function novaReserva() {
  document.getElementById("reservaForm").reset();
  document.getElementById("reservaForm").style.display = "block";
  document.getElementById("reservaSuccess").classList.remove("show");
}

function renderReservaList() {
  const reservas = JSON.parse(localStorage.getItem("brasaReservas") || "[]");
  const wrap = document.getElementById("reservaListWrap");
  const list = document.getElementById("reservaList");
  if (!wrap || !list) return;
  if (reservas.length === 0) { wrap.style.display = "none"; return; }
  wrap.style.display = "block";
  list.innerHTML = [...reservas].reverse().slice(0, 10).map(r => `
    <div class="reserva-item">
      <div><strong>Nome:</strong> ${r.nome}</div>
      <div><strong>Telefone:</strong> ${r.tel}</div>
      <div><strong>Data:</strong> ${new Date(r.data + "T12:00:00").toLocaleDateString("pt-BR")}</div>
      <div><strong>Horário:</strong> ${r.horario}</div>
      <div><strong>Pessoas:</strong> ${r.pessoas}</div>
      <div><strong>Ocasião:</strong> ${r.ocasiao}</div>
    </div>
  `).join("");
}

// ── CADASTRO ──────────────────────────────────────────────────
function submeterCadastro(e) {
  e.preventDefault();
  const nome = document.getElementById("cadNome").value.trim();
  const sobre = document.getElementById("cadSobre").value.trim();
  const email = document.getElementById("cadEmail").value.trim();
  const tel = document.getElementById("cadTel").value.trim();
  const nasc = document.getElementById("cadNasc").value;
  const senha = document.getElementById("cadSenha").value;
  const senha2 = document.getElementById("cadSenha2").value;

  if (senha !== senha2) {
    alert("As senhas não coincidem. Por favor, verifique.");
    return;
  }

  // Check if email already registered
  const clientes = JSON.parse(localStorage.getItem("brasaClientes") || "[]");
  if (clientes.find(c => c.email === email)) {
    alert("Este e-mail já está cadastrado.");
    return;
  }

  const cliente = {
    nome: `${nome} ${sobre}`,
    email,
    tel,
    nasc,
    cadastradoEm: new Date().toLocaleDateString("pt-BR"),
  };

  clientes.push(cliente);
  localStorage.setItem("brasaClientes", JSON.stringify(clientes));

  // Show success
  document.getElementById("cadastroForm").style.display = "none";
  const msg = document.getElementById("cadastroSuccess");
  msg.classList.add("show");
  document.getElementById("cadastroNomeMsg").textContent = `Bem-vindo(a), ${nome}! 🎉`;
}

function verClientes() {
  renderClientesTable();
  document.getElementById("clientesWrap").style.display = "block";
  document.getElementById("clientesWrap").scrollIntoView({ behavior: "smooth" });
}

function renderClientesTable() {
  const clientes = JSON.parse(localStorage.getItem("brasaClientes") || "[]");
  const tbody = document.getElementById("clientesTbody");
  if (!tbody) return;
  if (clientes.length === 0) {
    tbody.innerHTML = "<tr><td colspan='4' style='text-align:center;color:#888'>Nenhum cliente ainda.</td></tr>";
    return;
  }
  tbody.innerHTML = clientes.map(c => `
    <tr>
      <td>${c.nome}</td>
      <td>${c.email}</td>
      <td>${c.tel}</td>
      <td>${c.cadastradoEm}</td>
    </tr>
  `).join("");
}

// ── INIT ──────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  initCardapio();
  initDelivery();
  initReservas();
  renderReservaList();
  renderClientesTable();
});