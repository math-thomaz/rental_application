# Cadastro de carro

**RF** => Requisitos funcionais
[X]Deve ser possível cadastrar um novo carro;

**RN** => Regra de negócio
[X]Não deve ser possível cadastrar um carro com uma placa já existente;
[X]O carro deve ser cadastrado, por padrão, com disponibilidade aberta;
[X]Apenas o usuário administrador será resposável pelo cadastro;

# Listagem de carros

**RF** => Requisitos funcionais
[X]Deve ser possível listar todos os carros disponíveis;
[X]Deve ser possível listar todos os carros disponíveis pelo nome da categoria;
[X]Deve ser possível listar todos os carros disponíveis pelo nome da marca;
[X]Deve ser possível listar todos os carros disponíveis pelo nome do carro;

**RN** => Regra de negócio
[X]O usuário não precisa estar logado no sistema para listar os carros;

# Cadastro de Especificação no carro

**RF** => Requisitos funcionais
[X]Deve ser possível cadastrar uma especificação para um carro;

**RN** => Regra de negócio
[X]Não deve ser possível cadastrar uma especificação para um carro não cadastrado;
[X]Não deve ser possível cadastrar uma especificação já existente para o mesmo carro;
[X]Apenas o usuário administrador será resposável pelo cadastro;


# Cadastro de imagem do carro

**RF** => Requisitos funcionais
[X]Deve ser possível cadastrar a imagem do carro;

**RNF** => Requisitos não funcionais
[X]Utilizar a lib Multer para upload dos arquivos;

**RN** => Regra de negócio
[X]O usuário deve poder cadastrar mais de uma imagem para o mesmo carro;
[X]Apenas o usuário administrador será resposável pelo cadastro;

# Agendamento de aluguel

**RF** => Requisitos funcionais
[X]Deve ser possível cadastrar um aluguel

**RN** => Regra de negócio
[X]O usuário deve estar logado na aplicação;
[X]O aluguel deve ter duração mínima de 24 horas;
[X]Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário;
[X]Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro;
[X] Ao concluir um aluguel, o status do carro escolhido deverá ser alterado para indisponível;

# Devolução de Carro

**RF** => Requisitos funcionais
[X]Deve ser possível realizar da devolução do carro

**RN** => Regra de negócio
[X]O usuário deverá estar logado;
[X]Se o carro for devolvido com menos de 24 horas, deverá ser cobrado diária completa;
[X]Ao realizar a devolução, o carro deverá ser liberado para outro aluguel;
[X]Ao realizar a devolução, o usuário também deverá ser liberado para outro aluguel;
[X]Ao realizar a devolução, deverá ser calculado o total do aluguel;
[X]Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrado multa proporcional aos dias de atraso;
[X]Caso haja multa, deverá ser somado ao total de aluguel.

# Listagem de Alugueis para usuário

**RF** => Requisitos funcionais
[X]Deve ser possível realizar a busca de todos os alugueis para o usuário.

**RN** => Regra de negócio
[X]O usuário deve estar logado na aplicação.

# Recuperar Senha

**RF** => Requisitos funcionais
[X]Deve ser possível o usuário recuperar a senha informando o e-mail;
[X]O usuário deve receber um e-mail com o passo a passo para a recuperação da senha;
[X]O usuário deve conseguir inserir uma nova senha.

**RN** => Regra de negócio
[X]O usuário precisa informar uma nova senha;
[X]O link enviado para a recuperação deve expirar em 3 horas.




<!-- **RF** => Requisitos funcionais

**RNF** => Requisitos não funcionais

**RN** => Regra de negócio -->
