let content = document.querySelector(".content")

let navbarLogout = document.querySelector(".navbar__logout")
let navbarCart = document.querySelector(".navbar__cart")
let navbarSeacrhInp = document.querySelector(".navbar__search__inp")
let navbarSeacrhBtn = document.querySelector(".navbar__search__btn")

let navbarFilterSlct = document.querySelector(".navbar__filter__slct")
let navbarFilterBtn = document.querySelector(".navbar__filter__btn")

// =====================================================================

function getItemsOne() {
    return fetch(`https://fakestoreapi.com/products`,
        {
            method: 'GET',
        }
    )
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                let newDataOne = data[i]
                let dataLengthOne = data.length
                let overallDataOne = data
                showItemsOne(newDataOne, dataLengthOne, overallDataOne)
            }
        })
}
getItemsOne()

function getItemsTwo(searchInpValue) {
    return fetch(`https://fakestoreapi.com/products`,
        {
            method: 'GET',
        }
    )
        .then(response => response.json())
        .then(data => {
            let arrForTwo = []
            content.innerHTML = ''
            for (let x = 0; x < data.length; x++) {
                if (data[x].title.toLowerCase().includes(searchInpValue.toLowerCase())) {
                    arrForTwo.push(data[x])
                }
            }
            for (let p = 0; p < arrForTwo.length; p++) {
                let newDataTwo = arrForTwo[p]
                let dataLengthTwo = arrForTwo.length
                showItemsOne(newDataTwo, dataLengthTwo, arrForTwo)
            }
            if (content.innerHTML == '') {
                alert("Такого продукта не существует")
                getItemsOne()
            }
        })
}

function getItemsThree(searchInpValue) {
    return fetch(`https://fakestoreapi.com/products`,
        {
            method: 'GET',
        }
    )
        .then(response => response.json())
        .then(data => {
            let arrForThree = []
            for (let q = 0; q < data.length; q++) {
                if (data[q].category == "men's clothing") {
                    arrForThree.push(data[q])
                }
            }
            for (let a = 0; a < arrForThree.length; a++) {
                let newDataThree = arrForThree[a]
                let dataLengthThree = arrForThree.length
                showItemsOne(newDataThree, dataLengthThree, arrForThree)
            }
        })
}

function getItemsFour(searchInpValue) {
    return fetch(`https://fakestoreapi.com/products`,
        {
            method: 'GET',
        }
    )
        .then(response => response.json())
        .then(data => {
            let arrForFour = []
            for (let w = 0; w < data.length; w++) {
                if (data[w].category == "jewelery") {
                    arrForFour.push(data[w])
                }
            }
            for (let s = 0; s < arrForFour.length; s++) {
                let newDataFour = arrForFour[s]
                let dataLengthFour = arrForFour.length
                showItemsOne(newDataFour, dataLengthFour, arrForFour)
            }
        })
}

function getItemsFive(searchInpValue) {
    return fetch(`https://fakestoreapi.com/products`,
        {
            method: 'GET',
        }
    )
        .then(response => response.json())
        .then(data => {
            let arrForFive = []
            for (let r = 0; r < data.length; r++) {
                if (data[r].category == "electronics") {
                    arrForFive.push(data[r])
                }
            }
            for (let d = 0; d < arrForFive.length; d++) {
                let newDataFive = arrForFive[d]
                let dataLengthFive = arrForFive.length
                showItemsOne(newDataFive, dataLengthFive, arrForFive)
            }
        })
}

function getItemsSix(searchInpValue) {
    return fetch(`https://fakestoreapi.com/products`,
        {
            method: 'GET',
        }
    )
        .then(response => response.json())
        .then(data => {
            let arrForSix = []
            for (let e = 0; e < data.length; e++) {
                if (data[e].category == "women's clothing") {
                    arrForSix.push(data[e])
                }
            }
            for (let f = 0; f < arrForSix.length; f++) {
                let newDataSix = arrForSix[f]
                let dataLengthSix = arrForSix.length
                showItemsOne(newDataSix, dataLengthSix, arrForSix)
            }
        })
}

// =====================================================================

function showItemsOne(newDataOne, dataLengthOne, overallDataOne) {
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
                    <img src="shopping_cart_2px.svg" alt="#">
                </div>
            </div> 
        </div>
    `
    content.insertAdjacentHTML("beforeend", html)

    let contentCardDetailsRightImg = document.querySelectorAll(".content__card__details__right img")

    let currentUser = JSON.parse(localStorage.getItem("Current:"))
    let users = JSON.parse(localStorage.getItem("Data:"))

    if (contentCardDetailsRightImg.length == dataLengthOne) {
        for (let n = 0; n < contentCardDetailsRightImg.length; n++) {
            contentCardDetailsRightImg[n].addEventListener("click", async function (e) {
                for (let m = 0; m < users.length; m++) {
                    if (users[m].email == currentUser[0].email) {
                        users[m].cart.push(overallDataOne[n])
                        localStorage.setItem("Data:", JSON.stringify(users))
                        alert("Товар успешно добавлен в корзину")

                        let response = await fetch('/catalog', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(
                                {
                                    email: users[m].email,
                                    password: users[m].password,
                                    cart: users[m].cart
                                }
                            )
                        })
                        response = response.json()
                    }
                }
            })
        }
    }
}

// =====================================================================

navbarSeacrhBtn.addEventListener("click", function (e) {
    if (navbarSeacrhInp.value == false) {
        alert("Заполните поле")
        getItemsOne()
    }
    let searchInpValue = navbarSeacrhInp.value
    getItemsTwo(searchInpValue)
})

navbarFilterBtn.addEventListener("click", function (e) {
    if (navbarFilterSlct.value == 'all') {
        content.innerHTML = ''
        getItemsOne()
    }
    else if (navbarFilterSlct.value == "men's clothing") {
        content.innerHTML = ''
        getItemsThree()
    }
    else if (navbarFilterSlct.value == "jewelery") {
        content.innerHTML = ''
        getItemsFour()
    }
    else if (navbarFilterSlct.value == "electronics") {
        content.innerHTML = ''
        getItemsFive()
    }
    else {
        content.innerHTML = ''
        getItemsSix()
    }
})

navbarLogout.addEventListener("click", function(e) {
    window.location.href = `index.html`
})

navbarCart.addEventListener("click", function(e) {
    window.location.href = `indexThree.html`
})