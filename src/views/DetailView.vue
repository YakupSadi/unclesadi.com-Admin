<script>
import axios from 'axios'
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
    mounted() {
        this.getAllcontent()
    },
    methods: {
      getAllcontent() {
        axios.get('http://localhost:4000/api/v1/content/' + this.$route.params.id)
        .then((res) => {
          const content = res.data.data.data
          console.log(content)

          const newArr = content.map(obj => obj)
          const data = {
            blocks: newArr
          }

          window.editor = new EditorJS({
            holder: 'editorjs',
            data: data,
            readOnly: true,
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
        })
        .catch((error) => {
          console.log(error)
        })
      }
    }
}
</script>

<template>
  <main class="main">
    <div id="editorjs"></div>
    <button>Save</button>
  </main>
</template>

<style scoped>
  .main {
    max-width: 100rem;
    padding: 6rem 2rem 2rem;
  }
  #editorjs {
    color: #fff;
    margin: 0 auto;
    max-width: 50rem;
    border: 3px solid #fff;
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