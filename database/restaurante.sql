CREATE TABLE clientes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100),
    telefone VARCHAR(20),
    email VARCHAR(100)
);

CREATE TABLE reservas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    cliente_id INT,
    data_reserva DATE,
    horario TIME,
    quantidade_pessoas INT,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);