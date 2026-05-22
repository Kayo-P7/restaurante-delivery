function goTo(pageId) {
  const routes = {
    home: "index.html",
    cardapio: "cardapio.html",
    delivery: "delivery.html",
    reservas: "reservas.html",
    cadastro: "cadastro.html",
  };
  if (routes[pageId]) window.location.href = routes[pageId];
}

function initNavegacao() {
  $("#navToggle").on("click", function () {
    $("#navLinks").toggleClass("open");
  });

  $(window).on("scroll", function () {
    $("#nav").toggleClass("scrolled", $(window).scrollTop() > 10);
  });
}
