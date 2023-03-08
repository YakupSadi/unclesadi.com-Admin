import { createRouter, createWebHistory } from 'vue-router'
//import store from '../store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: { 
        title: 'Uncle Sadi' 
      }
    },
    {
      path: '/content',
      name: 'content',
      component: () => import('../views/ContentView.vue'),
      meta: { 
        title: 'Content' 
      }
    },
    {
      path: '/createContent',
      name: 'createContent',
      component: () => import('../views/CreateContentView.vue'),
      meta: { 
        title: 'Create Content' 
      }
    },
    {
      path: '/content/:slug',
      name: 'contentDetail',
      component: () => import('../views/ContentView.vue'),
      meta: { 
        title: 'Content Detail' 
      }
    },
    {
      path: '/folders',
      name: 'folders',
      component: () => import('../views/FolderView.vue'),
      meta: { 
        title: 'Folders' 
      }
    },
    {
      path: '/files',
      name: 'files',
      component: () => import('../views/FileView.vue'),
      meta: { 
        title: 'Files' 
      }
    },
    { 
      path: '/login', 
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: { 
        title: 'Login' 
      }
    },
    { 
      path: '/:pathMatch(.*)*', 
      name: '404',
      component: () => import('../views/404.vue'),
      meta: { 
        title: '404' 
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  next()

/*
  const token = store.state.authToken
  
  if (to.name !== 'login' && !token) {
    next({ path: '/login' });
  } 
  else if (to.name ==='login' && token) {
    next({ path: from.path });
  }
  else {
    document.title = `${ to.meta.title }`
    next();
  }
*/
})

export default router