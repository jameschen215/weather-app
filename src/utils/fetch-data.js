export async function fetchWeatherInfo(city) {
	const apiEndpoint = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=44WG9762H63773SCNAM32AVZT&contentType=json`;

	let data = null;
	let isLoading = true;
	let error = null;

	try {
		const response = await fetch(apiEndpoint);

		if (!response.ok) {
			error = new Error(response.status + ': Network response was not okay.');
		}

		data = await response.json();
		isLoading = false;
	} catch (error) {
		isLoading = false;
		data = null;
		error = new Error('Error fetching data:', error);
	}

	return { data, isLoading, error };
}
