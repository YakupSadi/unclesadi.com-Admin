<script>
import axios  from 'axios'

export default {
    data() {
        return {
            login: {
                email    : null,
                password : null
            }
        }
    },

    methods: {
        sendAdmin() {
            axios.post('http://localhost:4000/api/v1/login', this.login)
            .then((res) => {
                this.$router.push('/')
                localStorage.setItem('token', res.data.token)
            })
            .catch((err) => {
                console.log(err.response.data.msg)
            })
        },
    }
}
</script>

<template>
    <main class="index">
        <div class="form">
            <form @submit.prevent="sendAdmin">
                <input type="text" placeholder="Email" v-model="login.email" required>
                <input type="password" placeholder="Password" v-model="login.password" required>
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
        padding: 8rem 2rem 2rem;
        justify-content: center;
        min-height: var(--index-height);
    }

    /* form */
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