<?php

// configuraçoes do banco de dados.
define('DB_HOST', 'root');
define('DB_USER', 'localhost');
define('DB_PASS', '');
define('DB_NAME', 'restaurante_database');

function getDB() {
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    if ($conn->connect_error) {
        http_response_code(500);
        echo json_encode(['erro' => 'Erro de conexão com o banco de dados.']);
        exit;
    }
    $conn->set_charset('utf8mb4');
    return $conn;
}


header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}
