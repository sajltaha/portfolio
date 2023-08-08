const express = require('express')
const router = express.Router()
const path = require('path')
const fs = require('fs/promises')
const { v4: uuidv4 } = require('uuid')

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/main.html'))
})

router.post('/noteAdd', async (req, res) => {
    try {
        let taskId = uuidv4().slice(8, 17)
        let data = JSON.parse(await fs.readFile('users/users.json', 'utf8'))
        let current = JSON.parse(await fs.readFile('users/currUser.json', 'utf8'))
        if (req.body.title == false || req.body.subtitle == false) {
            res.send(JSON.stringify({ success: false, message: 'Форма не заполнена!' }))
        }
        else {
            current.toDo.push({
                taskId: taskId,
                title: req.body.title,
                subtitle: req.body.subtitle
            })
            data[current.username].toDo.push({
                taskId: taskId,
                title: req.body.title,
                subtitle: req.body.subtitle
            })
            await fs.writeFile('users/currUser.json', JSON.stringify(current))
            await fs.writeFile('users/users.json', JSON.stringify(data))
            if (data[current.username].toDo) {
                res.send(JSON.stringify({ success: true, toDo: data[current.username].toDo }))
            }
            else {
                res.send(JSON.stringify({ success: false, message: 'Ошибка при добавлении записи!' }))
            }
        }
    }
    catch (error) {
        res.send(JSON.stringify({ success: false, message: 'Ошибка при добавлении записи!' }))
    }
})

router.get('/noteAll', async (req, res) => {
    try {
        let data = JSON.parse(await fs.readFile('users/users.json', 'utf8'))
        let current = JSON.parse(await fs.readFile('users/currUser.json', 'utf8'))
        if (data[current.username].toDo && data[current.username].id) {
            res.send(JSON.stringify({ success: true, toDo: data[current.username].toDo, id: data[current.username].id }))
        }
        else {
            res.send(JSON.stringify({ success: false, message: 'Undefined' }))
        }
    }
    catch (error) {
        res.send(JSON.stringify({ success: false, message: 'Undefined' }))
    }
})

router.get('/logout', async (req, res) => {
    try {
        await fs.writeFile('users/currUser.json', '{}')
        res.send(JSON.stringify({ success: true }))
    }
    catch (error) {
        res.send(JSON.stringify({ success: false, message: 'Ошибка при выходе из аккаунта!' }))
    }
})

router.post('/noteEdit', async (req, res) => {
    try {
        let data = JSON.parse(await fs.readFile('users/users.json', 'utf8'))
        let current = JSON.parse(await fs.readFile('users/currUser.json', 'utf8'))
        if (req.body.title == false || req.body.subtitle == false) {
            res.send(JSON.stringify({ success: false, message: 'Внесите изменения!' }))
        }
        else {
            let currentToDo = current.toDo
            for (let i = 0; i < currentToDo.length; i++) {
                if (currentToDo[i].taskId == req.body.taskId) {
                    currentToDo[i].title = req.body.title
                    currentToDo[i].subtitle = req.body.subtitle
                    current.toDo = currentToDo
                    data[current.username].toDo = currentToDo
                    await fs.writeFile('users/currUser.json', JSON.stringify(current))
                    await fs.writeFile('users/users.json', JSON.stringify(data))
                    res.send(JSON.stringify({ success: true }))
                }
            }
        }
    }
    catch (error) {
        res.send(JSON.stringify({ success: false, message: 'Ошибка при сохранении изменений!' }))
    }
})

router.post('/noteDelete', async (req, res) => {
    try {
        let data = JSON.parse(await fs.readFile('users/users.json', 'utf8'))
        let current = JSON.parse(await fs.readFile('users/currUser.json', 'utf8'))
        let currentToDo = current.toDo
        for (let i = 0; i < currentToDo.length; i++) {
            if (currentToDo[i].taskId == req.body.taskId) {
                currentToDo.splice(i, 1)
                current.toDo = currentToDo
                data[current.username].toDo = currentToDo
                await fs.writeFile('users/currUser.json', JSON.stringify(current))
                await fs.writeFile('users/users.json', JSON.stringify(data))
                res.send(JSON.stringify({ success: true }))
            }
        }
    }
    catch (error) {
        res.send(JSON.stringify({ success: false, message: 'Ошибка при удалении записи!' }))
    }
})

module.exports = router