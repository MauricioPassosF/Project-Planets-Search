import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import testData from '../../cypress/mocks/testData';
import userEvent from '@testing-library/user-event';
import { act } from "react-dom/test-utils";

describe('Teste do filtro numericos', () => {

  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(testData),
  });
  });

  afterEach(() => {
    jest.restoreAllMocks()
  });

  it('Filtro com maior que e population', async () => {
    render(<App />);
    const yavin = await screen.findByText('Yavin IV');
    expect(yavin).toBeInTheDocument()
    const selectColumn = screen.getByTestId('column-filter')
    const selectComparison = screen.getByTestId('comparison-filter')
    const inputValue = screen.getByTestId('value-filter')
    const filterButton = screen.getByTestId('button-filter')
    act(()=>userEvent.selectOptions(selectColumn, 'population'));
    act(()=>userEvent.selectOptions(selectComparison, 'maior que'));
    act(()=>userEvent.type(inputValue, '2000'));
    expect(yavin).toBeInTheDocument()
    act(()=>userEvent.click(filterButton));
    // expect(inputName.value).toBe('too')
    expect(yavin).not.toBeInTheDocument()
  });

  it('Filtro com menor que e surface water', async () => {
    render(<App />);
    const yavin = await screen.findByText('Yavin IV');
    expect(yavin).toBeInTheDocument()
    const selectColumn = screen.getByTestId('column-filter')
    const selectComparison = screen.getByTestId('comparison-filter')
    const inputValue = screen.getByTestId('value-filter')
    const filterButton = screen.getByTestId('button-filter')
    act(()=>userEvent.selectOptions(selectColumn, 'surface_water'));
    act(()=>userEvent.selectOptions(selectComparison, 'menor que'));
    act(()=>userEvent.type(inputValue, '7'));
    expect(yavin).toBeInTheDocument()
    act(()=>userEvent.click(filterButton));
    // expect(inputName.value).toBe('too')
    expect(yavin).not.toBeInTheDocument()
  });

  it('Filtro com igual a e diameter', async () => {
    render(<App />);
    const yavin = await screen.findByText('Yavin IV');
    expect(yavin).toBeInTheDocument()
    const selectColumn = screen.getByTestId('column-filter')
    const selectComparison = screen.getByTestId('comparison-filter')
    const inputValue = screen.getByTestId('value-filter')
    const filterButton = screen.getByTestId('button-filter')
    act(()=>userEvent.selectOptions(selectColumn, 'diameter'));
    act(()=>userEvent.selectOptions(selectComparison, 'igual a'));
    act(()=>userEvent.type(inputValue, '7200'));
    expect(yavin).toBeInTheDocument()
    act(()=>userEvent.click(filterButton));
    // expect(inputName.value).toBe('too')
    expect(yavin).not.toBeInTheDocument()
    await screen.findByText('Hoth');
  });
});