import React, { useState, useEffect} from 'react';
import axios from "axios";
import './App.css';
import Filter from "./components/Filter";
import Countries from "./components/Countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(()=> {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => {
        setCountries(response.data);
        console.log(response.data);
      })
  },[]);

  const handleFilterChange = event => setFilter(event.target.value);

  const countriesToShow = countries.filter(country => 
    country.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <Countries countries={countriesToShow} />
    </div>
  )
}

export default App;
