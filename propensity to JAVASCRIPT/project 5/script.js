window.addEventListener("load", function(){
    const contBlocks = document.querySelectorAll(".content__block")
    const CBs = document.querySelectorAll(".checkbox")
    const TXTs = document.querySelectorAll(".input")
    const EDTs = document.querySelectorAll(".edit")
    const DELs = document.querySelectorAll(".del")
    let timeOne = 0
    let timeTwo = 0
    let timeThree = 0
    let timeFour = 0
    CBs[0].addEventListener("click", function(){
        timeOne++
        if (timeOne % 2 != 0) {
            TXTs[0].style.color = `white`
        }
        else {
            TXTs[0].style.color = `#818181`
        }
    })
    EDTs[0].addEventListener("click", function(){
        if (EDTs[0].value === "Edit") {
            TXTs[0].removeAttribute("readonly", "readonly")
            EDTs[0].value = "Save"
        }
        else {
            TXTs[0].setAttribute("readonly", "readonly")
            EDTs[0].value = "Edit"
        }
    })
    DELs[0].addEventListener("click", function(){
        contBlocks[0].remove()
    })

    CBs[1].addEventListener("click", function(){
        timeTwo++
        if (timeTwo % 2 != 0) {
            TXTs[1].style.color = `white`
        }
        else {
            TXTs[1].style.color = `#818181`
        }
    })
    EDTs[1].addEventListener("click", function(){
        if (EDTs[1].value === "Edit") {
            TXTs[1].removeAttribute("readonly", "readonly")
            EDTs[1].value = "Save"
        }
        else {
            TXTs[1].setAttribute("readonly", "readonly")
            EDTs[1].value = "Edit"
        }
    })
    DELs[1].addEventListener("click", function(){
        contBlocks[1].remove()
    })

    CBs[2].addEventListener("click", function(){
        timeThree++
        if (timeThree % 2 != 0) {
            TXTs[2].style.color = `white`
        }
        else {
            TXTs[2].style.color = `#818181`
        }
    })
    EDTs[2].addEventListener("click", function(){
        if (EDTs[2].value === "Edit") {
            TXTs[2].removeAttribute("readonly", "readonly")
            EDTs[2].value = "Save"
        }
        else {
            TXTs[2].setAttribute("readonly", "readonly")
            EDTs[2].value = "Edit"
        }
    })
    DELs[2].addEventListener("click", function(){
        contBlocks[2].remove()
    })

    CBs[3].addEventListener("click", function(){
        timeFour++
        if (timeFour % 2 != 0) {
            TXTs[3].style.color = `white`
        }
        else {
            TXTs[3].style.color = `#818181`
        }
    })
    EDTs[3].addEventListener("click", function(){
        if (EDTs[3].value === "Edit") {
            TXTs[3].removeAttribute("readonly", "readonly")
            EDTs[3].value = "Save"
        }
        else {
            TXTs[3].setAttribute("readonly", "readonly")
            EDTs[3].value = "Edit"
        }
    })
    DELs[3].addEventListener("click", function(){
        contBlocks[3].remove()
    })
})