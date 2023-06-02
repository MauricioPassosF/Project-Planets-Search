import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import testData from '../../cypress/mocks/testData';
import userEvent from '@testing-library/user-event';
import { act } from "react-dom/test-utils";

describe('Teste de renderização da tabela', () => {
  const allPlanets = ['Tatooine', 'Alderaan', 
  'Yavin IV', 'Hoth', 'Dagobah', 'Bespin', 'Endor', 'Naboo', 'Coruscant', 'Kamino']

  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(testData),
  });
  });

  afterEach(() => {
    jest.restoreAllMocks()
  });

  it('A tabela é renderizada com 10 planetas', async () => {
    render(<App />);
    const planets = await screen.findAllByTestId('planet-name')
    expect(planets[0]).toBeInTheDocument()
    expect(planets).toHaveLength(10)
    allPlanets.forEach((planet, index) => {
      expect(planets[index]).toHaveTextContent(planet)
    })
  });

  it('O filtro de nome funciona', async () => {
    render(<App />);
    const inputName = screen.getByTestId('name-filter')
    expect(inputName).toBeInTheDocument()
    const bespin = await screen.findByText('Bespin');
    expect(bespin).toBeInTheDocument()
    act(()=>userEvent.type(inputName, 'too'));
    expect(inputName.value).toBe('too')
    expect(bespin).not.toBeInTheDocument()
  });
});