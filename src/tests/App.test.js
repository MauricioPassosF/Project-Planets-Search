import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import testData from '../../cypress/mocks/testData';

describe('Testes do App', () => {
  const BASE_URL = 'https://swapi.dev/api/planets';

  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(testData),
  });
  });

  afterEach(() => {
    jest.restoreAllMocks()
  });

  it('Existe título na página', () => {
    render(<App />);
    screen.getByRole('heading', { name: /star wars planet filter/i, level: 1 })
  });

  it('O fetch é executado somente uma vez, assim que a pagina é renderizada', async () => {

  render(<App />);
    expect(global.fetch).toBeCalledWith(BASE_URL)
    expect(global.fetch).toHaveBeenCalledTimes(1)    
  });
});
