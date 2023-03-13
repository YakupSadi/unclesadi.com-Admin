<script>
import axios from 'axios'

export default {
    props: [
        'id',
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
        },
    }
}
</script>

<template>
    <div class="content">
        <RouterLink :to="`content/${id}`">{{ title }}</RouterLink>
        
        <button>
            <font-awesome-icon icon="fa-solid fa-trash" class="icon" @click="deleteContent" />
        </button>
    </div>
</template>

<style scoped>
    .content {
        color: #fff;
        display: flex;
        font-size: 1.2rem;
        margin-bottom: 1rem;
        justify-content: space-between;
        border-bottom: 3px solid #fff;
    }
</style>