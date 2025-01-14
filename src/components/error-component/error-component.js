import './error-component.css';

export function errorComponent(message) {
	return `
    <h1 class="error-title">There is something wrong!</h1>
    <p class="error-message">${message}</p>
  `;
}
