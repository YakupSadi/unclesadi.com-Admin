import { createStore } from 'vuex'
import axios           from 'axios'
import router          from "../router" 


export default createStore({
    state: {
        files      : null,
        folders    : null,

        createPage : false,

        alertMsg   : null,
        alertClr   : null,
        alertBtn   : false
    },

    mutations: {
        triggerAlert(state, payload) {
            state.alertClr = payload.color
            state.alertMsg = payload.message
            state.alertBtn = !state.alertBtn
        },

        createGlobal(state) {
            state.createPage = !state.createPage

            const body = document.querySelector('body')
            if(state.createPage) {
                body.style.overflow = 'hidden'
            }
            else {
                body.style.overflow = ''
            }
        },

        deleteToken() {
            axios.post('http://localhost:4000/api/v1/logout', {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
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
        }
    }
})