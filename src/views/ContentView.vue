<script>
import axios from 'axios'
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      titles: null,
      datas: null
    }
  },
  mounted() {
    this.isValid(),
    this.getAllContent()
  },
  methods: {
    ...mapMutations(['isValid']),
    getAllContent() {
      axios.get('http://localhost:4000/api/v1/content')
      .then((res) => {
        this.titles = res.data.data.map(item => item.title)
        this.datas = res.data.data.map(item => item.data[0].data)
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<template>
  <main class="main">
    <p v-for="title in titles">
      {{ title }}
    </p>
  </main>
</template>

<style scoped>
  .main {
    max-width: 100rem;
    padding: 6rem 2rem 2rem;
  }

</style>