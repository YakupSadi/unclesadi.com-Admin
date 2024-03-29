class SimpleVideo {
    static get toolbox() {
        return {
            title: 'Video',
            icon: '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>',
        }
    }
  
    constructor({ data, config, api }) {
        this.data = {
            url: data && data.url ? data.url : '',
            poster: data && data.poster ? data.poster : '',
        }
        this.config = {
            readOnly: config.readOnly || false,
        }
        this.api = api
    }
  
    render() {
        const container = document.createElement('div')
        container.classList.add('simple-video')
  
        const video  = document.createElement('video')
        video.src    = this.data.url
        video.poster = this.data.poster
        video.classList.add('simple-video__video')
        video.setAttribute('controls', '')
  
        if (!this.config.readOnly) {
            const input = document.createElement('input')
            input.type = 'file'
            input.accept = 'video/*'
            input.classList.add('simple-video__input')
  
            input.addEventListener('change', (event) => {
                const file = event.target.files[0]
                const reader = new FileReader()
  
                reader.onload = (e) => {
                    this.data.url = e.target.result
                    video.src = this.data.url
                }
  
                reader.readAsDataURL(file)
            })
            
            container.appendChild(input)
        }
      
        container.appendChild(video)
  
        return container
    }
  
    save() {
        return this.data
    }
}


export default SimpleVideo