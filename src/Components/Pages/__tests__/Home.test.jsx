import { render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import Home from '../Home';

describe('Home Page', () => {
  it("renders 'Why Choose Us?' section", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    const sectionTitle = screen.getByText(/Why Choose Us/i);
    expect(sectionTitle).toBeInTheDocument();
  });

  it("renders 'Get Started' button", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    const button = screen.getByRole('link', { name: /get started/i });
    expect(button).toBeInTheDocument();
  });

  it("renders 'Our Working Cycle' section", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    const cycleHeading = screen.getByText(/our working cycle/i);
    expect(cycleHeading).toBeInTheDocument();
  });

  it('renders all 3 track record stats', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    let text = screen.getAllByText(/100/i);
    expect(text[0]).toBeInTheDocument();
    expect(text[1]).toBeInTheDocument();
    expect(screen.getByText(/60 Mins/i)).toBeInTheDocument();
  });
});
