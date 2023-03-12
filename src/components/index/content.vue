<script>
import axios from 'axios';

export default {
    props: [
        'id',
        'title',
        'content'
    ],
    mounted() {
        this.getContent()       
    },
    methods: {
        getContent() {
            axios.get(`http://localhost:4000/api/v1/content/${this.id}`)
            .then((res) => {
                console.log('All Data Fetched')
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
    </div>
</template>

<style scoped>
    .content {
        gap: 1rem;
        color: #fff;
        display: grid;
        margin-bottom: 1rem;
        grid-auto-columns: 1fr;
        grid-template-columns: repeat(4, 1fr);
    }
</style>