## Regras de Negócio Estabelecidas pelo Cliente:

**Cadastro de Veículos:**
- [x] Não é permitido cadastrar veículos com a mesma placa de outro já registrado no sistema.
- [x] As informações a serem cadastradas dos veículos devem incluir o valor da hora de aluguel.

**Aluguel de Veículos:**
- [x] Para alugar um veículo, o cliente deve fornecer nome, CPF e o tipo de carteira.
- [x] Se o tipo de carteira do cliente for "A", ele só poderá alugar uma moto; se for "B", apenas um carro.
- [x] Cada cliente pode alugar apenas um veículo por vez, e não deve estar alugando nenhum outro veículo no momento de realizar um novo aluguel.
- [x] Ao alugar um veículo, deve-se realizar um cálculo considerando o valor da diária, os dias a serem alugados e um acréscimo conforme o tipo de veículo. Carros terão um acréscimo de 10%, enquanto motos terão 5%.

**Devolução de Veículos:**
- [x] A devolução do veículo requer o fornecimento do CPF do cliente e a placa do veículo.
- [x] Não é permitido excluir um veículo que esteja atualmente alugado.

**Faturamento:**
- [x] O sistema, quando solicitado, deve apresentar a fatura a ser paga pelo cliente, detalhando o custo do aluguel de cada veículo.