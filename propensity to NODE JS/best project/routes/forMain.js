const express = require('express')
const router = express.Router()
const path = require('path')
const fs = require('fs/promises')
const { existOne } = require('../check.js')
let currentUserId
let currentUserArchive
let currentUserEmail

router.get('/', (req, res) => {
    existOne()
    res.sendFile(path.join(__dirname, '../public/indexTwo.html'))
})

router.get('/logout', async (req, res) => {
    try {
        await fs.writeFile('users/current.json', '{}')
        res.status(200).send(JSON.stringify({ success: true }))
    }
    catch (error) {
        res.status(406).send(JSON.stringify({ success: false, message: 'Ошибка при выходе из аккаунта!' }))
    }
})

router.get('/notes', async (req, res) => {
    try {
        existOne()
        const currentAgain = JSON.parse(await fs.readFile('users/current.json', 'utf8'))
        const dataAgain = JSON.parse(await fs.readFile('users/users.json', 'utf8'))
        for (let b = 0; b < Object.keys(dataAgain).length; b++) {
            if (currentAgain[Object.keys(dataAgain)[b]]) {
                currentUserId = currentAgain[Object.keys(dataAgain)[b]].id
            }
        }
        if (JSON.stringify(currentAgain) == "{}" || JSON.stringify(currentAgain) == '{"type":"Buffer","data":[]}') {
            res.status(406).send(JSON.stringify({ success: false, message: 'Undefined user!' }))
        }
        for (let z = 0; z < Object.keys(dataAgain).length; z++) {
            if (dataAgain[Object.keys(dataAgain)[z]].id == currentUserId) {
                res.status(200).send(JSON.stringify({ success: true, archive: dataAgain[Object.keys(dataAgain)[z]].archive, id: currentUserId }))
            }
        }
    }
    catch (error) {
        res.status(406).send(JSON.stringify({ success: false, message: 'Undefined user!' }))
    }
})

router.post('/changeNote', async (req, res) => {
    existOne()
    const currentTwo = JSON.parse(await fs.readFile('users/current.json', 'utf8'))
    const dataTwo = JSON.parse(await fs.readFile('users/users.json', 'utf8'))
    if (req.body.title == false || req.body.subtitle == false) {
        res.status(406).send(JSON.stringify({ success: false, message: 'Заполните форму!' }))
    }
    else {
        try {
            for (let k = 0; k < Object.keys(dataTwo).length; k++) {
                if (dataTwo[Object.keys(dataTwo)[k]].id == currentUserId) {
                    currentUserArchive = dataTwo[Object.keys(dataTwo)[k]].archive
                    currentUserEmail = Object.keys(dataTwo)[k]
                }
            }
            for (let j = 0; j < currentUserArchive.length; j++) {
                if (currentUserArchive[j].title == req.body.preventTitle && currentUserArchive[j].subtitle == req.body.preventSubtitle) {
                    currentUserArchive[j].title = req.body.title
                    currentUserArchive[j].subtitle = req.body.subtitle
                    dataTwo[currentUserEmail].archive = []
                    dataTwo[currentUserEmail].archive = currentUserArchive
                    currentTwo[currentUserEmail].archive = []
                    currentTwo[currentUserEmail].archive = currentUserArchive
                    const bodyTwo = JSON.stringify(dataTwo)
                    await fs.writeFile('users/users.json', bodyTwo)
                    await fs.writeFile('users/current.json', JSON.stringify(currentTwo))
                    res.status(200).send(JSON.stringify({ success: true }))
                    return
                }
            }
        }
        catch (error) {
            res.status(406).send(JSON.stringify({ success: false, message: 'Ошибка при сохранении изменений!' }))
        }
    }
})

router.post('/deleteNote', async (req, res) => {
    try {
        existOne()
        const currentThree = JSON.parse(await fs.readFile('users/current.json', 'utf8'))
        const dataThree = JSON.parse(await fs.readFile('users/users.json', 'utf8'))
        for (let y = 0; y < Object.keys(dataThree).length; y++) {
            if (dataThree[Object.keys(dataThree)[y]].id == currentUserId) {
                currentUserArchive = dataThree[Object.keys(dataThree)[y]].archive
                currentUserEmail = Object.keys(dataThree)[y]
            }
        }
        for (let u = 0; u < currentUserArchive.length; u++) {
            if (currentUserArchive[u].title == req.body.title && currentUserArchive[u].subtitle == req.body.subtitle) {
                currentUserArchive.splice(u, 1)
                dataThree[currentUserEmail].archive = []
                dataThree[currentUserEmail].archive = currentUserArchive
                currentThree[currentUserEmail].archive = []
                currentThree[currentUserEmail].archive = currentUserArchive
                const bodyThree = JSON.stringify(dataThree)
                await fs.writeFile('users/users.json', bodyThree)
                await fs.writeFile('users/current.json', JSON.stringify(currentThree))
                res.status(200).send(JSON.stringify({ success: true }))
                return
            }
        }
    }
    catch (error) {
        res.status(406).send(JSON.stringify({ success: false, message: 'Ошибка при удалении!' }))
    }
})

router.post('/createNote', async (req, res) => {
    try {
        existOne()
        const current = JSON.parse(await fs.readFile('users/current.json', 'utf8'))
        const data = JSON.parse(await fs.readFile('users/users.json', 'utf8'))
        if (req.body.title == false || req.body.subtitle == false) {
            res.status(406).send(JSON.stringify({ success: false, message: 'Заполните форму!' }))
        }
        else if (JSON.stringify(current) == '{}' || JSON.stringify(current) == '{"type":"Buffer","data":[]}') {
            res.status(406).send(JSON.stringify({ success: false, message: 'Ошибка при добавлении записи!' }))
        }
        else {
            for (let i = 0; i < Object.keys(data).length; i++) {
                if (current[Object.keys(data)[i]]) {
                    currentUserId = current[Object.keys(data)[i]].id
                }
            }
            for (let x = 0; x < Object.keys(data).length; x++) {
                if (data[Object.keys(data)[x]].id == currentUserId) {
                    data[Object.keys(data)[x]].archive.push(req.body)
                    current[Object.keys(data)[x]].archive.push(req.body)
                    const body = JSON.stringify(data)
                    await fs.writeFile('users/users.json', body)
                    await fs.writeFile('users/current.json', JSON.stringify(current))
                    res.status(200).send(JSON.stringify({ success: true, archive: data[Object.keys(data)[x]].archive }))
                }
            }
        }
    }
    catch (error) {
        res.status(406).send(JSON.stringify({ success: false, message: 'Ошибка при добавлении записи!' }))
    }
})

module.exports = router
