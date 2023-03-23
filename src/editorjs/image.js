import axios from "axios"


class SimpleImage {
    static get toolbox() {
        return {
            title : 'Image',
            icon  : '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>',
        }
    }

    constructor({ data, config, api }) {
        this.data   = data
        this.api    = api
        this.config = {
            readOnly: config.readOnly || false,
        }
    }

    render() {
        const container = document.createElement('div')
        container.classList.add('simple-image')

        const img = document.createElement('img')
        img.classList.add('simple-image__img')
        img.src   = this.data.url

        if (!this.config.readOnly) {
            const input  = document.createElement('input')
            input.classList.add('simple-image__input')
            input.type   = 'file'

            input.addEventListener('change', (event) => {
                const file   = event.target.files[0]
                const reader = new FileReader()

                const formData = new FormData()
                formData.append('image', file)

                reader.onload = (e) => {
                    this.data.url = e.target.result
                    img.src       = this.data.url

                    axios.post('http://localhost:4000/api/v1/content/img', formData, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    })
                    .then((res) => {
                        this.data.url = 'http://localhost:4000/api/v1/file/' + res.data.image
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                }

                reader.readAsDataURL(file)
            })

            container.appendChild(input)
        }
        container.appendChild(img)

        return container
    }

    save() {
        return this.data
    }
}


export default SimpleImage