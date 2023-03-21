<script>
import { mapMutations } from 'vuex'
import axios            from 'axios'
import Content          from '../components/index/content.vue'

export default {
    components: {
        Content
    },
  
    data() {
        return {
            id    : null,
            file  : null,
            title : null
        }
    },
  
    mounted() {
        this.isValid(),
        this.getAllContent()
    },
  
    methods: {
        ...mapMutations(['isValid']),

        getAllContent() {
            axios.get('http://localhost:4000/api/v1/content')
            .then((res) => {
                this.id    = res.data.data.map(item => item._id)
                this.title = res.data.data.map(item => item.title)
                this.file  = res.data.data.map(item => item.file)
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }
}
</script>

<template>
    <main class="main">
        <Content 
            v-for  ="(item, index) in id"
            :key   = "index"
            :id    = "item"
            :file  = "file[index]"
            :title = "title[index]"
        />
    </main>
</template>

<style scoped>
    .main {
        color: #fff;
        display: flex;
        max-width: 100rem;
        align-items: center;
        flex-direction: column;
        padding: 6rem 2rem 2rem;
        justify-content: center;
    }

    /**/
    @media (min-width: 36em) { 
        .main {
            flex-wrap: wrap;
            flex-direction: row;
        }
    }
</style>