const panelTitle = document.querySelector('.panel__title')
const panelSubtitle = document.querySelector('.panel__subtitle')
const panelAdd = document.querySelector('.panel__add')
const panelLogout = document.querySelector('.panel__logout')
const panelID = document.querySelector('.panel p')
const container = document.querySelector('.container')
const panelAlert = document.querySelector('.alert')

let prevTtl
let prevSubttl

panelAdd.addEventListener('click', async (e) => {
    await fetch(`/main/noteAdd`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: panelTitle.value,
            subtitle: panelSubtitle.value
        })
    })
        .then(response => response.json())
        .then(data => {
            let arr = data.toDo
            if (data.success == false) {
                panelAlert.style.color = 'brown'
                panelAlert.innerHTML = data.message
                setTimeout(function () {
                    panelAlert.innerHTML = ''
                }, 1500)
            }
            else {
                clear()
                container.innerHTML = ''
                for (let i = 0; i < arr.length; i++) {
                    let data = arr[i]
                    showItems(data, arr.length)
                }
            }
        })
})

panelLogout.addEventListener('click', async (e) => {
    e.preventDefault()
    await fetch('/main/logout', {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.success == false) {
                panelAlert.style.color = 'brown'
                panelAlert.innerHTML = data.message
                setTimeout(function () {
                    panelAlert.innerHTML = ''
                }, 1500)
            }
            else {
                window.location.href = 'registration.html'
            }
        })
})

function clear() {
    panelTitle.value = ''
    panelSubtitle.value = ''
}

async function showItems(data, length) {
    let html = `
        <div class="task">
            <input type="text" class="task__id" readonly value="${data.taskId}">
            <input type="text" class="task__title" readonly placeholder="Title" value="${data.title}">
            <input type="text" class="task__subtitle" readonly placeholder="Subtitle" value="${data.subtitle}">
            <button class="task__edit">Edit</button>
            <button class="task__delete">Delete</button>
        </div>
    `

    container.insertAdjacentHTML("beforeend", html)

    let editBtns = document.querySelectorAll('.task__edit')
    let deleteBtns = document.querySelectorAll('.task__delete')
    let titleBlocks = document.querySelectorAll('.task__title')
    let subtitleBlocks = document.querySelectorAll('.task__subtitle')
    let idBlocks = document.querySelectorAll('.task__id')

    if (editBtns.length == length) {
        for (let i = 0; i < editBtns.length; i++) {
            editBtns[i].addEventListener('click', async (e) => {
                e.preventDefault()
                if (editBtns[i].innerHTML == 'Edit') {
                    editBtns[i].innerHTML = 'Save'
                    titleBlocks[i].removeAttribute('readonly')
                    subtitleBlocks[i].removeAttribute('readonly')
                }
                else if (editBtns[i].innerHTML == 'Save') {
                    await fetch('/main/noteEdit', {
                        method: "POST",
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            title: titleBlocks[i].value,
                            subtitle: subtitleBlocks[i].value,
                            taskId: idBlocks[i].value
                        })
                    })
                        .then(response => response.json())
                        .then(data => {
                            if (data.success == false) {
                                panelAlert.style.color = 'brown'
                                panelAlert.innerHTML = data.message
                                setTimeout(function () {
                                    panelAlert.innerHTML = ''
                                }, 1500)
                            }
                            else {
                                editBtns[i].innerHTML = 'Edit'
                                titleBlocks[i].setAttribute('readonly', 'readonly')
                                subtitleBlocks[i].setAttribute('readonly', 'readonly')
                                getItems()
                            }
                        })
                }
            })
        }

        for (let i = 0; i < deleteBtns.length; i++) {
            deleteBtns[i].addEventListener('click', async (e) => {
                e.preventDefault()
                if (editBtns[i].innerHTML == 'Save') {
                    panelAlert.style.color = 'brown'
                    panelAlert.innerHTML = 'Сохраните внесенные изменения!'
                    setTimeout(function () {
                        panelAlert.innerHTML = ''
                    }, 1500)
                }
                else {
                    await fetch(`/main/noteDelete`, {
                        method: "POST",
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            taskId: idBlocks[i].value
                        })
                    })
                        .then(response => response.json())
                        .then(data => {
                            if (data.success == false) {
                                panelAlert.style.color = 'brown'
                                panelAlert.innerHTML = data.message
                                setTimeout(function () {
                                    panelAlert.innerHTML = ''
                                }, 1500)
                            }
                            else {
                                getItems()
                            }
                        })
                }
            })
        }
    }
}

async function getItems() {
    await fetch('/main/noteAll', {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.success == false) {
                panelID.innerHTML = ''
                panelID.innerHTML = `User ID: ${data.message}`
            }
            else {
                let arr = data.toDo
                container.innerHTML = ''
                for (let i = 0; i < arr.length; i++) {
                    let data = arr[i]
                    showItems(data, arr.length)
                }
                panelID.innerHTML = ''
                panelID.innerHTML = `User ID: ${data.id}`
            }
        })
}

getItems()