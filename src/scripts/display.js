import { spinner } from '../components/spinner/spinner';
import { current } from '../components/current/current';
import { daily } from '../components/daily/daily';
import { welcome } from '../components/welcome/welcome';
import { errorComponent } from '../components/error-component/error-component';

export function showSpinner(currentDom, dailyDom) {
	currentDom.innerHTML = spinner();
	dailyDom.innerHTML = spinner();
	console.log('Loading data...');
}

export function showData(currentDom, dailyDom, data, currentIndex, unit) {
	currentDom.innerHTML = current(data, currentIndex, unit);
	dailyDom.innerHTML = daily(data, unit);
}

export function showError(currentDom, dailyDom, error) {
	currentDom.innerHTML = errorComponent(error);
	dailyDom.innerHTML = '';
	console.log(error.message);
}

export function showWelcome(currentDom, dailyDom) {
	currentDom.innerHTML = welcome();
	dailyDom.innerHTML = '';
	console.log('Welcome to my weather forecast app!');
}
