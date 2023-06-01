import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

export default function NumericFilter(props) {
  const [columnFilter, setColumnFilter] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [valueFilter, setValueFilter] = useState(0);
  const { setFiltersNumeric, filtersNumeric } = props;
  const allColumnsOptions = ['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water'];
  const [columnsOptions, setColumnsOption] = useState(allColumnsOptions);
  const comparisonOptions = ['maior que', 'menor que', 'igual a'];

  useEffect(() => {
    setColumnsOption(filtersNumeric
      .reduce((acc, { column }) => acc
        .filter((option) => option !== column), allColumnsOptions));
  }, [filtersNumeric]);

  useEffect(() => {
    setColumnFilter(columnsOptions[0]);
  }, [columnsOptions]);

  const handleButton = () => {
    const filterObject = {
      column: columnFilter,
      comparison: comparisonFilter,
      value: Number(valueFilter),
    };
    setFiltersNumeric([...filtersNumeric, filterObject]);
  };

  return (
    <div className="numeric-filter">
      <label htmlFor="columnFilter">
        Coluna:
        <select
          type="select"
          data-testid="column-filter"
          name="columnFilter"
          id="columnFilter"
          value={ columnFilter }
          onChange={ (e) => setColumnFilter(e.target.value) }
        >
          {columnsOptions.map((column) => (
            <option value={ column } key={ column }>
              {column}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="comparisonFilter">
        Operador
        <select
          type="select"
          data-testid="comparison-filter"
          name="comparisonFilter"
          id="comparisonFilter"
          value={ comparisonFilter }
          onChange={ (e) => setComparisonFilter(e.target.value) }
        >
          {comparisonOptions.map((comparison) => (
            <option value={ comparison } key={ comparison }>
              {comparison}
            </option>
          ))}
        </select>
      </label>
      <input
        type="number"
        data-testid="value-filter"
        name="valueFilter"
        className="value-filter"
        value={ valueFilter }
        onChange={ (e) => setValueFilter(e.target.value) }
      />
      <button
        data-testid="button-filter"
        className="button-filter"
        onClick={ () => handleButton() }
      >
        FILTRAR
      </button>
    </div>
  );
}

NumericFilter.propTypes = {
  filtersNumeric: PropTypes.shape([]),
  setFiltersNumeric: PropTypes.func,
}.isRequired;
