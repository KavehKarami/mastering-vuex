import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      id: "asad213",
      name: "Kevin Carlsen",
    },
    categories: [
      "sustainability",
      "nature",
      "animal welfare",
      "housing",
      "education",
      "food",
      "community",
    ],
    todos: [
      { id: 1, text: "...", done: true },
      { id: 2, text: "...", done: false },
      { id: 3, text: "...", done: true },
      { id: 4, text: "...", done: false },
    ],
  },
  /**
   * REVIEW:
   * "mutations" looks like "reducers" in redux, "mutations" are synchronous
   * calling "mutations" with "commit"
   *
   * "actions" looks like "mutations" but "actions" are asynchronous and also in "actions" you can access to "states, getters, commit"
   * calling "actions" with "dispatch"
   *
   * "commit" and "dispatch" in vuex looks like "dispatch" in redux
   *
   * both of "mutations" and "actions" can get "payloads"
   *
   * it's better to use "actions" and call "mutation" inside "actions"
   *
   */

  mutations: {},
  actions: {},
  modules: {},

  // REVIEW: getters looks like a `selectors` in redux
  getters: {
    categoryLength: (state) => state.categories.length,

    // getters into getters:
    // NOTE: only for showing the purpose, it's not a best way
    doneTodos: (state) => state.todos.filter((todo) => todo.done),

    activeTodosCount: (state, getters) =>
      state.todos.length - getters.doneTodos.length,

    // dynamic getters
    findTodo: (state) => (id) => state.todos.find((todo) => todo.id === id),
  },
});
