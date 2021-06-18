import EventService from "../../services/EventService";

export const namespaced = true;

export const state = {
  events: {
    data: [],
    count: 0,
  },
  event: {},
};

export const mutations = {
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
};

export const actions = {
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
};

export const getters = {
  getEventById: (state) => (id) =>
    state.events.data.find((event) => event.id === id),
};
