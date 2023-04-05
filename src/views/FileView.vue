<script>
import { mapMutations } from 'vuex'
import File             from '../components/index/file.vue'
import Alert            from '../components/global/alert.vue'
import createFile       from '../components/crud/createFile.vue'


export default {
    components: {
        File,
        Alert,
        createFile
    },

    mounted() {
        this.getAllFile()
    },

    methods: {
        ...mapMutations(['getAllFile']),

        deleteItem(index) { this.$store.state.files.splice(index, 1) }
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
                @remove = "deleteItem(index)"
            />
        </div>
    </div>

    <Alert
        :msg   ="this.$store.state.alertMsg"
        :color ="this.$store.state.alertClr"
        :alert ="this.$store.state.alertBtn"
    />
</template>

<style scoped>
    .files {
        display: flex;
        max-width: 100rem;
        flex-direction: column;
        padding: 8rem 2rem 2rem;
    }

    /* create_button */
    .files > .create_button {
        margin-bottom: 2rem;
    }
    .files > .create_button > button {
        float: right;
        color: #fff;
        font-size: 1.2rem;
        padding: .5rem 1rem;
        border: 3px solid #FFBF00;
    }

    /* file_item */
    .files > .file_item {
        display: flex;
        align-items: center;
        flex-direction: column;
    }


    /* Media Query */
    @media (min-width: 48em) { 
        .files > .file_item {
            flex-wrap: wrap;
            flex-direction: row;
            justify-content: center;
        } 

        /* create_button */
        .files > .create_button {
            margin-right: 5rem;
        }
    }
</style>