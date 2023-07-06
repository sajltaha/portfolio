const container = document.querySelector(".container")
const containerInner = document.querySelector(".container__inner")
const input = document.querySelector(".search__inp")
const select = document.querySelector(".search__slct")
const button = document.querySelector(".search__btn")
const spanOne = document.querySelector(".span-one")
const spanTwo = document.querySelector(".span-two")
// ---------------------------------------------------------
const startingFuncOne = async function () {
    const responseOne = await fetch(`https://dummyjson.com/todos`)
    const dataOne = await responseOne.json()
    const innerOne = dataOne.todos
    containerInner.innerHTML = ''

    for (let i = 0; i < innerOne.length; i++) {
        if (innerOne[i].completed == true) {
            let lastDataOne = innerOne[i]
            showItemsOne(lastDataOne)
        }
    }
}

const startingFuncTwo = async function () {
    const responseTwo = await fetch(`https://dummyjson.com/todos`)
    const dataTwo = await responseTwo.json()
    const innerTwo = dataTwo.todos
    containerInner.innerHTML = ''

    for (let x = 0; x < innerTwo.length; x++) {
        if (innerTwo[x].completed == false) {
            let lastDataTwo = innerTwo[x]
            showItemsOne(lastDataTwo)
        }
    }
}

const startingFuncThree = async function () {
    const responseThree = await fetch(`https://dummyjson.com/todos`)
    const dataThree = await responseThree.json()
    const innerThree = dataThree.todos
    containerInner.innerHTML = ''

    for (let q = 0; q < innerThree.length; q++) {
        if (innerThree[q].completed == true) {
            let lastDataThree = innerThree[q]
            showItemsThree(lastDataThree)
        }
    }
}

const startingFuncFour = async function () {
    const responseFour = await fetch(`https://dummyjson.com/todos`)
    const dataFour = await responseFour.json()
    const innerFour = dataFour.todos
    containerInner.innerHTML = ''

    for (let w = 0; w < innerFour.length; w++) {
        if (innerFour[w].completed == false) {
            let lastDataFour = innerFour[w]
            showItemsFour(lastDataFour)
        }
    }
}
// ---------------------------------------------------------
function showItemsOne(lastDataOne) {
    let html = `
        <h3>${lastDataOne.todo}</h3>
    `
    containerInner.insertAdjacentHTML("beforeend", html)
}

function showItemsTwo(lastDataTwo) {
    let htmlTwo = `
        <h3>${lastDataTwo.todo}</h3>
    `
    containerInner.insertAdjacentHTML("beforeend", htmlTwo)
}

function showItemsThree(lastDataThree) {
    let txt = lastDataThree.todo.toLowerCase()
    let txtu = lastDataThree.todo.toUpperCase()
    let boolOne = txt.includes(input.value.toLowerCase())
    let boolOneu = txtu.includes(input.value.toUpperCase())
    if (boolOne == true || boolOneu == true) {
        let htmlThree = `
            <h3 class="colorly">${lastDataThree.todo}</h3>
        `
        containerInner.insertAdjacentHTML("beforeend", htmlThree)
    }
    else {
        let htmlThreq = `
            <h3>${lastDataThree.todo}</h3>
        `
        containerInner.insertAdjacentHTML("beforeend", htmlThreq)
    }
}

function showItemsFour(lastDataFour) {
    let txtTwo = lastDataFour.todo.toLowerCase()
    let txtTwou = lastDataFour.todo.toUpperCase()
    let boolTwo = txtTwo.includes(input.value.toLowerCase())
    let boolTwou = txtTwou.includes(input.value.toUpperCase())
    if (boolTwo == true || boolTwou == true) {
        let htmlFour = `
            <h3 class="colorly">${lastDataFour.todo}</h3>
        `
        containerInner.insertAdjacentHTML("beforeend", htmlFour)
    }
    else {
        let htmlFouq = `
            <h3>${lastDataFour.todo}</h3>
        `
        containerInner.insertAdjacentHTML("beforeend", htmlFouq)
    }
}
// ---------------------------------------------------------
button.addEventListener("click", function (e) {
    if (input.value == false) {
        if (select.value == "Completed") {
            spanOne.style.color = `brown`
            spanTwo.style.color = `black`
            startingFuncOne()
        }
        else {
            spanOne.style.color = `black`
            spanTwo.style.color = `brown`
            startingFuncTwo()
        }
    }
    else {
        if (select.value == "Completed") {
            spanOne.style.color = `brown`
            spanTwo.style.color = `black`
            startingFuncThree()
        }
        else {
            spanOne.style.color = `black`
            spanTwo.style.color = `brown`
            startingFuncFour()
        }
    }
})