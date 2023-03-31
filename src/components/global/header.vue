<script>
import Menu from '../menu/menu.vue'


export default {
    components: {
        Menu
    },

    data() {
        return {
            menu      : false,
            pageWidth : 0
        }
    },

    mounted() {
        this.pageWidth = window.innerWidth
        window.addEventListener('resize', this.handleResize)
    },

    beforeDestroy() {
        window.removeEventListener('resize', this.handleResize);
    },
    
    methods: {
        preventDefault(e) {
            e.preventDefault()
        },

        enableScroll() {
            const body          = document.querySelector('body')
            body.style.overflow = ''
        },
        
        disableScroll() {
            const body          = document.querySelector('body')
            body.style.overflow = 'hidden'
        },

        handleResize() {
            if (window.innerWidth < 600 && this.menu) {
                this.disableScroll()
            } else {
                this.enableScroll()
            }
        },
        
        showMenu() {
            this.menu = !this.menu
            this.handleResize()
        }
    }
}
</script>

<template>
    <header class="header">
        <div class="logo">
            <RouterLink to="/">
                <img src="../../assets/logo.png" alt="Uncle Sadi">
            </RouterLink>
        </div>

        <div class="menu_icon">
            <button>
                <font-awesome-icon
                    icon="fa-solid fa-bars" 
                    @click="showMenu"
                    class="icon" 
                />
            </button>
        </div>
    </header>

    <Transition name="transition">
        <Menu v-if="menu" @click="showMenu"></Menu>
    </Transition>
</template>

<style scoped>
    .header {
        z-index: 2;
        width: 100%;
        height: 5rem;
        display: flex;
        padding: 0 1rem;
        position: fixed;
        align-items: center;
        background-color: #1E1E1E;
        justify-content: space-between;
        border-bottom: 3px solid #fff;
    }

    /* logo */
    .header > .logo {
        width: 4rem;
    }
    .header > .logo > a > img {
        width: 100%;
        height: 100%;
    }

    /* button */
    .header > .menu_icon > button {
        display: flex;
        align-items: center;
    }
    .header > .menu_icon > button > .icon {
        padding: 10px;
        color: #fff;
        cursor: pointer;
        font-size: 1.8rem;
    }


    /* Transition */
    .transition-enter-active,
    .transition-leave-active {
        transition: .3s;
        margin-left: 0;
    }

    .transition-enter-from,
    .transition-leave-to {
        margin-left: -100vw;
    }


    /* Media Query */
    @media (min-width: 36em) { 
        .header {
            padding: 0 2rem;
        }

        .transition-enter-from,
        .transition-leave-to {
            margin-left: -25rem;
        }
    }

    @media (min-width: 48em) {
        .header {
            padding: 0 3rem;
        }  
    }

    @media (min-width: 62em) {
        .header {
            padding: 0 4rem;
        }
    }
</style>