import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Contact from '../ContactUs';
import { vi } from 'vitest';

vi.mock('../utils/Profiler', () => ({
  ProfilerWrapper: ({ children }) => <>{children}</>,
}));

vi.mock('../data/Contact', () => ({
  contactData: {
    icon: () => <svg data-testid="contact-icon" />,
    title: 'Contact Us',
    developer: 'John Doe',
    team: 'CodeDynamo',
    description: 'We help build digital solutions.',
  },
}));

describe('Contact Component', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    localStorage.clear();
  });

  it('renders contact info correctly', () => {
    render(
      <MemoryRouter>
        <Contact />
      </MemoryRouter>
    );

    expect(screen.getByText(/Contact Us/i)).toBeInTheDocument();
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/CodeDynamo/i)).toBeInTheDocument();
    expect(screen.getByText(/We help build digital solutions/i)).toBeInTheDocument();
    expect(screen.getByTestId('contact-icon')).toBeInTheDocument();
  });

  it('shows login and signup links when user is not authenticated', () => {
    render(
      <MemoryRouter>
        <Contact />
      </MemoryRouter>
    );

    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign Up/i)).toBeInTheDocument();
  });

  it('shows logged-in message when user is authenticated', () => {
    localStorage.setItem('token', 'fakeToken');

    render(
      <MemoryRouter>
        <Contact />
      </MemoryRouter>
    );

    expect(screen.getByText(/You are logged in/i)).toBeInTheDocument();
    expect(screen.queryByText(/Login/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Sign Up/i)).not.toBeInTheDocument();
  });
});
