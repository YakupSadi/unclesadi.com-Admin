import { createRouter, createWebHistory } from 'vue-router'
import axios from 'axios'

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
            path: '/content/:id',
            name: 'detailContent',
            component: () => import('../views/DetailView.vue'),
            meta: { 
                title: 'Detail Content' 
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
    axios.post('http://localhost:4000/api/v1/auth', {}, { 
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then((res) => {
        if (to.name !== 'login') {
            next()
        } else {
            next('/')
        }
    })
    .catch((err) => {
        if (to.name !== 'login') {
            next('/login')
        } else {
            next()
        }
    })
})


export default router