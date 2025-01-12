export async function fetchWeatherInfo(city) {
	const apiEndpoint = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=44WG9762H63773SCNAM32AVZT&contentType=json`;

	let data = null;
	let isLoading = true;

	try {
		const response = await fetch(apiEndpoint);

		if (!response.ok) {
			throw new Error('Network response was not okay.');
		}

		data = await response.json();
		isLoading = false;
	} catch (error) {
		console.error('Error fetching data:', error);
		isLoading = false;
		data = null; // Handle error gracefully
	}

	return { data, isLoading };
}
