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
            axios.delete(`http://localhost:4000/api/v1/content/${this.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
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
            <font-awesome-icon icon="fa-solid fa-trash" @click="deleteContent" />
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
        border: 3px solid #fff;
        padding: .5rem 0 .5rem 1rem;
        justify-content: space-between;
    }
    .content > a {
        width: 8rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        border-right: 3px solid #ffffff6c;
    }
    .content > span {
        width: 5rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .content > button {
        width: 3rem;
        height: 2rem;
        display: flex;
        color: #ff0000;
        align-items: center;
        justify-content: center;
        border-left: 3px solid #fff;
    }

    /**/
    @media (min-width: 36em) { 
        .content {
            width: 30rem;
        }
        .content > a {
            width: 14rem;
        }
        .content > span {
            width: 10rem;
        }
    }
</style>