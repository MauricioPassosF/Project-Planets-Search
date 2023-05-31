import React from 'react';
import useFetch from '../Hooks/useFetch';
import TableBody from './TableBody';
import TableHead from './TableHead';

export default function Table() {
  const BASE_URL = 'https://swapi.dev/api/planets';
  const { planets } = useFetch(BASE_URL);
  return (
    <table>
      <TableHead />
      <TableBody planets={ planets } />
    </table>
  );
}
