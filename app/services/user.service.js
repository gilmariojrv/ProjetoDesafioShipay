(function () {
  "use strict";

  angular.module('todoApp')
    .factory('userService', userService);

  userService.$inject = ['$http', 'constantes', 'helperFactory'];

  function userService($http, constantes, helper) {
    var vm = this;
    vm.BASE_URL = constantes.BASE_URL;
    vm._getHeaders = _getHeaders;
    vm._getCallbackError = _getCallbackError;

    return {
      getUsers: _getUsers,
      getRoles: _getRoles,
      criarUsuario: _criarUsuario,
      consultarPaginado: _consultarPaginado,
      editarUsuario: _editarUsuario,
      excluirUsuario: _excluirUsuario
    }

    // ======================================

    function _getHeaders(usuarioSelecionado) {
      return {
        headers: helper.codificarAutenticacao(usuarioSelecionado)
      };
    }

    function _getUsers(cb, cbError) {
      return $http.get(`${vm.BASE_URL}/user`).then(cb).catch(vm._getCallbackError(cbError));
    }

    function _getRoles(cb, cbError) {
      return $http.get(`${vm.BASE_URL}/user/roles`).then(cb).catch(vm._getCallbackError(cbError));
    }

    function _criarUsuario(usuario, usuarioSelecionado, cb, cbError) {
      return $http.post(`${vm.BASE_URL}/user`, usuario, { ...vm._getHeaders(usuarioSelecionado) }).then(cb).catch(vm._getCallbackError(cbError));
    }

    function _editarUsuario(usuario, usuarioSelecionado, cb, cbError) {
      return $http.put(`${vm.BASE_URL}/user`, usuario, { ...vm._getHeaders(usuarioSelecionado) }).then(cb).catch(vm._getCallbackError(cbError));
    }

    function _consultarPaginado(usuarioSelecionado, filtro, cb, cbError) {
      return $http.get(`${vm.BASE_URL}/user/paginado`, { params: filtro, ...vm._getHeaders(usuarioSelecionado) }).then(cb).catch(vm._getCallbackError(cbError));
    }

    function _excluirUsuario(id, usuarioSelecionado, cb, cbError) {
      return $http.delete(`${vm.BASE_URL}/user/${id}`, { ...vm._getHeaders(usuarioSelecionado) }).then(cb).catch(vm._getCallbackError(cbError));
    }

    function _getCallbackError(cbError) {
      return cbError || constantes.CALLBACK_ERROR;
    }

  }


})();