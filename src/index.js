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
} from './scripts/display';

const container = document.querySelector('#container');
const headerDom = document.querySelector('#header');
const currentDom = document.querySelector('#current');
const dailyDom = document.querySelector('#daily');

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

function changeBackgroundDynamically() {
	const weather = data?.currentConditions?.icon;
	console.log(weather);

	if (weather !== undefined) {
		container.className = `container ${weather}`;
	} else {
		container.className = 'container';
	}
}

function render() {
	if (isLoading) {
		showSpinner(currentDom, dailyDom);
	} else if (error !== null) {
		showError(currentDom, dailyDom, error);
	} else if (data !== null) {
		showData(currentDom, dailyDom, data, currentIndex, unit);
		bindDynamicHandlers(setUnit, setCurrentIndex, render);
	}

	changeBackgroundDynamically();
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
		showWelcome(currentDom, dailyDom);
	} else {
		// else fetch weather data from api
		await loadData();
	}

	// Update data every 10 minutes
	setInterval(async () => await loadData(), UPDATE_INTERVAL);
}

// Initialize the app
window.onload = initializeApp();
