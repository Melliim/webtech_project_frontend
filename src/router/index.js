import { createRouter, createWebHistory } from 'vue-router'
import About from "@/views/About.vue";
import Home from "@/views/Home.vue";
import Categories from "@/views/Categories.vue";

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/categories',
    name: 'Categories',
    component: Categories
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  linkActiveClass: 'active',
  routes
})

export default router
