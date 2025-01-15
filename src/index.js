import './styles/reset.css';
import './styles/main.css';

import { header } from './components/header/header';
import { current } from './components/current/current';
import { daily } from './components/daily/daily';
import { spinner } from './components/spinner/spinner';
import { fetchWeatherInfo } from './utils/fetch-data';
import { errorComponent } from './components/error-component/error-component';
import { welcome } from './components/welcome/welcome';
import { SCROLL_THRESHOLD, UPDATE_INTERVAL } from './utils/constants';

const headerDom = document.querySelector('#header');
const currentDom = document.querySelector('#current');
const dailyDom = document.querySelector('#daily');

let data = null;
let error = null;
let isLoading = false;
let currentIndex = 0;
// let scrollPosition = 0;
let city =
	localStorage.getItem('city') !== null ? localStorage.getItem('city') : '';
let unit =
	localStorage.getItem('unit') !== null
		? localStorage.getItem('unit')
		: 'metric';

function setCurrentIndex(index) {
	currentIndex = index;
}

function setScrollPosition(position) {
	scrollPosition = position;
}

function setCity(string) {
	city = string;
}

function setUnit(string) {
	unit = string;
}

// Get card width dynamically
function getCardWidth() {
	const firstCard = document.querySelector('.daily-card');
	if (firstCard === undefined) return;

	const cardStyles = firstCard.getBoundingClientRect();
	return cardStyles.width + parseFloat(getComputedStyle(firstCard).marginLeft);
}

function updateDailyButtonsAndScrollPosition() {
	const cardContainer = document.querySelector('#card-container');
	const prev = document.querySelector('#prev');
	const next = document.querySelector('#next');

	const maxScrollLeft = cardContainer.scrollWidth - cardContainer.clientWidth;

	if (cardContainer.scrollLeft < SCROLL_THRESHOLD) {
		prev.disabled = true;
	} else {
		prev.disabled = false;
	}

	if (cardContainer.scrollLeft === maxScrollLeft) {
		next.disabled = true;
	} else {
		next.disabled = false;
	}

	scrollPosition = cardContainer.scrollLeft;
}

// save card position
function setCardContainerScrollPosition() {
	const cardContainer = document.querySelector('#card-container');
	cardContainer.scrollLeft = scrollPosition;
}

function handleSlideButtonClick() {
	const cardContainer = document.querySelector('#card-container');
	const prev = document.querySelector('#prev');
	const next = document.querySelector('#next');

	prev.addEventListener('click', () => {
		const cardWidth = getCardWidth();

		cardContainer.scrollBy({
			left: -cardWidth,
			behavior: 'smooth',
		});

		updateDailyButtonsAndScrollPosition();
	});

	next.addEventListener('click', () => {
		const cardWidth = getCardWidth();

		cardContainer.scrollBy({
			left: cardWidth,
			behavior: 'smooth',
		});

		updateDailyButtonsAndScrollPosition();
	});
}

// once scrolled, update the state of buttons and card position
function handleNotButtonScrolling() {
	document
		.querySelector('#card-container')
		.addEventListener('scroll', updateDailyButtonsAndScrollPosition);
}

function handleSearchInput() {
	document
		.querySelector('#search')
		.addEventListener('keydown', async (event) => {
			const location = event.target.value.trim();

			if (event.key === 'Enter' && location.length > 1) {
				city = location;
				localStorage.setItem('city', city);

				await loadData();
				// render();
				event.target.value = '';
				event.target.blur();
			}
		});
}

function handleUnitToggle() {
	document.querySelector('form').addEventListener('change', async (event) => {
		if (event.target.name === 'unit-toggle') {
			unit = event.target.value;
			localStorage.setItem('unit', unit);

			render();
		}
	});
}

function handleCardClick() {
	function unselectAllCards() {
		document
			.querySelectorAll('.daily-card')
			.forEach((card) => card.classList.remove('selected'));
	}

	document.querySelectorAll('.daily-card').forEach((card) => {
		card.addEventListener('click', async (event) => {
			unselectAllCards();
			card.classList.add('selected');
			currentIndex = parseInt(event.currentTarget.dataset.index);

			render();
		});
	});
}

function showSpinner() {
	currentDom.innerHTML = spinner();
	dailyDom.innerHTML = spinner();
	console.log('Loading data...');
}

function bindDynamicHandlers() {
	setCardContainerScrollPosition();
	handleUnitToggle();
	handleSlideButtonClick();
	updateDailyButtonsAndScrollPosition();
	handleNotButtonScrolling();
	handleCardClick();
}

function showData() {
	currentDom.innerHTML = current(data, currentIndex, unit);
	dailyDom.innerHTML = daily(data, unit);

	changeBackgroundDynamically();
	bindDynamicHandlers();
}

function showError() {
	currentDom.innerHTML = errorComponent(error);
	dailyDom.innerHTML = '';
	console.log(error.message);
}

function showWelcome() {
	currentDom.innerHTML = welcome();
	dailyDom.innerHTML = '';
	console.log('Welcome to my weather forecast app!');
}

function changeBackgroundDynamically() {
	const container = document.querySelector('#container');
	const weather = data.currentConditions.icon;

	if (weather !== undefined && weather !== null) {
		container.className = `container ${weather}`;
	} else {
		container.className = 'container';
	}
}

function render() {
	if (isLoading) showSpinner();
	else if (error !== null) showError();
	else if (data !== null) showData();
}

async function loadData() {
	try {
		isLoading = true;
		render();
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
	handleSearchInput();

	if (city === '') {
		// If it's the first time landing, show the welcome page
		showWelcome();
	} else {
		// else fetch weather data from api
		await loadData();
	}
}

// Initialize the app
initializeApp();

// Update data every 10 minutes
setInterval(async () => {
	await loadData();
}, UPDATE_INTERVAL);

/* - TODO: - 
	1. Separate event handlers into smaller modules
 	2. Improve error handlers for data fetching -- done
 	3. Avoid Redundant DOM Queries
*/
