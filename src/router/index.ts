import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/IndexView.vue')
  }, 
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/AdminView.vue'),
    redirect: '/admin/new',
    children: [{
      name: 'new-abstracts',
      path: 'new',
      component: () => import('../components/admin/NewAbstracts.vue')
    }, {
      name: 'indexed-abstracts',
      path: 'index',
      component: () => import('../components/admin/IndexedAbstracts.vue')
    }, {
      name: 'archived-abstracts',
      path: 'archive',
      component: () => import('../components/admin/ArchivedAbstracts.vue')
    }, {
        name: 'edit-abstract',
        path: 'edit/:responseID',
        component: () => import('../components/admin/EditAbstract.vue'),
        props: true
      }
    ],
  },

  { path: '/:pathMatch(.*)*', redirect: '/' }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
