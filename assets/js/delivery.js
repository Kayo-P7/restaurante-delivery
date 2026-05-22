function initDelivery() {
  if (!$("#deliveryTabs").length || !$("#deliveryItems").length) return;

  renderDeliveryItems(deliveryCat);

  $("#deliveryTabs .tab").on("click", function () {
    $("#deliveryTabs .tab").removeClass("active");
    $(this).addClass("active");
    deliveryCat = $(this).data("dcat");
    renderDeliveryItems(deliveryCat);
  });

  renderCart();
}

function renderDeliveryItems(cat) {
  const items = MENU[cat] || [];
  const html = items.map(item => `
    <div class="delivery-card">
      <h4>${item.nome}</h4>
      <p>${item.desc}</p>
      <div class="delivery-card__footer">
        <span class="delivery-card__price">${moeda(item.preco)}</span>
        <button class="btn btn--primary btn--sm" onclick="addToCart(${item.id}, this)">+ Adicionar</button>
      </div>
    </div>
  `).join("");

  $("#deliveryItems").html(html);
}

function buscarItem(itemId) {
  for (const categoria of Object.values(MENU)) {
    const item = categoria.find(i => i.id === itemId);
    if (item) return item;
  }
  return null;
}

function addToCart(itemId, button) {
  const found = buscarItem(itemId);
  if (!found) return;

  if (cart[itemId]) cart[itemId].qty += 1;
  else cart[itemId] = { item: found, qty: 1 };

  renderCart();

  if (button) {
    const $button = $(button);
    $button.text("✓ Adicionado").css({ background: "#16a34a", borderColor: "#16a34a" });
    setTimeout(() => {
      $button.text("+ Adicionar").css({ background: "", borderColor: "" });
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
  const $list = $("#cartList");
  const $totalWrap = $("#cartTotal");
  const $formWrap = $("#cartForm");
  if (!$list.length || !$totalWrap.length || !$formWrap.length) return;

  const items = Object.values(cart);

  if (items.length === 0) {
    $list.html("<p class='cart-empty'>Nenhum item adicionado ainda.</p>");
    $totalWrap.hide();
    $formWrap.hide();
    return;
  }

  let subtotal = 0;
  const html = items.map(({ item, qty }) => {
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
        <span class="cart-item-price">${moeda(total)}</span>
      </div>`;
  }).join("");

  const delivery = 8.00;
  const total = subtotal + delivery;

  $list.html(html);
  $totalWrap.show();
  $formWrap.css("display", "flex");
  $("#subtotalVal").text(moeda(subtotal));
  $("#totalVal").text(moeda(total));
}

function finalizarPedido() {
  const nome = $("#delivName").val().trim();
  const phone = $("#delivPhone").val().trim();
  const addr = $("#delivAddr").val().trim();
  const pay = $("#delivPay").val();

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
  const total = moeda(subtotal + 8);

  const pedidos = JSON.parse(localStorage.getItem("brasaPedidos") || "[]");
  pedidos.push({ nome, phone, addr, pay, itens, total, data: new Date().toLocaleString("pt-BR") });
  localStorage.setItem("brasaPedidos", JSON.stringify(pedidos));

  alert(`✅ Pedido confirmado!\n\nOlá, ${nome}! Seu pedido foi recebido.\nItens: ${itens}\nTotal: ${total}\nTempo estimado: 35–45 min\n\nObrigado! 🔥`);

  cart = {};
  $("#delivName, #delivPhone, #delivAddr").val("");
  $("#delivPay").val("");
  renderCart();
}
