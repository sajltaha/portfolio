require('dotenv').config()
const express = require('express')
const app = express()
const registration = require('./routes/registrationRoute')
const main = require('./routes/mainRoute')

const PORT = process.env.PORT

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/registration', registration)

app.use('/main', main)

app.use('/', (req, res) => {
    res.redirect('/registration')
})

app.listen(PORT, () => {
    console.log(`Server is going on port: ${PORT}`)
})