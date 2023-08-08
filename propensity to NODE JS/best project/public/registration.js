const signinUsername = document.querySelector('.signin__username')
const signinPassword = document.querySelector('.signin__password')
const signinButton = document.querySelector('.signin__block button')

const loginUsername = document.querySelector('.login__username')
const loginPassword = document.querySelector('.login__password')
const loginButton = document.querySelector('.login__block button')

const signinAlert = document.querySelector('.signin__alert')
const loginAlert = document.querySelector('.login__alert')

signinButton.addEventListener('click', async (e) => {
    e.preventDefault()
    await fetch('/registration/signin', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: signinUsername.value,
            password: signinPassword.value,
            toDo: []
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success == false) {
                signinAlert.style.color = 'brown'
                signinAlert.innerHTML = data.message
                setTimeout(function () {
                    signinAlert.innerHTML = ''
                }, 1500)
            }
            else {
                signInClear()
                signinAlert.style.color = '#22A699'
                signinAlert.innerHTML = data.message
                setTimeout(function () {
                    signinAlert.innerHTML = ''
                }, 1500)
            }
        })
})

loginButton.addEventListener('click', async (e) => {
    e.preventDefault()
    await fetch('/registration/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: loginUsername.value,
            password: loginPassword.value,
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success == false) {
                loginAlert.style.color = 'brown'
                loginAlert.innerHTML = data.message
                setTimeout(function () {
                    loginAlert.innerHTML = ''
                }, 1500)
            }
            else {
                logInClear()
                window.location.href = 'main.html'
            }
        })
})

function signInClear() {
    signinUsername.value = ''
    signinPassword.value = ''
}

function logInClear() {
    loginUsername.value = ''
    loginPassword.value = ''
}