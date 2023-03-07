<script>
import { mapMutations } from 'vuex'
import Folder from '../components/index/folder.vue'

import EditorJS  from '@editorjs/editorjs'
import Underline from '@editorjs/underline'
import Checklist from '@editorjs/checklist'
import Header    from '@editorjs/header'
import RawTool   from '@editorjs/raw'
import Quote     from '@editorjs/quote'
import List      from '@editorjs/list'
import LinkTool  from '@editorjs/link'
import ImageTool from '@editorjs/image'

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
    this.isValid(),
    this.editor()
  },
  methods: {
    ...mapMutations(['isValid']),
    editor() {
      window.editor = new EditorJS({
        holder: 'editorjs',
        autofocus: true,
        placeholder: 'Let`s write an awesome story!',

        tools: {
          underline: Underline,
          list: {
            class: List,
            inlineToolbar: true,
            config: {
              defaultStyle: 'unordered'
            }
          },
          checklist: {
            class: Checklist,
            inlineToolbar: true,
          },
          linkTool: {
            class: LinkTool,
            config: {
              endpoint: 'http://localhost:8008/fetchUrl', // Your backend endpoint for url data fetching,
            }
          },

          header: Header,
          raw: RawTool,
          quote: Quote,
        },
      });
    },
    saveEditor() {
      editor.save().then((outputData) => {
        this.data = outputData
        console.log('Article data: ', this.data)
      }).catch((error) => {
        console.log('Saving failed: ', error)
      })
    }
  }
}
</script>

<template>
  <main class="main">
    <div id="editorjs"></div>
    <div class="button">
      <button @click="saveEditor">Save</button>
    </div>
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