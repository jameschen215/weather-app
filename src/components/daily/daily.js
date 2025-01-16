import './daily.css';
import { dailyCard } from '../daily-card/daily-card';

export function daily(data, unit) {
	if (data === undefined || data.days === undefined) return '';

	return `
		<div class="daily-title">
			<p>Daily</p>
		</div>
		<div class="scroll-container">
			<button id="prev">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>
			</button>

			<div id="card-container" class="card-container">
				${data.days.map((day, index) => dailyCard(data, day, index, unit)).join('')}
			</div>

			<button id="next">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
			</button>
		</div>
	`;
}
