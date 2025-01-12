import './error.css';

export function error() {
	return `
    <h1 class="error-title">There is something wrong!</h1>
    <p class="error-message">No data available or failed to fetch. Please try another city.</p>
  `;
}
