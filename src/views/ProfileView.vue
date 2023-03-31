<script>
import axios from 'axios'


export default {
    data() {
        return {
            info: {
                old_pass : null,
                new_pass : null
            },

            email : {
                new_email : null
            },

            move_email : true,
            move_pass  : false
        }
    },

    mounted() {
        this.getInfo()
    },

    methods: {
        getInfo() {
            axios.get('http://localhost:4000/api/v1/email', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((res) => {
                this.email.new_email = res.data.info
            })
            .catch((err) => {
                console.log(err)
            })
        },

        changeEmail() {
            axios.put('http://localhost:4000/api/v1/email', this.email, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((res) => {
                this.$router.push('/login')
                this.$store.commit('deleteToken')
            })
            .catch((err) => {
                console.log(err)
            })
        },

        changePassword() {
            axios.put('http://localhost:4000/api/v1/password', this.info, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((res) => {
                this.$router.push('/login')
                this.$store.commit('deleteToken')
            })
            .catch((err) => {
                console.log(err)
            })
        },

        emailStatus() {
            this.move_email = true
            this.move_pass  = false
        },

        passStatus() {
            this.move_pass  = true
            this.move_email = false
        }
    }
}
</script>

<template>
    <main class="index">
        <div class="form_buttons">
            <button @click="emailStatus">Change Email</button>
            <button @click="passStatus">Change Password</button>
        </div>

        <div class="form"  v-if="move_email">
            <form @submit.prevent="changeEmail">
                <input type="text" placeholder="Email" v-model="email.new_email" required>
                <input type="submit" value="Change Email">
            </form>
        </div>

        <div class="form" v-if="move_pass"> 
            <form @submit.prevent="changePassword">
                <input type="password" placeholder="Old Password" v-model="info.old_pass" required>
                <input type="password" placeholder="New Password" v-model="info.new_pass" required>
                <input type="submit" value="Change Password">
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
    
    .index > .form_buttons {
        top: 5rem;
        width: 100%;
        height: 5rem;
        display: flex;
        position: absolute;
        align-items: center;
        justify-content: space-evenly;
    }
    .index > .form_buttons > button {
        height: 3rem;
        color: #fff;
        padding: 0 1rem;
        border: 3px solid #fff;
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
