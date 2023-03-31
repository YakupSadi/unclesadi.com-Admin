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

        <div class="form_group">
            <form @submit.prevent="changeEmail" v-if="move_email">
                <input type="text" placeholder="Email" v-model="email.new_email" required>
                <input type="submit" value="Change Email">
            </form>

            <form @submit.prevent="changePassword" v-if="move_pass">
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
        flex-direction: column;
        padding: 8rem 2rem 2rem;
        min-height: var(--index-height);
    }

    /* form_buttons */
    .index > .form_buttons {
        width: 100%;
        color: #fff;
        display: flex;
        font-size: 1.2rem;
        margin: 1rem 0 3rem;
        justify-content: space-between;
    }
    .index > .form_buttons > button {
        width: 100%;
        margin: 0 .5rem;
        text-align: center;
        border-radius: 5px;
        padding: .5rem 1rem;
        border: 3px solid #FB2576;
        background-color: #24315e;
    }

    /* form_group */    
    .index > .form_group {
        width: 100%;
        padding: 1rem;
        font-size: 1.3rem;
        border: 3px solid #fff;
        background-color: #FF7000;
    }

    /* form */
    .index > .form_group > form {
        display: flex;
        align-items: center;
        flex-direction: column;
    }
    .index > .form_group > form > input:not(:last-child) {
        color: #fff;
        text-align: center;
        padding: .5rem 1rem;
        margin-bottom: 1rem;
        border: 3px solid #fff;
        background-color: #1E1E1E;
    }
    .index > .form_group > form > input:last-child {
        color: #fff;
        cursor: pointer;
        width: fit-content;
        border-radius: 5px;
        padding: .5rem 1rem;
        border: 3px solid #fff;
        background-color: #10A19D;
    }


    /* Media Query */
    @media (min-width: 36em) {

    }

    @media (min-width: 48em) {
        .index > .form_buttons {
            width: 40rem;
        }

        /* form_group */
        .index > .form_group {
            width: 40rem;
        }
    }
</style>