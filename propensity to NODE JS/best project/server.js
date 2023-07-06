require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT ?? 3001
const cors = require('cors')
const forRegistration = require('./routes/forRegistration.js')
const forMain = require('./routes/forMain.js')

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors({ credentials: true, origin: `http://localhost:${PORT}` }))

app.use('/registration', forRegistration)

app.use('/main', forMain)

app.use('/', (req, res) => {
    res.redirect('/registration')
})

app.listen(PORT, () => {
    console.log(`Server is going on port ~ ${PORT}`)
})