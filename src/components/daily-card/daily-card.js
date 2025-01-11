import './daily-card.css';
import { format, isToday } from 'date-fns';
import { weatherIcons } from '../../utils/images';

export function dailyCard(day, index) {
	const {
		datetime,
		icon,
		tempmax: tempMax,
		tempmin: tempMin,
		conditions: desc,
	} = day;

	const date = new Date(datetime);
	const weatherIcon = weatherIcons[icon];

	const cardDateContent = isToday(date)
		? `<span class="weekday">Today</span>`
		: `
      <span class="weekday">${format(date, 'E')}</span>
      <span class="day">${format(date, 'd')}</span>
      `;

	return `
    <button class="daily-card" data-index="${index}">
      <div class="card-row card-date">
        ${cardDateContent}
      </div>

      <div class="card-row card-icon">
        <div class="icon">
          <img src="${weatherIcon}" alt="weather icon" />
        </div>
      </div>

      <div class="card-row card-temp">
        <div class="card-temp-max">${Math.round(tempMax)}&deg;</div>
        <div class="card-temp-min">${Math.round(tempMin)}&deg;</div>
      </div>

      <div class="card-row card-desc">
        <p>${desc}</p>
      </div>
    </button>
  `;
}
