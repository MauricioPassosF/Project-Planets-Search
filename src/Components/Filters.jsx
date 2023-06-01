import PropTypes from 'prop-types';
import React from 'react';

export default function Filters(props) {
  const { setFiltersNumeric, filtersNumeric } = props;

  const handleDeleteButton = (indexToDelete) => {
    setFiltersNumeric(filtersNumeric
      .filter((filter, index) => indexToDelete !== index));
  };

  return (
    <div className="filters-exhibition">
      {filtersNumeric.map(({ value, comparison, column }, index) => (
        <span key={ column } data-testid="filter" className="filter">
          <p>{`${column} ${comparison} ${value}`}</p>
          <button
            onClick={ () => handleDeleteButton(index) }
          >
            Remove
          </button>
        </span>
      ))}
    </div>
  );
}

Filters.propTypes = {
  filtersNumeric: PropTypes.shape([]),
  setFiltersNumeric: PropTypes.func,
}.isRequired;
