$(document).ready(function () {
  initNavegacao();
  initCardapio();
  initDelivery();
  initReservas();
  renderReservaList();
  // Atualizar estado de login em todas as páginas
  if (typeof atualizarEstadoLogin === 'function') atualizarEstadoLogin();
});
