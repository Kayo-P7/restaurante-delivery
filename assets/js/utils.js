function moeda(valor) {
  return `R$ ${valor.toFixed(2).replace(".", ",")}`;
}


function setAlpineState(selector, values) {
  const el = document.querySelector(selector);
  if (!el || !window.Alpine) return;

  const data = Alpine.$data(el);
  Object.assign(data, values);
}
