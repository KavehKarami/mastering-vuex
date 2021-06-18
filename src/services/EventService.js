import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    Accepts: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  getEvents(perPage, page) {
    return api.get(`/events?_limit=${perPage}&_page=${page}`);
  },
  getEvent(id) {
    return api.get("/events/" + id);
  },
  createEvent(event) {
    return api.post("/events", event);
  },
};
