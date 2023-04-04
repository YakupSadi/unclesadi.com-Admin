<script>
import axios            from 'axios'
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
            formData.append('title'  , this.create.title)
            formData.append('image'  , this.create.image)
            formData.append('folder' , this.create.folder)

            axios.post('http://localhost:4000/api/v1/file/createFile', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((res) => {
                console.log(res.data.msg)

                this.getAllFile()
                this.$store.commit('createGlobal')
            })
            .catch((err) => {
                if(err.response.status === 500) {
                    console.log('Please Select an Image')
                }
            })
        },

        createImage(e) {
            this.create.image = e.target.files[0]
        },

        ...mapMutations(['getAllFile']),
        ...mapMutations(['getAllFolder']),
    }
}
</script>

<template>
    <div class="create_file">
        <div class="close_icon" @click="$store.commit('createGlobal')">
            <font-awesome-icon class="icon" icon="fa-solid fa-xmark" />
        </div>

        <form @submit.prevent="createFile">
            <input type="text" placeholder="File Title" v-model="create.title" required>

            <select v-model="create.folder" required>
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
        width: 100vw;
        height: 100vh;
        display: flex;
        padding: 0 1rem;
        position: absolute;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        background-color: rgba(0, 0, 0, 0.736);
    }

    /* close_icon */
    .create_file > .close_icon {
        width: 100%;
        display: flex;
        justify-content: right;
    }
    .create_file > .close_icon > .icon {
        color: #fff;
        cursor: pointer;
        font-size: 2rem;
        border-radius: 3px;
        padding: .5rem 1rem;
        background-color: #CF0A0A;
    }

    /* form */
    .create_file > form {
        display: flex;
        max-width: 35rem;
        font-size: 1.4rem;
        align-items: center;
        padding: 1.5rem 1rem;
        flex-direction: column;
        border: 3px solid #fff;
        background-color: #663399;
    }
    .create_file > form > input:nth-child(1) {
        color: #fff;
        padding: .5rem 1rem;
        border: 3px solid #fff;
        background-color: #1E1E1E;
    }
    .create_file > form > select {
        width: 100%;
        display: flex;
        margin: 1rem 0;
        appearance: none;
        font-size: 1.4rem;
        text-align: center;
        padding: .5rem 1rem;
    }
    .create_file > form > input:nth-child(3) {
        color: #fff;
        margin: 1rem 0 2rem;
    }
    .create_file > form > input:nth-child(4) {
        color: #fff;
        cursor: pointer;
        border-radius: 3px;
        padding: .5rem 1rem;
        background-color: #CF0A0A;
    }
    .create_file > form > input:focus,
    .create_file > form > select:focus {
        outline: none;
    }


    /* Media Query */
    @media (min-width: 36em) {
        .create_file > .close_icon {
            width: 35rem;
        }

        /* form */
        .create_file > form {
            width: 35rem;
        }
    }
</style>