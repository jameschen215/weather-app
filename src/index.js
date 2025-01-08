import './styles/reset.css';
import './styles/main.css';

import { header } from './components/header';

const apiUrl =
	'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/hefei?unitGroup=metric&key=44WG9762H63773SCNAM32AVZT&contentType=json';

async function getWeatherInfo() {
	try {
		const response = await fetch(apiUrl);

		if (!response.ok) {
			throw new Error('Network response was not okay.');
		}

		const weatherData = await response.json();
		console.log(weatherData.address, weatherData.currentConditions.temp);
	} catch (error) {
		console.error(error);
	}
}

// window.onload = getWeatherInfo();

const headerDom = document.querySelector('#header');
const currentDom = document.querySelector('#current');
const dailyDom = document.querySelector('#daily');

function updateDisplay() {
	headerDom.innerHTML = header();
	current.innerHTML = 'Hey, I am the current.';
	daily.innerHTML = 'Hey, I am the daily.';
}

updateDisplay();
