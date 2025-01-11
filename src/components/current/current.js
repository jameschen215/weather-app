import './current.css';
import { capitalizeFirstLetter } from '../../utils/utils';
import { weatherIcons } from '../../utils/images';

export function current(data, index, unit) {
	if (data === undefined) return '';

	const city = capitalizeFirstLetter(data.address);
	const {
		icon,
		temp,
		tempmax,
		tempmin,
		feelslike,
		conditions: desc,
		windspeed: windSpeed,
		visibility,
		humidity,
		dew,
		pressure,
	} = data.days[index];

	const weatherIcon = weatherIcons[icon];
	const tempMax = Math.round(tempmax);
	const tempMin = Math.round(tempmin);
	const feelsLike = Math.round(feelslike);
	const dewPoint = Math.round(dew);

	// const {
	// 	temp,
	// 	conditions: desc,
	// 	feelslike: feelsLike,
	// 	windspeed: windSpeed,
	// 	visibility,
	// 	humidity,
	// 	dew,
	// 	pressure,
	// } = data.currentConditions;

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
        ${Math.round(temp)}&deg;
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
      
    <div class="current-row desc">
      <p>${desc}</p>
    </div>

    <div class="current-row">
      <div class="temp-max">
        <span>Max</span> 
        <span>${tempMax}&deg;</span>
      </div>
      <div class="temp-min">
        <span>Min</span>  
        <span>${tempMin}&deg;</span>
      </div>
      <div class="temp-feel-like">
        <span>Feels Like</span>
        <span>${feelsLike}&deg;</span>
      </div>
    </div>

    <div class="current-row">
      <div class="humidity">
        <span>Humidity</span> 
        <span>${humidity}%</span>
      </div>
      <div class="wind-spreed">
        <span>Wind</span>
        <span>
          ${windSpeed}${unit === 'us' ? 'mph' : 'km/h'}
        </span>
      </div>
      <div class="visibility">
        <span>Visibility</span> 
        <span>
          ${visibility}${unit === 'us' ? 'miles' : 'km'}
        </span>
      </div>
    </div>
    <div class="current-row">
      <div class="dew">
        <span>Dew Point</span>
        <span>${dewPoint}&deg;</span>
      </div>
      <div class="pressure">
        <span>Pressure</span> 
        <span>${pressure}mb</span>
      </div>
    </div>
  `;
}
