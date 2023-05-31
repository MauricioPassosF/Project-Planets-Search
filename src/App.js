import React, { useState, useEffect } from 'react';
import './App.css';
import useFetch from './Hooks/useFetch';
import Table from './Components/Table';

function App() {
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [filterName, setFilterName] = useState('');
  const BASE_URL = 'https://swapi.dev/api/planets';
  const { planets } = useFetch(BASE_URL);

  useEffect(() => {
    setFilteredPlanets(planets.filter((planet) => planet.name.includes(filterName)));
  }, [filterName]);

  return (
    <>
      <h1>Star Wars Planet Filter</h1>
      <input
        type="text"
        data-testid="name-filter"
        name="input-filter-name"
        className="input-filter-name"
        placeholder="Search planet name"
        value={ filterName }
        onChange={ (e) => setFilterName(e.target.value) }
      />
      <Table planets={ filteredPlanets.length === 0 ? planets : filteredPlanets } />
    </>
  );
}

export default App;
