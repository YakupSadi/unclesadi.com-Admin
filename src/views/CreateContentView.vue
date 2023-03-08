<script>
import axios from 'axios'

export default {
    data() {
        return {
            content: null,
        }
    },
    mounted() {
        this.getAllcontent()
    },
    methods: {
        getAllcontent() {
            axios.get('http://localhost:4000/api/v1/content')
            .then((res) => {
                this.content = res.data
            })
            .catch((error) => {
                console.log(error)
            })
        }
    }
}
</script>

<template>

</template>

<style scoped>
    div {
        color: aliceblue;
        padding-top: 100px;
    }
</style>