<template>
  <div class="notification-bar">
    <p>{{ notification.message }}</p>
    <span @click="remove(notification)">X</span>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    notification: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      timeout: null,
    };
  },
  methods: mapActions("notification", ["remove"]),
  mounted() {
    this.timeout = setTimeout(() => this.remove(this.notification), 5000);
  },
  beforeDestroy() {
    clearTimeout(this.timeout);
  },
};
</script>

<style scoped>
.notification-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1em 0 1em;
  padding: 8px 12px;
  background: #cecece;
  border-radius: 5px;
}
</style>
