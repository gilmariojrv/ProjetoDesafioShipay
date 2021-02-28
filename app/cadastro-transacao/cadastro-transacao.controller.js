(function () {
  'use strict';

  angular.module('todoApp')
    .controller('cadastroTransacaoController', cadastroTransacaoController);

  cadastroTransacaoController.$inject = ['serviceGlobal'];

  function cadastroTransacaoController(serviceGlobal) {
    var vm = this;

    /* ***************    INIT VARIÁVEIS    *********************************** */

    vm.senha = null;
    vm.cnpj = null;
    vm.habilitarLogin = true;
    vm.loginCadastro = false;
    vm.objetoTransacao = null;
    vm.cpf = null;
    vm.valor = null;
    vm.descricao = "";
    vm.sucesso = null;

    /* ***************    INDICE FUNÇÕES    **************** */
    vm.init = init;
    vm.verificarLogin = verificarLogin;
    vm.abrirModalDescricao = abrirModalDescricao;
    vm.abrirLogin = abrirLogin;
    vm.abrirCadastro = abrirCadastro;
    vm.cadastrarUsuario = cadastrarUsuario;
    vm.cadastrar = cadastrar;

    /* ***************    FUNÇÕES    ******************************** */

    function init() {
      vm.listaCadastros = serviceGlobal.getLista();
      vm.cnpj = serviceGlobal.getLogin();
      if (vm.cnpj) {
        vm.habilitarLogin = false;
        vm.estabelecimento = serviceGlobal.getEstabelecimento();
      }

    }

    function verificarLogin() {

      vm.error = serviceGlobal.verificarCamposLogin(vm.listaCadastros, vm.cnpj, vm.senha);
      if (!vm.error) {
        vm.habilitarLogin = false;
        serviceGlobal.salvarLogin(vm.cnpj);
        vm.estabelecimento = serviceGlobal.getEstabelecimento();
      }

    }
  

  function cadastrar() {
    vm.error = null;
    vm.error = serviceGlobal.verificarCpf(vm.cpf);
    if (!vm.error) {
      var entrada = {
        "cnpj": vm.cnpj,
        "cpf": vm.cpf,
        "valor": vm.valor,
        "descricao": vm.descricao
      }

      serviceGlobal.inserirTransferencia(entrada);
      vm.sucesso = serviceGlobal.inserirTransferencia();

      vm.cpf = null;
      vm.valor = null;
      vm.descricao = null;
    }

  }

  function abrirLogin() {
    vm.error = null;
    vm.loginCadastro = false;
    vm.cnpj = null;
    vm.senha = null;
  }

  function abrirCadastro() {
    vm.error = null;
    vm.loginCadastro = true;
    vm.cnpj = null;
    vm.senha = null;
  }

  function cadastrarUsuario() {
    vm.error = null;
    vm.sucesso = null;
    vm.error = serviceGlobal.verificarCnpjCadastro(vm.cnpj);

    if (!vm.error) {
      vm.error = serviceGlobal.verificarDuplicidade(vm.listaCadastros, vm.cnpj);
      if (!vm.error) {
        var entrada = {
          "cnpj": vm.cnpj,
          "senha": vm.senha
        }
        serviceGlobal.inserirNovo(entrada);
        vm.sucesso = serviceGlobal.inserirNovo();
        vm.cnpj = null;
        vm.senha = null;
      }

    }
  }

  function abrirModalDescricao(usuario) {
    $('#modalDescricao').modal('show');
    vm.descricao = usuario.descricao;
  }



}

}) ();