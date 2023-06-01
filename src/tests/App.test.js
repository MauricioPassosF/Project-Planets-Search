import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';

describe('Testes do App', () => {
  const BASE_URL = 'https://swapi.dev/api/planets';

  beforeEach(() => {
    render(<App />);
  });

  it('Existe título na página', () => {
    screen.getByRole('heading', { name: /star wars planet filter/i, level: 1 })
  });

  it.only('O fetch é executado somente uma vez, assim que a pagina é renderizada', async () => {
    jest.spyOn(global,"fetch")
    .mockResolvedValue({
      json: jest.fn().mockResolvedValue({

      })
    });
    await waitFor(() => expect(global.fetch).toBeCalledWith(BASE_URL))
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1))
    
  });
});
