<template>
  <div>
    <h1>Event Listing</h1>
    <EventCard v-for="event in events.data" :key="event.id" :event="event" />

    <router-link
      v-if="page !== 1"
      :to="{ name: 'event-list', query: { page: page - 1 } }"
      rel="prev"
    >
      Prev Page
    </router-link>

    <span v-if="page !== 1 && !isLastPage"> | </span>

    <router-link
      v-if="!isLastPage"
      :to="{ name: 'event-list', query: { page: page + 1 } }"
      rel="next"
    >
      Next Page
    </router-link>
  </div>
</template>

<script>
import { mapState } from "vuex";
import EventCard from "@/components/EventCard.vue";

export default {
  components: {
    EventCard,
  },
  mounted() {
    this.$store.dispatch("fetchEvents", { perPage: 3, page: this.page });
  },
  computed: {
    page() {
      return parseInt(this.$route.query.page) || 1;
    },
    isLastPage() {
      let totalInPage = this.page * 3;
      let totalEvent = this.$store.state.events.count;
      if (totalInPage < totalEvent) return false;
      return true;
    },
    ...mapState(["events"]),
  },
  // Second way to get events when query changes
  // watch: {
  //   page() {
  //     this.$store.dispatch("fetchEvents", { perPage: 3, page: this.page });
  //   },
  // },
};
</script>
