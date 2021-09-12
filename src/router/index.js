import { createRouter, createWebHistory } from "vue-router";
import PersonDetail from 'Components/PersonDetail.vue';

const routes = [
  {
    path : "/",
    name: "Home",
    component: null
  },
  {
    path: "/persondetail/:id",
    name: "PersonDetail",
    component: PersonDetail,
  },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "Views/About.vue"),
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
