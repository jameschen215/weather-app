import { spinner } from '../components/spinner/spinner';
import { current } from '../components/current/current';
import { daily } from '../components/daily/daily';
import { welcome } from '../components/welcome/welcome';
import { errorComponent } from '../components/error-component/error-component';

const container = document.querySelector('#container');
// const main = document.querySelector('#main');
const currentDom = document.querySelector('#current');
const dailyDom = document.querySelector('#daily');

export function showSpinner() {
	currentDom.innerHTML = spinner();
	dailyDom.innerHTML = spinner();
	console.log('Loading data...');
}

export function showData(data, currentIndex, unit) {
	currentDom.innerHTML = current(data, currentIndex, unit);
	dailyDom.innerHTML = daily(data, currentIndex, unit);
}

export function showError(error) {
	currentDom.innerHTML = errorComponent(error);
	dailyDom.innerHTML = '';
	console.log(error.message);
}

export function showWelcome() {
	currentDom.innerHTML = welcome();
	dailyDom.innerHTML = '';
	console.log('Welcome to my weather forecast app!');
}

export function changeBackgroundDynamically(data, currentIndex) {
	let weather;
	if (currentIndex === 0) {
		weather = data?.currentConditions?.icon;
	} else {
		weather = data.days[currentIndex].icon;
	}

	if (weather !== undefined) {
		container.className = `container ${weather}`;
	} else {
		container.className = 'container';
	}
}
