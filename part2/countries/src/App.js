import {useState, useEffect} from 'react'
import axios from 'axios';
import Countries from './components/Countries'
import Filter from './components/Filter'

function App() {

  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');
  const [selectedCountry, selectCountry] = useState('');

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    selectCountry('');
  }
  const handleShowClick = (event) => {
    selectCountry(event.target.value);
  }
  useEffect(() => {
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      console.log(response.data);
      setCountries(response.data);
    })
  }, []);
  return (
    <>
      <Filter handleFilterChange={handleFilterChange}/>
      <Countries countries={countries} filter={filter} selectCountry={handleShowClick} selectedCountryName={selectedCountry} />
    </>
  );
}

export default App;
