(function () {
  "use strict";

  angular.module('todoApp')
    .constant('constantes', {
      BASE_URL: 'http://localhost:8080/api',
      ENUM_ROLES: new Map([
        [1, { role: 'ADMIN', descricao: 'Administrador' }],
        [2, { role: 'USER', descricao: 'Usuário' }]
      ]),
      ID_ROLE_ADMIN: 1,
      ID_DONE_TODO: 3,
      CALLBACK_ERROR: function(error) { console.log('Erro na requisição:', error) }
    });

})();