import './styles/reset.css';
import './styles/main.css';

import { header } from './components/header/header';
import { current } from './components/current/current';
import { daily } from './components/daily/daily';
import { spinner } from './components/spinner/spinner';
import { fetchWeatherInfo } from './utils/fetch-data';
import { errorComponent } from './components/error-component/error-component';
import { welcome } from './components/welcome/welcome';

const headerDom = document.querySelector('#header');
const currentDom = document.querySelector('#current');
const dailyDom = document.querySelector('#daily');

let data = null;
let error = null;
let isLoading = false;
let currentIndex = 0;
let scrollPosition = 0;
let city =
	localStorage.getItem('city') !== null ? localStorage.getItem('city') : '';
let unit =
	localStorage.getItem('unit') !== null
		? localStorage.getItem('unit')
		: 'metric';

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

	// scrollLeft is not an integer because of the dynamic card width,
	//  i.e. it's not always 0, so you can not say
	// cardContainer.scrollLeft === 0, it might be 5, 3, or 1,
	// so set an value less than card width, say, 100 or 50,
	// if cardContainer.scrollLeft is less than it,
	// we can say that, the card is the last one on the left
	if (cardContainer.scrollLeft < 100) {
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
	document.querySelector('#search').addEventListener('keydown', (event) => {
		const location = event.target.value.trim();

		if (event.key === 'Enter' && location.length > 1) {
			city = location;
			localStorage.setItem('city', city);

			loadData();
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

function showError(message) {
	currentDom.innerHTML = errorComponent(message);
	dailyDom.innerHTML = '';
	console.log(message);
}

function showWelcome() {
	currentDom.innerHTML = welcome();
	dailyDom.innerHTML = '';
	console.log('Welcome to my weather forecast app!');
}

function changeBackgroundDynamically() {
	const container = document.querySelector('#container');
	const weather = data.currentConditions.icon;

	if (weather !== undefined || weather !== null) {
		container.className = `container ${weather}`;
	}
}

function render() {
	if (city === '') showWelcome();
	else if (error !== null) showError(error.message);
	else if (isLoading) showSpinner();
	else if (data !== null) showData();
}

async function loadData() {
	if (city === '') {
		render();
		return;
	}

	isLoading = true;
	render();

	const result = await fetchWeatherInfo(city);
	({ data, isLoading, error } = result);
	render();
}

function initializeApp() {
	headerDom.innerHTML = header();
	handleSearchInput();
	loadData();
}

// Initialize the app
initializeApp();

// Update data every half an hour
setInterval(loadData, 1800000);
