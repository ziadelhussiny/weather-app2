document.addEventListener('DOMContentLoaded', function() {
    const app = document.querySelector('.weather-app');
    const temp = document.querySelector('.temp');
    const dateOutput = document.querySelector('.date');
    const timeOutput = document.querySelector('.time');
    const conditionOutput = document.querySelector('.condition');
    const nameOutput = document.querySelector('.name');
    const icon = document.querySelector('.icon');
    const cloudOutput = document.querySelector('.cloud');
    const humidityOutput = document.querySelector('.humidity');
    const windOutput = document.querySelector('.wind');
    const form = document.querySelector('#locationInput');
    const search = document.querySelector('.search');
    const btn = document.querySelector('.submit');
    const cities = document.querySelectorAll('.city');
    const loader = document.querySelector('.loader');

    let cityInput = "Egypt";

    cities.forEach((city) => {
        city.addEventListener('click', (e) => {
            cityInput = e.target.innerHTML;
            fetchWeatherData();
            app.style.opacity = "0";
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (search.value.length == 0) {
            alert('Please type in a city name');
        } else {
            cityInput = search.value;
            fetchWeatherData();
            search.value = "";
            app.style.opacity = "0";
        }
    });

    function dayOfTheWeek(day, month, year) {
        const weekday = [
            "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
        ];
        return weekday[new Date(`${year}-${month}-${day}`).getDay()];
    }

    function fetchWeatherData() {
        loader.classList.remove('hidden');
        app.classList.add('blur');
        const APIkey = '703cf14ff9b549f593a23559242506';
        fetch(`https://api.weatherapi.com/v1/current.json?key=${APIkey}&q=${cityInput}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);

                temp.innerHTML = data.current.temp_c + "&#176;";
                conditionOutput.innerHTML = data.current.condition.text;

                const date = data.location.localtime;
                const y = parseInt(date.substr(0, 4));
                const m = parseInt(date.substr(5, 2));
                const d = parseInt(date.substr(8, 2));
                const time = date.substr(11);

                dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)} ${d}, ${m}, ${y}`;
                timeOutput.innerHTML = time;

                nameOutput.innerHTML = data.location.name;

                icon.src = "https:" + data.current.condition.icon;

                cloudOutput.innerHTML = data.current.cloud + "%";
                humidityOutput.innerHTML = data.current.humidity + "%";
                windOutput.innerHTML = data.current.wind_kph + " Km/h";

                let timeOfDay = "day";

                if (!data.current.is_day) {
                    timeOfDay = "night";
                }

                const code = data.current.condition.code;

                if (code === 1000) {
                    app.style.backgroundImage = `url(./images/${timeOfDay}/clear.jpg)`;
                    btn.style.background = "#e5ba92";
                    if (timeOfDay === "night") {
                        btn.style.background = "#181e27";
                    }
                } else if (
                    code === 1003 ||
                    code === 1006 ||
                    code === 1009 ||
                    code === 1030 ||
                    code === 1069 ||
                    code === 1087 ||
                    code === 1135 ||
                    code === 1273 ||
                    code === 1276 ||
                    code === 1279 ||
                    code === 1282
                ) {
                    app.style.backgroundImage = `url(./images/${timeOfDay}/cloud.jpg)`;
                    btn.style.background = "#fa6d1b";
                    if (timeOfDay === "night") {
                        btn.style.background = "#181e27";
                    }
                } else if (
                    code === 1063 ||
                    code === 1069 ||
                    code === 1072 ||
                    code === 1150 ||
                    code === 1153 ||
                    code === 1180 ||
                    code === 1183 ||
                    code === 1186 ||
                    code === 1189 ||
                    code === 1192 ||
                    code === 1195 ||
                    code === 1204 ||
                    code === 1207 ||
                    code === 1240 ||
                    code === 1243 ||
                    code === 1246 ||
                    code === 1249 ||
                    code === 1252
                ) {
                    app.style.backgroundImage = `url(./images/${timeOfDay}/rain.jpg)`;
                    btn.style.background = "#647d75";
                    if (timeOfDay === "night") {
                        btn.style.background = "#325c80";
                    }
                } else if (
                    code === 1066 ||
                    code === 1114 ||
                    code === 1117 ||
                    code === 1210 ||
                    code === 1213 ||
                    code === 1216 ||
                    code === 1219 ||
                    code === 1222 ||
                    code === 1225 ||
                    code === 1255 ||
                    code === 1258 ||
                    code === 1261 ||
                    code === 1264
                ) {
                    app.style.backgroundImage = `url(./images/${timeOfDay}/snow.jpg)`;
                    btn.style.background = "#4d72aa";
                    if (timeOfDay === "night") {
                        btn.style.background = "#1b1b1b";
                    }
                }
                app.style.opacity = "1";
                loader.classList.add('hidden');
                app.classList.remove('blur');
            })
            .catch(() => {
                alert('City not found, please try again');
                app.style.opacity = "1";
                loader.classList.add('hidden');
                app.classList.remove('blur');
            });
    }

    fetchWeatherData();
});
