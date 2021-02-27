(function () {
  'use strict';

  angular.module('todoApp')
    .controller('homeController', homeController);

  homeController.$inject = ['constantes', 'userService', 'todoService', 'helperFactory'];

  function homeController(constantes, userService, todoService, helperFactory) {
    var vm = this;

    /* ***************    INIT VARIÁVEIS    *********************************** */
    vm.loadingCards = false;
    vm.cards = [];
    vm.users = [];
    vm.permissoes = [];
    vm.usuario = {};
    vm.usuarioSelecionado = null;
    vm.constantes = constantes;
    vm.isEdicao = false;
    vm.isEdicaoTodo = false;
    vm.totalTarefas = 0;
    vm.todoSelecionado = null;
    vm.todo = {
      nome: ''
    }
    vm.paginador = {
      filtro: { pageNumber: 0, pageSize: 10 },
      total: 1,
      paginas: 1,
      resultados: [],
      loading: false
    }
    vm.paginadorHistorico = {
      filtro: { pageNumber: 0, pageSize: 10 },
      total: 1,
      paginas: 1,
      resultados: [],
      loading: false
    }

    /* ***************    INDICE FUNÇÕES    **************** */
    vm.init = init;
    vm.dragEvent = dragEvent;
    vm.drop = drop;
    vm.allowDrop = allowDrop;
    vm.buscarUsuarios = buscarUsuarios;
    vm.submitUser = submitUser;
    vm.clearUsuario = clearUsuario;
    vm.buscarRoles = buscarRoles;
    vm.consultarPaginado = consultarPaginado;
    vm.paginar = paginar;
    vm.paginaAnterior = paginaAnterior;
    vm.proximaPagina = proximaPagina;
    vm.excluirUsuario = excluirUsuario;
    vm.prepararEdicao = prepararEdicao;
    vm.abrirTableModal = abrirTableModal;
    vm.buscarTarefas = buscarTarefas;
    vm.clearTodo = clearTodo;
    vm.submitTodo = submitTodo;
    vm.alterarStatusTodo = alterarStatusTodo;
    vm.consultarHistorico = consultarHistorico;
    vm.consultarHistoricoPaginado = consultarHistoricoPaginado;
    vm.paginarHistorico = paginarHistorico;
    vm.paginaAnteriorHistorico = paginaAnteriorHistorico;
    vm.proximaPaginaHistorico = proximaPaginaHistorico;
    vm.prepararEdicaoTodo = prepararEdicaoTodo;
    vm.excluirTodo = excluirTodo;

    /* ***************    FUNÇÕES    ******************************** */

    function init() {
      $('#novoUserModal').on('hidden.bs.modal', vm.clearUsuario);
      $('#todoModal').on('hidden.bs.modal', vm.clearTodo);
      vm.cards = helperFactory.criarCards();
      vm.buscarUsuarios();
      vm.buscarTarefas();
      vm.buscarRoles();
    }

    function consultarPaginado() {
      vm.paginador.loading = true;
      userService.consultarPaginado(vm.usuarioSelecionado, vm.paginador.filtro, ({ data }) => {
        vm.paginador.resultados = data.lista;
        vm.paginador.paginas = data.paginas;
        vm.paginador.total = data.total;
        vm.paginador.loading = false;
      });
    }

    function consultarHistorico(todo) {
      vm.todoSelecionado = todo;
      $('#historicoModal').modal('show');
      vm.consultarHistoricoPaginado();
    }

    function consultarHistoricoPaginado() {
      vm.paginadorHistorico.loading = true;
      todoService.getHistoricoTodo({ id: vm.todoSelecionado.id, ...vm.paginadorHistorico.filtro }, ({ data }) => {
        vm.paginadorHistorico.resultados = data.lista;
        vm.paginadorHistorico.paginas = data.paginas;
        vm.paginadorHistorico.total = data.total;
        vm.paginadorHistorico.loading = false;
      });
    }

    function paginarHistorico(index) {
      vm.paginadorHistorico.filtro.pageNumber = index;
      vm.consultarHistoricoPaginado();
    }

    function paginaAnteriorHistorico() {
      vm.paginadorHistorico.filtro.pageNumber--;
      vm.consultarHistoricoPaginado();
    }

    function proximaPaginaHistorico() {
      vm.paginadorHistorico.filtro.pageNumber++;
      vm.consultarHistoricoPaginado();
    }

    function alterarStatusTodo(idNovoStatus, idTodo) {
      todoService.editarStatusTodo(idTodo, idNovoStatus, vm.usuarioSelecionado, () => vm.buscarTarefas());
    }

    function prepararEdicaoTodo(todo) {
      vm.isEdicaoTodo = true;
      vm.todo = { ...todo };
      $('#todoModal').modal('show');
    }

    function excluirTodo(id) {
      todoService.excluirTodo(id, vm.usuarioSelecionado, () => vm.buscarTarefas());
    }

    function buscarTarefas() {
      vm.loadingCards = true;
      todoService.getTodosAgrupados(({ data }) => {
        vm.cards.forEach(card => card.registros = []);
        vm.totalTarefas = data.total;
        Object.entries(data.tarefas).forEach(entry => 
          vm.cards.find(card => card.idStatus === +entry[0]).registros = [...entry[1]]
        );
        vm.loadingCards = false;
      });
    }

    function submitTodo() {
      var fn = vm.isEdicaoTodo ? todoService.editarTodo : todoService.criarTodo;

      fn(vm.todo, vm.usuarioSelecionado, () => {
        vm.buscarTarefas();

        vm.isEdicaoTodo = false;
        vm.clearTodo();
        $('#todoModal').modal('hide');
      });
    }

    function clearTodo() {
      vm.isEdicaoTodo = false;
      vm.todo = {};
    }

    function abrirTableModal() {
      vm.consultarPaginado();
    }

    function paginar(index) {
      vm.paginador.filtro.pageNumber = index;
      vm.consultarPaginado();
    }

    function paginaAnterior() {
      vm.paginador.filtro.pageNumber--;
      vm.consultarPaginado();
    }

    function proximaPagina() {
      vm.paginador.filtro.pageNumber++;
      vm.consultarPaginado();
    }

    function submitUser() {
      var fn = vm.isEdicao ? userService.editarUsuario : userService.criarUsuario;

      vm.usuario.permissao = constantes.ENUM_ROLES.get(vm.usuario.idRole).role;

      fn(vm.usuario, vm.usuarioSelecionado, () => {
        vm.buscarUsuarios();

        vm.isEdicao = false;
        vm.clearUsuario();
        vm.consultarPaginado();
        $('#novoUserModal').modal('hide');
        $('#tableModal').modal('show');
      });
    }

    function prepararEdicao(usuario) {
      vm.isEdicao = true;
      vm.usuario = { ...usuario };
    }

    function clearUsuario() {
      vm.isEdicaoTodo = false;
      vm.usuario = {};
    }

    function buscarUsuarios() {
      userService.getUsers(({ data }) => {
        vm.users = data;
        if (vm.usuarioSelecionado) {
          vm.usuarioSelecionado = vm.users.find(u => u.id === vm.usuarioSelecionado.id);
        } else {
          vm.usuarioSelecionado = data[0];
        }
      });
    }

    function excluirUsuario(id) {
      userService.excluirUsuario(id, vm.usuarioSelecionado, () => vm.consultarPaginado());
    }

    function buscarRoles() {
      userService.getRoles(({ data }) => {
        vm.permissoes = data;
      });
    }

    function dragEvent(event, value) {
      event.dataTransfer.setData('tarefaDrag', JSON.stringify(value));
    }

    function drop(event, targetCard) {
      var data = JSON.parse(event.dataTransfer.getData('tarefaDrag'));
      if (targetCard !== data.idStatus) {
        vm.alterarStatusTodo(targetCard, data.id);
      }
    }

    function allowDrop(event) {
      event.preventDefault();
    }
  }

})();