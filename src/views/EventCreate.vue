<template>
  <div>
    <h1>Create Event, {{ user.name }}</h1>
    <form @submit.prevent="submitEvent">
      <label>Select a category</label>
      <select v-model="event.category">
        <option v-for="cat in categories" :key="cat">{{ cat }}</option>
      </select>
      <h3>Name & describe your event</h3>
      <div class="field">
        <label>Title</label>
        <input
          v-model="event.title"
          type="text"
          placeholder="Add an event title"
        />
      </div>
      <div class="field">
        <label>Description</label>
        <input
          v-model="event.description"
          type="text"
          placeholder="Add a description"
        />
      </div>
      <h3>Where is your event?</h3>
      <div class="field">
        <label>Location</label>
        <input
          v-model="event.location"
          type="text"
          placeholder="Add a location"
        />
      </div>
      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <datepicker v-model="event.date" placeholder="Select a date" />
      </div>
      <div class="field">
        <label>Select a time</label>
        <select v-model="event.time">
          <option v-for="time in times" :key="time">{{ time }}</option>
        </select>
      </div>
      <input type="submit" class="button -fill-gradient" value="Submit" />
    </form>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import Datepicker from "vuejs-datepicker";

export default {
  components: {
    Datepicker,
  },

  data() {
    const times = [];
    for (let i = 1; i <= 24; i++) {
      times.push(i + ":00");
    }
    return {
      incrementBy: 0,
      event: this.createFreshEvent(),
      times,
    };
  },
  computed: {
    // one way:
    /* userName() {
      return this.$store.state.user.name;
    }, */
    // another way:
    /* ...mapState({
      userID: (state) => state.user.id,
      categories: "categories",
    }), */

    // best way states:
    ...mapState(["user", "categories"]),
    // best way for getters:
    ...mapGetters(["findTodo"]),
    // ------------------------------------------------------
    catLength() {
      // one way:
      /* return this.$store.state.categories.length; */

      // another way:
      return this.$store.getters.categoryLength;
    },
    // getTodo() {
    //   return this.$store.getters.findTodo;
    // },
  },
  methods: {
    incrementCount() {
      // this.$store.commit("INCREMENT_COUNT", this.incrementBy);
      this.$store.dispatch("updateCount", this.incrementBy);
    },
    createFreshEvent() {
      const { user } = this.$store.state;
      const id = Math.floor(Math.random() * 10000000);

      return {
        id: id,
        category: "",
        organizer: user,
        title: "",
        description: "",
        location: "",
        date: "",
        time: "",
        attendees: [],
      };
    },
    async submitEvent() {
      try {
        await this.$store.dispatch("createEvent", this.event);
        this.$router.push({
          name: "event-show",
          params: { id: this.event.id },
        });
        this.event = this.createFreshEvent();
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.field {
  margin-bottom: 24px;
}
</style>
