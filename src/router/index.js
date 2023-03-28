import axios                              from 'axios'
import { createRouter, createWebHistory } from 'vue-router'
import LoginLayout                        from '../layouts/LoginLayout.vue'
import DefaultLayout                      from '../layouts/DefaultLayout.vue'


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),

    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../views/HomeView.vue'),
            meta: { 
                title  : 'Uncle Sadi',
                layout : DefaultLayout
            }
        },
        {
            path: '/content',
            name: 'content',
            component: () => import('../views/ContentView.vue'),
            meta: { 
                title  : 'Content',
                layout : DefaultLayout
            }
        },
        {
            path: '/createContent',
            name: 'createContent',
            component: () => import('../views/CreateContentView.vue'),
            meta: { 
                title  : 'Create Content',
                layout : DefaultLayout
            }
        },
        {
            path: '/content/:id',
            name: 'detailContent',
            component: () => import('../views/DetailView.vue'),
            meta: { 
                title  : 'Detail Content',
                layout : DefaultLayout
            }
        },
        {
            path: '/folders',
            name: 'folders',
            component: () => import('../views/FolderView.vue'),
            meta: { 
                title  : 'Folders',
                layout : DefaultLayout
            }
        },
        {
            path: '/files',
            name: 'files',
            component: () => import('../views/FileView.vue'),
            meta: { 
                title  : 'Files',
                layout : DefaultLayout
            }
        },
        { 
            path: '/login', 
            name: 'login',
            component: () => import('../views/LoginView.vue'),
            meta: { 
                title  : 'Login',
                layout : LoginLayout
            }
        },
        { 
            path: '/:pathMatch(.*)*', 
            name: '404',
            component: () => import('../views/404.vue'),
            meta: { 
                title  : '404',
                layout : LoginLayout
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