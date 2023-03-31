<script>
import axios   from 'axios'
import Content from '../components/index/content.vue'


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
            <div class="search_bar">
                <input type="text" placeholder="Search Content..." v-model="query" required>
            </div>

            <div class="category">
                <select v-model="category">
                    <option value="All" selected>All</option>
                    <option v-for="(file, index) in this.file" :value="file">
                        {{ file }}
                    </option>
                </select>
            </div>
        </div>

        <div class="content_list">
            <Content 
                v-for = "(item, index) in id"
                :key   = "index"
                :id    = "item"
                :file  = "file[index]"
                :title = "title[index]"
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
        display: block;
        appearance: none;
        margin-top: 1rem;
        font-size: 1.2rem;
        width: fit-content;
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