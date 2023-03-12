<script>
export default {
    props: [
        'id',
        'title',
    ]
}
</script>

<template>
    <div class="content">
        <RouterLink :to="`content/${id}`">{{ title }}</RouterLink>
    </div>
</template>

<style scoped>
    .content {
        color: #fff;
        font-size: 1.2rem;
        margin-bottom: 1rem;
        border-bottom: 3px solid #fff;
    }
</style>