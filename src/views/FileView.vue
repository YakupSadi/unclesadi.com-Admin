<script>
import { mapMutations } from 'vuex'
import File             from '../components/index/file.vue';
import createFile       from '../components/crud/createFile.vue';

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
        ...mapMutations(['getAllFile'])
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

        <div class="file_item">
            <File 
                v-for="(file, index) in $store.state.files"
                :key    = "index"
                :id     = "file._id"
                :title  = "file.title"
                :folder = "file.folder"
                :image  = "file.image"
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

    .files > .file_item {
        display: flex;
        align-items: center;
        flex-direction: column;
    }


    /**/
    @media (min-width: 48em) { 
        .files > .file_item {
            flex-wrap: wrap;
            flex-direction: row;
            justify-content: center;
        } 

        .files > .create_button {
            margin-right: 5rem;
        }
    }
</style>