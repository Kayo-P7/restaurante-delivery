function initReservas() {
  const $resData = $('#resData');
  if (!$resData.length) return;

  const today = new Date().toISOString().split('T')[0];
  $resData.attr('min', today);
  renderReservaList();

  const u = getUsuario ? getUsuario() : null;
  if (u) {
    $('#resNome').val(u.nome);
    $('#resTel').val(u.telefone || '');
  }
}

async function submeterReserva(e) {
  e.preventDefault();

  const nome    = $('#resNome').val().trim();
  const tel     = $('#resTel').val().trim();
  const data    = $('#resData').val();
  const horario = $('#resHorario').val();
  const pessoas = $('#resPessoas').val();
  const ocasiao = $('#resOcasiao').val();
  const obs     = $('#resObs').val().trim();

  if (!nome || !tel || !data || !horario || !pessoas) {
    alert('Preencha todos os campos obrigatórios.');
    return;
  }

  const reserva = {
    nome,
    telefone: tel,
    data_reserva: data,
    horario,
    quantidade_pessoas: Number(pessoas),
    ocasiao: ocasiao || null,
    obs: obs || null,
  };

  try {
    await enviarParaApi('/reservas', reserva);

    setAlpineState('#reservas', { sucesso: true });

    const dataFmt = new Date(data + 'T12:00:00').toLocaleDateString('pt-BR');
    $('#reservaResumo').text(
      `${nome}, sua mesa para ${pessoas} pessoa(s) está reservada para ${dataFmt} às ${horario}. Aguardamos você!`
    );

    renderReservaList();
  } catch (erro) {
    alert(`Erro ao salvar reserva: ${erro.message}`);
  }
}

function novaReserva() {
  $('#reservaForm')[0].reset();
  setAlpineState('#reservas', { sucesso: false });
}

async function renderReservaList() {
  const $wrap = $('#reservaListWrap');
  const $list = $('#reservaList');
  if (!$wrap.length || !$list.length) return;

  try {
    const reservas = await buscarNaApi('/reservas');

    if (reservas.length === 0) {
      setAlpineState('#reservas', { listaVisivel: false });
      return;
    }

    const html = reservas.slice(0, 10).map(r => `
      <div class="reserva-item" id="reserva-${r.id}">
        <div><strong>Nome:</strong> ${r.nome}</div>
        <div><strong>Telefone:</strong> ${r.telefone}</div>
        <div><strong>Data:</strong> ${new Date(r.data_reserva).toLocaleDateString('pt-BR')}</div>
        <div><strong>Horário:</strong> ${String(r.horario).slice(0, 5)}</div>
        <div><strong>Pessoas:</strong> ${r.quantidade_pessoas}</div>
        <div><strong>Ocasião:</strong> ${r.ocasiao || '—'}</div>
        <div style="margin-top:.5rem">
          <button class="btn btn--sm btn--danger" onclick="excluirReserva(${r.id})">🗑 Excluir</button>
        </div>
      </div>
    `).join('');

    setAlpineState('#reservas', { listaVisivel: true });
    $list.html(html);
  } catch (erro) {
    setAlpineState('#reservas', { listaVisivel: true });
    $list.html(`<p style="color:#b91c1c">${erro.message}</p>`);
  }
}

async function excluirReserva(id) {
  if (!confirm('Deseja excluir esta reserva?')) return;
  try {
    await deletarNaApi('/reservas', id);
    $(`#reserva-${id}`).fadeOut(300, function () { $(this).remove(); });
  } catch (err) {
    alert(`Erro: ${err.message}`);
  }
}
