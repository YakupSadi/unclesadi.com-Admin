<script>
import { mapMutations } from 'vuex'
import axios            from 'axios'


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
                console.log(err.response.data.msg)
            })
        },

        createImage(e) {
            this.update.image = e.target.files[0]
        },

        ...mapMutations(['getAllFolder'])
    }
}
</script>

<template>
    <div class="file">
        <div class="file_item">
            <div class="image">
                <img :src="update.image" :alt="update.title">
                <input type="file" @change="createImage" name="images" id="img" required>
            </div>

            <div class="info">
                <div class="text">
                    <input type="text" v-model="update.title" required>

                    <select v-model="update.folder">
                        <option :value="update.folder" selected>{{ update.folder }}</option>
                        <option v-for="(folder, index) in $store.state.folders" :value="folder.title">
                            {{ folder.title}}
                        </option>
                    </select>
                </div>
            </div>
        </div>

        <div class="file_status">
            <button>
                    <font-awesome-icon icon="fa-solid fa-check" @click="updateFile()" />
            </button>

            <button>
                <font-awesome-icon icon="fa-solid fa-trash" @click="deleteFile(), $emit('remove')" />
            </button>
        </div>
    </div> 
</template>

<style scoped>
    .file {
        display: flex;
        margin: 1rem 0;
        flex-direction: column;
    }

    /* file_item */
    .file > .file_item {
        display: flex;
        justify-content: space-between;
    }

    /* image */
    .file > .file_item > .image {
        width: 6rem;
        height: 5.5rem;
        position: relative;
    }
    .file > .file_item > .image >input {
        width: 100%;
        height: 100%;
    }
    .file > .file_item > .image > img {
        width: 100%;
        height: 100%;
        position: absolute;
        pointer-events: none;
    }

    /* info */
    .file > .file_item > .info {
        color: #fff;
    }

    /* text */
    .file > .file_item > .info > .text {
        height: 100%;
        display: flex;
        margin: 0 1rem;
        flex-direction: column;
        justify-content: space-between;
    }
    .file > .file_item > .info > .text > input {
        height: 2.5rem;
        font-size: 1.4rem;
        border-right: 3px solid #fff;
    }
    .file > .file_item > .info > .text > select {
        color: #000;
        height: 2.5rem;
        appearance: none;
        font-size: 1.2rem;
        padding-left: .5rem;
    }
    .file > .file_item > .info > .text > input:focus,
    .file > .file_item > .info > .text > select:focus {
        outline: none;
    }

    /* file_status */
    .file > .file_status {
        width: 100%;
        display: flex;
        padding: .5rem;
        justify-content: right;
        border-bottom: 3px solid #ffffff7c;
    }
    .file > .file_status > button {
        color: #fff;
        margin: 0 .5rem;
        font-size: 1.4rem;
        border-radius: 3px;
        height: fit-content;
        padding: .2rem .6rem;
    }
    .file > .file_status > button:nth-child(1) {
        background-color: #10A19D;
    }
    .file > .file_status > button:nth-child(2) {
        background-color: #a52a2a;
    }


    /* Media Query */
    @media (min-width: 48em) {
        .file {
            margin: 1rem;
        }
    }
</style>