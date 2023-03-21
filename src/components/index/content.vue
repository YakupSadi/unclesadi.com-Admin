<script>
import axios from 'axios'

export default {
    props: [
        'id',
        'file',
        'title',
    ],

    methods: {
        deleteContent() {
            axios.delete(`http://localhost:4000/api/v1/content/${this.id}`)
            .then((res) => {
                console.log('Content Deleted')
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }
}
</script>

<template>
    <div class="content">
        <RouterLink :to="`content/${id}`">{{ title }}</RouterLink>

        <span>{{ file }}</span>
        
        <button>
            <font-awesome-icon icon="fa-solid fa-trash" class="icon" @click="deleteContent" />
        </button>
    </div>
</template>

<style scoped>
    .content {
        width: 19rem;
        margin: 1rem;
        color: #fff;
        display: flex;
        font-size: 1.2rem;
        justify-content: space-between;
        border-bottom: 3px solid #fff;
    }
    .content > a {
        overflow: hidden;
        max-width: 10rem;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .content > span {
        overflow: hidden;
        max-width: 6rem;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    /**/
    @media (min-width: 36em) { 
        .content {
            width: 30rem;
        }
    }
</style>