// JavaScript for Api Weather app 

const city = document.querySelector("#input");
const temp = document.querySelector(".temp");
const Name = document.querySelector("#info1");
const theme = document.querySelector("#theme")
const weathercard = document.querySelector(".weathercard");
const des = document.querySelector(".description");
const wind = document.querySelector(".wind");
const visibility = document.querySelector(".vcbility");
const humid = document.querySelector(".humid");
const srise = document.querySelector(".srise");
const sset = document.querySelector(".sset");
const pressure = document.querySelector(".pressure");
const feels_like = document.querySelector(".feels_like");



window.onload = () => {
    city.focus();
    getWeather("new delhi");
    const savedTheme =localStorage.getItem("theme");

    if (savedTheme==="dark") {
        document.body.classList.add("dark");
        theme.innerText = "☀️Light Mode";
    } else {
        theme.innerText = "🌙Dark Mode";
    }
}

async function getWeather(cityName) {

    const response = await fetch(`/weather?city=${cityName}`, {
        method: "GET",
    })


    const data = await response.json();


    function time(timestamp) {
        return new Date(timestamp * 1000).toLocaleTimeString([], {

            hour: "2-digit",
            minute: "2-digit",
            hour12: true
        })
            .replace("am", "AM")
            .replace("pm", "PM")
    };

    const sunrise = time(data.sys.sunrise);
    const sunset = time(data.sys.sunset)

    console.log(data);
    Name.innerHTML = data.name + ',' + data.sys.country;
    temp.innerHTML = data.main.temp + '°C';
    des.innerHTML = data.weather[0].description;
    wind.innerText = data.wind.speed;
    visibility.innerText = data.visibility / 1000;
    humid.innerText = data.main.humidity;
    srise.innerText = sunrise;
    sset.innerText = sunset;
    pressure.innerText = data.main.pressure;
    feels_like.innerText = data.main.feels_like;

    if (data.weather[0].main === "Clouds") {
        weathercard.style.backgroundImage = 'url("/assets/partlyclouds.png")'
    }
    else if (data.weather[0].main === "Sunny") {
        weathercard.style.backgroundImage = 'url("/assets/sunny.png")'
    }
    else if (data.weather[0].main === "Rain") {
        weathercard.style.backgroundImage = 'url("/assets/rainy.png")'
    }
    else if (data.weather[0].main === "Clear") {
        weathercard.style.backgroundImage = 'url("/assets/clear.png")'
    }
};


addEventListener("keydown", async (e) => {
    if (e.key === "Enter") {

        getWeather(city.value);
        console.log(city.value);
        city.value = "";
    };

}
)

theme.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        theme.innerText = " ☀️Light Mode";
        localStorage.setItem("theme", "dark");
    }
    else {
        theme.innerText = "🌙Dark Mode";
        localStorage.setItem("theme", "light");
    }
})

