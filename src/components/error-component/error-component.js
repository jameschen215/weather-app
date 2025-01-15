import './error-component.css';
import { ERROR_MESSAGES } from '../../utils/constants';

export function errorComponent(error) {
	const code = parseInt(error.message);

	const title = ERROR_MESSAGES[code]?.title || 'Unknown Error';
	const message =
		ERROR_MESSAGES[error.message]?.message ||
		"We're sorry, but something went wrong. We will work on fixing it soon.";

	return `
    <h1 class="error-title">${title}</h1>
    <p class="error-message">${message}</p>
  `;
}
