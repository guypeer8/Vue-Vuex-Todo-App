import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

let todoId = 0;

const index = new Vuex.Store({
  state: {
    todos: [],
    showFilters: "all",
    editedTodo: null
  },

  mutations: {
    ADD_TODO(state, todoText) {
      if (state.editedTodo) {
        const editedTodo = getTodoById(state.editedTodo.id);
        editedTodo.text = todoText;
        return (state.editedTodo = null);
      }

      state.todos.push({
        id: todoId++,
        text: todoText,
        completed: false
      });
    },

    DELETE_TODO(state, id) {
      if (state.editedTodo && state.editedTodo.id === id)
        state.editedTodo = null;

      state.todos = state.todos.filter(todo => todo.id !== id);
    },

    TOGGLE_EDIT(state, todo) {
      if (state.editedTodo && state.editedTodo.id === todo.id)
        return (state.editedTodo = null);

      state.editedTodo = todo;
    },

    CLEAR_COMPLETED(state, activeTodos) {
      state.todos = activeTodos;
      state.editedTodo = null;
    },

    CHANGE_FILTER(state, showFilters) {
      state.showFilters = showFilters;
    },

    COMPLETE_TODO(state, todo) {
      getTodoById(todo.id).completed = todo.completed;
    }
  },

  getters: {
    todos: state => state.todos,
    todo: state => state.todo,
    editedTodo: state => state.editedTodo,
    showFilters: state => state.showFilters
  },

  actions: {
    deleteTodo({ commit }, id) {
      commit("DELETE_TODO", id);
    },

    toggleEdit({ commit }, id) {
      const todo = getTodoById(id);
      if (todo.completed) return;
      commit("TOGGLE_EDIT", todo);
    },

    clearCompleted({ commit }) {
      commit("CLEAR_COMPLETED", getActiveTodos());
    },

    changeFilter({ commit }, showFilters) {
      commit("CHANGE_FILTER", showFilters);
    }
  }
});

const getTodoById = todo_id =>
  index.state.todos.find(({ id }) => id === todo_id);

const getActiveTodos = () =>
  index.state.todos.filter(({ completed }) => !completed);

const getCompletedTodos = () =>
  index.state.todos.filter(({ completed }) => completed);

export default index;
