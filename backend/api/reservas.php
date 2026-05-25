<?php
require_once __DIR__ . '/../config.php';

$method = $_SERVER['REQUEST_METHOD'];

//criar reserva.
if ($method === 'POST') {
    $body    = json_decode(file_get_contents('php://input'), true);
    $nome    = trim($body['nome'] ?? '');
    $tel     = trim($body['telefone'] ?? '');
    $data    = $body['data_reserva'] ?? '';
    $horario = $body['horario'] ?? '';
    $qtd     = intval($body['quantidade_pessoas'] ?? 0);
    $ocasiao = $body['ocasiao'] ?? null;
    $obs     = $body['obs'] ?? null;

    if (!$nome || !$tel || !$data || !$horario || !$qtd) {
        http_response_code(400);
        echo json_encode(['erro' => 'Preencha todos os campos obrigatórios da reserva.']);
        exit;
    }

    $db   = getDB();
    $stmt = $db->prepare(
        'INSERT INTO reservas (nome, telefone, data_reserva, horario, quantidade_pessoas, ocasiao, obs)
         VALUES (?, ?, ?, ?, ?, ?, ?)'
    );
    $stmt->bind_param('ssssiis', $nome, $tel, $data, $horario, $qtd, $ocasiao, $obs);

    if ($stmt->execute()) {
        http_response_code(201);
        echo json_encode(['mensagem' => 'Reserva salva com sucesso.']);
    } else {
        http_response_code(500);
        echo json_encode(['erro' => 'Erro ao salvar reserva.']);
    }
    $stmt->close();
    $db->close();
    exit;
}

// listar reservas.
if ($method === 'GET') {
    $db  = getDB();
    $res = $db->query('SELECT * FROM reservas ORDER BY id DESC');
    $reservas = [];
    while ($row = $res->fetch_assoc()) {
        $reservas[] = $row;
    }
    $db->close();
    echo json_encode($reservas);
    exit;
}

// excluir reserva por id.
if ($method === 'DELETE') {
    $id = intval($_GET['id'] ?? 0);
    if (!$id) {
        http_response_code(400);
        echo json_encode(['erro' => 'ID inválido.']);
        exit;
    }
    $db   = getDB();
    $stmt = $db->prepare('DELETE FROM reservas WHERE id = ?');
    $stmt->bind_param('i', $id);
    if ($stmt->execute() && $stmt->affected_rows > 0) {
        echo json_encode(['mensagem' => 'Reserva excluída com sucesso.']);
    } else {
        http_response_code(404);
        echo json_encode(['erro' => 'Reserva não encontrada.']);
    }
    $stmt->close();
    $db->close();
    exit;
}

http_response_code(405);
echo json_encode(['erro' => 'Método não permitido.']);
