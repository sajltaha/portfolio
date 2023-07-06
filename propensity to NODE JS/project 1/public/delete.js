let currentUser = JSON.parse(localStorage.getItem("Current:"))
let users = JSON.parse(localStorage.getItem("Data:"))

const btn = document.querySelector('.form__btn')
const inpName = document.querySelector('.form__inp-name')

btn.addEventListener('click', async () => {
    if (inpName == false) {
        alert("Заполните полe!")
    }
    else {
        for (let i = 0; i < users.length; i++) {
            if (users[i].email == inpName.value) {
                users.splice(i, 1)
                localStorage.setItem("Data:", JSON.stringify(users))
                currentUser = []
                localStorage.setItem("Current:", JSON.stringify(currentUser))
                alert('Пользователь был удален!')
                return
            }
        }
        alert("Такого аккаунта не существует!")
    }
})