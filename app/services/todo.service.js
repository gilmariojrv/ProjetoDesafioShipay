(function () {
  "use strict";

  angular.module('todoApp')
    .factory('todoService', todoService);

  todoService.$inject = ['$http', 'constantes', 'helperFactory'];

  function todoService($http, constantes, helper) {
    var vm = this;
    vm.BASE_URL = constantes.BASE_URL;
    vm._getHeaders = _getHeaders;
    vm._getCallbackError = _getCallbackError;

    return {
      getTodos: _getTodos,
      criarTodo: _criarTodo,
      editarTodo: _editarTodo,
      editarStatusTodo: _editarStatusTodo,
      excluirTodo: _excluirTodo,
      getTodosAgrupados: _getTodosAgrupados,
      getHistoricoTodo: _getHistoricoTodo
    }

    // ======================================

    function _getHeaders(usuarioSelecionado) {
      return {
        headers: helper.codificarAutenticacao(usuarioSelecionado)
      };
    }

    function _getTodos(cb, cbError) {
      return $http.get(`${vm.BASE_URL}/todo`).then(cb).catch(vm._getCallbackError(cbError));
    }

    function _getHistoricoTodo(filtro, cb, cbError) {
      return $http.get(`${vm.BASE_URL}/status/paginado`, { params: filtro }).then(cb).catch(vm._getCallbackError(cbError));
    }

    function _getTodosAgrupados(cb, cbError) {
      return $http.get(`${vm.BASE_URL}/todo/agrupado`).then(cb).catch(vm._getCallbackError(cbError));
    }

    function _criarTodo(todo, usuarioSelecionado, cb, cbError) {
      return $http.post(`${vm.BASE_URL}/todo`, todo, { ...vm._getHeaders(usuarioSelecionado) }).then(cb).catch(vm._getCallbackError(cbError));
    }

    function _editarTodo(usuario, usuarioSelecionado, cb, cbError) {
      return $http.put(`${vm.BASE_URL}/todo`, usuario, { ...vm._getHeaders(usuarioSelecionado) }).then(cb).catch(vm._getCallbackError(cbError));
    }

    function _editarStatusTodo(idTodo, idNovoStatus, usuarioSelecionado, cb, cbError) {
      return $http.put(`${vm.BASE_URL}/todo/${idTodo}/${idNovoStatus}`, null, { ...vm._getHeaders(usuarioSelecionado) }).then(cb).catch(vm._getCallbackError(cbError));
    }

    function _excluirTodo(id, usuarioSelecionado, cb, cbError) {
      return $http.delete(`${vm.BASE_URL}/todo/${id}`, { ...vm._getHeaders(usuarioSelecionado) }).then(cb).catch(vm._getCallbackError(cbError));
    }

    function _getCallbackError(cbError) {
      return cbError || constantes.CALLBACK_ERROR;
    }

  }


})();