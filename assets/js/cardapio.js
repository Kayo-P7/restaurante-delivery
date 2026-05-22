function initCardapio() {
  if (!$("#cardapioTabs").length || !$("#menuGrid").length) return;

  renderMenuGrid(cardapioActive);

  $("#cardapioTabs .tab").on("click", function () {
    $("#cardapioTabs .tab").removeClass("active");
    $(this).addClass("active");
    cardapioActive = $(this).data("cat");
    renderMenuGrid(cardapioActive);
  });
}

function renderMenuGrid(cat) {
  const items = MENU[cat] || [];
  const html = items.map(item => `
    <div class="menu-item">
      <div class="menu-item__info">
        <h4>${item.nome}</h4>
        <p>${item.desc}</p>
      </div>
      <div class="menu-item__price">${moeda(item.preco)}</div>
    </div>
  `).join("");

  $("#menuGrid").html(html);
}
