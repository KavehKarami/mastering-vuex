<template>
  <div>
    <h1>Create Event, {{ user.name }}</h1>
    <p>this event was created by {{ user.id }}</p>

    <ul>
      <li v-for="category in categories" :key="category">
        {{ category }}
      </li>
    </ul>

    <p>There are {{ catLength }} categories</p>
    <p>{{ findTodo(3) }}</p>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
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
};
</script>
