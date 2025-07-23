let userInput = document.querySelector("#cityName");
let apiKey = "7a29cea1eb38b2db74d10f93ec3f9f6e";
let updateData = document.querySelector(".city-details");
let messageBox = document.querySelector(".message");
let didYouKnow = document.querySelector(".did-you-know")

userInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    const cityName = userInput.value.trim();
    if (cityName !== "") {
      getLatLong(cityName);
      userInput.value = "";
    }
  }
});

async function getLatLong(cityName) {
  const limit = 1;
  try {
    let response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${limit}&appid=${apiKey}`
    );
    let data = await response.json();
    if (data.length > 0) {
      let lat = data[0].lat;
      let lon = data[0].lon;
      getCityData(lat, lon, cityName);
    } else {
      console.log("City not found");
      messageBox.innerHTML = "❌ City not found. Please try again.";
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error);
  }
}

async function getCityData(lat, lon, cityName) {
  try {
    let cityDetails = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
    );
    let cityData = await cityDetails.json();
    let cityTemp = cityData.main.temp;
    let currCityName = cityName.toUpperCase();
    updateData.innerHTML = `Current Temperature in ${currCityName} : ${cityTemp}&deg;`;
    messageBox.innerHTML = "Loading city fact...";
    getCityFacts(cityName);
  } catch (error) {
    console.log("Error fetching city data.");
  }
}

async function getCityFacts(cityName) {
  try {
    let city = cityName.trim().toLowerCase();
    let response = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${city}`
    );
    let data = await response.json();
    let cityFact = data.extract || "No fun facts found for this city.";
    didYouKnow.style.display = "block";
    messageBox.innerHTML = cityFact;
  } catch (error) {
    messageBox.innerHTML = "❌ Error fetching city fact!";
  }
}
