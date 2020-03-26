import React from "react";
import Weather from "./Weather";

const SingleCountry = ({ country }) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h3>languages</h3>
      <ul>
        {country.languages.map(language => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <img src={country.flag} alt="country flag" width="200px" />
      <Weather capital={country.capital} />
    </div>
  );
};

export default SingleCountry;
