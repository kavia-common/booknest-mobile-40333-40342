import { render, screen } from '@testing-library/react';
import App from './App';

test('renders BookNest header on Home', async () => {
  render(<App />);
  // The Home header contains "BookNest" with styled span
  const heading = await screen.findByRole('heading', { name: /booknest/i });
  expect(heading).toBeInTheDocument();
});
