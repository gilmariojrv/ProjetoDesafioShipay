(function () {
    "use strict";

    angular.module('todoApp')
        .config(routes)
        .run(configDefaults);

    routes.$inject = ['$routeProvider'];
    configDefaults.$inject = ['$rootScope'];

    function routes($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'home/home.tpl.html'
            })
            .when('/teste', {
                templateUrl: 'listagem/listagem.tpl.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    }

    function configDefaults($rootScope) {
        $rootScope.listaMensagens = [];
    }

})();