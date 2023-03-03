<script>
import { mapMutations } from 'vuex'

export default {
  mounted() {
    this.isValid()
  },
  methods: {
    ...mapMutations(['isValid'])
  }
}
</script>

<template>
  <main class="main">
    Main Page
  </main>
</template>

<style scoped>
  .main {
    padding: 6rem 2rem 2rem;
  }
</style>
