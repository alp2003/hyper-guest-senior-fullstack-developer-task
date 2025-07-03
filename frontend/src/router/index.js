import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import store from "../store"; 

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/home",
    name: "Home",
    // Lazy loading for better performance
    component: () => import("../views/Home.vue"),
    meta: { roles: ["User", "Editor", "Admin"] },
  },
  {
    path: "/admin",
    name: "Admin",
    component: () => import("../views/AdminView.vue"),
    meta: { roles: ["Admin"] },
  },
  {
    path: "/editor",
    name: "Editor",
    component: () => import("../views/EditorView.vue"),
    meta: { roles: ["Editor", "Admin"] },
  },
   {
    path: "/unauthorized",
    name: "Unauthorized",
    component: () => import("../views/Unauthorized.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const user = store.state.user;

  // Skip auth check for public routes
  if (!to.meta.roles) return next();

  // If not logged in, redirect to login
  if (!user || !user.roles) return next("/");

  // Block deleted users
  if (user.status === "deleted") return next("/unauthorized");

  // Check if the user has at least one required role
  const hasAccess = to.meta.roles.some(role => user.roles.includes(role));
  if (hasAccess) return next();

  return next("/unauthorized");
});

export default router;
