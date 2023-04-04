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
                console.log(res.data.msg)

                this.getAllFolder()
                this.$store.commit('createGlobal')
            })
            .catch((err) => {
                console.log(err.response.data.msg)
            })
        },

        ...mapMutations(['getAllFolder'])
    }
}
</script>

<template>
    <div class="create_folder">
        <div class="close_icon" @click="$store.commit('createGlobal')">
            <font-awesome-icon class="icon" icon="fa-solid fa-xmark" />
        </div>

        <form @submit.prevent="createFolder">
            <input type="text" placeholder="Folder Title" v-model="create.title" required>

            <div class="color">
                <span>Pick a Color : </span>
                <input type="color" v-model="create.background" required>
            </div>
            
            <input type="submit" value="Save">
        </form>
    </div>
</template>

<style scoped>
    .create_folder {
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
    .create_folder > .close_icon {
        width: 100%;
        display: flex;
        justify-content: right;
    }
    .create_folder > .close_icon > .icon {
        color: #fff;
        cursor: pointer;
        font-size: 2rem;
        border-radius: 3px;
        padding: .5rem 1rem;
        background-color: #CF0A0A;
    }

    /* form */
    .create_folder > form {
        width: 100%;
        display: flex;
        font-size: 1.4rem;
        align-items: center;
        padding: 1.5rem 1rem;
        flex-direction: column;
        border: 3px solid #fff;
        background-color: #663399;
    }
    .create_folder > form > input:nth-child(1) {
        color: #fff;
        padding: .5rem 1rem;
        border: 3px solid #fff;
        background-color: #1E1E1E;
    }
    .create_folder > form > .color {
        width: 100%;
        display: flex;
        margin: 1rem 0;
        align-items: center;
        justify-content: center;
    }
    .create_folder > form > .color > span {
        width: 10rem;
        color: #fff;
    }
    .create_folder > form > .color > input {
        width: 4rem;
        height: 4rem;
    }
    .create_folder > form > input:nth-child(3) {
        color: #fff;
        cursor: pointer;
        border-radius: 3px;
        padding: .5rem 1rem;
        background-color: #CF0A0A;
    }
    .create_folder > form > input:focus,
    .create_folder > form > select:focus {
        outline: none;
    }

    /* Media Query */
    @media (min-width: 36em) {
        .create_folder > .close_icon {
            width: 35rem;
        }

        /* form */
        .create_folder > form {
            width: 35rem;
        }
    }
</style>