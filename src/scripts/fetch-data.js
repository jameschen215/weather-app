export async function fetchWeatherInfo(city) {
	const apiEndpoint = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=44WG9762H63773SCNAM32AVZT&contentType=json`;

	try {
		const response = await fetch(apiEndpoint);

		if (!response.ok) {
			throw new Error(response.status);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		throw error;
	}
}
