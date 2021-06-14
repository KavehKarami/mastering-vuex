<template>
  <div>
    <h1>Event Listing</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>

<script>
import api from "../services/EventService";
import EventCard from "@/components/EventCard.vue";

export default {
  components: {
    EventCard,
  },
  data() {
    return {
      events: [],
    };
  },
  mounted() {
    api
      .getEvents()
      .then((res) => (this.events = res.data))
      .catch((e) => console.log(e));
  },
};
</script>
