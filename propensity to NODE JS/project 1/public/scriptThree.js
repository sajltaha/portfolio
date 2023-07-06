let navbarLogout = document.querySelector(".navbar__logout")
let navbarCatalog = document.querySelector(".navbar__catalog")
let navbarTotalInp = document.querySelector(".navbar__total__inp")
let navbarTotalBtn = document.querySelector(".navbar__total__btn")

let content = document.querySelector(".content")
let contentP = document.querySelector(".content p")

let currentUser = JSON.parse(localStorage.getItem("Current:"))
let users = JSON.parse(localStorage.getItem("Data:"))

let prices = []
let totalPrice = 0
let fixedNum = 0

// ===================================================================

function check() {
    let userNow
    for (let i = 0; i < users.length; i++) {
        if (users[i].email == currentUser[0].email) {
            userNow = users[i]
        }
    }
    let userNowCart = userNow.cart
    getItemsOne(userNowCart)
}
check()

function getItemsOne(userNowCart) {
    for (let q = 0; q < userNowCart.length; q++) {
        let newDataOne = userNowCart[q]
        let userNowCartLength = userNowCart.length
        showItemsOne(newDataOne, userNowCartLength, userNowCart)
    }
}

function showItemsOne(newDataOne, userNowCartLength, userNowCart) {
    let html = `
        <div class="content__card">
            <div class="content__card__img">
                <img src="${newDataOne.image}" alt="#">
            </div>
            <div class="content__card__details">
                <div class="content__card__details__left">
                    <p>${newDataOne.title}</p>
                </div>
                <div class="content__card__details__right">
                    <p>$${newDataOne.price}</p>
                    <img src="block-regular-48.png" alt="#">
                </div>
            </div> 
        </div>
    `
    content.insertAdjacentHTML("beforeend", html)

    prices.push(newDataOne.price)

    let contentCardDetailsRightImg = document.querySelectorAll(".content__card__details__right img")

    if (contentCardDetailsRightImg.length == userNowCartLength) {
        for (let w = 0; w < prices.length; w++) {
            totalPrice += prices[w]
        }
        navbarTotalInp.value = '$' + totalPrice

        for (let c = 0; c < users.length; c++) {
            if (users[c].email == currentUser[0].email) {
                fixedNum += c
            }
        }

        for (let r = 0; r < userNowCart.length; r++) {
            contentCardDetailsRightImg[r].addEventListener("click", async function (e) {
                userNowCart.splice(r, 1)
                console.log(userNowCart)

                users[fixedNum].cart = []
                for (let u = 0; u < userNowCart.length; u++) {
                    users[fixedNum].cart.push(userNowCart[u])
                }
                localStorage.setItem("Data:", JSON.stringify(users))
                location.reload()
                let response = await fetch('/cart', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(
                        {
                            email: users[fixedNum].email,
                            password: users[fixedNum].password,
                            cart: users[fixedNum].cart
                        }
                    )
                })
                response = await response.json()
            })
        }
    }
}

// ===================================================================

navbarCatalog.addEventListener("click", function (e) {
    window.location.href = `indexTwo.html`
})

navbarLogout.addEventListener("click", function (e) {
    window.location.href = `index.html`
})

navbarTotalBtn.addEventListener("click", async (e) => {
    if (navbarTotalInp.value == false) {
        alert("У вас нету товаров")
    }
    else {
        users[fixedNum].cart = []
        localStorage.setItem("Data:", JSON.stringify(users))
        
        alert("Спасибо за покупку!")
        let response = await fetch('/cart', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    email: users[fixedNum].email,
                    password: users[fixedNum].password,
                    cart: users[fixedNum].cart
                }
            )
        }).then(location.reload())
        response = await response.json()
    }
})