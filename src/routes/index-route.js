import { createRouter, createWebHistory } from "vue-router";
import { useAuthUserState } from "../stores/auth";

import Login from "@pages/Login.vue";
import Register from "@pages/Register.vue";
import Home from "@pages/Home.vue";
import About from "../pages/About.vue";
import Page from "../pages/Page.vue";
import NotFound from "../pages/NotFound.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // Маршруты ошибок
    {
      path: "/404",
      name: "PageNotFound",
      component: NotFound,
      meta: { requiresAuth: false },
    },
    { path: "/:pathMatch(.*)*", redirect: "/404" },

    // Общие маршруты
    { path: "/", name: "Home", component: Home },
    { path: "/about", name: "About", component: About },

    // Маршруты для не авторизированных пользователей
    {
      path: "/login",
      name: "Login",
      component: Login,
      meta: { requiresAuth: false },
    },
    {
      path: "/register",
      name: "Register",
      component: Register,
      meta: { requiresAuth: false },
    },

    // Маршруты для авторизированных пользователей
    {
      path: "/personal-page",
      name: "PersonalPage",
      component: Page,
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthUserState();
  const isAuthenticated = authStore.isAuthenticated;

  if (to.meta.requiresAuth && !isAuthenticated) {
    return next("/login");
  }

  if (to.meta.requiresGuest && isAuthenticated) {
    return next("/");
  }

  next();
});

export { router };
