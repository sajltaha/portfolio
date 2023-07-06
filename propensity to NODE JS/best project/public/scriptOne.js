let chooseSpanOne = document.querySelector(".choose__span-one")
let chooseSpanTwo = document.querySelector(".choose__span-two")

let loginReg = document.querySelector(".login")
let signupReg = document.querySelector(".signup")

let signupBlockButton = document.querySelector(".signup__block__button")
let signupBlockEmail = document.querySelector(".signup__block__email")
let signupBlockPassword = document.querySelector(".signup__block__password")
let signupBlockAgain = document.querySelector(".signup__block__again")

let loginBlockButton = document.querySelector(".login__block__button")
let loginBlockPassword = document.querySelector(".login__block__password")
let loginBlockEmail = document.querySelector(".login__block__email")

let numOne = 0
let numTwo = 0

chooseSpanOne.addEventListener("click", function () {
    numTwo *= 0
    numOne++
    if (numOne % 2 !== 0) {
        chooseSpanOne.style.color = 'brown'
        loginReg.style.display = 'flex'
        chooseSpanTwo.style.color = 'black'
        signupReg.style.display = 'none'
        clearOne()
    }
    else {
        chooseSpanOne.style.color = 'black'
        loginReg.style.display = 'none'
        chooseSpanTwo.style.color = 'black'
        signupReg.style.display = 'none'
        clearOne()
    }
})

chooseSpanTwo.addEventListener("click", function () {
    numOne *= 0
    numTwo++
    if (numTwo % 2 !== 0) {
        chooseSpanTwo.style.color = 'brown'
        signupReg.style.display = 'flex'
        chooseSpanOne.style.color = 'black'
        loginReg.style.display = 'none'
        clearTwo()
    }
    else {
        chooseSpanTwo.style.color = 'black'
        signupReg.style.display = 'none'
        chooseSpanOne.style.color = 'black'
        loginReg.style.display = 'none'
        clearTwo()
    }
})

signupBlockButton.addEventListener("click", async function (e) {
    e.preventDefault()
    await fetch('/registration/signup', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: signupBlockEmail.value,
            password: signupBlockPassword.value,
            passwordTwo: signupBlockAgain.value,
            archive: []
        })
    })
        .then(response => response.json())
        .then(data => {
            if (!data.success) {
                alert(`${data.message}`)
            }
            else {
                alert(`${data.message}`)
                clearOne()
            }
        })
})

loginBlockButton.addEventListener("click", async function (e) {
    e.preventDefault()
    await fetch('/registration/login', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: loginBlockEmail.value,
            password: loginBlockPassword.value
        })
    })
        .then(response => response.json())
        .then(data => {
            if (!data.success) {
                alert(`${data.message}`)
            }
            else {
                clearTwo()
                window.location.href = 'indexTwo.html'
            }
        })
})

function clearOne() {
    signupBlockAgain.value = ''
    signupBlockEmail.value = ''
    signupBlockPassword.value = ''
}

function clearTwo() {
    loginBlockEmail.value = ''
    loginBlockPassword.value = ''
}