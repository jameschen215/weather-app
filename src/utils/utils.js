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
