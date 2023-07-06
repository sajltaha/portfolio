const calculator = document.calculator

const displayIn = calculator.displayIn
const displayOut = calculator.displayOut

const blockOne = document.querySelector(".block__one")
const blockOneBtns = blockOne.querySelectorAll("input")
blockOneBtns[0].onclick = function () {
    displayIn.value = ''
    displayOut.value = ''
}
blockOneBtns[1].onclick = function () {
    displayIn.value += '/'
}

const blockTwo = document.querySelector(".block__two")
const blockTwoBtns = blockTwo.querySelectorAll("input")
let sortTwo = blockTwoBtns.forEach((item) => {
    item.addEventListener("click", function () {
        displayIn.value += item.value
    })
})

const blockThree = document.querySelector(".block__three")
const blockThreeBtns = blockThree.querySelectorAll("input")
let sortThree = blockThreeBtns.forEach((item) => {
    item.addEventListener("click", function () {
        displayIn.value += item.value
    })
})

const blockFour = document.querySelector(".block__four")
const blockFourBtns = blockFour.querySelectorAll("input")
let sortFour = blockFourBtns.forEach((item) => {
    item.addEventListener("click", function () {
        displayIn.value += item.value
    })
})

const blockFive = document.querySelector(".block__five")
const blockFiveBtns = blockFive.querySelectorAll("input")
blockFiveBtns[0].onclick = function () {
    displayIn.value += '.'
}
blockFiveBtns[1].onclick = function () {
    displayIn.value += '0'
}
blockFiveBtns[2].onclick = function () {
    displayIn.value = displayIn.value.toString().slice(0, -1)
}
blockFiveBtns[3].onclick = function () {
    displayOut.value = eval(displayIn.value)
}