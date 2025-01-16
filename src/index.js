import './styles/reset.css';
import './styles/main.css';

import { UPDATE_INTERVAL } from './utils/constants';

import { header } from './components/header/header';
import { fetchWeatherInfo } from './scripts/fetch-data';
import { handleSearchInput } from './scripts/event-handlers';
import { bindDynamicHandlers } from './scripts/event-handlers';

import {
	showSpinner,
	showWelcome,
	showData,
	showError,
	changeBackgroundDynamically,
} from './scripts/display';

const headerDom = document.querySelector('#header');

let data = null;
let error = null;
let isLoading = false;
let currentIndex = 0;
let city =
	localStorage.getItem('city') !== null ? localStorage.getItem('city') : '';
let unit =
	localStorage.getItem('unit') !== null
		? localStorage.getItem('unit')
		: 'metric';

function setCity(string) {
	city = string;
}

function setUnit(string) {
	unit = string;
}

function setCurrentIndex(index) {
	currentIndex = index;
}

function render() {
	if (isLoading) {
		showSpinner();
	} else if (error !== null) {
		showError(error);
	} else if (data !== null) {
		showData(data, currentIndex, unit);
		bindDynamicHandlers(setUnit, setCurrentIndex, render);
	}

	changeBackgroundDynamically(data, currentIndex);
}

async function loadData() {
	data = null;
	isLoading = true;
	render();

	try {
		const result = await fetchWeatherInfo(city);
		data = result || {};
		error = null;
	} catch (err) {
		error = err;
	} finally {
		isLoading = false;
		render();
	}
}

async function initializeApp() {
	headerDom.innerHTML = header();
	handleSearchInput(setCity, loadData);

	if (city === '') {
		// If it's the first time landing, show the welcome page
		showWelcome();
	} else {
		// else fetch weather data from api
		await loadData();
	}

	// Update data every 10 minutes
	setInterval(async () => await loadData(), UPDATE_INTERVAL);
}

// Initialize the app
window.onload = initializeApp();
