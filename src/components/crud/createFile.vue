<script>
import axios from 'axios'
import { mapMutations } from 'vuex'

export default {
    data() {
        return {
            create: {
                title  : null,
                image  : null,
                folder : null
            }
        }
    },
    mounted() {
        this.getAllFolder()
    },
    methods: {
        createFile() {
            const formData = new FormData()
            formData.append('title', this.create.title)
            formData.append('image', this.create.image)
            formData.append('folder', this.create.folder)

            axios.post('http://localhost:4000/api/v1/file/createFile', formData)
            .then((res) => {
                console.log('File Created')
            })
            .catch((err) => {
                console.log(err)
            })
        },
        createImage(e) {
            this.create.image = e.target.files[0]
        },
        ...mapMutations(['getAllFolder']),
    }
}
</script>

<template>
    <div class="create_file">
        <div class="close_icon">
            <font-awesome-icon 
                icon="fa-solid fa-xmark"
                class="icon" 
                @click="$store.commit('createGlobal')"
            />
        </div>

        <form @submit.prevent="createFile">
            <input type="text" placeholder="File Title" v-model="create.title" required>
            <select v-model="create.folder">
                <option v-for="(folder, index) in $store.state.folders" :value="folder.title">
                    {{ folder.title}}
                </option>
            </select>
            <input type="file" @change="createImage" name="image" required>
            <input type="submit" value="Save">
        </form>
    </div>    
</template>

<style scoped>
    .create_file {
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
    .create_file > .close_icon > .icon {
        float: right;
        color: #fff;
        cursor: pointer;
        font-size: 2rem;
        margin-bottom: 1rem;
        background-color: #181818;
    }
    .create_file > form {
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
    }
    .create_file > form > input {
        color: #fff;
        margin: 1rem 0;
        font-size: 1.2rem;
        padding: .5rem 1rem;
        border: 3px solid #fff;
        background-color: #181818;
    }
    .create_file > form > select {
        color: #fff;
        margin: 1rem 0;
        font-size: 1.2rem;
        padding: .5rem 1rem;
        border: 3px solid #fff;
        background-color: #181818;
    }
    input[type="submit"] {
        cursor: pointer;
    }
    .create_file > form > input:focus,
    .create_file > form > select:focus {
        outline: none;
    }
</style>