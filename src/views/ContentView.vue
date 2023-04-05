<script>
import axios   from 'axios'
import Content from '../components/index/content.vue'


export default {
    components: {
        Content
    },

    data() {
        return {
            query    : '',
            category : 'All',

            content  : [],
            unique   : null
        }
    },

    mounted() {
        axios.get('http://localhost:4000/api/v1/content')
        .then((res) => {
            this.content = res.data.data

            const unique = res.data.data.filter((data, index, array) => 
                array.findIndex(file => file.file === data.file) === index)
                    .map(file => file.file)

            this.unique = unique
        })
        .catch((err) => {
            console.log(err)
        })
    },

    computed: {
        filteredContent() {
            if(this.category === 'All') {
                return this.content.filter(post => post.title.toLowerCase().includes(this.query.toLowerCase()))
            } else {
                const a = this.content.filter(map => map.file === this.category)

                a.forEach(item => { return item })

                return a.filter(post => post.title.toLowerCase().includes(this.query.toLowerCase()))
            }
        }
    },

    methods: {
        deleteContent(index) {
            this.content.splice(index, 1)

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
                    <option v-for="(file, index) in unique" :value="file">
                        {{ file }}
                    </option>
                </select>
            </div>
        </div>

        <div class="content_list">
            <content 
                v-for="(content, index) in filteredContent"
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