export const KMH = 'km/h';
export const MPH = 'mph';

// scrollLeft is not an integer because of the dynamic card width,
//  i.e. it's not always 0, so you can not say
// cardContainer.scrollLeft === 0, it might be 5, 3, or 1,
// so set an value less than card width, say, 100 or 50,
// if cardContainer.scrollLeft is less than it,
// we can say that, the card is the last one on the left
export const SCROLL_THRESHOLD = 100;

export const UPDATE_INTERVAL = 1000 * 60 * 10; // 10 minutes

export const ERROR_MESSAGES = {
	400: {
		title: 'Invalid Input',
		message: 'Please double-check the city you entered and try again.',
	},
	401: {
		title: 'Unauthorized Request',
		message: 'Please verify that your API key is correct.',
	},
	429: {
		title: 'Too Many Requests',
		message: 'Please try again later.',
	},
	500: {
		title: 'Internal Server Error',
		message:
			'We apologize for the unexpected error on the server. We will resolve it as soon as possible.',
	},
};
