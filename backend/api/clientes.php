<?php
require_once __DIR__ . '/../config.php';

$method = $_SERVER['REQUEST_METHOD'];

// caddastrar cliente.
if ($method === 'POST') {
    $body = json_decode(file_get_contents('php://input'), true);
    $nome     = trim($body['nome'] ?? '');
    $telefone = trim($body['telefone'] ?? '');
    $email    = trim($body['email'] ?? '');
    $nasc = !empty($body['nascimento']) ? $body['nascimento'] : null;
    $senha    = $body['senha'] ?? '';

    if (!$nome || !$telefone || !$email || !$senha) {
        http_response_code(400);
        echo json_encode(['erro' => 'Nome, telefone, e-mail e senha são obrigatórios.']);
        exit;
    }

    $db = getDB();
    $senhaHash = password_hash($senha, PASSWORD_DEFAULT);

    $stmt = $db->prepare(
        'INSERT INTO clientes (nome, telefone, email, nascimento, senha) VALUES (?, ?, ?, ?, ?)'
    );
    $stmt->bind_param('sssss', $nome, $telefone, $email, $nasc, $senhaHash);

    if ($stmt->execute()) {
        $id = $stmt->insert_id;
        http_response_code(201);
        echo json_encode(['mensagem' => 'Cliente cadastrado com sucesso.', 'id' => $id]);
    } else {
        if ($db->errno === 1062) {
            http_response_code(409);
            echo json_encode(['erro' => 'Este e-mail já está cadastrado.']);
        } else {
            http_response_code(500);
            echo json_encode(['erro' => 'Erro ao cadastrar cliente: ' . $db->error]);
        }
    }
    $stmt->close();
    $db->close();
    exit;
}

// listar clientes.
if ($method === 'GET') {
    $db = getDB();
    $res = $db->query(
        'SELECT id, nome, telefone, email, nascimento, criado_em FROM clientes ORDER BY id DESC'
    );
    $clientes = [];
    while ($row = $res->fetch_assoc()) {
        $clientes[] = $row;
    }
    $db->close();
    echo json_encode($clientes);
    exit;
}

//  excluir conta
if ($method === 'DELETE') {
    $id = intval($_GET['id'] ?? 0);
    if (!$id) {
        http_response_code(400);
        echo json_encode(['erro' => 'ID inválido.']);
        exit;
    }
    $db = getDB();
    $stmt = $db->prepare('DELETE FROM clientes WHERE id = ?');
    $stmt->bind_param('i', $id);
    if ($stmt->execute() && $stmt->affected_rows > 0) {
        echo json_encode(['mensagem' => 'Conta excluída com sucesso.']);
    } else {
        http_response_code(404);
        echo json_encode(['erro' => 'Cliente não encontrado.']);
    }
    $stmt->close();
    $db->close();
    exit;
}

http_response_code(405);
echo json_encode(['erro' => 'Método não permitido.']);
