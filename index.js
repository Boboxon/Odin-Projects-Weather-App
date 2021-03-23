// getting all values from html
const inputValue = document.getElementById("inputValue");
const locationValue = document.getElementById("location");
const gradus = document.getElementById("gradus");
const weatherIcon = document.getElementById("weatherIcon");
const infoValue = document.getElementById("infoValue");
const form = document.getElementById("form");
const country = document.getElementById("country");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  getDataFromApi();
});

//getting data from api
const baseApi = "https://api.openweathermap.org/data/2.5/weather?q=";

function getDataFromApi() {
  const apiCity = inputValue.value;
  if (apiCity === "" || apiCity.trim() === "") {
    // alert("search location");
    showMessage("Location is not found! Try Again please..", "error");
  } else {
    const apiKey = "&appid=d4c2bd34bf67072d2420f18a611545d9";
    const baseUrlApi = `${baseApi}${apiCity}${apiKey}`;
    showMessage("Location is found", "success");
    fetch(baseUrlApi)
      .then((response) => response.json())
      .then((data) => {
        locationValue.innerText = data.name;
        country.innerText = data.sys.country;
        const gardusInfo = Math.floor(data.main.temp - 273.15);
        gradus.innerText = `${gardusInfo}°C`; //celcius

        infoValue.innerHTML = data.weather[0].main;

        console.log(data);
      })
      .catch((error) => console.log(error));
    clear();
  }
}

function clear() {
  inputValue.value = "";
}
function showMessage(message, classTitle) {
  const div = document.createElement("div");
  //Add Class
  div.className = `alert ${classTitle}`;
  // console.log(div);
  //Add text
  div.appendChild(document.createTextNode(message));
  //get parent
  const container = document.querySelector(".card");
  //get form
  const form = document.querySelector("#book-form");

  //inser alert before the from
  container.insertBefore(div, form);

  //set time and remove alert
  setTimeout(function () {
    document.querySelector(".alert").remove();
  }, 3000);
}
