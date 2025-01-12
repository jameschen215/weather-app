import './styles/reset.css';
import './styles/main.css';

import { header } from './components/header/header';
import { current } from './components/current/current';
import { daily } from './components/daily/daily';
import { spinner } from './components/spinner/spinner';
import { fetchWeatherInfo } from './utils/fetch-data';
import { error } from './components/error/error';
import { welcome } from './components/welcome/welcome';

const headerDom = document.querySelector('#header');
const currentDom = document.querySelector('#current');
const dailyDom = document.querySelector('#daily');

let data = null;
let isLoading = false;
let currentIndex = 0;
let scrollPosition = 0;
let city =
	localStorage.getItem('city') !== null ? localStorage.getItem('city') : '';
let unit =
	localStorage.getItem('unit') !== null
		? localStorage.getItem('unit')
		: 'metric';

function getCardWidth() {
	// Get dynamic card width
	const firstCard = document.querySelector('.daily-card');
	if (firstCard === undefined) return;

	const cardStyles = firstCard.getBoundingClientRect();

	return cardStyles.width + parseFloat(getComputedStyle(firstCard).marginLeft);
}

function updateDailyButtonsAndScrollPosition() {
	const cardContainer = document.querySelector('#card-container');
	const prev = document.querySelector('#prev');
	const next = document.querySelector('#next');

	const cardWidth = getCardWidth();
	const maxScrollLeft = cardContainer.scrollWidth - cardContainer.clientWidth;

	if (cardContainer.scrollLeft < cardWidth) {
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

	bindDynamicHandlers();
}

function showError() {
	currentDom.innerHTML = error();
	dailyDom.innerHTML = '';
	console.log('No data available or failed to fetch!');
}

function showWelcome() {
	currentDom.innerHTML = welcome();
	dailyDom.innerHTML = '';
	console.log('Welcome to my weather forecast app!');
}

function render() {
	if (city === '') showWelcome();
	else if (isLoading) showSpinner();
	else if (data !== null) showData();
	else showError();
}

async function loadData() {
	if (city === '') {
		render();
		return;
	}

	isLoading = true;
	render();

	const result = await fetchWeatherInfo(city);
	// ({ data, isLoading } = result);
	data = result.data;
	isLoading = result.isLoading;

	render();
}

function initializeApp() {
	headerDom.innerHTML = header();
	handleSearchInput();
	loadData();
}

window.onload = initializeApp;
