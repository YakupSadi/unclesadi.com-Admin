<script>
import { mapMutations } from 'vuex'
import Folder from '../components/index/folder.vue';

export default {
  components: {
    Folder
  },
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
    <div class="content">

    </div>
  </main>
</template>

<style scoped>
  .main {
    max-width: 100rem;
    padding: 6rem 2rem 2rem;
  }
  .main > .content {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-evenly;
  }
</style>