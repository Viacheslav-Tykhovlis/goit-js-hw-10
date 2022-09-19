import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import { Report } from 'notiflix/build/notiflix-report-aio';
const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const refs = {
  inputEl: document.querySelector('#search-box'),
  ulEl: document.querySelector('.country-list'),
  infoEl: document.querySelector('.country-info'),
};

refs.inputEl.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(evt) {
  const searchText = evt.target.value.trim();
  if (!searchText) {
    clearDisplay();
    return;
  }
  fetchCountries(searchText)
    .then(data => {
      if (data.status === 404) {
        clearDisplay();
        return Promise.reject(
          Report.failure('Oops, there is no country with that name', '')
        );
      } else {
        onFetchSuccess(data);
      }
    })
    .catch(error => {});
}

function onFetchSuccess(countries) {
  if (countries.length > 10) {
    clearDisplay();
    Report.info(
      'Too many matches found. Please enter a more specific name.',
      ''
    );
    return;
  }

  if (countries.length > 1 && countries.length <= 10) {
    insertAllCountries(countries);
  }

  if (countries.length === 1) {
    insertCountry(countries);
  }
}

function insertAllCountries(countries) {
  refs.infoEl.innerHTML = '';
  const markup = renderListCountries(countries);
  refs.ulEl.innerHTML = markup;
}

function renderListCountries(countries) {
  return countries
    .map(
      country =>
        `<li class="list-item"><img class="list-img" src="${country.flags.svg}" alt="Flag"><span class="list-text">${country.name.official}</span></li>`
    )
    .join('');
}

function insertCountry(country) {
  refs.ulEl.innerHTML = '';
  const markup = renderCountry(country);
  refs.infoEl.innerHTML = markup;
}

function renderCountry(country) {
  const [{ flags, capital, languages, name, population }] = country;

  return `<ul class="country-list">
        <li class="list-item">
          <img class="list-img--oneCountry" src="${flags.svg}" alt="Flag" />
          <span class="list-text--oneCountry">${name.official}</span>
        </li>
        <li class="list-item"><b class="list-name">Capital:</b><span> ${capital}</span></li>
        <li class="list-item"><b class="list-name">Population:</b><span> ${population}</span></li>
        <li class="list-item"><b class="list-name">Languages:</b><span> ${Object.values(
          languages
        ).join(', ')}</span></li>
      </ul>`;
}

function clearDisplay() {
  refs.ulEl.innerHTML = '';
  refs.infoEl.innerHTML = '';
}
