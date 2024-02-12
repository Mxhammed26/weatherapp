
const search = document.querySelector('button')

const weatherImg = document.querySelector(".weatherImg")
console.log(weatherImg)

search.addEventListener('click',getFetch)


function getFetch(){

    let enterdCityName = document.querySelector("input").value
    const APIkey = 'd5e095cb262078602bf9cc75cbc41c0e'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${enterdCityName}&appid=${APIkey}&units=metric`




    fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        document.querySelector(".city-name").innerText = data.name
        document.querySelector(".temperature").innerText = `${data.main.temp}°C`

        document.getElementById('windVar').innerText = `${data.wind.speed}klm`



        switch (data.weather[0].main) {
            case "Rain":
                weatherImg.src = "/weather-app-img/images/rain.png"
                break;

                case "Clouds":
                weatherImg.src = "/weather-app-img/images/clouds.png"
                break;


                case "Clear":
                weatherImg.src = "/weather-app-img/images/clear.png"
                break;


                case "Snow":
                weatherImg.src = "/weather-app-img/images/snow.png"
                break;
        
            default:
                break;
        }

    })

    .catch(err =>{
        console.log(`err${err}`)
    })
}