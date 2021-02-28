(function () {
  'use strict';

  angular.module('todoApp')
    .controller('listagemController', listagemController);

  listagemController.$inject = ['serviceGlobal'];

  function listagemController(serviceGlobal) {
    var vm = this;

    /* ***************    INIT VARIÁVEIS    *********************************** */

    vm.senha = null;
    vm.cnpj = null;
    vm.habilitarLogin = true;
    vm.loginCadastro = false;

    /* ***************    INDICE FUNÇÕES    **************** */
    vm.init = init;
    vm.verificarCadastro = verificarCadastro;
    vm.abrirModalDescricao = abrirModalDescricao;
    vm.abrirLogin = abrirLogin;
    vm.abrirCadastro = abrirCadastro;
    vm.cadastrarUsuario = cadastrarUsuario;
    vm.pesquisarPorCpf = pesquisarPorCpf;

    /* ***************    FUNÇÕES    ******************************** */

    function init() {
      vm.listaCadastros = serviceGlobal.getLista();
      vm.cnpj = serviceGlobal.getLogin();
      if (vm.cnpj) {
        vm.habilitarLogin = false;
        vm.estabelecimento = serviceGlobal.getEstabelecimento();
      }

    }

    function verificarCadastro() {
      vm.error = serviceGlobal.verificarCamposLogin(vm.listaCadastros, vm.cnpj, vm.senha);
      if (!vm.error) {
        vm.habilitarLogin = false;
        serviceGlobal.salvarLogin(vm.cnpj);
        vm.estabelecimento = serviceGlobal.getEstabelecimento();
      }
    }

    function pesquisarPorCpf(){
      vm.estabelecimento = serviceGlobal.getEstabelecimento(vm.cpfPesquisa);
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

})();