const express = require('express')
const router = express.Router()
const path = require('path')
const fs = require('fs/promises')
const { usersDB } = require('../components/checkUsers')
const { v4: uuidv4 } = require('uuid')

router.get('/', (req, res) => {
    usersDB()
    res.sendFile(path.join(__dirname, '../public/registration.html'))
})

router.post('/signin', async (req, res) => {
    try {
        let data = JSON.parse(await fs.readFile('users/users.json', 'utf8'))
        const userId = uuidv4().slice(0, 8)
        if (req.body.username == false || req.body.password == false) {
            res.send(JSON.stringify({ success: false, message: 'Форма не заполнена!' }))
        }
        else if (data[req.body.username]) {
            res.send(JSON.stringify({ success: false, message: 'Пользователь уже существует!' }))
        }
        else {
            data[req.body.username] = {
                id: userId,
                username: req.body.username,
                password: req.body.password,
                toDo: req.body.toDo
            }
            let body = JSON.stringify(data)
            await fs.writeFile('users/users.json', body)
            res.send(JSON.stringify({ success: true, message: 'Успешная регистрация!' }))
        }
    }
    catch (error) {
        res.send(JSON.stringify({ success: false, message: 'Ошибка при регистрации!' }))
    }
})

router.post('/login', async (req, res) => {
    try {
        let data = JSON.parse(await fs.readFile('users/users.json', 'utf8'))
        if (req.body.username == false || req.body.password == false) {
            res.send(JSON.stringify({ success: false, message: 'Форма не заполнена!' }))
        }
        else if (!data[req.body.username]) {
            res.send(JSON.stringify({ success: false, message: 'Неверный username, либо password!' }))
        }
        else if (data[req.body.username]) {
            if (data[req.body.username].password != req.body.password) {
                res.send(JSON.stringify({ success: false, message: 'Неверный username, либо password!' }))
            }
            else {
                await fs.writeFile('users/currUser.json', '{}')
                const current = {
                    id: data[req.body.username].id,
                    username: req.body.username,
                    password: req.body.password,
                    toDo: data[req.body.username].toDo
                }
                await fs.writeFile('users/currUser.json', JSON.stringify(current))
                res.send(JSON.stringify({ success: true }))
            }
        }
    }
    catch (error) {
        res.send(JSON.stringify({ success: false, message: 'Ошибка при входе!' }))
    }
})

module.exports = router