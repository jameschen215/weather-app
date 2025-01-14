export function capitalizeFirstLetter(text) {
	const words = text.split(' ');
	return words
		.map((word) => word.substring(0, 1).toUpperCase() + word.substring(1))
		.join(' ');
}

export function celsiusToFahrenheit(temp) {
	return Math.round(temp * (9 / 5) + 32);
}

export function kilometersToMiles(km) {
	return Math.round(km * 0.62137);
}

/*
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
*/
