import React, { useState, useEffect } from 'react';
import './App.css';
import useFetch from './Hooks/useFetch';
import Table from './Components/Table';
import NumericFilter from './Components/NumericFilter';

function App() {
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [filtersNumeric, setFiltersNumeric] = useState([]);
  const BASE_URL = 'https://swapi.dev/api/planets';
  const { planets } = useFetch(BASE_URL);

  const numericFilter = ({ comparison, value, column }, planetsData) => {
    switch (comparison) {
    case 'maior que':
      return planetsData.filter((planet) => planet[column] > value);
    case 'menor que':
      return planetsData.filter((planet) => planet[column] < value);
    case 'igual a':
      return planetsData.filter((planet) => planet[column] === value);
    default:
      return planetsData;
    }
  };

  const filterPlanets = () => {
    const filteredByName = filteredPlanets.length === 0
      ? planets : planets.filter((planet) => planet.name.includes(filterName));
    console.log(filteredByName);
    return filtersNumeric
      .reduce((planetsData, filt) => numericFilter(filt, planetsData), filteredByName);
  };

  useEffect(() => {
    setFilteredPlanets(filterPlanets());
  }, [filterName, filtersNumeric]);

  return (
    <>
      <h1>Star Wars Planet Filter</h1>
      <input
        type="text"
        data-testid="name-filter"
        name="inputFilterName"
        className="input-filter-name"
        placeholder="Search planet name"
        value={ filterName }
        onChange={ (e) => setFilterName(e.target.value) }
      />
      <NumericFilter
        filtersNumeric={ filtersNumeric }
        setFiltersNumeric={ setFiltersNumeric }
      />
      <Table planets={ filteredPlanets.length === 0 ? planets : filteredPlanets } />
    </>
  );
}

export default App;
