const APIKey = "cfc9164c0ac1332ff96993c31277dca5";

// Nothing lasts, everything changes.
const SearchName = document.getElementById("SearchName");
const SearchBTN = document.getElementById("SearchBTN");
const CityName = document.getElementById("CityName");
const CurrentDate = document.getElementById("Date");
const Temperature = document.getElementById("Temperature");
const Condition = document.getElementById("Condition");
const Wind = document.getElementById("Wind");
const Humidity = document.getElementById("Humidity");
const FeelsLike = document.getElementById("FeelsLike");
const Pressure = document.getElementById("Pressure");
const WeatherContainSummary = document.getElementById("WeatherContainSummary");
const Info = document.getElementById("Info");
const NoInfo = document.getElementById("NoInfo");
// So here's how they be changing:
SearchBTN.addEventListener("click", () => {
  if (SearchName.value.trim() !== "") {
    UpdateWeatherInfo(SearchName.value);
    console.log(SearchName.value);
    SearchName.value = "";
  }
});
SearchName.addEventListener("keydown", (Event) => {
  if (event.key == "Enter" && SearchName.value.trim() !== "") {
    UpdateWeatherInfo(SearchName.value.trim());
    SearchName.value = "";
  }
});
async function getFetchData(endPoint, City) {
  const APIurl = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${City}&appid=${APIKey}&units=metric`;

  const response = await fetch(APIurl);
  return response.json();
}
function GetWeatherIcon(id) {
  if (id >= 200 && id <= 232) return "thunderstorm.svg";
  if (id >= 300 && id <= 321) return "drizzle.svg";
  if (id >= 500 && id <= 531) return "rain.svg";
  if (id >= 600 && id <= 622) return "snow.svg";
  if (id >= 700 && id <= 781) return "atmosphere.svg";
  if (id === 800) return "clear.svg";
  if (id >= 801 && id <= 804) return "clouds.svg";

  return "clouds.svg";
}
function GetCurrentDate() {
  const CurrentDate = new Date();
  const options = {
    weekday: "short",
    day: "2-digit",
    month: "short",
  };
  return CurrentDate.toLocaleDateString("en-GB", options);
}
async function UpdateWeatherInfo(City) {
  const WeatherData = await getFetchData("weather", City);
  console.log(WeatherData);

  const {
    name: country,
    main: { temp, humidity, pressure, feels_like },
    weather: [{ id, main }],
    wind: { speed },
  } = WeatherData;

  CityName.textContent = country;
  CurrentDate.textContent = GetCurrentDate();
  Temperature.textContent = Math.round(temp) + "°C";
  Condition.textContent = main;
  WeatherContainSummary.src = `images/${GetWeatherIcon(id)}`;
  Wind.textContent = speed + "km/h";
  Humidity.textContent = humidity + "%";
  FeelsLike.textContent = Math.round(feels_like) + "°C";
  Pressure.textContent = pressure + "hPa";
  NoInfo.style.display = "none";
  Info.style.display = "block";
}
