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

    /* ***************    INDICE FUNÇÕES    **************** */
    vm.init = init;
    vm.verificarCadastro = verificarCadastro;
    vm.abrirModalDescricao = abrirModalDescricao;

    /* ***************    FUNÇÕES    ******************************** */

    function init() {
      vm.listaCadastros = serviceGlobal.getLista();
      vm.cnpj = serviceGlobal.getLogin();
      if(vm.cnpj){
        vm.habilitarLogin = false;
        vm.estabelecimento = serviceGlobal.getEstabelecimento();
      }
      
    }

    function verificarCadastro() {

      if (!vm.listaCadastros.some(element => element.cnpj === vm.cnpj)) {
        vm.error = "CNPJ inválido!!";
      } else if (!(vm.listaCadastros.find(element => element.cnpj === vm.cnpj).senha === vm.senha)) {
        vm.error = "Senha inválida!!";
      }else{
        vm.error = null;
        vm.habilitarLogin = false;
        serviceGlobal.salvarLogin(vm.cnpj);
        vm.estabelecimento = serviceGlobal.getEstabelecimento();
      }
    }

    function abrirModalDescricao(usuario){
      $('#modalDescricao').modal('show');
      vm.descricao = usuario.descricao;
    }



  }

})();