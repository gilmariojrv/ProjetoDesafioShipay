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
        vm.error = "CNPJ inválido !!";
      } else if (!(vm.listaCadastros.find(element => element.cnpj === vm.cnpj).senha === vm.senha)) {
        vm.error = "Senha inválida !!";
      }else{
        vm.error = null;
        vm.habilitarLogin = false;
        serviceGlobal.salvarLogin(vm.cnpj);
        vm.estabelecimento = serviceGlobal.getEstabelecimento();
      }
    }

    function abrirLogin(){
      vm.loginCadastro = false;
      vm.cnpj = null;
      vm.senha = null;
    }

    function abrirCadastro(){
      vm.loginCadastro = true;
      vm.cnpj = null;
      vm.senha = null;
    }

    function cadastrarUsuario(){
      var entrada = {
        "cnpj":vm.cnpj,
        "senha":vm.senha
      }
      serviceGlobal.inserirNovo(entrada);
      vm.teste = serviceGlobal.getLista();
      console.log(vm.teste);
    }

    function abrirModalDescricao(usuario){
      $('#modalDescricao').modal('show');
      vm.descricao = usuario.descricao;
    }



  }

})();