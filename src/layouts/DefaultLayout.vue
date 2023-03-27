<script setup>
import Header from '../components/global/header.vue'
import Alert  from '../components/global/alert.vue'
</script>

<template>
    <Header></Header>

    <slot></slot>

    <Alert v-if="this.$store.state.alert" />
</template>

<style>

</style>