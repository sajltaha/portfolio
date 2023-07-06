const container = document.querySelector(".main")
const inp = document.querySelector(".creater input")
const btn = document.querySelector(".creater button")

btn.addEventListener("click", function(e){
    e.preventDefault()
    if (inp.value == false) {
        alert("write smthng")
    }
    else {
        let nameOfCity = inp.value
        inp.value = ''
        dataOfWeather(nameOfCity)
    }
})

function dataOfWeather(name) {
    const request = new XMLHttpRequest()
    request.open(`GET`, `http://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=1&appid=67a762e7be38765a887247105167a8c4`)
    request.send()

    request.addEventListener("load", function(){
        let data = JSON.parse(request.responseText)[0]
        if (data == undefined) {
            alert("city is undefined")
            return
        }

        let lat = data.lat
        let lon = data.lon

        const requestTwo = new XMLHttpRequest()
        requestTwo.open(`GET`, `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=67a762e7be38765a887247105167a8c4`)
        requestTwo.send()

        requestTwo.addEventListener("load", function(){
            let newData = JSON.parse(requestTwo.responseText)

            showItems(newData)
        })
    })
}
function showItems(newData) {
    let typeOfWeather = newData.weather[0].description
    let temp = Math.ceil((newData.main.temp) - 273.15)
    let feels = Math.ceil((newData.main.feels_like) - 273.15)
    let html = `
        <div class="card">
            <h2>${newData.name}</h2>
            <h4>Type of weather: <span>${typeOfWeather}</span></h4>
            <h4>Temperature: <span>${temp} C</span></h4>
            <h4>Feels like: <span>${feels} C</span></h4>
            <h4>Pressure: <span>${newData.main.pressure} hPa</span></h4>
            <h4>Speed of wind: <span>${newData.wind.speed} m/s</span></h4>
        </div>
    `
    container.insertAdjacentHTML("beforeend", html)
}