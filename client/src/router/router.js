import { createRouter, createWebHistory } from "vue-router";
import axios from "axios";

import accueil_p from "../components/accueil_p.vue";
import user from "../components/user_p.vue";
import message from "../components/message_v.vue";
import favoris from "../components/favoris_v.vue";
import creer_compte from "../components/creer_compte";
import p_connecte from "../components/profil_connecte.vue";

const routes = [
  {
    path: "/",
    name: "accueil",
    component: accueil_p,
  },
  {
    path: "/connecte",
    name: "connecte",
    component: p_connecte,
    meta: { requiresAuth: true },
  },
  {
    path: "/user_p",
    name: "user_p",
    component: user,
  },
  {
    path: "/message",
    name: "message",
    component: message,
    meta: { requiresAuth: true },
  },
  {
    path: "/favoris",
    name: "favoris",
    component: favoris,
    meta: { requiresAuth: true },
  },
  {
    path: "/creer_compte",
    name: "creer_compte",
    component: creer_compte,
  },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name === "user_p") {
    axios({
      method: "POST",
      withCredentials: true,
      url: "http://localhost:5001/verify",
    })
      .then((response) => {
        if (response.data.data) {
          next({ name: "connecte" });
        } else {
          next();
        }
      })
      .catch(() => {
        next();
      });
  } else if (to.matched.some((record) => record.meta.requiresAuth)) {
    axios({
      method: "POST",
      withCredentials: true,
      url: "http://localhost:5001/verify",
    })
      .then((response) => {
        if (response.data.data) {
          next();
        } else {
          next({ name: "user_p" });
        }
      })
      .catch(() => {
        next({ name: "user_p" });
      });
  } else {
    next();
  }
});

export default router;
