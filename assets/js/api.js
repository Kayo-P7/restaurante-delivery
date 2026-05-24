const API_URL = "http://localhost:3000/api";

async function enviarParaApi(endpoint, dados) {
  const resposta = await fetch(`${API_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  });

  const resultado = await resposta.json().catch(() => ({}));

  if (!resposta.ok) {
    throw new Error(resultado.erro || "Erro ao conectar com o servidor.");
  }

  return resultado;
}

async function buscarNaApi(endpoint) {
  const resposta = await fetch(`${API_URL}${endpoint}`);
  const resultado = await resposta.json().catch(() => ({}));

  if (!resposta.ok) {
    throw new Error(resultado.erro || "Erro ao buscar dados no servidor.");
  }

  return resultado;
}
