// URL base da API PHP
const API_URL = `${window.location.origin}/restaurante-delivery/backend/api`;

async function enviarParaApi(endpoint, dados) {
  const resposta = await fetch(`${API_URL}${endpoint}.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  });
  const resultado = await resposta.json().catch(() => ({}));
  if (!resposta.ok) throw new Error(resultado.erro || 'Erro ao conectar com o servidor.');
  return resultado;
}

async function buscarNaApi(endpoint) {
  const resposta = await fetch(`${API_URL}${endpoint}.php`);
  const resultado = await resposta.json().catch(() => ({}));
  if (!resposta.ok) throw new Error(resultado.erro || 'Erro ao buscar dados no servidor.');
  return resultado;
}

async function deletarNaApi(endpoint, id) {
  const resposta = await fetch(`${API_URL}${endpoint}.php?id=${id}`, {
    method: 'DELETE',
  });
  const resultado = await resposta.json().catch(() => ({}));
  if (!resposta.ok) throw new Error(resultado.erro || 'Erro ao excluir.');
  return resultado;
}
