<script>
import axios from 'axios'
import store from '../../store'

export default {
    props: [
        'id',
        'title',
        'background'
    ],
    data() {
        return {
            update: {
                title      : this.title,
                background : this.background,
                token      : localStorage.getItem('token')
            },
        }
    },
    methods: {
        deleteFolder() {
            axios.delete(`http://localhost:4000/api/v1/folder/${this.id}`)
            .then((res) => {
                const data     = store.state.folders
                const index    = data.findIndex(item => item._id === this.id);
                const selected = document.querySelectorAll('.folder')[index]

                selected.classList.add('fadeOut')
                console.log('Folder Deleted')
            })
            .catch((err) => {
                console.log(err)
            })
        },
        updateFolder() {
            axios.put(`http://localhost:4000/api/v1/folder/${this.id}`, this.update)
            .then((res) => {
                console.log('Folder Updated')
                store.commit('getAllFolder')
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }
}
</script>

<template>
    <div class="folder">
        <div class="item">
            <input type="text" v-model="update.title" required>
        </div>

        <div class="item">
            <input type="color" v-model="update.background" required>
        </div>

        <div class="item">
            <button>
                <font-awesome-icon icon="fa-solid fa-check" class="icon" @click="updateFolder" />
            </button>
            <button>
                <font-awesome-icon icon="fa-solid fa-trash" class="icon" @click="deleteFolder" />
            </button>
        </div>   
    </div>    
</template>

<style scoped>
    .folder {
        gap: 1rem;
        color: #fff;
        display: grid;
        margin-bottom: 1rem;
        grid-auto-columns: 1fr;
        grid-template-columns: repeat(4, 1fr);
    }
    .folder > .item > input {
        border: 3px solid transparent;
    }
    .folder > .item > input:focus {
        outline: none;
        border: 3px solid #fff;
    }
    .folder > .item:nth-child(1) { 
        font-size: 1.2rem;
        grid-column: 1 / 3; 
    }
    .folder > .item:nth-child(2) { 
        display: flex;
        grid-column: 3 / 4; 
        align-items: center;
        justify-content: center;
        border: 2px solid #fff;
    }
    .folder > .item:nth-child(3) {
        display: flex;
        grid-column: 4 / 5;
        justify-content: space-around;
    }

    /**/
    .fadeOut {
        display: none;
    }
</style>