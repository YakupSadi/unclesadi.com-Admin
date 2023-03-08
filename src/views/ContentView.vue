<script>
import axios from 'axios'
import { mapMutations } from 'vuex'
import Folder from '../components/index/folder.vue'

export default {
  components: {
    Folder
  },
  data() {
    return {
      data: null
    }
  },
  mounted() {
    this.isValid()
  },
  methods: {
    ...mapMutations(['isValid']),
  }
}
</script>

<template>
  <main class="main">

  </main>
</template>

<style scoped>
  .main {
    max-width: 100rem;
    padding: 6rem 2rem 2rem;
  }
  #editorjs {
    color: #000;
    border: 3px solid #fff;
    background-color: #fff;
  }
  .main > .button > button {
    color: #fff;
    margin-top: 1rem;
    font-size: 1.2rem;
    width: fit-content;
    padding: .5rem 2rem;
    border: 3px solid #fff;
  }
</style>