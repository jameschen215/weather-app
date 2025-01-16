import './welcome.css';

export function welcome() {
	return `
    <div class="welcome-container">
      <h1 class="welcome-title">Welcome to Weather Forecast</h1>
      <p class="welcome-message">
        You can search for your city using the search input in the top right corner.
      </p>
    </div>
  `;
}
