// src/pages/ServerError.test.jsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ServerError from '../Server500';

describe('ServerError component', () => {
  it('renders error code and message correctly', () => {
    render(
      <BrowserRouter>
        <ServerError />
      </BrowserRouter>
    );

  
    expect(screen.getByText('500')).toBeInTheDocument();
    expect(screen.getByText('Internal Server Error')).toBeInTheDocument();

    
    expect(
      screen.getByText(/Something went wrong on the server/i)
    ).toBeInTheDocument();

  
    const link = screen.getByRole('link', { name: /go back to home/i });
    expect(link).toBeInTheDocument();
    expect(link.getAttribute('href')).toBe('/auth/login');
  });
});
