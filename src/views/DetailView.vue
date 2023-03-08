<script>
import axios from 'axios'
import EditorJS from '@editorjs/editorjs';

export default {
    mounted() {
        this.getAllcontent()
    },
    methods: {
        getAllcontent() {
            axios.get('http://localhost:4000/api/v1/content')
            .then((res) => {
                const content = res.data.data[2].data 

                const newArr = content.blocks.map(obj => obj)
                const data = {
                    blocks: newArr
                }

                window.editor = new EditorJS({
                    holder: 'editorjs',
                    data: data,
                    readOnly: true
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