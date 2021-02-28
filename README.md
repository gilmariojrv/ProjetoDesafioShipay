# ProjetoDesafioShipay
Projeto para desafio.


Instruções para rodar o projeto:

- Instalar o git caso nao tenha na maquina.
- Executar o comando git clone com a URL https://github.com/gilmariojrv/ProjetoDesafioShipay.git
- Abrir o projeto na IDE(aconselho o Visual studio code, pois tem o terminal dentro direto na pasta do projeto)
- Executar dentro da pasta do projeto o comando: npm install -g grunt-cli
- Ainda dentro da pasta do projeto, executar o comando: npm install
- Execute o comando: grunt
- Acesse no navegador a URL: http://localhost:8000/#!/

- Na aplicação, temos um cnpj(cnpj 12, senha 123) ja cadastrado com uma transação para efetuar o login facilmente, porém é possivel cadastrar outros cnpjs e outras transações.
- A pagina web criada, contem 3 links(ou 3 telas), inicio - cadastrar transação - listagem
- Na tela de inicio o layout principal, temos o botão para cadastrar transação e o de detalhe.
- Na tela de cadastrar transação, caso nao tenha sido feito login posteriormente, irá ser exibida a tela de login ou cadastro de usuario, efetuando o login, terá acesso ao formulario da transação.
- Na tela de Listagem, caso nao tenha sido feito login posteriormente, irá ser exibida a tela de login ou cadastro de usuario, efetuando o login, terá acesso à tabela de listagem de transações.
- Na tabela de listagem de transações, caso nao exista transação cadastrada, será exibida mensagem de informação.

OBS: Como no desafio foi solicitado algo mais simples, sem login por exemplo, por questões de tempo, não foram implementadas algumas funções, como por exemplo o logout.
