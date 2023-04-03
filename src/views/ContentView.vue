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
            query    : '',
            result   : [],
            category : null || 'All'
        }
    },

    mounted() {
        this.getAllContent()
    },

    watch: {
        query: function() {
            if(this.query) {
                axios.get('http://localhost:4000/api/v1/search', { 
                    params: { 
                        word   : this.query, 
                        filter : this.category 
                    }
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
        ...mapMutations(['getAllContent']),

        deleteContent(index) {
            this.$store.state.content.splice(index, 1)

            /*
            const selected = document.querySelectorAll('.content')[index]
            selected.classList.add('fadeOut')
            */
        }
    }
}
</script>

<template>
    <main class="main">
        <div class="search">
            <div class="search_bar">
                <input type="text" placeholder="Search Content..." v-model="query" required>
            </div>

            <div class="category">
                <select v-model="category">
                    <option value="All" selected>All</option>
                    <option v-for="(file, index) in $store.state.unique" :value="file">
                        {{ file }}
                    </option>
                </select>
            </div>
        </div>

        <div class="content_list">
            <content 
                v-for="(content, index) in $store.state.content"
                :key    = "index"
                :id     = "content._id"
                :file   = "content.file"
                :title  = "content.title"
                @remove = "deleteContent(index)"
            />
        </div>
    </main>
</template>

<style scoped>
    .main {
        display: flex;
        max-width: 100rem;
        flex-direction: column;
        padding: 8rem 2rem 2rem;
    }

    /* search */
    .main > .search {
        width: 100%;
        margin: 0 auto;
    }

    /* search_bar */
    .main > .search > .search_bar {
        color: #fff;
        font-size: 1.5rem;
        border-bottom: 3px solid #fed83a;
    }
    .main > .search > .search_bar > input {
        padding: .5rem 1rem;
    }
    .main > .search > .search_bar > input:focus,
    .main > .search > .category > select:focus {
        outline: none;
    }

    /* category */
    .main > .search > .category {
        float: right;
    }
    .main > .search > .category > select {
        appearance: none;
        margin-top: 1rem;
        font-size: 1.2rem;
        border-radius: 3px;
        padding: .5rem 1.5rem;
    }

    /* content_list */
    .content_list {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: center;
    }


    /* Media Query */
    @media (min-width: 36em) { 
        .main > .search {
            max-width: 50rem;
        }
    }
</style>