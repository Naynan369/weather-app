const container = document.querySelector(".container")
const searchBox = document.querySelector(".search-box button")
const weather = document.querySelector(".weather")
const weatherDetails = document.querySelector(".weather-details")
const errorFound = document.querySelector(".error")


searchBox.addEventListener('click', () => {
    const APIKey = '3322e6d4112432a2cdfafaec8f442609'
    const city = document.querySelector('.search-box input').value;


    if(city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city} & units = metric&appid=${APIKey}`).then(Response => Response.json()).then(json =>{
        if(json.code === '404'){
            container.style.height = '400px';
            weather.style.display = 'none';
            weatherDetails.style.display = 'none';
            errorFound.style.display = 'block';
            errorFound.classList.add('fadeIn')
            return;
        }

        errorFound.style.display = 'none';
        errorFound.classList.remove ('fadeIn')


        const image = document.querySelector('.weather img')
        const temperature = document.querySelector('.weather .temperature')
        const description = document.querySelector('.weather .desc')
        const humidity = document.querySelector('.weather-details .humidity span')
        const wind = document.querySelector('.weather-details .wind span')

        switch (json.weather[0].main){
            case 'Clear':
                image.src = '../public/images/clear.png'
                break;
            case 'Rain':
                image.src = '../public/images/rain.png'
                break;
            case 'Snow':
                image.src = '../public/images/snow.png'
                break;
            case 'Clouds':
                image.src = '../public/images/cloud.png'
                break;
            case 'Mist':
                image.src = '../public/images/mist.png'
                break;

            default:
                image.src = ''
        }
        temperature.innerHTML = `${parseInt(json.main.temp)} <span>°C</span>`
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

        weather.style.display = '';
        weatherDetails.style.display = '';
        weather.classList.add('fadeIn')
        weatherDetails.classList.add('fadeIn')
        container.style.height = '590px'
    })
})
