import './daily-card.css';
import { format, isToday } from 'date-fns';
import { weatherIcons } from '../../scripts/images';
import { formatTemp } from '../../utils/utils';

export function dailyCard(data, day, index, currentIndex, unit) {
	const { datetime, icon, tempmax, tempmin, conditions } = day;
	const tempMin = Math.round(tempmin);
	const tempMax = Math.round(tempmax);

	const date = new Date(datetime);

	let weatherIcon = weatherIcons[icon];
	let desc = conditions;

	if (isToday(date)) {
		weatherIcon = weatherIcons[data.currentConditions.icon];
		desc = data.currentConditions.conditions;
	}

	return `
    <button 
      class="daily-card ${index === currentIndex ? 'selected' : ''}" 
      data-index="${index}"
    >
      <div class="card-row card-date>
        <span class="weekday">
          ${isToday(date) ? 'Today' : format(date, 'E')}
        </span>
        <span class="day ${isToday(date) ? 'hidden' : ''}">
          ${format(date, 'd')}
        </span>
      </div>

      <div class="card-row card-icon">
        <div class="icon">
          <img src="${weatherIcon}" alt="weather icon" />
        </div>
      </div>

      <div class="card-row card-temp">
        <div class="card-temp-max">
          ${formatTemp(tempMax, unit)}&deg;
        </div>
        <div class="card-temp-min">
          ${formatTemp(tempMin, unit)}&deg;
        </div>
      </div>

      <div class="card-row card-desc">
        <p>${desc}</p>
      </div>
    </button>
  `;
}
