import {useState, useEffect} from 'react'
import axios from 'axios';
const Countries = ({countries, filter}) => {
  
  console.log(countries.filter(country => country.name.official.includes(filter)), 'background: green; color: white; display: block;');
  const filteredList = countries.filter(country => country.name.official.toLowerCase().includes(filter.toLowerCase()));

  if(filteredList.length === 1)
  {
    
    const country = filteredList[0];
    const array = Array.from(Object.values(country.languages))
    const array2 = Array.from(country.languages);
    return (
      <>
        <h2> {country.name.official} </h2>
        <div>
          <p>capital {country.capital[0]}</p>
          <p>area {country.area}</p>
        </div>
        <p><b>languages:</b></p>
        <ul>
          {array.map(lang => <li key={lang}>{lang}</li>)}
        </ul>
        <img src={country.flags['png']}/>
      </>
    )
  }
  if (filteredList.length > 10) 
    return <div>Too many matches, specify another filter</div>
  return (
    <ul>
    {
      countries
      .filter(country => country.name.official.toLowerCase().includes(filter.toLowerCase()))
      .map((country) => <li key = {country.name.official}>{country.name.official}</li>)
    }
    </ul>
  );
}
const Filter = ({handleFilterChange}) => {
  return (
    <div>
      find countries <input onChange={handleFilterChange}/>
    </div>
  );
}

function App() {

  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
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
      <Countries countries={countries} filter={filter} />
    </>
  );
}

export default App;
