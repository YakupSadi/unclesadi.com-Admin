<script>
import axios from 'axios'
import store from '../../store'

export default {
    props: [
        'id',
        'title',
        'image'
    ],
    data() {
        return {
            update: {
                title : this.title,
                image : `http://localhost:4000/api/v1/file/${this.image}`
            },
        }
    },
    methods: {
        deleteFile() {
            axios.delete(`http://localhost:4000/api/v1/file/${this.id}`, {
                data: {
                    image: this.image
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
            formData.append('title', this.update.title)
            formData.append('image', this.update.image)

            axios.post(`http://localhost:4000/api/v1/file/${this.id}`, formData)
            .then((res) => {
                console.log('File Updated')
            })
            .catch((err) => {
                console.log(err)
            })
        },
        createImage(e) {
            this.update.image = e.target.files[0]
        }
        
    }
}
</script>

<template>
    <div class="file">
        <div class="item">
            <input type="text" v-model="update.title" required>
        </div>

        <div class="item">
            <input type="file" @change="createImage" name="re-image" id="img" required>
            <img :src="update.image" :alt="update.title">
        </div>

        <div class="item">
            <button type="submit">
                <font-awesome-icon icon="fa-solid fa-check" class="icon" @click="updateFile" />
            </button>
            <button>
                <font-awesome-icon icon="fa-solid fa-trash" class="icon" @click="deleteFile" />
            </button>
        </div>
    </div>      
</template>

<style scoped>
    .file {
        gap: 1rem;
        color: #fff;
        display: grid;
        margin-bottom: 1rem;
        grid-auto-columns: 1fr;
        grid-template-columns: repeat(4, 1fr);
    }
    .file > .item {
        display: flex;
        align-items: center;
    }
    .file > .item > img {
        max-width: 100%;
        max-height: 4rem;
    }
    .file > .item > input {
        border: 3px solid transparent;
    }
    .file > .item > input:focus {
        outline: none;
        border: 3px solid #fff;
    }
    .file > .item:nth-child(1) { 
        font-size: 1.2rem;
        grid-column: 1 / 3; 
    }
    .file > .item:nth-child(2) { 
        display: flex;
        grid-column: 3 / 4; 
        align-items: center;
        justify-content: center;
        border: 2px solid #fff;
    }
    .file > .item:nth-child(3) {
        display: flex;
        grid-column: 4 / 5;
        justify-content: space-around;
    }
    #img {
        
    }

    /**/
    .fadeOut {
        display: none;
    }
</style>