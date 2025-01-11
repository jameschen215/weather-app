import './styles/reset.css';
import './styles/main.css';

import { header } from './components/header/header';
import { current } from './components/current/current';
import { daily } from './components/daily/daily';
import { spinner } from './components/spinner/spinner';
import { fetchWeatherInfo } from './utils/utils';

const headerDom = document.querySelector('#header');
const currentDom = document.querySelector('#current');
const dailyDom = document.querySelector('#daily');

let city = 'Hefei';
let currentIndex = 0;
let unit = localStorage.getItem('unit')
	? localStorage.getItem('unit')
	: 'metric';

const data = JSON.parse(localStorage.getItem('data'));

console.log({ data });

function showSpinner() {
	currentDom.innerHTML = spinner();
	dailyDom.innerHTML = spinner();
}

function getCardWidth() {
	// Get dynamic card width
	const firstCard = document.querySelector('.daily-card');
	if (firstCard === undefined) return;

	const cardStyles = firstCard.getBoundingClientRect();

	return cardStyles.width + parseFloat(getComputedStyle(firstCard).marginLeft);
}

function updateDailyButtons() {
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

		updateDailyButtons();
	});

	next.addEventListener('click', () => {
		const cardWidth = getCardWidth();

		cardContainer.scrollBy({
			left: cardWidth,
			behavior: 'smooth',
		});

		updateDailyButtons();
	});
}

function handleNotButtonScrolling() {
	document
		.querySelector('#card-container')
		.addEventListener('scroll', updateDailyButtons);
}

function handleUnitToggle() {
	document.querySelector('form').addEventListener('change', async (event) => {
		if (event.target.name === 'unit-toggle') {
			unit = event.target.value;

			await getWeatherDataAndUpdateDisplay();

			// Save user's unit preference
			localStorage.setItem('unit', unit);
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
			console.log(currentIndex);

			updateDisplay(data);
		});
	});
}

async function handleSearchInput() {
	document
		.querySelector('#search')
		.addEventListener('keydown', async (event) => {
			const location = event.target.value.trim();

			if (event.key === 'Enter' && location.length > 1) {
				city = location;
				await getWeatherDataAndUpdateDisplay();
			}
		});
}

async function getWeatherDataAndUpdateDisplay() {
	try {
		showSpinner();
		await fetchWeatherInfo(city, unit);
		const data = JSON.parse(localStorage.getItem('data'));
		updateDisplay(data);
	} catch (error) {
		console.log(error);
	}
}

function updateDisplay(data) {
	currentDom.innerHTML = current(data, currentIndex, unit);
	dailyDom.innerHTML = daily(data);

	handleUnitToggle();
	handleSlideButtonClick();
	updateDailyButtons();
	handleNotButtonScrolling();
	handleCardClick();
}

window.onload = async () => {
	fetchWeatherInfo(city, unit);
	headerDom.innerHTML = header();

	await getWeatherDataAndUpdateDisplay();
	handleSearchInput();
};
