const btnAdd = document.querySelector(".creater__add")
const inpOne = document.querySelector(".creater__num-one")
const inpTwo = document.querySelector(".creater__num-two")
const selector = document.querySelector(".creater__selector")
const results = document.querySelector(".results")
let res

let data = JSON.parse(localStorage.getItem("nums:")) || []

btnAdd.addEventListener("click", (e) => {
    e.preventDefault()
    if (inpOne.value == false || inpTwo.value == false) {
        alert("pls write fully")
    }
    else if (inpOne.value / 1 != inpOne.value || inpTwo.value / 1 != inpTwo.value) {
        inpOne.value = ''
        inpTwo.value = ''
        alert("pls write only numbers")
    }
    else {
        if (selector.value === "+") {
            res = (+(inpOne.value) + (+(inpTwo.value)))
            data.push({
                num: res,
            })
            localStorage.setItem("nums:", JSON.stringify(data))
            inpOne.value = ''
            inpTwo.value = ''
            showlist()
        }
        else if (selector.value === "-") {
            res = (+(inpOne.value) - (+(inpTwo.value)))
            data.push({
                num: res,
            })
            localStorage.setItem("nums:", JSON.stringify(data))
            inpOne.value = ''
            inpTwo.value = ''
            showlist()
        }
        else if (selector.value === "*") {
            res = (+(inpOne.value) * (+(inpTwo.value)))
            data.push({
                num: res,
            })
            localStorage.setItem("nums:", JSON.stringify(data))
            inpOne.value = ''
            inpTwo.value = ''
            showlist()
        }
        else if (selector.value === "/") {
            res = (+(inpOne.value) / (+(inpTwo.value)))
            data.push({
                num: res,
            })
            localStorage.setItem("nums:", JSON.stringify(data))
            inpOne.value = ''
            inpTwo.value = ''
            showlist()
        }
    }
})

function showlist() {
    let outPut = ''
    data.forEach((value, index) => {
        outPut += `
            <div class="results__block">
                <input type="text" class="results__block__inp" value="${value.num}" readonly>
                <button class="results__block__btn" onclick="deleteItem(${index})">Delete</button>
            </div>
        `
    });
    results.innerHTML = outPut
}
showlist()

function deleteItem(index) {
    data.splice(index, 1)
    localStorage.setItem("nums:", JSON.stringify(data))
    showlist()
}