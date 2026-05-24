USE restaurante_delivery;
ALTER TABLE pedidos
  ADD COLUMN endereco VARCHAR(255) NOT NULL AFTER telefone,
  ADD COLUMN pagamento VARCHAR(50) NOT NULL AFTER endereco,
  ADD COLUMN itens TEXT NOT NULL AFTER pagamento,
  ADD COLUMN total VARCHAR(30) NOT NULL AFTER itens;
