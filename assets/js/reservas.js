function initReservas() {
  const $resData = $("#resData");
  if (!$resData.length) return;

  const today = new Date().toISOString().split("T")[0];
  $resData.attr("min", today);
}

function submeterReserva(e) {
  e.preventDefault();

  const nome = $("#resNome").val().trim();
  const tel = $("#resTel").val().trim();
  const data = $("#resData").val();
  const horario = $("#resHorario").val();
  const pessoas = $("#resPessoas").val();
  const ocasiao = $("#resOcasiao").val();
  const obs = $("#resObs").val().trim();

  if (!nome || !tel || !data || !horario || !pessoas) {
    alert("Preencha todos os campos obrigatórios.");
    return;
  }

  const reserva = {
    nome,
    tel,
    data,
    horario,
    pessoas,
    ocasiao: ocasiao || "—",
    obs: obs || "—",
    registradoEm: new Date().toLocaleString("pt-BR"),
  };

  const reservas = JSON.parse(localStorage.getItem("brasaReservas") || "[]");
  reservas.push(reserva);
  localStorage.setItem("brasaReservas", JSON.stringify(reservas));

  $("#reservaForm").hide();
  $("#reservaSuccess").addClass("show");

  const dataFmt = new Date(data + "T12:00:00").toLocaleDateString("pt-BR");
  $("#reservaResumo").text(`${nome}, sua mesa para ${pessoas} pessoa(s) está reservada para ${dataFmt} às ${horario}. Aguardamos você!`);

  renderReservaList();
}

function novaReserva() {
  $("#reservaForm")[0].reset();
  $("#reservaForm").show();
  $("#reservaSuccess").removeClass("show");
}

function renderReservaList() {
  const reservas = JSON.parse(localStorage.getItem("brasaReservas") || "[]");
  const $wrap = $("#reservaListWrap");
  const $list = $("#reservaList");
  if (!$wrap.length || !$list.length) return;

  if (reservas.length === 0) {
    $wrap.hide();
    return;
  }

  const html = [...reservas].reverse().slice(0, 10).map(r => `
    <div class="reserva-item">
      <div><strong>Nome:</strong> ${r.nome}</div>
      <div><strong>Telefone:</strong> ${r.tel}</div>
      <div><strong>Data:</strong> ${new Date(r.data + "T12:00:00").toLocaleDateString("pt-BR")}</div>
      <div><strong>Horário:</strong> ${r.horario}</div>
      <div><strong>Pessoas:</strong> ${r.pessoas}</div>
      <div><strong>Ocasião:</strong> ${r.ocasiao}</div>
    </div>
  `).join("");

  $wrap.show();
  $list.html(html);
}
