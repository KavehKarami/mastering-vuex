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
  async createEvent({ commit, dispatch }, event) {
    try {
      await EventService.createEvent(event);
      commit("ADD_EVENT", event);
      const notification = {
        type: "success",
        message: "Your event has been created!",
      };
      dispatch("notification/add", notification, { root: true });
    } catch (err) {
      const notification = {
        type: "error",
        message: "There was a problem creating your event: " + err.message,
      };
      dispatch("notification/add", notification, { root: true });
      // REVIEW for not going into another router
      throw err;
    }
  },
  fetchEvents({ commit, dispatch }, { perPage, page }) {
    EventService.getEvents(perPage, page)
      .then((response) => {
        commit("SET_EVENTS", {
          data: response.data,
          count: response["headers"]["x-total-count"],
        });
      })
      .catch((err) => {
        const notification = {
          type: "error",
          message: "There was a problem fetching an events: " + err.message,
        };
        dispatch("notification/add", notification, { root: true });
      });
  },
  fetchEvent({ commit, dispatch, getters }, id) {
    let event = getters.getEventById(id);
    if (event) {
      commit("SET_EVENT", event);
    } else {
      EventService.getEvent(id)
        .then((response) => {
          commit("SET_EVENT", response.data);
        })
        .catch((err) => {
          const notification = {
            type: "error",
            message: "There was a problem fetching an event: " + err.message,
          };
          dispatch("notification/add", notification, { root: true });
        });
    }
  },
};

export const getters = {
  getEventById: (state) => (id) =>
    state.events.data.find((event) => event.id === id),
};
