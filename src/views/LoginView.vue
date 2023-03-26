<script>
import { mapMutations } from 'vuex'
import axios            from 'axios'
import router           from '../router'

export default {
    data() {
        return {
            login: {
                email    : null,
                password : null
            }
        }
    },

    mounted() {
        this.log(),
        this.isValid()
    },

    methods: {
        sendAdmin() {
            axios.post('http://localhost:4000/api/v1/login', this.login)
            .then((res) => {
                localStorage.setItem('token', res.data.token)
                router.push('/')
            })
            .catch((err) => {
                const message = err.response.data.msg
                console.log(message)
            })
        },

        log() {
            if(!this.$store.state.logout) {
                router.push('/')
            }
        },

        ...mapMutations(['isValid'])
    }
}
</script>

<template>
    <main class="index">
        <div class="form">
            <form @submit.prevent="sendAdmin">
                <input type="text" placeholder="Email" v-model="login.email" required>
                <input type="password" placeholder="Password" name="password" v-model="login.password" required>
                <input type="submit" value="Login">
            </form>
        </div>
    </main>
</template>

<style scoped>
    .index {
        display: flex;
        max-width: 100rem;
        align-items: center;
        padding: 6rem 2rem 2rem;
        justify-content: center;
        min-height: var(--index-height);
    }
    
    .index > .form {
        width: 25rem;
    }
    .index > .form > form {
        display: flex;
        align-items: center;
        flex-direction: column;
    }
    .index > .form > form > input {
        height: 3rem;
        margin: 1rem 0;
        padding: 0 1rem;
        color: #fff;
        font-size: 1.3rem;
    }
    .index > .form > form > input:focus {
        outline: none;
    }
    .index > .form > form > input[type="text"] {
        border: 3px solid #FB2576;
    }
    .index > .form > form > input[type="password"] {
        border: 3px solid #10A19D;
    }
    .index > .form > form > input[type="submit"] {
        cursor: pointer;
        width: fit-content;
        border: 3px solid #FFBF00;
    }
</style>
