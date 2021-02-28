(function () {
  "use strict";

  angular.module('todoApp')
    .service('serviceGlobal', serviceGlobal);

  serviceGlobal.$inject = [];

  function serviceGlobal() {
    var vm = this;

    vm.inserirNovo = inserirNovo;
    vm.getLista = getLista;
    vm.salvarLogin = salvarLogin;
    vm.inserirTransferencia = inserirTransferencia;
    vm.getEstabelecimento = getEstabelecimento;
    vm.getLogin = getLogin;
    vm.verificarCpf = verificarCpf;
    vm.verificarCamposLogin = verificarCamposLogin;
    vm.verificarCnpjCadastro = verificarCnpjCadastro;
    vm.verificarDuplicidade = verificarDuplicidade;
    vm.logout = logout;


    vm.loginSalvo = null;
    vm.indexLogin = 0;


    vm.listaRequisicoes = [{
      "cnpj": "12",
      "senha": "123",
      "listaTransferencias": [{
        "cnpj": "12",
        "cpf": "094.214.930-01",
        "valor": 590.01,
        "descricao": "Almoço em restaurante chique pago via Shipay!",
      }]
    }];

    function verificarCpf(cpf) {
      if (cpf.length < 14) {
        var erro = "CPF inválido";
      }
      return erro;
    }

    function verificarCnpjCadastro(cnpj) {
      if (cnpj.length < 19) {
        var erro = "Digite um CNPJ válido";
      }
      return erro;
    }

    function inserirNovo(obj) {
     
      if(obj){ 
        vm.listaRequisicoes.push(obj);
      }
     
      var sucesso = "Usuário cadastrado com sucesso, faça login para ter acesso.";
      return sucesso;
    }

    function getLista() {
      return vm.listaRequisicoes;
    }

    function getEstabelecimento() {
      return vm.listaRequisicoes[vm.indexLogin];
    }

    function salvarLogin(cnpj) {
      vm.loginSalvo = cnpj;
      vm.indexLogin = vm.listaRequisicoes.findIndex(element => element.cnpj === cnpj)
    }

    function getLogin() {
      return vm.loginSalvo;
    }

    function verificarDuplicidade(listaCadastros, cnpj){
      var error = null;

      if (listaCadastros.some(element => element.cnpj === cnpj)) {
          error = "CNPJ já cadastrado !!";
      } else {
        error = null;
      }
      return error;
    }

    function verificarCamposLogin(listaCadastros, cnpj, senha){
      
      var error = null;

      if (!listaCadastros.some(element => element.cnpj === cnpj)) {
          error = "CNPJ inválido !!";
      } else if (!(listaCadastros.find(element => element.cnpj === cnpj).senha === senha)) {
          error = "Senha inválida !!";
      } else {
        error = null;
      }
      return error;
    }

    function inserirTransferencia(trans) {
      if(trans){ 
        if(vm.listaRequisicoes[vm.indexLogin].listaTransferencias === undefined){
          vm.listaRequisicoes[vm.indexLogin].listaTransferencias = [];
        }
        vm.listaRequisicoes[vm.indexLogin].listaTransferencias.push(trans);
      }
     
      var sucesso = "Transação incluída com sucesso.";
      return sucesso;
    }

  }

  function logout() {
    vm.loginSalvo = null;
    vm.indexLogin = null;
  }


})();