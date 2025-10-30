import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { vi, describe, test, expect, beforeEach } from 'vitest';
import Invalid from '../Invalid404';

describe('invalid page check', () => {
  test('404 page', async () => {
    render(
      <BrowserRouter>
        <Invalid />
      </BrowserRouter>
    );
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Sorry! The page you are looking for does not exist./i)
    ).toBeInTheDocument();
  });
});

describe('Dummy Route Redirect', () => {
  test('redirects to /Login when link is clicked', async () => {
    render(
      <MemoryRouter initialEntries={['/invalid']}>
        <Routes>
          <Route path="/invalid" element={<Invalid />} />
          <Route path="/auth/login" element={<div>Login Page Rendered</div>} />
        </Routes>
      </MemoryRouter>
    );

    const user = userEvent.setup();
    const link = screen.getByText(/Go to Homepage/i);
    await user.click(link);

    expect(screen.getByText(/Login Page Rendered/i)).toBeInTheDocument();
  });
});
