(function () {
  "use strict";

  angular.module('todoApp')
    .factory('helperFactory', helperFactory);

  helperFactory.$inject = [];

  function helperFactory() {

    return {
      codificarAutenticacao: _codificarAutenticacao,
      criarCards: _criarCards
    }

    function _codificarAutenticacao(usuarioSelecionado) {
      return {
        'Authorization': 'Basic ' + btoa(usuarioSelecionado.email + ':' + usuarioSelecionado.senha)
      };
    }

    function _criarCards() {
      return [{
          idStatus: 1,
          status: 'TODO',
          severity: 'info',
          registros: []
        },
        {
          idStatus: 2,
          status: 'DOING',
          severity: 'warning',
          registros: []
        },
        {
          idStatus: 3,
          status: 'DONE',
          severity: 'success',
          registros: []
        },
        {
          idStatus: 4,
          status: 'BLOCK',
          severity: 'danger',
          registros: []
        }
      ];
    }

  }

})();