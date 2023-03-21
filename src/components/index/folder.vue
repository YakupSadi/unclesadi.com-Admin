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
            axios.put(`http://localhost:4000/api/v1/folder/${this.id}`, this.update,)
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
        padding: 0 .5rem;
        max-width: 30rem;
        margin: 0 1rem 1rem;
        border: 3px solid #fff;
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
    .folder > .item:nth-child(3) > button:nth-child(1) { 
        padding: 0 .5rem;
        background-color: green;
    }
    .folder > .item:nth-child(3) > button:nth-child(2) { 
        padding: 0 .5rem;
        background-color: red;
    }

    /**/
    .fadeOut {
        display: none;
    }

    /**/
    @media (min-width: 36em) { 
        .folder {
            max-width: 14rem;
        }
    }
    @media (min-width: 48em) { 
        .folder {
            max-width: 20rem;
        }
    }
    @media (min-width: 62em) { 
        .folder {
            max-width: 25rem;
        }
    }
</style>