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
                weatherImg.src = "images/rain.png"
                break;

                case "Clouds":
                weatherImg.src = "images/clouds.png"
                break;


                case "Clear":
                weatherImg.src = "images/clear.png"
                break;


                case "Snow":
                weatherImg.src = "images/snow.png"
                break;
        
            default:
                break;
        }

    })

    .catch(err =>{
        console.log(`err${err}`)
    })
}


// add a function to get the current location of the user
function getLocation() {
    if (navigator.geolocation) {
        return navigator.geolocation.getCurrentPosition();
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}



const cityInput = document.getElementById("city-name");
const resultsContainer = document.getElementById("autocomplete-results");

cityInput.addEventListener("input", (event) => {
  const searchTerm = event.target.value;

  if (searchTerm.length >= 2) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=YOUR_API_KEY`)
      .then(response => response.json())
      .then(data => {
        clearResults(); // Clear previous results
        if (data.cod === 200) { // Check for successful response
          const suggestions = data.list.map(city => ({ label: city.name }));
          displayResults(searchResults);
        } else {
          console.error(`Error: ${data.message}`);
        }
      })
      .catch(error => console.error(error));
  } else {
    clearResults();
  }
});

function clearResults() {
  resultsContainer.innerHTML = "";
}

function displayResults(results) {
  results.forEach(result => {
    const listItem = document.createElement("li");
    
    const textContent = `
      <span onclick="handleCitySelection(event, '${result.label}')">
        ${result.label}
      </span>
    `;
    
    resultsContainer.appendChild(listItem);
  });
}

function handleCitySelection(event, cityName) {
  cityInput.value = cityName;

  clearResults();
}
