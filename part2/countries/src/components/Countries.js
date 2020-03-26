import React from "react";
import SingleCountry from "./SingleCountry";
import InfoButton from "./InfoButton";

const Countries = ({countries}) => {
  return (
    <div>
      {(countries.length > 10) ?
        <p>Too ,many matches, specify another filter</p> : 
        (countries.length === 1) ? 
        (<SingleCountry country={countries[0]} />) :
        countries.map(country => 
        <div key={country.name}>
          {country.name}
          <InfoButton country={country} />
        </div>)}
    </div>
  )
}

export default Countries;