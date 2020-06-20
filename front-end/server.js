const express = require('express')
const path=require('path')
const bodyParser = require('body-parser')
const http = require('http')
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('./build/'))

app.get('*', (req, res, next) => {
    const options = {
        root: path.join(__dirname,'./build/') ,
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    }
    res.set('content-type', 'text/html')
    res.sendFile('index.html',options, function (err) {
        if (err) {
            console.log('Error:', err)
            next(err)
        } else {
            console.log('Sent')
        }
    })
})

http.createServer(app).listen(3000)
