<script>
import axios from 'axios'
import { mapMutations } from 'vuex'
import Content from '../components/index/content.vue'

export default {
  components: {
    Content
  },
  data() {
    return {
      id    : null,
      title : null
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
        this.id      = res.data.data.map(item => item._id)
        this.title   = res.data.data.map(item => item.title)
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
    <Content 
      v-for="(item, index) in id"
      :key="index"
      :id="item"
      :title="title[index]"
    />
  </main>
</template>

<style scoped>
  .main {
    color: #fff;
    max-width: 100rem;
    padding: 6rem 2rem 2rem;
  }
</style>