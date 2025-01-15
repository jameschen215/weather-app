import './current.css';
import {
	capitalizeFirstLetter,
	celsiusToFahrenheit,
	kilometersToMiles,
} from '../../utils/utils';
import { weatherIcons } from '../../scripts/images';
import { KMH, MPH } from '../../utils/constants';

export function current(data, index, unit) {
	if (!data || !data.days || !data.days[index]) return '';

	const city = capitalizeFirstLetter(data.address);
	const {
		icon = '',
		temp = 0,
		tempmax = 0,
		tempmin = 0,
		feelslike = 0,
		conditions: desc = '',
		windspeed: windSpeed = 0,
		visibility = 0,
		humidity = 0,
		uvindex: uvIndex = 0,
		dew,
		pressure,
	} = data.days[index];

	const weatherIcon = weatherIcons[icon];
	const tempMax = Math.round(tempmax);
	const tempMin = Math.round(tempmin);
	const feelsLike = Math.round(feelslike);
	const dewPoint = Math.round(dew);

	function formatTemp(value) {
		return unit === 'metric' ? Math.round(value) : celsiusToFahrenheit(value);
	}

	function formatWindAndVisibility(value) {
		return unit === 'metric' ? value + KMH : kilometersToMiles(value) + MPH;
	}

	return `
    <div class="current-row location">
      <div class="icon location-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>
      </div>
      <div class="city">${city}</div>
    </div>

      <div class="current-row main-info">
        <div class="icon current-icon">
          <img src="${weatherIcon}">
        </div>

        <div class="current-temp">
          ${formatTemp(temp)}&deg;
        </div>

        <form class="unit">
          <input 
            type="radio" 
            name="unit-toggle" 
            id="celsius" 
            value="metric" 
            ${unit === 'metric' ? 'checked' : ''}
          />
          <label for="celsius">C</label>
          <input 
            type="radio" 
            name="unit-toggle" 
            id="fahrenheit" 
            value="us" 
            ${unit === 'us' ? 'checked' : ''}
          />
          <label for="fahrenheit">F</label>
        </form>
      </div>
    </div>
      
    <div class="current-row current-desc">
      <p>${desc}</p>
    </div>
  
    <div class="other-info">
      <div class="temp-max">
        <span>Max</span> 
        <span>
          ${formatTemp(tempMax)}&deg;
        </span>
      </div>

      <div class="temp-min">
        <span>Min</span>  
        <span>
          ${formatTemp(tempMin)}&deg;
        </span>
      </div>
      <div class="temp-feel-like">
        <span>Feels Like</span>
        <span>
          ${formatTemp(feelsLike)}&deg;
        </span>
      </div>
      <div class="humidity">
        <span>Humidity</span> 
        <span>${humidity}%</span>
      </div>
      <div class="wind-spreed">
        <span>Wind</span>
        <span>
          ${formatWindAndVisibility(windSpeed)}
        </span>
      </div>
      <div class="visibility">
        <span>Visibility</span> 
        <span>
        ${formatWindAndVisibility(visibility)}
        </span>
      </div>

      <div class="uv-index">
        <span>UV Index</span> 
        <span>${uvIndex}</span>
      </div>
      <div class="dew">
        <span>Dew Point</span>
        <span>
          ${formatTemp(dewPoint)}&deg;
        </span>
      </div>
      
      <div class="pressure">
        <span>Pressure</span> 
        <span>${pressure}mb</span>
      </div>

  `;
}
