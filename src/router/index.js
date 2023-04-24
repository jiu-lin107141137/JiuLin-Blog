import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ArticleView from '../views/ArticleView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      alias: ['/home'],
    },
    {
      path: '/article/:name',
      name: 'article',
      component: ArticleView
    },
    // { 
    //   path: "*", 
    //   redirect: '/'
    // }
  ]
})

export default router
