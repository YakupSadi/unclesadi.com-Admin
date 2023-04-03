<script>
import axios from 'axios'

export default {
    props: [
        'id',
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
                console.log(res.data.msg)
            })
            .catch((err) => {
                console.log(err.response.data.msg)
            })
        }
    }
}
</script>

<template>
    <div class="content">
        <RouterLink :to="`content/${id}`">
            {{ title }}
        </RouterLink>

        <button>
            <font-awesome-icon 
                icon="fa-solid fa-trash" 
                @click= "$emit('remove'), deleteContent()"
            />
        </button>
    </div>
</template>

<style scoped>
    .content {
        width: 100%;
        color: #fff;
        display: flex;
        padding: .5rem;
        margin: 1rem 0 0;
        align-items: center;
        border-radius: .2rem;
        transition: width .2s;
        border: 3px solid #fff;
        justify-content: space-between;
    }
    .content > a {
        width: 100%;
        overflow: hidden;
        font-size: 1.5rem;
        margin-right: 1rem;
        white-space: nowrap;
        padding: .2rem .5rem;
        border-radius: .2rem;
        text-overflow: ellipsis;
        background-color: #24315e;
    }
    .content > button {
        font-size: 1.5rem;
        height: fit-content;
        padding: .3rem .7rem;
        border-radius: .2rem;
        background-color: #dc143c;
    }


    /* Media Query */
    @media (min-width: 36em) { 
        .content {
            width: 35rem;
            margin: 1rem 1rem 0;
        }
    }
</style>