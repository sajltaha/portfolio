const express = require('express')
const router = express.Router()
const path = require('path')
const { v4: uuidv4 } = require('uuid')
const fs = require('fs/promises')
const { existOne } = require('../check.js')

router.get('/', (req, res) => {
    existOne()
    res.sendFile(path.join(__dirname, '../public/indexOne.html'))
})

router.post('/signup', async (req, res) => {
    existOne()
    const data = JSON.parse(await fs.readFile('users/users.json', 'utf8'))
    const idOfUser = uuidv4()
    if (req.body.email == false || req.body.password == false || req.body.passwordTwo == false) {
        res.status(406).send(JSON.stringify({ success: false, message: 'Заполните форму!' }))
    }
    else if (req.body.password != req.body.passwordTwo) {
        res.status(406).send(JSON.stringify({ success: false, message: 'Пароли не идентичны!' }))
    }
    else if (data[req.body.email]) {
        res.status(409).send(JSON.stringify({ success: false, message: 'Такой пользователь уже существует!' }))
    }
    else {
        try {
            data[req.body.email] = {
                id: idOfUser,
                email: req.body.email,
                password: req.body.password,
                archive: req.body.archive
            }
            const body = JSON.stringify(data)
            await fs.writeFile('users/users.json', body)
            res.status(202).send(JSON.stringify({ success: true, message: 'Вы успешно зарегистрировались!' }))
        }
        catch (error) {
            res.status(406).send(JSON.stringify({ success: false, message: 'Ошибка при регистрации пользователя!' }))
        }
    }
})

router.post('/login', async (req, res) => {
    existOne()
    const dataAgain = JSON.parse(await fs.readFile('users/users.json', 'utf8'))
    if (req.body.email == false || req.body.password == false) {
        res.status(406).send(JSON.stringify({ success: false, message: 'Заполните форму!' }))
    }
    else if (!dataAgain[req.body.email]) {
        res.status(409).send(JSON.stringify({ success: false, message: 'Неверный email, либо password!' }))
    }
    else if (dataAgain[req.body.email]) {
        if (dataAgain[req.body.email].password != req.body.password) {
            res.status(409).send(JSON.stringify({ success: false, message: 'Неверный email, либо password!' }))
        }
        else {
            try {
                await fs.writeFile('users/current.json', '{}')
                const current = JSON.parse(await fs.readFile('users/current.json', 'utf8'))
                current[req.body.email] = {
                    id: dataAgain[req.body.email].id,
                    email: req.body.email,
                    password: req.body.password,
                    archive: dataAgain[req.body.email].archive
                }
                const bodyAgain = JSON.stringify(current)
                await fs.writeFile('users/current.json', bodyAgain)
                res.status(200).send(JSON.stringify({ success: true }))
            }
            catch (error) {
                res.status(406).send(JSON.stringify({ success: false, message: 'Ошибка при регистрации пользователя!' }))
            }
        }
    }
})

module.exports = router