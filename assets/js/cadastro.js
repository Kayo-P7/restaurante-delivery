// ─── Estado de sessão (salvo em sessionStorage) ───────────────────────────────
function getUsuario() {
  try { return JSON.parse(sessionStorage.getItem('usuario')); } catch { return null; }
}
function setUsuario(u) {
  sessionStorage.setItem('usuario', JSON.stringify(u));
}
function limparUsuario() {
  sessionStorage.removeItem('usuario');
}

// ─── Atualizar navbar e seção cadastro com base no login ──────────────────────
function atualizarEstadoLogin() {
  const u = getUsuario();

  if (u) {
    // Substitui link "Cadastro" por nome do usuário + logout na navbar
    const $li = $('a[data-page="cadastro"]').closest('li');
    $li.html(`
      <span class="nav__link nav__user">
        👤 ${u.nome.split(' ')[0]}
        <button class="btn-logout" onclick="fazerLogout()">Sair</button>
      </span>
    `);

    // Na página de cadastro: esconde formulário, mostra painel do usuário
    if ($('#cadastro').length) {
      $('#cadastroFormWrap').hide();
      $('#loginWrap').hide();
      $('#painelUsuario').show();
      $('#saudacaoUsuario').text(`Olá, ${u.nome.split(' ')[0]}! 👋`);
    }
  } else {
    if ($('#cadastro').length) {
      $('#painelUsuario').hide();
      $('#cadastroFormWrap').show();
      $('#loginWrap').show();
    }
  }
}

function fazerLogout() {
  limparUsuario();
  location.reload();
}

// ─── Login ────────────────────────────────────────────────────────────────────
async function submeterLogin(e) {
  e.preventDefault();
  const email = $('#loginEmail').val().trim();
  const senha = $('#loginSenha').val();

  if (!email || !senha) { alert('Preencha e-mail e senha.'); return; }

  try {
    const res = await enviarParaApi('/login', { email, senha });
    setUsuario(res.usuario);
    atualizarEstadoLogin();
  } catch (err) {
    alert(`Erro ao entrar: ${err.message}`);
  }
}

// ─── Cadastro ─────────────────────────────────────────────────────────────────
async function submeterCadastro(e) {
  e.preventDefault();

  const nome   = $('#cadNome').val().trim();
  const sobre  = $('#cadSobre').val().trim();
  const email  = $('#cadEmail').val().trim();
  const tel    = $('#cadTel').val().trim();
  const nasc   = $('#cadNasc').val();
  const senha  = $('#cadSenha').val();
  const senha2 = $('#cadSenha2').val();

  if (!nome || !sobre || !email || !tel || !senha || !senha2) {
    alert('Preencha todos os campos obrigatórios.');
    return;
  }
  if (senha !== senha2) {
    alert('As senhas não coincidem. Por favor, verifique.');
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
    const res = await enviarParaApi('/clientes', cliente);
    setUsuario({ id: res.id, nome: cliente.nome, email: cliente.email, telefone: cliente.telefone });
    atualizarEstadoLogin();
  } catch (erro) {
    alert(`Erro ao cadastrar: ${erro.message}`);
  }
}

// ─── Excluir conta ────────────────────────────────────────────────────────────
async function excluirConta() {
  const u = getUsuario();
  if (!u) return;

  if (!confirm(`Tem certeza que deseja excluir sua conta permanentemente?\n\nEsta ação não pode ser desfeita.`)) return;

  try {
    await deletarNaApi('/clientes', u.id);
    alert('Sua conta foi excluída com sucesso.');
    limparUsuario();
    location.reload();
  } catch (err) {
    alert(`Erro ao excluir conta: ${err.message}`);
  }
}

// ─── Tabela de clientes (admin) ───────────────────────────────────────────────
async function verClientes() {
  await renderClientesTable();
  $('#clientesWrap').show();
  $('#clientesWrap')[0].scrollIntoView({ behavior: 'smooth' });
}

async function renderClientesTable() {
  const $tbody = $('#clientesTbody');
  if (!$tbody.length) return;

  try {
    const clientes = await buscarNaApi('/clientes');

    if (clientes.length === 0) {
      $tbody.html("<tr><td colspan='5' style='text-align:center;color:#888'>Nenhum cliente ainda.</td></tr>");
      return;
    }

    const html = clientes.map(c => `
      <tr>
        <td>${c.nome}</td>
        <td>${c.email}</td>
        <td>${c.telefone || '—'}</td>
        <td>${new Date(c.criado_em).toLocaleDateString('pt-BR')}</td>
        <td>
          <button class="btn btn--sm btn--danger" onclick="excluirClienteAdmin(${c.id}, this)">🗑 Excluir</button>
        </td>
      </tr>
    `).join('');

    $tbody.html(html);
  } catch (erro) {
    $tbody.html(`<tr><td colspan='5' style='text-align:center;color:#b91c1c'>${erro.message}</td></tr>`);
  }
}

async function excluirClienteAdmin(id, btn) {
  if (!confirm('Excluir este cliente?')) return;
  try {
    await deletarNaApi('/clientes', id);
    $(btn).closest('tr').fadeOut(300, function () { $(this).remove(); });
  } catch (err) {
    alert(`Erro: ${err.message}`);
  }
}
