<script>
import { mapMutations } from 'vuex'
import axios            from 'axios'
import EditorJS         from '@editorjs/editorjs'
import Alert            from '../components/global/alert.vue'

import List             from '@editorjs/list'
import Header           from '@editorjs/header'
import Paragraph        from '@editorjs/paragraph'
import Underline        from '@editorjs/underline'
import ColorPlugin      from 'editorjs-text-color-plugin'
import FontSize         from 'editorjs-inline-font-size-tool'

import Code             from '../editorjs/code'
import SimpleImage      from '../editorjs/image'


export default {
    components: {
        Alert
    },

    data() {
        return {
            save: {
                title : null,
                file  : null
            }
        }
    },

    mounted() {
        this.editor()
        this.getAllFile()
    },

    methods: {
        ...mapMutations(['getAllFile']),

        editor() {
            window.editor = new EditorJS({
                holder    : 'editorjs',

                tools: {
                    paragraph: {
                        class : Paragraph,
                        inlineToolbar : true,
                    },

                    list: {
                        class : List,
                        inlineToolbar : true,
                        config : {
                            defaultStyle : 'unordered'
                        }
                    },

                    header: {
                        class  : Header,
                        config : {
                            placeholder  : 'Enter a header',
                            levels       : [2, 3, 4],
                            defaultLevel : 2
                        }
                    },

                    Color: {
                        class  : ColorPlugin,
                        config : {
                            colorCollections : ['#EC7878','#9C27B0','#673AB7','#3F51B5','#0070FF','#03A9F4','#00BCD4','#4CAF50','#8BC34A','#CDDC39', '#FFF'],
                            defaultColor     : '#FF1300',
                            type             : 'text', 
                            customPicker     : true  
                        }     
                    },

                    Marker: {
                        class  : ColorPlugin,
                        config : {
                            defaultColor : '#FFBF00',
                            type         : 'marker',
                            icon         : `<svg fill="#000000" height="200px" width="200px" version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M17.6,6L6.9,16.7c-0.2,0.2-0.3,0.4-0.3,0.6L6,23.9c0,0.3,0.1,0.6,0.3,0.8C6.5,24.9,6.7,25,7,25c0,0,0.1,0,0.1,0l6.6-0.6 c0.2,0,0.5-0.1,0.6-0.3L25,13.4L17.6,6z"></path> <path d="M26.4,12l1.4-1.4c1.2-1.2,1.1-3.1-0.1-4.3l-3-3c-0.6-0.6-1.3-0.9-2.2-0.9c-0.8,0-1.6,0.3-2.2,0.9L19,4.6L26.4,12z"></path> </g> <g> <path d="M28,29H4c-0.6,0-1-0.4-1-1s0.4-1,1-1h24c0.6,0,1,0.4,1,1S28.6,29,28,29z"></path> </g> </g></svg>`
                        }       
                    },

                    fontSize   : FontSize,
                    underline  : Underline,

                    code       : Code,
                    image      : SimpleImage
                }
            })
        },

        saveEdit() {
            editor.save().then((outputData) => {
                const postData = {
                    title      : this.save.title,
                    file       : this.save.file,
                    outputData : outputData
                }

                axios.post('http://localhost:4000/api/v1/content/createContent', postData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                .then((res) => {
                    console.log(res.data.msg)
                    this.$router.push('/content')
                })
                .catch((err) => {
                    const color   = 'red'
                    const message = err.response.data.msg
                    this.$store.commit('triggerAlert', { message, color })
                })
            }).catch((err) => {
                console.log(err)
            })
        }
    }
}
</script>

<template>
    <main class="main">
        <div class="title">
            <input type="text" placeholder="Title" v-model="save.title">
        </div>

        <div class="select_file">
            <select v-model="save.file">
                <option v-for="(file, index) in $store.state.files" :value="file.title">
                    {{ file.title}}
                </option>
            </select>
        </div>

        <div class="editor">
            <div id="editorjs"></div>
            <button @click="saveEdit">Save</button>
        </div>
    </main>

    <Alert
        :msg   ="this.$store.state.alertMsg"
        :color ="this.$store.state.alertClr"
        :alert ="this.$store.state.alertBtn"
    />
</template>

<style>
    .main {
        display: flex;
        max-width: 100rem;
        flex-direction: column;
        padding: 8rem 2rem 2rem;
        justify-content: center;
    }

    /* title */
    .main > .title {
        display: flex;
        justify-content: center;
    }
    .main > .title > input {
        outline: none;
        color: #fff;
        max-width: 50rem;
        font-size: 1.2rem;
        padding: .5rem 1rem;
        border: 3px solid #FB2576;
    }
    .main > .title > input:focus {
        outline: none;
    }

    /* select_file */
    .main > .select_file {
        width: 100%;
        display: flex;
        margin-top: 1.7rem;
        justify-content: center;
    }
    .main > .select_file > select {
        outline: none;
        color: #fff;
        appearance: none;
        font-size: 1.2rem;
        width: fit-content;
        padding: .5rem 1rem;
        border: 3px solid #10A19D;
        background-color: transparent;
    }
    .main > .select_file > select > option {
        background-color: #1E1E1E;
    }

    /* editor */
    .main > .editor {
        width: 100%;
        height: 100%;
        display: flex;
        margin: 1.7rem 0;
        align-items: center;
        flex-direction: column;
        justify-content: center;
    }
    .main > .editor > button {
        color: #fff;
        margin-top: 1rem;
        font-size: 1.2rem;
        width: fit-content;
        padding: .5rem 2rem;
        border: 3px solid #FFBF00;
    }

    /* editorjs */
    #editorjs {
        width: 90vw;
        font-size: 1.2rem;
        padding: .5rem 2rem;
        border: 3px solid #00F5FF;
    }

    .ce-block__content,
    .ce-toolbar__content {
        max-width: unset;
    }

    .codex-editor__redactor {
        color: #fff;
    }
    
    .icon--toggler-down {
        display: none;
    }
    
    .ce-inline-toolbar__buttons {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
    }
    
    .simple-image,
    .simple-video  {
        width: 100%;
        display: flex;
        margin: 2rem 0;
        align-items: center;
        flex-direction: column;
        justify-content: center;
    }

    .simple-image > input,
    .simple-video > input {
        font-size: 1rem;
        width: fit-content;
    }

    .simple-image > img {
        max-width: 100%;
    }

    .simple-video__video {
        max-width: 18rem;
    }

    pre {
        padding: 1rem;
        border-radius: 3px;
        white-space: pre-wrap;
        background-color: #1b1b1b;
    }

    [contenteditable] {
        outline: 0px solid transparent;
    }

    .simple-image > input {
        width: 80%;
        height: 100%;
        cursor: pointer;
        position: absolute;
    }
    .cover_image {
        z-index: 1;
        width: 80%;
        height: 5rem;
        display: flex;
        border-radius: 3px;
        align-items: center;
        pointer-events: none;
        justify-content: center;
        background-color: #FB2576;
    }


    /* Media Query */
    @media (min-width: 36em) { 
        .simple-video__video {
            max-width: 30rem;
        }
    }

    @media (min-width: 48em) { 
        #editorjs {
            width: 45rem;
        }

        /* simple-video__video */
        .simple-video__video {
            max-width: 40rem;
        }
    }

    @media (min-width: 62em) { 
        #editorjs {
            width: 60rem;
        }
    }
</style>