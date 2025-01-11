export function capitalizeFirstLetter(text) {
	const words = text.split(' ');
	return words
		.map((word) => word.substring(0, 1).toUpperCase() + word.substring(1))
		.join(' ');
}

function isValidDate(dateString) {
	const date = new Date(dateString);

	return !isNaN(date.getTime());
}

export function isToday(dateString) {
	if (!isValidDate(dateString)) return false;

	const date = new Date(dateString);
	const today = new Date();

	return (
		date.getDate() === today.getDate() &&
		date.getMonth() === today.getMonth() &&
		date.getFullYear() === today.getFullYear()
	);
}

export async function getWeatherInfo(city, unit) {
	const apiEndpoint = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=${unit}&key=44WG9762H63773SCNAM32AVZT&contentType=json`;

	try {
		const response = await fetch(apiEndpoint);

		if (!response.ok) {
			throw new Error('Network response was not okay.');
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
	}
}
