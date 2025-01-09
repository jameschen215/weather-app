import './current.css';
import cloudyIcon from '../../images/cloudy.png';
import sunnyIcon from '../../images/sunny.png';

export function current() {
	return `
    <div class="current-row location">
      <div class="icon location-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>
      </div>
      <div class="city">Hefei</div>
    </div>

    <div class="current-row main-info">
      <div class="icon current-icon">
        <img src="${sunnyIcon}">
      </div>

      <div class="current-temp">
        25&deg;
      </div>

      <div class="unit">
        <input type="radio" name="unit-toggle" id="celsius" />
        <label for="celsius">C</label>
        <input type="radio" name="unit-toggle" id="fahrenheit" />
        <label for="fahrenheit">F</label>
      </div>
    </div>
      
    <div class="current-row desc">
      <p>Sunny</p>
    </div>

    <div class="current-row">
      <span class="temp-max">Max 5 &deg;C</span>
      <span class="temp-min">Min -4 &deg;C</span>
      <span class="temp-feel-like">Feels Like 0 &deg;C</span>
    </div>

    <div class="current-row">
      <span class="humidity">Humidity 55%</span>
      <span class="wind-spreed">Wind 5 km/h</span>
      <span class="visibility">Visibility 6km</span>
    </div>
    <div class="current-row">
      <span class="dew">Dew Point 19 &deg;</span>
      <span class="pressure">Pressure 1035.2</span>
    </div>
  `;
}
