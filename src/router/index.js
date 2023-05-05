import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ArticleView from '../views/ArticleView.vue';
import TagQueryView from '../views/TagQueryView.vue';
import CategoryQueryView from '../views/CategoryQueryView.vue';

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
      component: ArticleView,
    },
    {
      path: '/tags',
      name: 'tagQuery',
      component: TagQueryView,
      props: true,
    },
    {
      path: '/categories',
      name: 'categoryQuery',
      component: CategoryQueryView,
      props: true,
    }
    // { 
    //   path: "*", 
    //   redirect: '/'
    // }
  ]
})

export default router
