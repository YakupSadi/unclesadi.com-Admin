<script>
import axios from 'axios'
import { mapMutations } from 'vuex'
import Folder from '../components/index/folder.vue'

import EditorJS from '@editorjs/editorjs'
import Paragraph from '@editorjs/paragraph'
import List from '@editorjs/list'
import Underline from '@editorjs/underline'
import Header from '@editorjs/header'
import InlineCode from '@editorjs/inline-code'
import Marker from '@editorjs/marker'
import CodeTool from '@editorjs/code'
import RawTool from '@editorjs/raw'

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
        holder: 'editorjs',
        autofocus: true,
        tools: {
          paragraph: {
            class: Paragraph,
            inlineToolbar: true,
          },
          list: {
            class: List,
            inlineToolbar: true,
            config: {
              defaultStyle: 'ordered'
            }
          },
          underline: Underline,
          header: {
            class: Header,
            config: {
              placeholder: 'Enter a header',
              levels: [1, 2, 3, 4],
              defaultLevel: 1
            }
          },
          inlineCode: InlineCode,
          Marker: Marker,
          code: CodeTool,
          raw: RawTool,
        }
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
    margin: 0 auto;
    max-width: 50rem;
    padding: .5rem 1rem;
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