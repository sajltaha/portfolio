const noteTtl = document.querySelector('.note_ttl')
const noteSubttl = document.querySelector('.note_subttl')
const noteBtn = document.querySelector('.note_btn')
const noteBtnLogout = document.querySelector('.note_btnLogout')
const notes = document.querySelector('.notes')
const noteOnline = document.querySelector('.note_online')

let arr
let arrTwo

let prevTtl
let prevSubttl

noteBtn.addEventListener("click", async () => {
    await fetch('/main/createNote', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: noteTtl.value,
            subtitle: noteSubttl.value
        })
    })
        .then(response => response.json())
        .then(data => {
            if (!data.success) {
                alert(data.message)
            }
            else {
                clear()
                notes.innerHTML = ''
                arrTwo = data.archive
                for (let a = 0; a < arrTwo.length; a++) {
                    let dataTwo = arrTwo[a]
                    showItems(dataTwo, arrTwo.length)
                }
            }
        })
})

noteBtnLogout.addEventListener("click", async function (e) {
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
                alert(data.message)
            }
            else {
                window.location.href = 'indexOne.html'
            }
        })
})

function clear() {
    noteTtl.value = ''
    noteSubttl.value = ''
}

async function getItems() {
    await fetch('/main/notes', {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.success == true) {
                console.log(data.archive)
                arr = data.archive
                notes.innerHTML = ''
                for (let i = 0; i < arr.length; i++) {
                    let data = arr[i]
                    showItems(data, arr.length)
                }
                noteOnline.innerHTML = ''
                noteOnline.innerHTML = `Current user ID: ${data.id}`
            }
            else {
                noteOnline.innerHTML = ''
                noteOnline.innerHTML = `${data.message}`
            }
        })
}

getItems()

async function showItems(data, length) {
    let html = `
        <div class="note_block">
            <input type="text" class="note_block_ttl" readonly placeholder="Title" value="${data.title}">
            <textarea type="text" class="note_block_subttl" readonly placeholder="Subtitle">${data.subtitle}</textarea>
            <button class="note_block_btnChange">Edit</button>
            <button class="note_block_btnDelete">Delete</button>
        </div>
    `

    notes.insertAdjacentHTML("beforeend", html)

    let allChangeBtns = document.querySelectorAll('.note_block_btnChange')
    let allDeleteBtns = document.querySelectorAll('.note_block_btnDelete')
    let allTtlBlocks = document.querySelectorAll('.note_block_ttl')
    let allSubttlBlocks = document.querySelectorAll('.note_block_subttl')

    if (allChangeBtns.length == length) {
        for (let q = 0; q < allChangeBtns.length; q++) {
            allChangeBtns[q].addEventListener("click", async () => {
                if (allChangeBtns[q].innerHTML == 'Edit') {
                    prevTtl = allTtlBlocks[q].value
                    prevSubttl = allSubttlBlocks[q].value
                    allChangeBtns[q].innerHTML = 'Save'
                    allTtlBlocks[q].removeAttribute('readonly')
                    allSubttlBlocks[q].removeAttribute('readonly')
                    console.log(prevTtl, prevSubttl)
                }
                else if (allChangeBtns[q].innerHTML == 'Save') {
                    await fetch('/main/changeNote', {
                        method: "POST",
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            title: allTtlBlocks[q].value,
                            subtitle: allSubttlBlocks[q].value,
                            preventTitle: prevTtl,
                            preventSubtitle: prevSubttl
                        })
                    })
                        .then(response => response.json())
                        .then(data => {
                            if (data.success == false) {
                                alert(data.message)
                            }
                            else {
                                allChangeBtns[q].innerHTML = 'Edit'
                                allTtlBlocks[q].setAttribute('readonly', 'readonly')
                                allSubttlBlocks[q].setAttribute('readonly', 'readonly')
                                getItems()
                            }
                        })
                }
            })
        }
        for (let n = 0; n < allDeleteBtns.length; n++) {
            allDeleteBtns[n].addEventListener("click", async () => {
                if (allChangeBtns[n].innerHTML == 'Save') {
                    alert("Сохраните ваши изменения!")
                }
                else {
                    await fetch(`/main/deleteNote`, {
                        method: "POST",
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            title: allTtlBlocks[n].value,
                            subtitle: allSubttlBlocks[n].value
                        })
                    })
                        .then(response => response.json())
                        .then(data => {
                            if (data.success == true) {
                                getItems()
                            }
                            else {
                                alert(data.message)
                            }
                        })
                }
            })
        }
    }
}