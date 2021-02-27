(function () {

    // angular.module('ngRoute', []);
    angular.module('moduloExterno', []); // mock

    angular.mock.listaComprasMock = function ($routeProvider) {
        module('todoApp');
        module(function ($provide) {
            $provide.service('todoService', function () {
                return {
                    exemplo: function () { return {}; },
                };
            });
        });
    };

}());
