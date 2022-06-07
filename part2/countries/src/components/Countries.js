import {useState, useEffect} from 'react'

const CountryLine = ({countryName, selectCountry}) => {
    return (
      <li>{countryName} <button value={countryName} onClick={selectCountry}>show</button></li>
    )
  }
  const CountryDetailed = ({country}) => {
    return (
      <>
        <h2> {country.name.official} </h2>
        <div>
          <p>capital {country.capital[0]}</p>
          <p>area {country.area}</p>
        </div>
        <p><b>languages:</b></p>
        <ul>
          {Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>)}
        </ul>
        <img src={country.flags['png']}/>
      </>
    )
  }
  const Countries = ({countries, filter, selectedCountryName, selectCountry}) => {
    
    const filteredCountryList = countries.filter(country => country.name.official.toLowerCase().includes(filter.toLowerCase()));
  
    if(filteredCountryList.length === 1 )
      return (
        <CountryDetailed country={filteredCountryList[0]}/>
      )
    if (filteredCountryList.length > 10) 
      return <div>Too many matches, specify another filter</div>
    if (selectedCountryName !== '') {
      const country = filteredCountryList.find(country => country.name.official === selectedCountryName)
      return (
        <CountryDetailed country={country}/>
      )
    }
    return (
      <ul>
      {
        filteredCountryList
        .map((country) => <CountryLine key={country.name.official} countryName={country.name.official} selectCountry={selectCountry}/>)
      }
      </ul>
    );
  }

  export default Countries;