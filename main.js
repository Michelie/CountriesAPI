let countries;
let isVisible = false;
const countriesList = document.getElementById('countries');
const regionName = document.getElementById('regions');
fetchCountries();

function showByCountries() {
  let x = document.getElementById('regions');
  if (x.style.display === 'none') {
    x.style.display = 'block';
    isVisible = true;
  } else {
    x.style.display = 'none';
    isVisible = false;
    // console.log(isVisible);
  }

  checkVisible();
}

function checkVisible() {
  if (isVisible === false) {
    fetchCountries();
  } else if (isVisible === true) {
    regionName.addEventListener('change', (event) => fetchRegions());
  }
}

function fetchCountries() {
  fetch('https://restcountries.eu/rest/v2/all')
    .then((res) => res.json())
    .then((data) => initialize(data))
    .catch((err) => console.log('Error:', err));

  countriesList.addEventListener('change', (event) =>
    displayCountryInfo(event.target.value)
  );
}

function fetchRegions() {
  //   console.log(regionName.value);
  fetch(`https://restcountries.eu/rest/v2/region/${regionName.value}`)
    .then((res) => res.json())
    .then((data) => initialize(data))
    .catch((err) => console.log('Error:', err));
}

function initialize(countriesData) {
  countries = countriesData;
  let options = '';

  countries.forEach(
    (country) =>
      (options += `<option value="${country.alpha3Code}">${country.name}</option>`)
  );
  countriesList.innerHTML = options;
  displayCountryInfo(countriesList[countriesList.selectedIndex].value);
}

function displayCountryInfo(countryByAlpha3Code) {
  const countryData = countries.find(
    (country) => country.alpha3Code === countryByAlpha3Code
  );
  document.querySelector('#flag-container img').src = countryData.flag;
  document.querySelector(
    '#flag-container img'
  ).alt = `Flag of ${countryData.name}`;
  document.getElementById('capital').innerHTML = countryData.capital;
  document.getElementById(
    'dialing-code'
  ).innerHTML = `+${countryData.callingCodes[0]}`;
  document.getElementById('population').innerHTML =
    countryData.population.toLocaleString('en-US');
  document.getElementById('currencies').innerHTML = countryData.currencies
    .filter((c) => c.name)
    .map((c) => `${c.name} (${c.code})`)
    .join(', ');
  document.getElementById('region').innerHTML = countryData.region;
}
