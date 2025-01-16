import { SCROLL_THRESHOLD } from '../utils/constants';

let scrollPosition = 0;

// Get card width dynamically
function getCardWidth() {
	const firstCard = document.querySelector('.daily-card');
	if (firstCard === undefined) return;

	const cardStyles = firstCard.getBoundingClientRect();
	return cardStyles.width + parseFloat(getComputedStyle(firstCard).marginLeft);
}

function updateDailyButtons(cardContainer) {
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
}

function updateScrollPosition(cardContainer) {
	scrollPosition = cardContainer.scrollLeft;
}

// save card position
function setCardContainerScrollPosition(cardContainer) {
	cardContainer.scrollLeft = scrollPosition;
}

function handleSlideButtonClick(cardContainer, prev, next) {
	prev.addEventListener('click', () => {
		const cardWidth = getCardWidth();

		cardContainer.scrollBy({
			left: -cardWidth,
			behavior: 'smooth',
		});

		updateDailyButtons(cardContainer);
		updateScrollPosition(cardContainer);
	});

	next.addEventListener('click', () => {
		const cardWidth = getCardWidth();

		cardContainer.scrollBy({
			left: cardWidth,
			behavior: 'smooth',
		});

		updateDailyButtons(cardContainer);
		updateScrollPosition(cardContainer);
	});
}

// once scrolled, update the state of buttons and card position
function handleNotButtonScrolling(cardContainer) {
	cardContainer.addEventListener('scroll', () => {
		updateDailyButtons(cardContainer);
		updateScrollPosition(cardContainer);
	});
}

function handleCardClick(setCurrentIndex, render) {
	document.querySelectorAll('.daily-card').forEach((card) => {
		card.addEventListener('click', async (event) => {
			const index = parseInt(event.currentTarget.dataset.index);
			setCurrentIndex(index);

			render();
		});
	});
}

export function handleSearchInput(setCity, loadData) {
	document
		.querySelector('#search')
		.addEventListener('keydown', async (event) => {
			const city = event.target.value.trim();

			if (event.key === 'Enter' && city.length > 1) {
				localStorage.setItem('city', city);
				setCity(city);

				await loadData();

				event.target.value = '';
				event.target.blur();
			}
		});
}

function handleUnitToggle(setUnit, render) {
	document.querySelector('form').addEventListener('change', async (event) => {
		if (event.target.name === 'unit-toggle') {
			setUnit(event.target.value);
			localStorage.setItem('unit', event.target.value);
			render();
		}
	});
}

export function bindDynamicHandlers(setUnit, setCurrentIndex, render) {
	const cardContainer = document.querySelector('#card-container');
	const prev = document.querySelector('#prev');
	const next = document.querySelector('#next');

	handleUnitToggle(setUnit, render);
	handleCardClick(setCurrentIndex, render);
	setCardContainerScrollPosition(cardContainer);
	handleSlideButtonClick(cardContainer, prev, next);
	handleNotButtonScrolling(cardContainer);
}
