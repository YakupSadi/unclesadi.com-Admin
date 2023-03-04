<script>
import { mapMutations } from 'vuex'
import File from '../components/index/file.vue';
import createFile from '../components/crud/createFile.vue';

export default {
    components: {
        File,
        createFile
    },
    mounted() {
        this.isValid(),
        this.getAllFile()
    },
    methods: {
        ...mapMutations(['isValid']),
        ...mapMutations(['getAllFile']),
    }
}
</script>

<template>
    <createFile v-if="$store.state.createPage"></createFile>

    <div class="files">
        <div class="create_button">
            <button @click="$store.commit('createGlobal')">
                Create File
            </button>
        </div>

        <div class="file_head">
            <div class="item">
                <span>Title</span>
            </div>

            <div class="item">
                <span>Image</span>
            </div>

            <div class="item"></div>
        </div>

        <div class="file_item">
            <File 
                v-for="(file, index) in $store.state.files"
                :key   = "index"
                :id    = "file._id"
                :title = "file.title"
                :image = "file.image"
            />
        </div>
    </div>
</template>

<style scoped>
    .files {
        display: flex;
        flex-direction: column;
        padding: 6rem 2rem 2rem;
    }
    .files > .create_button {
        margin-bottom: 2rem;
    }
    .files > .create_button > button {
        float: right;
        color: #fff;
        padding: .5rem 1rem;
        border: 3px solid #fff;
    }
    .files > .file_head {
        color: #fff;
        display: grid;
        font-size: 1.4rem;
        margin-bottom: 1rem;
        grid-auto-columns: 1fr;
        border-bottom: 3px solid #fff;
        grid-template-columns: repeat(4, 1fr);
    }
    .files > .file_head > .item:nth-child(1) { 
        grid-column: 1 / 3; 
    }
    .files > .file_head > .item:nth-child(2) { 
        display: flex;
        grid-column: 3 / 4;
        align-items: center;
        justify-content: center;
    }
    .files > .file_head > .item:nth-child(3) { 
        grid-column: 4 / 5; 
    }
</style>