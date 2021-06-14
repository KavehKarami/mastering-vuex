import Vue from "vue";
import VueRouter from "vue-router";
import EventList from "../views/EventList.vue";
import EventCreate from "../views/EventCreate.vue";
import EventShow from "../views/EventShow.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "event-list",
    component: EventList,
  },
  {
    path: "/event/create",
    name: "event-create",
    component: EventCreate,
  },
  {
    path: "/event/:id",
    name: "event-show",
    component: EventShow,
    props: true,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// REVIEW: user beforeEach middleware fix /event/... components
// REVIEW: for solve without this expression write "/event/:id" route below the "/event/create"

// router.beforeEach((to, from, next) => {
//   if (to.path === "/event/create" && to.name === "event-show")
//     next({ name: "event-create" });
//   else next();
// });

export default router;
