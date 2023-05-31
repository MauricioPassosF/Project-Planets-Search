import React from 'react';

export default function TableHead() {
  const rowsNames = ['Name', 'Rotation Period', 'Orbital Period', 'Diameter', 'Climate',
    'Gravity', 'Terrain', 'Surface Water', 'Population', 'Films', 'Created', 'Edited',
    'URL'];
  return (
    <thead className="table-head">
      <tr className="table-head-row">
        {rowsNames.map((rowName) => (
          <th scope="col" key={ rowName } className="table-head-element">{rowName}</th>
        ))}
      </tr>
    </thead>
  );
}
