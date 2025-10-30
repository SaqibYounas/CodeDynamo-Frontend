import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Contact from '../ContactUs';

// Clean localStorage before each test
beforeEach(() => {
  localStorage.clear();
});

describe('Contact Component', () => {
  test('renders heading and description', () => {
    render(
      <MemoryRouter>
        <Contact />
      </MemoryRouter>
    );

    expect(screen.getByText(/get in touch/i)).toBeInTheDocument();
    expect(
      screen.getByText(/This platform is proudly developed by/i)
    ).toBeInTheDocument();
  });

  test('renders login and signup buttons when not authenticated', () => {
    render(
      <MemoryRouter>
        <Contact />
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /sign up/i })).toBeInTheDocument();
  });

  test('renders dashboard message when authenticated', () => {
    localStorage.setItem('token', 'dummyToken123');

    render(
      <MemoryRouter>
        <Contact />
      </MemoryRouter>
    );

    expect(
      screen.getByText(
        /You are logged in. You can now send a request from your dashboard/i
      )
    ).toBeInTheDocument();
  });
});
