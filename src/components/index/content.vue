<script>
export default {
    props: [
        'id',
        'title',
        'content'
    ]
}
</script>

<template>
    <div class="content">
        {{ id }}
        {{ title }}
        {{ content }}
    </div>
</template>

<style scoped>
    .content {
        gap: 1rem;
        color: #fff;
        display: grid;
        margin-bottom: 1rem;
        grid-auto-columns: 1fr;
        grid-template-columns: repeat(4, 1fr);
    }
</style>