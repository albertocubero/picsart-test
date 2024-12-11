import { render, screen } from '@testing-library/react';
import App from './App';

it('renders hello world', () => {
  render(<App />);
  const linkElement = screen.getByText(/hello world/i);  // Búsqueda de texto en el DOM
  expect(linkElement).toBeInTheDocument();  // Verifica si el texto está en el documento
});
