import { render, screen } from '@testing-library/react';
import List from './List';

describe('List Component', () => {
  it('renders List text', () => {
    render(<List />);
    
    expect(screen.getByText(/List/i)).toBeInTheDocument();
  });
});
