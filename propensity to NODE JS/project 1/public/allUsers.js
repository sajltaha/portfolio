const container = document.querySelector('.container')
let users = JSON.parse(localStorage.getItem("Data:"))

function getItems(users) {
    container.innerHTML = ''
    for (let i = 0; i < users.length; i++) {
        let item = users[i]
        showItems(item)
    }
}
getItems(users)

function showItems(item) {
    let html = `
        <p>Email: <span> <span class="colorless">-</span>${item.email}</span> <span class="colorless">--------</span> Password: <span><span class="colorless">-</span>${item.password}</span></p>
    `
    container.insertAdjacentHTML('beforeend', html)
}