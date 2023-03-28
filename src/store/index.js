import { createStore } from 'vuex'
import axios           from 'axios'
import router          from "../router" 


export default createStore({
    state: {
        files      : null,
        folders    : null,
        createPage : false,

        alert      : false,
        alertMsg   : '',
        alertClr   : ''
    },

    mutations: {
        showAlert(state, payload) {
            state.alert    = true
            state.alertMsg = payload.msg
            state.alertClr = payload.color

            setTimeout(() => {
                state.alert    = false
                state.alertMsg = ''
                state.alertClr = ''
            }, 1000)
        },

        createGlobal(state) {
            state.createPage = !state.createPage
        },

        deleteToken(state) {
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
