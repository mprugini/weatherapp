const appKey = "5d081203abfade4c6a3684b17b51bf02";

let searchButton = document.getElementById("search-btn");
let searchInput = document.getElementById("search-txt");
let cityName = document.getElementById("city-name");
let icon = document.getElementById("icon");
let iconDescription = document.getElementById("icon_description");
let temperature = document.getElementById("temp");
let humidity = document.getElementById("humidity-div");
let windSpeed = document.getElementById("wind-speed");
let windDirection = document.getElementById("wind-direction");

//listen for action from input/search
searchButton.addEventListener("click", findWeatherDetails);
searchInput.addEventListener("keyup", enterPressed);

//if you hit enter while typing into input field call function 
function enterPressed(event){
	if (event.key === "Enter"){
		findWeatherDetails();
	}
}

function findWeatherDetails(){
	if (searchInput.value === ""){}
	else {
		let searchLink = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput.value + "&appid=" + appKey;
		httpRequestAsync(searchLink, theResponse);
	}
}

function theResponse(response){
	let jsonObject = JSON.parse(response);
	cityName.innerHTML = jsonObject.name + ", " + jsonObject.sys.country;
	icon.src = "http://openweathermap.org/img/w/" + jsonObject.weather[0].icon + ".png";
	iconDescription.innerHTML = jsonObject.weather[0].description;
	temperature.innerHTML = parseInt(jsonObject.main.temp - 273) + "&#8451;";
	humidity.innerHTML = jsonObject.main.humidity + "%";
	windSpeed.innerHTML = jsonObject.wind.speed;
	windDirection.innerHTML = jsonObject.wind.deg + "&#176;";
}

function httpRequestAsync(url, callback)
{
  console.log("hello");
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = () => { 
        if (httpRequest.readyState == 4 && httpRequest.status == 200)
            callback(httpRequest.responseText);
    }
    httpRequest.open("GET", url, true); // true for asynchronous 
    httpRequest.send();
}