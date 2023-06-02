import PropTypes from 'prop-types';
import React from 'react';

export default function TableBody(props) {
  const { planets } = props;
  return (
    <tbody className="table-body">
      {planets.map((planet) => (
        <tr key={ planet.name } className="table-body-row">
          <td className="table-body-element" data-testid="planet-name">{planet.name}</td>
          <td className="table-body-element">{planet.rotation_period}</td>
          <td className="table-body-element">{planet.orbital_period}</td>
          <td className="table-body-element">{planet.diameter}</td>
          <td className="table-body-element">{planet.climate}</td>
          <td className="table-body-element">{planet.gravity}</td>
          <td className="table-body-element">{planet.terrain}</td>
          <td className="table-body-element">{planet.surface_water}</td>
          <td className="table-body-element">{planet.population}</td>
          <td className="table-body-element">{planet.films}</td>
          <td className="table-body-element">{planet.created}</td>
          <td className="table-body-element">{planet.edited}</td>
          <td className="table-body-element">{planet.url}</td>
        </tr>
      ))}
    </tbody>
  );
}
TableBody.propTypes = {
  planets: PropTypes.shape({}),
}.isRequired;
