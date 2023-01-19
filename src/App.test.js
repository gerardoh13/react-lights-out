
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders game title h1', () => {
  render(<App />);
  const h1 = screen.getByText("Lights Out!");
  expect(h1).toBeInTheDocument();
});