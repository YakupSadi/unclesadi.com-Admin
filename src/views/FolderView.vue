<script>
import { mapMutations } from 'vuex'
import Folder           from '../components/index/folder.vue'
import createFolder     from '../components/crud/createFolder.vue'


export default {
    components: {
        Folder,
        createFolder
    },

    mounted() {
        this.getAllFolder()
    },

    methods: {
        ...mapMutations(['getAllFolder']),

        deleteItem(index) { this.$store.state.folders.splice(index, 1) }
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

        <div class="folder_item">
            <Folder 
                v-for="(folder, index) in $store.state.folders"
                :key        = "index"
                :id         = "folder._id"
                :title      = "folder.title"
                :background = "folder.background"
                @remove     = "deleteItem(index)"
            />
        </div>
    </div>
</template>

<style scoped>
    .folders {
        display: flex;
        max-width: 100rem;
        flex-direction: column;
        padding: 8rem 2rem 2rem;
    }

    /* create_button */
    .folders > .create_button {
        margin-bottom: 2rem;
    }
    .folders > .create_button > button {
        float: right;
        color: #fff;
        font-size: 1.2rem;
        padding: .5rem 1rem;
        border: 3px solid #FB2576;
    }

    /* folder_item */
    .folders > .folder_item {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }


    /* Media Query */
    @media (min-width: 36em) { 
        .folders > .create_button {
            margin-right: 5rem;
        }
    }
</style>