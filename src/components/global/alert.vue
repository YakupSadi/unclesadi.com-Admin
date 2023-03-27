<script setup>

</script>

<template>
    <div class="alert" :style="{ backgroundColor: this.$store.state.alertClr }">
        <span>
            {{ this.$store.state.alertMsg }}
        </span>
    </div>
</template>

<style scoped>
    .alert {
        bottom: 0;
        width: 100%;
        height: 5rem;
        display: flex;
        color: #fff;
        position: fixed;
        font-size: 1.5rem;
        align-items: center;
        justify-content: center;
    }
    .alert > span {
        border-bottom: 3px solid #fff;
    }
</style>