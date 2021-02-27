(function () {
  'use strict';

  angular.module('todoApp')
    .controller('homeController', homeController);

  homeController.$inject = [];

  function homeController() {
    var vm = this;

    /* ***************    INIT VARIÁVEIS    *********************************** */
   
    vm.validaDetalhe = true;

    /* ***************    INDICE FUNÇÕES    **************** */
    vm.init = init;
    vm.validarDetalhe = validarDetalhe;
    

    /* ***************    FUNÇÕES    ******************************** */

    function init() {


    }

    function validarDetalhe(){
      vm.validaDetalhe = !vm.validaDetalhe;
    }
 
  }

})();