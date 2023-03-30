<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
    <div class="menu">
        <div class="menu_item">
            <RouterLink to="/profile">Profile</RouterLink>
            <RouterLink to="/content">Content</RouterLink>
            <RouterLink to="/createContent">Create Content</RouterLink>
            <RouterLink to="/folders">Folders</RouterLink>
            <RouterLink to="/files">Files</RouterLink>

            <button @click="$store.commit('deleteToken')">Log Out</button>
        </div>
    </div>
</template>

<style scoped>
    .menu {
        bottom: 0;
        width: 100%;
        z-index: 10;
        position: fixed;
        overflow-y: auto;
        border-style: solid;
        border-color: #fff;
        transition: width .2s;
        height: calc(100vh - 4rem);
        border-width: 0 3px 3px 3px;
        background-color: #10A19D;
    }
    .menu > .menu_item > a,
    .menu > .menu_item > button {
        width: 75%;
        color: #fff;
        display: flex;
        padding: .3rem 0;
        margin: 1rem auto;
        font-size: 1.3rem;
        align-items: center;
        justify-content: center;
        border: 3px solid #fff;
        background-color: #1E1E1E;
    }
    .menu > .menu_item > button {
        background-color: #800000;
    }


    /**/
    .menu::-webkit-scrollbar {
        width: .5em;
    }
    .menu::-webkit-scrollbar-thumb {
        background-color: #fff;
    }


    /**/
    @media (min-width: 36em) { 
        .menu {
            width: 25rem;
        }
    }
</style>