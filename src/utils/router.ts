import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("./views/Home.vue"),
  },
  {
    path: "/education/list",
    name: "EList",
    component: () => import("./views/education/List.vue"),
  },
  {
    path: "/education/put",
    name: "EPut",
    component: () => import("./views/education/Post.vue"),
  },
  {
    path: "/graduation/list",
    name: "GList",
    component: () => import("./views/graduation/List.vue"),
  },
  {
    path: "/graduation/put",
    name: "GPut",
    component: () => import("./views/graduation/Post.vue"),
  },
  {
    path: "/books/list",
    name: "BList",
    component: () => import("./views/books/List.vue"),
  },
  {
    path: "/books/put",
    name: "BPut",
    component: () => import("./views/books/Post.vue"),
  },
  {
    path: "/videos/list",
    name: "VList",
    component: () => import("./views/videos/List.vue"),
  },
  {
    path: "/videos/put",
    name: "VPut",
    component: () => import("./views/videos/Post.vue"),
  },
  {
    path: "/journey/list",
    name: "JList",
    component: () => import("./views/journey/List.vue"),
  },
  {
    path: "/journey/put",
    name: "JPut",
    component: () => import("./views/journey/Post.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
