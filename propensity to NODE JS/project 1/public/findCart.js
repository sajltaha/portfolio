const btn = document.querySelector('button')
const inp = document.querySelector('input')

let currentUser = JSON.parse(localStorage.getItem("Current:"))
let users = JSON.parse(localStorage.getItem("Data:"))

btn.addEventListener('click', () => {
    if (inp.value == false) {
        alert("Заполните все поля!")
    }
    else {
        for (let i = 0; i < users.length; i++) {
            if (users[i].email == inp.value) {
                currentUser = []
                currentUser.push({
                    email: inp.value,
                })
                localStorage.setItem("Current:", JSON.stringify(currentUser))
                return
            }
        }
        alert("Такого пользователя не существует!")
    }
})