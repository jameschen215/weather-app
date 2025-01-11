import './styles/reset.css';
import './styles/main.css';

import { header } from './components/header/header';
import { current } from './components/current/current';
import { daily } from './components/daily/daily';
import { spinner } from './components/spinner/spinner';
import { getWeatherInfo } from './utils/utils';

const headerDom = document.querySelector('#header');
const currentDom = document.querySelector('#current');
const dailyDom = document.querySelector('#daily');

let city = 'Hefei';
let unit = localStorage.getItem('unit')
	? localStorage.getItem('unit')
	: 'metric';

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

	console.log('card width: ', cardWidth);
	console.log('left width: ', cardContainer.scrollLeft);

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

		console.log('after prev', cardContainer.scrollLeft);
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
	document.querySelector('form').addEventListener('change', (event) => {
		if (event.target.name === 'unit-toggle') {
			unit = event.target.value;
			getWeatherInfo(city, unit);

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
		card.addEventListener('click', (event) => {
			unselectAllCards();
			card.classList.add('selected');
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
				try {
					showSpinner();
					const data = await getWeatherInfo(city, unit);
					updateDisplay(data);
				} catch (error) {
					console.log(error);
				} finally {
					event.target.value = '';
				}
			}
		});
}

async function showInitialWeatherData() {
	try {
		showSpinner();
		const data = await getWeatherInfo(city, unit);
		updateDisplay(data);
	} catch (error) {
		console.log(error);
	}
}

function updateDisplay(data) {
	currentDom.innerHTML = current(data, unit);
	dailyDom.innerHTML = daily(data);

	handleUnitToggle();
	handleSlideButtonClick();
	updateDailyButtons();
	handleNotButtonScrolling();
	handleCardClick();
}

window.onload = () => {
	headerDom.innerHTML = header();
	showInitialWeatherData();
	handleSearchInput();
};
