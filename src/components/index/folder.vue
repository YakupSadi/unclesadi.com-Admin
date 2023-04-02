<script>
import axios from 'axios'


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
                background : this.background
            },
        }
    },

    methods: {
        deleteFolder() {
            axios.delete(`http://localhost:4000/api/v1/folder/${this.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((res) => {
                const data     = this.$store.state.folders
                const index    = data.findIndex(item => item._id === this.id);
                const selected = document.querySelectorAll('.folder')[index]

                console.log('Folder Deleted')
                selected.classList.add('fadeOut')
            })
            .catch((err) => {
                console.log(err)
            })
        },

        updateFolder() {
            axios.put(`http://localhost:4000/api/v1/folder/${this.id}`, this.update, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((res) => {
                console.log('Folder Updated')
                this.$store.commit('getAllFolder')
            })
            .catch((err) => {
                console.log(err.response.data.msg)
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
                <font-awesome-icon 
                    icon="fa-solid fa-check"
                    @click="updateFolder"
                    class="icon"
                />
            </button>

            <button>
                <font-awesome-icon 
                    icon="fa-solid fa-trash"
                    @click="deleteFolder" 
                    class="icon"
                />
            </button>
        </div>   
    </div>    
</template>

<style scoped>
    .folder {
        width: 50rem;
        color: #fff;
        display: flex;
        padding: 1rem;
        margin: 1rem 0;
        flex-wrap: wrap;
        font-size: 1.4rem;
        height: fit-content;
        align-items: center;
        border: 3px solid #FFBF00;
        justify-content: space-between;
    }

    /* item 1 */
    .folder > .item:nth-child(1) {
        width: 100%;
        height: 4rem;
        border-radius: 3px;
        margin-bottom: 1rem;
        background-color: #111827;
        border-right: 3px solid #fff;
    }
    .folder > .item:nth-child(1) > input {
        height: 100%;
        padding: 0 1rem;
    }
    .folder > .item:nth-child(1) > input:focus {
        outline: 3px solid #fff;
    }

    /* item 2 */
    .folder > .item:nth-child(2) {
        width: 7rem;
        height: 4rem;
        margin: 0 1rem;
    }
    .folder > .item:nth-child(2) > input{
        height: 100%;
    }

    /* item 3 */
    .folder > .item:nth-child(3) {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .folder > .item:nth-child(3) > button {
        margin: 0 .5rem;
        font-size: 1.4rem;
        border-radius: 3px;
        height: fit-content;
        padding: .2rem .6rem;
    }
    .folder > .item:nth-child(3) > button:nth-child(1) {
        background-color: #10A19D;
    }
    .folder > .item:nth-child(3) > button:nth-child(2) {
        background-color: #a52a2a;
    }


    /* Animation */
    .fadeOut {
        display: none;
    }


    /* Media Query */
    @media (min-width: 36em) { 
        .folder {
            margin: 1rem;
        }
    }

    @media (min-width: 48em) { 
        .folder {
            flex-wrap: nowrap;
            justify-content: center;
        }

        /* item 1 */
        .folder > .item:nth-child(1) {
            margin-bottom: 0;
        }
    }
</style>