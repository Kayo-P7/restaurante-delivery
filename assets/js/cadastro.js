async function submeterCadastro(e) {
  e.preventDefault();

  const nome = $("#cadNome").val().trim();
  const sobre = $("#cadSobre").val().trim();
  const email = $("#cadEmail").val().trim();
  const tel = $("#cadTel").val().trim();
  const nasc = $("#cadNasc").val();
  const senha = $("#cadSenha").val();
  const senha2 = $("#cadSenha2").val();

  if (!nome || !sobre || !email || !tel || !senha || !senha2) {
    alert("Preencha todos os campos obrigatórios.");
    return;
  }

  if (senha !== senha2) {
    alert("As senhas não coincidem. Por favor, verifique.");
    return;
  }

  const cliente = {
    nome: `${nome} ${sobre}`,
    email,
    telefone: tel,
    nascimento: nasc || null,
    senha,
  };

  try {
    await enviarParaApi("/clientes", cliente);

    $("#cadastroForm").hide();
    $("#cadastroSuccess").addClass("show");
    $("#cadastroNomeMsg").text(`Bem-vindo(a), ${nome}! 🎉`);
  } catch (erro) {
    alert(`Erro ao cadastrar cliente: ${erro.message}`);
  }
}

async function verClientes() {
  await renderClientesTable();
  $("#clientesWrap").show();
  $("#clientesWrap")[0].scrollIntoView({ behavior: "smooth" });
}

async function renderClientesTable() {
  const $tbody = $("#clientesTbody");
  if (!$tbody.length) return;

  try {
    const clientes = await buscarNaApi("/clientes");

    if (clientes.length === 0) {
      $tbody.html("<tr><td colspan='4' style='text-align:center;color:#888'>Nenhum cliente ainda.</td></tr>");
      return;
    }

    const html = clientes.map(c => `
      <tr>
        <td>${c.nome}</td>
        <td>${c.email}</td>
        <td>${c.telefone || "—"}</td>
        <td>${new Date(c.criado_em).toLocaleDateString("pt-BR")}</td>
      </tr>
    `).join("");

    $tbody.html(html);
  } catch (erro) {
    $tbody.html(`<tr><td colspan='4' style='text-align:center;color:#b91c1c'>${erro.message}</td></tr>`);
  }
}
