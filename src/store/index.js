import Vue from "vue";
import Vuex from "vuex";
import EventService from "@/services/EventService.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0,
    user: {
      id: "Kevin_Carlsen",
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
    events: {
      data: [],
      count: 0,
    },
    event: {},
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

  mutations: {
    INCREMENT_COUNT(state, payload) {
      state.count += payload;
    },
    ADD_EVENT(state, event) {
      state.events.data.push(event);
      ++state.events.count;
    },
    SET_EVENTS(state, { data, count }) {
      state.events.data = data;
      state.events.count = +count;
    },
    SET_EVENT(state, event) {
      state.event = event;
    },
  },
  actions: {
    /**
     * REVIEW:
     * Frist Arg is a Context object, (contains all the properties on the vuex store such as 'state', 'getters', 'commit)
     * Second Arg is the payload
     *
     */
    updateCount({ commit }, payload) {
      commit("INCREMENT_COUNT", payload);
    },
    async createEvent({ commit }, event) {
      try {
        await EventService.createEvent(event);
        commit("ADD_EVENT", event);
      } catch (err) {
        console.log(err);
      }
    },
    fetchEvents({ commit }, { perPage, page }) {
      EventService.getEvents(perPage, page)
        .then((response) => {
          commit("SET_EVENTS", {
            data: response.data,
            count: response["headers"]["x-total-count"],
          });
        })
        .catch((err) => console.log(err));
    },
    fetchEvent({ commit, getters }, id) {
      let event = getters.getEventById(id);
      if (event) {
        commit("SET_EVENT", event);
      } else {
        EventService.getEvent(id)
          .then((response) => {
            commit("SET_EVENT", response.data);
          })
          .catch((err) => console.log(err));
      }
    },
  },
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

    getEventById: (state) => (id) =>
      state.events.data.find((event) => event.id === id),
  },
});
