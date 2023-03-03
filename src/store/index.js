import { createStore } from 'vuex'
import router from "../router" 
import axios from 'axios'

export default createStore({
    state: {
        createPage : false,
    },
    mutations: {
        createGlobal(state) {
            state.createPage = !state.createPage
        },
        deleteToken() {
            const token = localStorage.getItem('token');

            axios.post('http://localhost:4000/api/v1/logout', { token })
            .then((res) => {
                localStorage.removeItem('token')
                router.push('/login')
            })
            .catch((err) => {
                console.log(err)
            })
        },
        isValid() {
            const token = localStorage.getItem('token')
            
            axios.post('http://localhost:4000/api/v1/auth', { token })
            .then((res) => {
              console.log('Token is Valid')
            })
            .catch((err) => {
                router.push('/login')
            })
        }
    }
})
