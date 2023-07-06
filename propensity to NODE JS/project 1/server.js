const express = require('express')
const path = require('path')
const app = express()
const PORT = 4000
const creatorJs = require('./creator.js')
const destroyerJs = require('./destroyer.js')
const fs = require('fs')

app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/registration', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.post('/registration', (req, res) => {
    const bodyOne = req.body
    const bodyOneEmail = req.body.email
    creatorJs.writeIn(bodyOne, bodyOneEmail)
})

app.get('/catalog', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/indexTwo.html'))
})

app.post('/catalog', (req, res) => {
    const bodyTwo = req.body
    const bodyTwoEmail = req.body.email
    creatorJs.writeIn(bodyTwo, bodyTwoEmail)
})

app.get('/cart', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/indexThree.html'))
})

app.post('/cart', (req, res) => {
    const bodyThree = req.body
    const bodyThreeEmail = req.body.email
    creatorJs.writeIn(bodyThree, bodyThreeEmail)
})

app.get('/adminOne', (req, res) => {
    res.sendFile(path.join(__dirname, `public/findCart.html`))
})

app.post('/adminOne', (req, res) => {
    fs.readFile(`users/${req.body.email}.json`, 'utf8', (err, data) => {
        if (err) {
            res.sendFile(path.join(__dirname, `public/findCart.html`))
            return
        }
        else {
            res.sendFile(path.join(__dirname, `public/indexThree.html`))
        }
    })
})

app.get('/adminTwo', (req, res) => {
    const { name } = req.query
    if (name != undefined) {
        destroyerJs.deleteFile(`${name}.json`)
    }
    res.sendFile(path.join(__dirname, 'public/delete.html'))
})

app.get('/adminThree', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/allUsers.html'))
})

app.use((req, res) => res.end('Sorry, friend, not found'))

app.listen(PORT, () => console.log(`Server starting on port ${PORT}`))