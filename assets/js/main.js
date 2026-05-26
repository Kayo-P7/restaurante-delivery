$(document).ready(function () {
  initNavegacao();
  initCardapio();
  initDelivery();
  initReservas();
  renderReservaList();


  if (typeof atualizarEstadoLogin === 'function') atualizarEstadoLogin();
});
