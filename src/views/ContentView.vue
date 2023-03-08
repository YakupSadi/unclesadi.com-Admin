<script>
import axios from 'axios'
import { mapMutations } from 'vuex'
import Folder from '../components/index/folder.vue'

import EditorJS from '@editorjs/editorjs';

export default {
  components: {
    Folder
  },
  data() {
    return {
      data: []
    }
  },
  mounted() {
    this.isValid(),
    this.editor()
  },
  methods: {
    ...mapMutations(['isValid']),
    editor() {
      window.editor = new EditorJS({
        holder: 'editorjs'
      })
    },
    saveEdit() {
      editor.save().then((outputData) => {
        axios.post('http://localhost:4000/api/v1/content/createContent', { outputData })
            .then((res) => {
                console.log('Content Created')
            })
            .catch((err) => {
                console.log(err)
            })
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<template>
  <main class="main">
    <div id="editorjs"></div>
    <button @click="saveEdit">Save</button>
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
  .main > button {
    color: #fff;
    margin-top: 1rem;
    font-size: 1.2rem;
    width: fit-content;
    padding: .5rem 2rem;
    border: 3px solid #fff;
  }
</style>