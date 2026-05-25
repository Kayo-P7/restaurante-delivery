<?php
require_once __DIR__ . '/../config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['erro' => 'Método não permitido.']);
    exit;
}

$body  = json_decode(file_get_contents('php://input'), true);
$email = trim($body['email'] ?? '');
$senha = $body['senha'] ?? '';

if (!$email || !$senha) {
    http_response_code(400);
    echo json_encode(['erro' => 'E-mail e senha são obrigatórios.']);
    exit;
}

$db   = getDB();
$stmt = $db->prepare('SELECT id, nome, email, telefone, senha FROM clientes WHERE email = ?');
$stmt->bind_param('s', $email);
$stmt->execute();
$res    = $stmt->get_result();
$cliente = $res->fetch_assoc();
$stmt->close();
$db->close();

if (!$cliente) {
    http_response_code(401);
    echo json_encode(['erro' => 'E-mail ou senha inválidos.']);
    exit;
}

$senhaOk = password_verify($senha, $cliente['senha'])
        || ($cliente['senha'] === $senha); // fallback para senhas legadas

if (!$senhaOk) {
    http_response_code(401);
    echo json_encode(['erro' => 'E-mail ou senha inválidos.']);
    exit;
}


unset($cliente['senha']);
echo json_encode([
    'mensagem' => 'Login realizado com sucesso.',
    'usuario'  => $cliente,
]);
