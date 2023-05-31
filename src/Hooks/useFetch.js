import { useEffect, useState } from 'react';

export default function useFetch(url) {
  const [planets, setPlanets] = useState([]);

  const getPlanets = async () => {
    const response = await fetch(url);
    const data = await response.json();
    const planetsData = data.results.map((planet) => {
      delete planet.residents;
      return planet;
    });
    setPlanets(planetsData);
  };

  useEffect(() => {
    getPlanets();
  }, []);

  return { planets };
}
