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
        "cpf": "111.111.111-11",
        "valor": 590.01,
        "descricao": "Almoço em restaurante chique pago via Shipay!",
      },
      {
        "cnpj": "12",
        "cpf": "111.111.111-11",
        "valor": 600.01,
        "descricao": "Almoço em restaurante chique pago via Shipay!",
      },
      {
        "cnpj": "12",
        "cpf": "111.111.111-11",
        "valor": 700.01,
        "descricao": "Almoço em restaurante chique pago via Shipay!",
      },
      {
        "cnpj": "12",
        "cpf": "222.222.222-22",
        "valor": 590.01,
        "descricao": "Almoço em restaurante chique pago via Shipay!",
      },
      {
        "cnpj": "12",
        "cpf": "222.222.222-22",
        "valor": 3000,
        "descricao": "Almoço em restaurante chique pago via Shipay!",
      },
      ]
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

      if (obj) {
        vm.listaRequisicoes.push(obj);
      }

      var sucesso = "Usuário cadastrado com sucesso, faça login para ter acesso.";
      return sucesso;
    }

    function getLista() {
      return vm.listaRequisicoes;
    }

    function getEstabelecimento(cpf) {
      if (cpf) {
        var lista = angular.copy(vm.listaRequisicoes[vm.indexLogin].listaTransferencias);
        var aux = angular.copy(vm.listaRequisicoes[vm.indexLogin]);
        aux.listaTransferencias = [];
        for (var i = 0; i < lista.length; i++) {
          if (lista[i].cpf === cpf) {
            aux.listaTransferencias.push(lista[i]);
          }
        }
      } else {
        var aux = angular.copy(vm.listaRequisicoes[vm.indexLogin]);
      }
      return aux;
    }





    function salvarLogin(cnpj) {
      vm.loginSalvo = cnpj;
      vm.indexLogin = vm.listaRequisicoes.findIndex(element => element.cnpj === cnpj)
    }

    function getLogin() {
      return vm.loginSalvo;
    }

    function verificarDuplicidade(listaCadastros, cnpj) {
      var error = null;

      if (listaCadastros.some(element => element.cnpj === cnpj)) {
        error = "CNPJ já cadastrado !!";
      } else {
        error = null;
      }
      return error;
    }

    function verificarCamposLogin(listaCadastros, cnpj, senha) {

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
      if (trans) {
        if (vm.listaRequisicoes[vm.indexLogin].listaTransferencias === undefined) {
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