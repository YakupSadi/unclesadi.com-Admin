class Code {
    static get toolbox() {
        return {
            title: 'Kod Bloğu',
            icon: '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 8.914l-5.303-5.303-1.414 1.414 6.364 6.364h-4.646v1.414h4.646l-6.364 6.364 1.414 1.414 5.303-5.303v4.949h1.414v-4.949l5.303 5.303 1.414-1.414-6.364-6.364h4.646v-1.414h-4.646l6.364-6.364-1.414-1.414-5.303 5.303v-4.949h-1.414v4.949z"/></svg>'
        }
    }
  
    constructor({ data, config, api }) {
        this.data    = data
        this.wrapper = undefined
        this.api     = api
        this.config  = {
            readOnly: config.readOnly || false
        }

        this.handleKeyDown = this.handleKeyDown.bind(this)
        this.handlePaste = this.handlePaste.bind(this)
    }

    static get enableLineBreaks () {
        return true
    }

    static get contentless () {
        return true
    }
    
    static get displayInToolbox() {
        return true
    }
  
    render() {
        this.wrapper = document.createElement('div')
  
        const pre = document.createElement('pre')
        const code = document.createElement('code')
        code.contentEditable = true
  
        code.textContent = this.data.code || 'Write Your Code Here...'
  
        pre.appendChild(code)
        this.wrapper.appendChild(pre)

        if (this.config.readOnly) {
            code.contentEditable = false
        }

        code.addEventListener('keydown', this.handleKeyDown)
        code.addEventListener('paste', this.handlePaste)
  
        return this.wrapper
    }
  
    save() {
        return {
            code: this.wrapper.querySelector('code').textContent
        }
    }

    validate(savedData) {
        if (!savedData.code.trim()) {
            return false
        }
    
        return true
    }
    
    handleKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault()
    
            const start = event.target.selectionStart
            const end = event.target.selectionEnd
    
            // set textarea value to: text before caret + tab + text after caret
            event.target.value = `${event.target.value.substring(
                0,
                start
            )}\t${event.target.value.substring(end)}`
    
            // put caret at right position again
            event.target.selectionStart = event.target.selectionEnd = start + 1
        }
    }
    
    handlePaste(event) {
        event.preventDefault()
      
        // Get pasted data as text/plain or text/html
        const clipboardData = event.clipboardData || window.clipboardData
        const pastedData = clipboardData.getData('text/plain')
      
        // Get selection and range
        const selection = window.getSelection()
        const range = selection.getRangeAt(0)
      
        // Create a new document fragment with the pasted content
        //const fragment = range.createContextualFragment(pastedData)
      
        // Insert the fragment into the range
        range.deleteContents()
        //range.insertNode(fragment)
      
        // Move the cursor to the end of the pasted content
        range.collapse(false)
        selection.removeAllRanges()
        selection.addRange(range)
    }
}


export default Code
