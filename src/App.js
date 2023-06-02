import React, { useState, useEffect } from 'react';
import './App.css';
import useFetch from './Hooks/useFetch';
import Table from './Components/Table';
import NumericFilter from './Components/NumericFilter';
import Filters from './Components/Filters';
import Sort from './Components/Sort';

function App() {
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [filtersNumeric, setFiltersNumeric] = useState([]);
  const [sort, setSort] = useState({});
  const BASE_URL = 'https://swapi.dev/api/planets';
  const { planets } = useFetch(BASE_URL);

  const numericFilter = ({ comparison, value, column }, planetsData) => {
    if (comparison === 'maior que') {
      return planetsData.filter((planet) => Number(planet[column]) > value);
    }
    if (comparison === 'menor que') {
      return planetsData.filter((planet) => Number(planet[column]) < value);
    }
    if (comparison === 'igual a') {
      return planetsData.filter((planet) => Number(planet[column]) === value);
    }
  };

  const filterPlanets = () => {
    const filteredByName = filterName === ''
      ? planets : planets.filter((planet) => planet.name.includes(filterName));
    return filtersNumeric
      .reduce((planetsData, filt) => numericFilter(filt, planetsData), filteredByName);
  };

  useEffect(() => {
    setFilteredPlanets(filterPlanets());
  }, [filterName, filtersNumeric]);

  const sortPlanets = (planetsFiltreredInfo) => (sort === {}
    ? planetsFiltreredInfo : planetsFiltreredInfo
      .sort((firstE, secondE) => {
        const negNumber = -1;
        const posNumber = 1;
        if (firstE[sort.column] === 'unknown') {
          return posNumber;
        }
        if (secondE[sort.column] === 'unknown') {
          return negNumber;
        }
        const sortValue = Number(firstE[sort.column]) - Number(secondE[sort.column]);
        return sort.type === 'ASC' ? sortValue : sortValue * negNumber;
      }));

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
      <button
        data-testid="button-remove-filters"
        onClick={ () => setFiltersNumeric([]) }
      >
        Limpar Filtros
      </button>
      <Filters
        filtersNumeric={ filtersNumeric }
        setFiltersNumeric={ setFiltersNumeric }
      />
      <Sort sort={ sort } setSort={ setSort } />
      <Table
        planets={ sortPlanets(
          filteredPlanets.length === 0 ? planets : filteredPlanets,
        ) }
      />
    </>
  );
}

export default App;
