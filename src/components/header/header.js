import './header.css';
import logoImage from '../../images/logo.png';

export function header() {
	return `
	  <div class="brand">
	    <div class="logo">
	      <img src="${logoImage}" alt="logo" />
	    </div>
	    <span>
	      Weather Forecast
	    </span>
	  </div>
	  <label class="search">
	    <input
	      type="search"
	      name="location"
	      id="search"
	      placeholder="Search your city"
	    />
	    <div class="icon">
	      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
	    </div>
	    </label>
	`;
}
