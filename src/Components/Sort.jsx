// import PropTypes from 'prop-types';
import PropTypes from 'prop-types';

import React, { useState } from 'react';

export default function Sort(props) {
  const [columnSort, setColumnSort] = useState('population');
  const [selectedRadio, setSelectedRadio] = useState('ASC');
  const { setSort } = props;

  const allColumnsOptions = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  return (
    <div className="sort">
      <label htmlFor="columnSort">
        Ordenar:
        <select
          type="select"
          data-testid="column-sort"
          name="columnSort"
          id="columnSort"
          value={ columnSort }
          onChange={ (e) => setColumnSort(e.target.value) }
        >
          {allColumnsOptions.map((column) => (
            <option value={ column } key={ column }>
              {column}
            </option>
          ))}
        </select>
      </label>
      <div className="radios">
        <label htmlFor="asc-radio">
          Ascendente
          <input
            type="radio"
            id="asc-radio"
            name="asc-radio"
            value="ASC"
            checked={ selectedRadio === 'ASC' }
            data-testid="column-sort-input-asc"
            onChange={ () => setSelectedRadio('ASC') }
          />
        </label>
        <label htmlFor="desc-radio">
          Descendente
          <input
            type="radio"
            id="desc-radio"
            name="desc-radio"
            value="DESC"
            checked={ selectedRadio === 'DESC' }
            data-testid="column-sort-input-desc"
            onChange={ () => setSelectedRadio('DESC') }
          />
        </label>
      </div>
      <button
        data-testid="column-sort-button"
        className="column-sort-button"
        onClick={ () => setSort({
          column: columnSort,
          type: selectedRadio,
        }) }
      >
        FILTRAR
      </button>
    </div>
  );
}

Sort.propTypes = {
  setSort: PropTypes.func,
}.isRequired;
