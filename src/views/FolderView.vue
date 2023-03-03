<script>
import axios from 'axios';
import { mapMutations } from 'vuex'
import Folder from '../components/index/folder.vue';
import createFolder from '../components/crud/createFolder.vue';

export default {
    components: {
        Folder,
        createFolder
    },
    data() {
        return {
            folders: null
        }
    },
    mounted() {
        this.isValid(),
        
        axios.get('http://localhost:4000/api/v1/folder')
        .then((res) => {
            this.folders = res.data.data;
        })
        .catch((err) => {
            console.log(err)
        })
    },
    methods: {
        ...mapMutations(['isValid']),
    }
}
</script>

<template>
    <createFolder v-if="$store.state.createPage"></createFolder>

    <div class="folders">
        <div class="create_button">
            <button @click="$store.commit('createGlobal')">
                Create Folder
            </button>
        </div>

        <div class="folder_head">
            <div class="item">
                <span>Title</span>
            </div>

            <div class="item">
                <span>Color</span>
            </div>

            <div class="item"></div>
        </div>

        <div class="folder_item">
            <Folder 
                v-for="(folder, index) in folders"
                :key        = "index"
                :id         = "folder._id"
                :title      = "folder.title"
                :background = "folder.background"
            />
        </div>
    </div>
</template>

<style scoped>
    .folders {
        display: flex;
        flex-direction: column;
        padding: 6rem 2rem 2rem;
    }
    .folders > .create_button {
        margin-bottom: 2rem;
    }
    .folders > .create_button > button {
        float: right;
        color: #fff;
        padding: .5rem 1rem;
        border: 3px solid #fff;
    }
    .folders > .folder_head {
        color: #fff;
        display: grid;
        font-size: 1.4rem;
        margin-bottom: 1rem;
        grid-auto-columns: 1fr;
        border-bottom: 3px solid #fff;
        grid-template-columns: repeat(4, 1fr);
    }
    .folders > .folder_head > .item:nth-child(1) { 
        grid-column: 1 / 3; 
    }
    .folders > .folder_head > .item:nth-child(2) { 
        display: flex;
        grid-column: 3 / 4;
        align-items: center;
        justify-content: center;
    }
    .folders > .folder_head > .item:nth-child(3) { 
        grid-column: 4 / 5; 
    }
</style>