<script>
export default {
    props: [
        'alert',
        'msg'
    ],

    data() {
        return {
            disableF : false,
            getAlert : false
        }
    },

    watch: {
        alert() {
            this.disableF = true

            if(this.disableF) {
                this.disableF = false
                this.getAlert = !this.getAlert

                setTimeout(() => {
                    this.disableF = true
                    this.getAlert = !this.getAlert
                }, 2000)
            }
        }
    }
}
</script>

<template>
    <Transition name="fade">
        <div class="alert" v-show="getAlert">
            <span>{{ msg }}</span>
        </div>
    </Transition>
</template>

<style scoped>
    .alert {
        left: 0;
        width: 100%;
        bottom: 2rem;
        color: #fff;
        display: flex;
        padding: 0 2rem;
        position: fixed;
        font-size: 1.4rem;
        align-items: center;
        justify-content: center;
    }
    .alert > span {
        width: 100%;
        height: 4rem;
        text-align: center;
        border-radius: 3px;
        padding: .9rem 2rem 0;
        background-color: red;
    }


    /* transition */
    .fade-enter-active {
        transition: all 0.3s ease-out;
    }

    .fade-leave-active {
        transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
        transform: translateY(5rem);
    }


    /* Media Query */
    @media (min-width: 36em) { 
        .alert > span {
            width: fit-content;
        }
    }
</style>