import { createStore } from 'vuex'
import axios           from 'axios'
import router          from "../router" 

export default createStore({
    state: {
        files      : null,
        folders    : null,
        createPage : false,
        token      : localStorage.getItem('token')
    },

    mutations: {
        createGlobal(state) {
            state.createPage = !state.createPage
        },

        deleteToken(state) {
            axios.post('http://localhost:4000/api/v1/logout', {}, {
                headers: {
                    Authorization: `Bearer ${state.token}`
                }
            })
            .then((res) => {
                localStorage.removeItem('token')
                router.push('/login')
            })
            .catch((err) => {
                console.log(err)
            })
        },
        
        getAllFolder(state) {
            axios.get('http://localhost:4000/api/v1/folder')
            .then((res) => {
                state.folders = res.data.data
            })
            .catch((err) => {
                console.log(err)
            })
        },

        getAllFile(state) {
            axios.get('http://localhost:4000/api/v1/file')
            .then((res) => {
                state.files = res.data.data
            })
            .catch((err) => {
                console.log(err)
            })
        },

        isValid(state) {
            axios.post('http://localhost:4000/api/v1/auth', {}, { 
                headers: {
                    Authorization: `Bearer ${state.token}`
                }
            })
            .then((res) => {
              console.log('Token is Valid')
            })
            .catch((err) => {
                router.push('/login')
            })
        }
    }
})
