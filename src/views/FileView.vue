<script>
import { mapMutations } from 'vuex'
import createFile from '../components/crud/createFile.vue';

export default {
    components: {
        createFile
    },
    mounted() {
        this.isValid()
    },
    methods: {
        ...mapMutations(['isValid'])
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
    </div>
</template>

<style scoped>
    .files {
        padding: 6rem 2rem 2rem;
    }
    .files > .create_button > button {
        float: right;
        color: #fff;
        padding: .5rem 1rem;
        border: 3px solid #fff;
    }
</style>