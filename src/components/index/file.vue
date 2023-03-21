<script>
import { mapMutations } from 'vuex'
import axios            from 'axios'
import store            from '../../store'

export default {
    props: [
        'id',
        'image',
        'title',
        'folder'
    ],

    data() {
        return {
            update: {
                title  : this.title,
                old    : this.image,
                folder : this.folder,
                image  : `http://localhost:4000/api/v1/file/${this.image}`
            },
        }
    },
    
    mounted() {
        this.getAllFolder()
    },
    
    methods: {
        deleteFile() {
            axios.delete(`http://localhost:4000/api/v1/file/${this.id}`, 
            {
                data: {
                    image: this.image
                },

                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((res) => {
                const data     = store.state.files
                const index    = data.findIndex(item => item._id === this.id);
                const selected = document.querySelectorAll('.file')[index]

                selected.classList.add('fadeOut')
                console.log('File Deleted')
            })
            .catch((err) => {
                console.log(err)
            })
        },

        updateFile() {
            const formData = new FormData()
            formData.append('old'    , this.update.old) 
            formData.append('title'  , this.update.title)
            formData.append('image'  , this.update.image)
            formData.append('folder' , this.update.folder)

            axios.put(`http://localhost:4000/api/v1/file/${this.id}`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((res) => {
                console.log('File Updated')
            })
            .catch((err) => {
                console.log(err)
            })
        },

        createImage(e) {
            this.update.image = e.target.files[0]
        },

        ...mapMutations(['getAllFolder']),
    }
}
</script>

<template>
    <div class="file">
        <div class="file_group">
            <div class="item">
                <input type="text" v-model="update.title" required>
            </div>

            <div class="item">
                <select v-model="update.folder">
                    <option :value="update.folder" selected>{{ update.folder }}</option>
                    <option v-for="(folder, index) in $store.state.folders" :value="folder.title">
                        {{ folder.title}}
                    </option>
                </select>
            </div>
        </div>

        <div class="file_group">
            <div class="item">
                <input type="file" @change="createImage" name="images" id="img" required>
                <img :src="update.image" :alt="update.title">
            </div>

            <div class="item">
                <button>
                    <font-awesome-icon icon="fa-solid fa-check" @click="updateFile" />
                </button>
                <button>
                    <font-awesome-icon icon="fa-solid fa-trash" @click="deleteFile" />
                </button>
            </div>
        </div>
    </div> 
</template>

<style scoped>
    .file {
        margin: 1rem;
        display: flex;
        padding-bottom: 1rem;
        flex-direction: column;
        border-bottom: 3px solid #fff;
    }
    .file > .file_group {
        display: flex;
        flex-direction: row;
    }
    .file > .file_group:nth-child(1) {
        color: #fff;
        margin-bottom: 1rem;
        border-left: 3px solid #fff;
        border-bottom: 3px solid #fff;
    }
    .file > .file_group > .item > input {
        outline: none;
        font-size: 1.2rem;
        padding: .2rem .6rem;
    }
    .file > .file_group > .item > input:focus,
    .file > .file_group > .item > select {
        outline: none;
    }
    .file > .file_group > .item > select {
        border: none;
        height: 100%;
        color: #fff;
        cursor: pointer;
        appearance: none;
        font-size: 1.2rem;
        width: fit-content;
        padding: .2rem .6rem;
        background-color: transparent;;
    }
    .file > .file_group > .item > select > option {
        background-color: #1E1E1E;
    }
    .file > .file_group:nth-child(1) > .item:nth-child(2) {
        display: flex;
        width: fit-content;
        justify-content: center;
        border-left: 3px solid #fff;
    }

    .file > .file_group:nth-child(2) {
        display: flex;
        justify-content: space-between;
    }
    .file > .file_group:nth-child(2) > .item:nth-child(1) {
        width: 14rem;
        display: flex;
        position: relative;
        justify-content: center;
    }
    .file > .file_group:nth-child(2) > .item:nth-child(1) > input {
        opacity: 0;
        width: 100%;
        height: 100%;
        position: absolute;
    }
    .file > .file_group:nth-child(2) > .item:nth-child(1) > img {
        width: 4rem;
        height: 4rem;
        pointer-events: none;
    }
    .file > .file_group:nth-child(2) > .item:nth-child(2) {
        width: 7rem;
        color: #fff;
        display: flex;
        align-items: center;
        flex-direction: row;
        justify-content: space-around;
    }
    .file > .file_group:nth-child(2) > .item:nth-child(2) > button { 
        padding: .3rem .6rem;
        border-radius: 50% 50%;
    }
    .file > .file_group:nth-child(2) > .item:nth-child(2) > button:nth-child(1) { 
        border: 3px solid #008000;
    }
    .file > .file_group:nth-child(2) > .item:nth-child(2) > button:nth-child(2) { 
        border: 3px solid #ff0000;
    }

    /**/
    .fadeOut {
        display: none;
    }

    /**/
    @media (min-width: 36em) { 
        .file {
            width: 28rem;
        }
    }
</style>