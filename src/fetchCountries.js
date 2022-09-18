import { Report } from 'notiflix/build/notiflix-report-aio';

export function fetchCountries(searchText) {
  return (
    fetch(
      `https://restcountries.com/v3.1/name/${searchText}?fields=name,capital,population,flags,languages`
    )
      .then(response => response.json())
      // .then(Promise => {
      //   console.log(Promise);
      //   console.log(Promise.status);
      //   console.log(Promise.Object.status);
      //   if (Promise.status === 404) {
      //     console.log('Опа, вот ошибка поиска');
      //     return Promise.reject(
      //       Report.failure('Oops, there is no country with that name', '')
      //     );
      //   }
      // })
      .catch(error => {
        // Report.failure('Oops, there is no country with that name', '');
      })
  );
}
