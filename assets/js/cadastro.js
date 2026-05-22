function submeterCadastro(e) {
  e.preventDefault();

  const nome = $("#cadNome").val().trim();
  const sobre = $("#cadSobre").val().trim();
  const email = $("#cadEmail").val().trim();
  const tel = $("#cadTel").val().trim();
  const nasc = $("#cadNasc").val();
  const senha = $("#cadSenha").val();
  const senha2 = $("#cadSenha2").val();

  if (senha !== senha2) {
    alert("As senhas não coincidem. Por favor, verifique.");
    return;
  }

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

  $("#cadastroForm").hide();
  $("#cadastroSuccess").addClass("show");
  $("#cadastroNomeMsg").text(`Bem-vindo(a), ${nome}! 🎉`);
}

function verClientes() {
  renderClientesTable();
  $("#clientesWrap").show();
  $("#clientesWrap")[0].scrollIntoView({ behavior: "smooth" });
}

function renderClientesTable() {
  const clientes = JSON.parse(localStorage.getItem("brasaClientes") || "[]");
  const $tbody = $("#clientesTbody");
  if (!$tbody.length) return;

  if (clientes.length === 0) {
    $tbody.html("<tr><td colspan='4' style='text-align:center;color:#888'>Nenhum cliente ainda.</td></tr>");
    return;
  }

  const html = clientes.map(c => `
    <tr>
      <td>${c.nome}</td>
      <td>${c.email}</td>
      <td>${c.tel}</td>
      <td>${c.cadastradoEm}</td>
    </tr>
  `).join("");

  $tbody.html(html);
}
