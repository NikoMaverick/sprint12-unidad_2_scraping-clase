// Axios: una biblioteca intuitiva que te ayuda a realizar solicitudes HTTP en JavaScript. 
//        Puedes usar Axios tanto en el navegador como en Node.js, y representa uno de los 
//        clientes HTTP de JavaScript más populares disponibles, esta basado en promesas.

// Cheerio: una biblioteca ligera que proporciona una API similar a la de jQuery para explorar
//          documentos HTML y XML. Puedes usar Cheerio para analizar un documento HTML, 
//          seleccionar elementos HTML y extraer datos de ellos. Es decir, Cheerio ofrece una 
//          API avanzada de raspado web.


const axios = require('axios')//Axios es un cliente http basado en promesas para node.js y navegador
const cheerio = require('cheerio')
const express = require('express')
const app = express()

const url = 'https://nikomaverick.github.io/project-break-dashboard_modulo1_07.2024/'

app.get('/', (req, res) => {
    axios.get(url).then((response) => {// con axios.get nos traemos la url y cuando la obtenemos, tiene que tener una respuesta
        if(response.status === 200){//Si nos da un status igual a 200...
            const html = response.data //Guaradamos la respuesta
            const $ = cheerio.load(html) //Cargamos lo que esta trayendo, en este caso es el html
            
            const pageTitle = $('title').text() // Con $ llamamos a cheerio y nos recoge el title de la web. Con .text queremos que nos devuelva como un texto. 
           
            const links = [] // en este array meteremos los link de la linea 29 de abajo
            const imgs = [] // recogemos las imagenes del documento
            
            $('a').each((index, element) => {// con el metodo each recorremos el 'a'. Recorre el indice primero y luego el elemento. Para añadir el elemento, primeramente hay que añadir el indice (index)
                const link = $(element).attr('href') //Le metemos el elemento con el que queremos trabajar, accediendo con el .attr(atributo) "href"
                links.push(link) //Pusheamos y lo subimos al array de la variable links de la linea 26
            })

            $('img').each((index, element) => {
                const img = $(element).attr('src')
                imgs.push(img)
            })

            console.log(links)

            res.send(`
                <h1>${pageTitle}</h1>
                <h2>Enlaces</h2>
                <ul>
                    ${links.map(link => `<li><a href="${url}${link}">${link}</a></li>`).join('')}
                </ul>
                <h2>Imagenes</h2>
                <ul>
                    ${imgs.map(img => `<li><a href="${url}${img}">${img}</a></li>`).join('')}
                </ul>
                `)
        }
    })
})





app.listen(3000, () => {
    console.log('Express esta escuchando en el puerto http://localhost:3000')
})