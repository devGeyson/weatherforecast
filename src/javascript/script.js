document.querySelector('.search').addEventListener('submit', async (event) => {
    event.preventDefault();

    const cityName = document.querySelector('#city_name').value;

    if (!cityName) {
        document.querySelector('#weather').classList.remove('show');
        showAlert('Você precisa digitar uma cidade...');
        return;
    }

    const apiKey = '86ee1fe241b5d0e29f6961099d642ecf';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apiKey}&units=metric&lang=pt-BR`;

    const results = await fetch(apiUrl);
    const json = await results.json();

    if (json.cod === 200) {
        showInfo({
            city: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            tempMax: json.main.temp_max,
            tempMin: json.main.temp_min,
            description: json.weather[0].description,
            tempIcon: json.weather[0].icon,
            windSpeed: json.wind.speed,
            humidity: json.main.humidity
        });
    }else {
        document.querySelector('#weather').classList.remove('show');
        showAlert('Não foi possível localizar a cidade...')
    }

    console.log(json)
});

function showInfo(json){
    showAlert('');

    document.querySelector('#weather').classList.add('show');

    document.querySelector('.tittle').innerHTML = `${json.city}, ${json.country}`;

    document.querySelector('.temp_value').innerHTML = `${json.temp.toFixed(1).toString().replace('.', ',')} <sup>c°</sup>`;

    document.querySelector('.temp_description').innerHTML = `${json.description}`;

    document.querySelector('.temp_img').setAttribute('src',`https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);

    document.querySelector('.tempmax').innerHTML = `${json.tempMax.toFixed(1).toString().replace('.', ',')} <sup>c°</sup>`;

    document.querySelector('.tempmin').innerHTML = `${json.tempMin.toFixed(1).toString().replace('.', ',')} <sup>c°</sup>`;

    document.querySelector('.umity').innerHTML = `${json.humidity}%`;

    document.querySelector('.wind').innerHTML = `${json.windSpeed.toFixed(1)}km/h`;
}

function showAlert(msg){
    document.querySelector('.alert').innerHTML = msg;
}