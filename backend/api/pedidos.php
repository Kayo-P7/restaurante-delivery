<?php
require_once __DIR__ . '/../config.php';

$method = $_SERVER['REQUEST_METHOD'];

//criar pedido
if ($method === 'POST') {
    $body     = json_decode(file_get_contents('php://input'), true);
    $nome     = trim($body['nome'] ?? '');
    $tel      = trim($body['telefone'] ?? '');
    $end      = trim($body['endereco'] ?? '');
    $pag      = trim($body['pagamento'] ?? '');
    $itens    = trim($body['itens'] ?? '');
    $total    = trim($body['total'] ?? '');

    if (!$nome || !$tel || !$end || !$pag || !$itens || !$total) {
        http_response_code(400);
        echo json_encode(['erro' => 'Preencha todos os campos do pedido.']);
        exit;
    }

    $db   = getDB();
    $stmt = $db->prepare(
        'INSERT INTO pedidos (nome, telefone, endereco, pagamento, itens, total) VALUES (?, ?, ?, ?, ?, ?)'
    );
    $stmt->bind_param('ssssss', $nome, $tel, $end, $pag, $itens, $total);

    if ($stmt->execute()) {
        http_response_code(201);
        echo json_encode(['mensagem' => 'Pedido salvo com sucesso.']);
    } else {
        http_response_code(500);
        echo json_encode(['erro' => 'Erro ao salvar pedido.']);
    }
    $stmt->close();
    $db->close();
    exit;
}

// listar pedidos.
if ($method === 'GET') {
    $db  = getDB();
    $res = $db->query('SELECT * FROM pedidos ORDER BY id DESC');
    $pedidos = [];
    while ($row = $res->fetch_assoc()) {
        $pedidos[] = $row;
    }
    $db->close();
    echo json_encode($pedidos);
    exit;
}

//excluir pedido por id.
if ($method === 'DELETE') {
    $id = intval($_GET['id'] ?? 0);
    if (!$id) {
        http_response_code(400);
        echo json_encode(['erro' => 'ID inválido.']);
        exit;
    }
    $db   = getDB();
    $stmt = $db->prepare('DELETE FROM pedidos WHERE id = ?');
    $stmt->bind_param('i', $id);
    if ($stmt->execute() && $stmt->affected_rows > 0) {
        echo json_encode(['mensagem' => 'Pedido excluído com sucesso.']);
    } else {
        http_response_code(404);
        echo json_encode(['erro' => 'Pedido não encontrado.']);
    }
    $stmt->close();
    $db->close();
    exit;
}

http_response_code(405);
echo json_encode(['erro' => 'Método não permitido.']);
