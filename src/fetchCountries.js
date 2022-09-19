export function fetchCountries(searchText) {
  return fetch(
    `https://restcountries.com/v3.1/name/${searchText}?fields=name,capital,population,flags,languages`
  )
    .then(response => response.json())
    .catch(error => {});
}
