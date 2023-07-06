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

let data = JSON.parse(localStorage.getItem("Data:")) || []
let currentUser = JSON.parse(localStorage.getItem("Current:")) || []

chooseSpanOne.addEventListener("click", function () {
    chooseSpanOne.style.color = 'brown'
    loginReg.style.display = 'flex'
    chooseSpanTwo.style.color = 'black'
    signupReg.style.display = 'none'
    clearOne()
})

chooseSpanTwo.addEventListener("click", function () {
    chooseSpanTwo.style.color = 'brown'
    signupReg.style.display = 'flex'
    chooseSpanOne.style.color = 'black'
    loginReg.style.display = 'none'
    clearTwo()
})

signupBlockButton.addEventListener("click", function (e) {
    if (signupBlockEmail.value == false || signupBlockPassword.value == false || signupBlockAgain.value == false) {
        alert("Заполните все поля")
    }
    else if (signupBlockPassword.value !== signupBlockAgain.value) {
        alert("Пароли не идентичны")
    }
    else if (data.length == 0) {
        data.push({
            email: signupBlockEmail.value,
            password: signupBlockPassword.value,
            cart: [],
        })
        localStorage.setItem("Data:", JSON.stringify(data))
        clearOne()
        setTimeout(() => {
            alert("Вы успешно зарегистрировались, вернитесь в секцию Log in, и введите свои данные")
        }, 1000)
    }
    else if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].email == signupBlockEmail.value) {
                alert("Такой пользователь уже существует")
                return
            }
        }
        data.push({
            email: signupBlockEmail.value,
            password: signupBlockPassword.value,
            cart: [],
        })
        localStorage.setItem("Data:", JSON.stringify(data))
        clearOne()
        setTimeout(() => {
            alert("Вы успешно зарегистрировались, вернитесь в секцию Log in, и введите свои данные")
        }, 1000)
    }
})

loginBlockButton.addEventListener("click", function(e) {
    if (loginBlockEmail.value == false || loginBlockPassword.value == false) {
        alert("Заполните все поля")
    }
    else if (data.length == 0) {
        alert("Неверный email, либо password")
    }
    else if (data.length > 0) {
        for (let x = 0; x < data.length; x++) {
            if (data[x].email == loginBlockEmail.value) {
                if (data[x].password !== loginBlockPassword.value) {
                    alert("Неверный email, либо password")
                    return
                }
                else {
                    currentUser = []
                    currentUser.push({
                        email: loginBlockEmail.value,
                    })
                    localStorage.setItem("Current:", JSON.stringify(currentUser))
                    clearTwo()
                    window.location.href = `html/indexTwo.html`
                    return
                }
            }
        }
        alert("Неверный email, либо password")
    }
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