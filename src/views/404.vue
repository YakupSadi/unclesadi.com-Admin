<script setup>

</script>

<template>
    <div class="_404">
        <h1>Page Not Found</h1>

        <RouterLink to="/">Go Back</RouterLink>
    </div>
</template>

<style scoped>
    ._404 {
        width: 100vw;
        height: 100vh;
        color: #fff;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        background-color: #1E1E1E;
    }
    ._404 > h1 {
        margin-bottom: 2rem;
        padding-bottom: 2rem;
        border-bottom: 3px solid #ff0000;
    }
    ._404 > a {
        font-size: 1.5rem;
        padding: .5rem 1rem;
        border: 3px solid #fff;
    }
</style>