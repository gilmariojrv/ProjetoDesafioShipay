(function () {
  "use strict";

  angular.module('todoApp')
    .service('serviceGlobal', serviceGlobal);

  serviceGlobal.$inject = [];

  function serviceGlobal( ) {
    var vm = this;

    vm.inserirNovo = inserirNovo;
    vm.getLista = getLista;
    vm.salvarLogin = salvarLogin;
    vm.inserirTransferencia = inserirTransferencia;
    vm.getEstabelecimento = getEstabelecimento;
    vm.getLogin = getLogin;
    

    vm.loginSalvo = null;
    vm.indexLogin = 0;


    vm.listaRequisicoes = [{
      "cnpj": "45283163000167",
      "senha": "1234",
      "listaTransferencias": [{
        "cnpj": "45283163000167",
        "cpf": "094.214.930-01",
        "valor": 590.01,
        "descricao": "Almoço em restaurante chique pago via Shipay!",
      }]
   }];

   function inserirNovo(obj){
    vm.listaRequisicoes.push(obj);
   }
 
   function getLista(){
     return vm.listaRequisicoes;
   }

   function getEstabelecimento(){
     return vm.listaRequisicoes[vm.indexLogin];
   }

   function salvarLogin(cnpj){
    vm.loginSalvo = cnpj;
    vm.indexLogin = vm.listaRequisicoes.findIndex(element => element.cnpj === cnpj)
   }

   function getLogin (){
     return vm.loginSalvo;
   }

   function inserirTransferencia(trans){
    vm.listaRequisicoes[vm.indexLogin].listaTransferencias.push(trans);

   }

  }


})();