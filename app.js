const form = document.getElementById('search-form');

form.addEventListener('submit', async (event) => {
	event.preventDefault();
	const city = document.getElementById('city-input').value;
	const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`)
	const data = await response.json();
	const { latitude, longitude } = data.results[0];
	const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,is_day,rain,showers&daily=temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=1`);
	const weatherData = await weatherResponse.json();

	const isDay = weatherData.current.is_day;
	const body = document.querySelector('body');
	body.style.backgroundColor = isDay ? 'white' : '#333';
	body.style.color = isDay ? 'black' : 'white';

	const cityName = document.getElementById('city-name');
	cityName.innerText = city;
	const temperature = document.getElementById('temperature');
	temperature.innerText = `${weatherData.current.temperature_2m} ${weatherData.current_units.temperature_2m}`;
	const sky = document.getElementById('sky');
	sky.setAttribute('src', isDay ? '/images/day.jpg' : '/images/night.jpg');

	const country = document.getElementById('country');
	country.innerText = data.results[0].country;
	const timezone = document.getElementById('timezone');
	timezone.innerText = data.results[0].timezone;
	const population = document.getElementById('population');
	population.innerText = data.results[0].population;
	const low = document.getElementById('low');
	low.innerText = `${weatherData.daily.temperature_2m_min[0]} ${weatherData.daily_units.temperature_2m_min}`;
	const max = document.getElementById('max');
	max.innerText = `${weatherData.daily.temperature_2m_max[0]} ${weatherData.daily_units.temperature_2m_max}`;

	const resultContainer = document.getElementById('result-container');
	resultContainer.style.display = 'flex';
});