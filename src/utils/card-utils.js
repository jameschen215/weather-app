const cardContainer = document.querySelector('#card-container');
const prev = document.querySelector('#prev');
const next = document.querySelector('#next');

let scrollPosition = 0;

// Get card width dynamically
function getCardWidth() {
	const firstCard = document.querySelector('.daily-card');
	if (firstCard === undefined) return;

	const cardStyles = firstCard.getBoundingClientRect();
	return cardStyles.width + parseFloat(getComputedStyle(firstCard).marginLeft);
}

function updateDailyButtons() {
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

function updateScrollPosition() {
	scrollPosition = cardContainer.scrollLeft;
}

// save card position
export function setCardContainerScrollPosition() {
	// const cardContainer = document.querySelector('#card-container');
	cardContainer.scrollLeft = scrollPosition;
}

export function handleSlideButtonClick() {
	// const cardContainer = document.querySelector('#card-container');
	// const prev = document.querySelector('#prev');
	// const next = document.querySelector('#next');

	prev.addEventListener('click', () => {
		const cardWidth = getCardWidth();

		cardContainer.scrollBy({
			left: -cardWidth,
			behavior: 'smooth',
		});

		updateDailyButtons();
		updateScrollPosition();
	});

	next.addEventListener('click', () => {
		const cardWidth = getCardWidth();

		cardContainer.scrollBy({
			left: cardWidth,
			behavior: 'smooth',
		});

		updateDailyButtons();
		updateScrollPosition();
	});
}

// once scrolled, update the state of buttons and card position
export function handleNotButtonScrolling() {
	cardContainer.addEventListener('scroll', updateDailyButtonsAndScrollPosition);
}
