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
      id      : null,
      title   : null,
      content : null
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
        this.title   = res.data.data[0].title
        this.content = res.data.data[0].data
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
      v-for="(id, index) in id"
        :key     = "index"
        :id      = "id"
        :title   ="title"
        :content = "content"
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



<!-- 
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
 -->