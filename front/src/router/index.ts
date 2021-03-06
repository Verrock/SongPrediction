import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    name: "predictionView",
    component: () => import("../views/PredictionView.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue")
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
