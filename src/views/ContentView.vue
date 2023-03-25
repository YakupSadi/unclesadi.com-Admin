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
            title : null,

            query    : '',
            result   : [],
            category : null
        }
    },
  
    mounted() {
        this.isValid(),
        this.getAllContent()
    },

    watch: {
        query: function() {
            if(this.query) {
                axios.get('http://localhost:4000/api/v1/search', { 
                    params: { word: this.query, filter: this.category }
                })
                .then((res) => {
                    this.result = res.data.results
                })
                .catch((err) => {
                    console.log(err)
                })
            }
        }
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
        <div class="search">
            <div class="search_input">
                <input type="text" placeholder="Search Content..." v-model="query" required>
            </div>

            <div class="select_category">
                <select v-model="category">
                    <option value="All" selected>All</option>
                    <option v-for="(file, index) in this.file" :value="file">
                        {{ file }}
                    </option>
                </select>
            </div>
        </div>  

        <Content 
            v-for = "(item, index) in id"
            v-if  = "query === ''"
            :key   = "index"
            :id    = "item"
            :file  = "file[index]"
            :title = "title[index]"
        />

        <Content 
            v-for = "(item, index) in result"
            v-if  = "result.length >= 1 && query != ''"
            :key   = "index"
            :id    = "item._id"
            :file  = "item.file"
            :title = "item.title"
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

    .main > .search {
        width: 100%;
        display: flex;
        margin-bottom: 1rem;
        justify-content: center;
    }

    .main > .search > .search_input {
        width: 40rem;
        border-left: 3px solid #fff;
    }
    .main > .search > .search_input > input {
        font-size: 1.2rem;
        padding: .5rem 1rem;
    }
    .main > .search > .search_input > input:focus,
    .main > .search > .select_category > select:focus {
        outline: none;
    }

    .main > .search > .select_category > select {
        height: 100%;
        width: fit-content;
        appearance: none;
        font-size: 1.2rem;
        padding: .5rem 1rem;
    }

    /**/
    @media (min-width: 36em) { 
        .main {
            flex-wrap: wrap;
            flex-direction: row;
        }
    }
</style>