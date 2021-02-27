(function () {
  "use strict";

  angular.module('todoApp')
    .filter('capitalize', function () {
      return function (input) {
        return (angular.isString(input) && input.length > 0) ?
          input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : input;
      }
    });


  angular.module('todoApp')
    .filter('role', function (constantes) {
      return function (idRole) {
        return constantes.ENUM_ROLES.get(idRole).descricao;
      }
    });

})();