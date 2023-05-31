import React from 'react';
import PropTypes from 'prop-types';
import TableBody from './TableBody';
import TableHead from './TableHead';

export default function Table(props) {
  const { planets } = props;
  return (
    <table>
      <TableHead />
      <TableBody planets={ planets } />
    </table>
  );
}

Table.propTypes = {
  planets: PropTypes.shape({}),
}.isRequired;
