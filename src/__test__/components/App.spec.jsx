import { describe, it, expect } from 'vitest';
import HelloWorld from '../../HelloWorld';
import { fireEvent, render, screen } from '@testing-library/react';

const add = (a, b) => a + b;

const testSample = [
  {
    a: 2,
    b: 3,
    expected: 5,
  },
  {
    a: -1,
    b: -3,
    expected: -4,
  },
];

describe('a simple test coverage', () => {
  it('should display a text on my page', async () => {
    render(<HelloWorld />);
    const readText = await screen.findByText('Test Me');
    expect(readText).toBeInTheDocument();
  });
  it('should toggle dark and light mode when button is clicked', () => {
    render(<HelloWorld />);

    expect(screen.getByText('Light')).toBeInTheDocument();
    const getBtn = screen.getByTestId('toggle-btn');
    fireEvent.click(getBtn);
    expect(screen.getByText('Dark')).toBeInTheDocument();
    fireEvent.click(getBtn);
    expect(screen.queryByText('Dark')).not.toBeInTheDocument();
  });
  it('should add a and be and be equal to expected', () => {
    testSample.forEach(({ a, b, expected }) => {
      const result = add(a, b);
      expect(result).toEqual(expected);
    });
  });
});
