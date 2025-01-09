import './daily.css';
import sunnyIcon from '../../images/sunny.png';

export function daily() {
	return `
		<button id="prev">
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>
		</button>

		<div class="card-container">

			<button class="daily-card">
				<div class="card-row card-date today">
					<span class="weekday">Today</span>
					<span class="day">27</span>
				</div>

				<div class="card-row card-icon">
					<div class="icon">
						<img src="${sunnyIcon}" alt="weather icon" />
					</div>
				</div>

				<div class="card-row card-temp">
					<div class="card-temp-max">
						25&deg;
					</div>
					<div class="card-temp-min">
						-14&deg;
					</div>
				</div>

				<div class="card-row card-desc">
					<p>Mostly Sunny</p>
				</div>
			</button>


			<button class="daily-card">
				<div class="card-row card-date">
					<span class="weekday">Mon</span>
					<span class="day">27</span>
				</div>

				<div class="card-row card-icon">
					<div class="icon">
						<img src="${sunnyIcon}" alt="weather icon" />
					</div>
				</div>

				<div class="card-row card-temp">
					<div class="card-temp-max">
						25&deg;
					</div>
					<div class="card-temp-min">
						-14&deg;
					</div>
				</div>

				<div class="card-row card-desc">
					<p>Mostly Sunny</p>
				</div>
			</button>
			<button class="daily-card">
				<div class="card-row card-date">
					<span class="weekday">Mon</span>
					<span class="day">27</span>
				</div>

				<div class="card-row card-icon">
					<div class="icon">
						<img src="${sunnyIcon}" alt="weather icon" />
					</div>
				</div>

				<div class="card-row card-temp">
					<div class="card-temp-max">
						25&deg;
					</div>
					<div class="card-temp-min">
						-14&deg;
					</div>
				</div>

				<div class="card-row card-desc">
					<p>Mostly Sunny</p>
				</div>
			</button>
			<button class="daily-card">
				<div class="card-row card-date">
					<span class="weekday">Mon</span>
					<span class="day">27</span>
				</div>

				<div class="card-row card-icon">
					<div class="icon">
						<img src="${sunnyIcon}" alt="weather icon" />
					</div>
				</div>

				<div class="card-row card-temp">
					<div class="card-temp-max">
						25&deg;
					</div>
					<div class="card-temp-min">
						-14&deg;
					</div>
				</div>

				<div class="card-row card-desc">
					<p>Mostly Sunny</p>
				</div>
			</button>
			<button class="daily-card">
				<div class="card-row card-date">
					<span class="weekday">Mon</span>
					<span class="day">27</span>
				</div>

				<div class="card-row card-icon">
					<div class="icon">
						<img src="${sunnyIcon}" alt="weather icon" />
					</div>
				</div>

				<div class="card-row card-temp">
					<div class="card-temp-max">
						25&deg;
					</div>
					<div class="card-temp-min">
						-14&deg;
					</div>
				</div>

				<div class="card-row card-desc">
					<p>Mostly Sunny</p>
				</div>
			</button>
			<button class="daily-card">
				<div class="card-row card-date">
					<span class="weekday">Mon</span>
					<span class="day">27</span>
				</div>

				<div class="card-row card-icon">
					<div class="icon">
						<img src="${sunnyIcon}" alt="weather icon" />
					</div>
				</div>

				<div class="card-row card-temp">
					<div class="card-temp-max">
						25&deg;
					</div>
					<div class="card-temp-min">
						-14&deg;
					</div>
				</div>

				<div class="card-row card-desc">
					<p>Mostly Sunny</p>
				</div>
			</button>
			<button class="daily-card">
				<div class="card-row card-date">
					<span class="weekday">Mon</span>
					<span class="day">27</span>
				</div>

				<div class="card-row card-icon">
					<div class="icon">
						<img src="${sunnyIcon}" alt="weather icon" />
					</div>
				</div>

				<div class="card-row card-temp">
					<div class="card-temp-max">
						25&deg;
					</div>
					<div class="card-temp-min">
						-14&deg;
					</div>
				</div>

				<div class="card-row card-desc">
					<p>Mostly Sunny</p>
				</div>
			</button>
			<button class="daily-card">
				<div class="card-row card-date">
					<span class="weekday">Mon</span>
					<span class="day">27</span>
				</div>

				<div class="card-row card-icon">
					<div class="icon">
						<img src="${sunnyIcon}" alt="weather icon" />
					</div>
				</div>

				<div class="card-row card-temp">
					<div class="card-temp-max">
						25&deg;
					</div>
					<div class="card-temp-min">
						-14&deg;
					</div>
				</div>

				<div class="card-row card-desc">
					<p>Mostly Sunny</p>
				</div>
			</button>
			<button class="daily-card">
				<div class="card-row card-date">
					<span class="weekday">Mon</span>
					<span class="day">27</span>
				</div>

				<div class="card-row card-icon">
					<div class="icon">
						<img src="${sunnyIcon}" alt="weather icon" />
					</div>
				</div>

				<div class="card-row card-temp">
					<div class="card-temp-max">
						25&deg;
					</div>
					<div class="card-temp-min">
						-14&deg;
					</div>
				</div>

				<div class="card-row card-desc">
					<p>Mostly Sunny</p>
				</div>
			</button>
		
			

		</div>
		<button id="prev">
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
		</button>
	`;
}
