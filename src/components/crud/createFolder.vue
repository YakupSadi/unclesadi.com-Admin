<script> 
import axios            from 'axios'
import { mapMutations } from 'vuex'

export default {
    data() {
        return {
            create: {
                title      : null,
                background : "#ffffff"
            }
        }
    },

    methods: {
        createFolder() {
            axios.post('http://localhost:4000/api/v1/folder/createFolder', this.create, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((res) => {
                this.getAllFolder()
                this.$store.commit('createGlobal')
                this.$store.commit('showAlert', { msg: 'folder Created', color: '#008000' })
            })
            .catch((err) => {
                console.log(err)
            })
        },

        ...mapMutations(['getAllFolder'])
    }
}
</script>

<template>
    <div class="create_folder">
        <div class="close_icon">
            <font-awesome-icon 
                icon="fa-solid fa-xmark"
                class="icon" 
                @click="$store.commit('createGlobal')"
            />
        </div>

        <form @submit.prevent="createFolder">
            <input type="text" placeholder="Folder Title" v-model="create.title" required>

            <div class="color">
                <span>Pick a Color: </span>
                <input type="color" v-model="create.background" required>
            </div>
            
            <input type="submit" value="Save">
        </form>
    </div>
</template>

<style scoped>
    .create_folder {
        z-index: 2;
        width: 100%;
        height: 100vh;
        display: flex;
        padding: 0 2rem;
        position: absolute;
        flex-direction: column;
        justify-content: center;
        background-color: rgba(0, 0, 0, 0.736);
    }
    .create_folder > .close_icon {
        margin: 0 auto;
    }
    .create_folder > .close_icon > .icon {
        float: right;
        color: #fff;
        cursor: pointer;
        font-size: 2rem;
        margin-bottom: 1rem;
        background-color: #181818;
    }

    .create_folder > form {
        width: 100%;
        display: flex;
        margin: 0 auto;
        max-width: 25rem;
        align-items: center;
        flex-direction: column;
    }
    .create_folder > form > .color {
        width: 70%;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    .create_folder > form > input {
        color: #fff;
        margin: 1rem 0;
        font-size: 1.2rem;
        padding: .5rem 1rem;
        border: 3px solid #fff;
        background-color: #181818;
    }
    .create_folder > form > input:focus {
        outline: none;
    }
    
    input[type="color"] {
        width: 2.5rem;
        height: 2.5rem;
        cursor: pointer;
        border-radius: 50% 50%;
        border: 3px solid #fff;
    }
    input[type="submit"] {
        cursor: pointer;
    }
</style>