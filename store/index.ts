import { createStore } from "vuex";

interface Todo {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  place: string;
  completed: boolean;
}

interface State {
  todos: Todo[];
}

const store = createStore<State>({
  state: {
    todos: JSON.parse(localStorage.getItem("todos") || "[]"),
  },
  mutations: {
    ADD_TODO(state, todo: Todo) {
      state.todos.push(todo);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    EDIT_TODO(state, updatedTodo: Todo) {
      const index = state.todos.findIndex((todo) => todo.id === updatedTodo.id);
      if (index !== -1) {
        state.todos.splice(index, 1, updatedTodo);
        localStorage.setItem("todos", JSON.stringify(state.todos));
      }
    },
    DELETE_TODO(state, todoId: number) {
      state.todos = state.todos.filter((todo) => todo.id !== todoId);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    TOGGLE_TODO_STATUS(state, todoId: number) {
      const todo = state.todos.find((todo) => todo.id === todoId);
      if (todo) {
        todo.completed = !todo.completed;
        localStorage.setItem("todos", JSON.stringify(state.todos));
      }
    },
    SORT_TODOS(state, sortBy: string) {
      if (sortBy === "title") {
        state.todos.sort((a, b) => a.title.localeCompare(b.title));
      } else if (sortBy === "date") {
        state.todos.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
      }
    },
  },
  actions: {
    addTodo({ commit }, todo: Todo) {
      commit("ADD_TODO", todo);
    },
    editTodo({ commit }, updatedTodo: Todo) {
      commit("EDIT_TODO", updatedTodo);
    },
    deleteTodo({ commit }, todoId: number) {
      commit("DELETE_TODO", todoId);
    },
    toggleTodoStatus({ commit }, todoId: number) {
      commit("TOGGLE_TODO_STATUS", todoId);
    },
    initializeStore({ commit }) {
      const todos = JSON.parse(localStorage.getItem("todos") || "[]");
      commit("SET_TODOS", todos);
    },
    sortTodos({ commit }, sortBy: string) {
      commit("SORT_TODOS", sortBy);
    },
  },
  getters: {
    getTodos: (state) => state.todos,
    getTodoById: (state) => (id: number) =>
      state.todos.find((todo) => todo.id === id),
    getFilteredTodos: (state) => (filter: string) => {
      if (filter === "completed") {
        return state.todos.filter((todo) => todo.completed);
      } else if (filter === "pending") {
        return state.todos.filter((todo) => !todo.completed);
      } else {
        return state.todos;
      }
    },
    getFilteredAndSortedTodos: (state) => (filter: string, sortBy: string) => {
      let todos = state.todos;
      if (filter === "completed") {
        todos = todos.filter((todo) => todo.completed);
      } else if (filter === "pending") {
        todos = todos.filter((todo) => !todo.completed);
      }
      if (sortBy === "title") {
        todos = todos.sort((a, b) => a.title.localeCompare(b.title));
      } else if (sortBy === "date") {
        todos = todos.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
      }
      return todos;
    },
  },
});

export default store;
