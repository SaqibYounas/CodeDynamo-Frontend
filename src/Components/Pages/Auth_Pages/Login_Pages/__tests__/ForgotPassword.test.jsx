import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ForgotPassword from '../ForgotPassword';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

// Mock useNavigate
const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

beforeEach(() => {
  vi.clearAllMocks();
});

describe('ForgotPassword (Vitest)', () => {
  it('renders email input and button', () => {
    render(<ForgotPassword />, { wrapper: MemoryRouter });

    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Verify Email/i })
    ).toBeInTheDocument();
  });

  it('shows error message if email is not registered', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        status: 200,
        json: () =>
          Promise.resolve({
            message: 'Not registered Email! Please Signup.',
          }),
      })
    );

    render(<ForgotPassword />, { wrapper: MemoryRouter });

    await userEvent.type(
      screen.getByLabelText(/Email Address/i),
      'notfound@example.com'
    );
    await userEvent.click(
      screen.getByRole('button', { name: /Verify Email/i })
    );

    expect(
      await screen.findByText(/Not registered Email/i)
    ).toBeInTheDocument();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('navigates to reset password if email is found', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        status: 200,
        json: () =>
          Promise.resolve({
            message: 'Email Found',
          }),
      })
    );

    render(<ForgotPassword />, { wrapper: MemoryRouter });

    await userEvent.type(
      screen.getByLabelText(/Email Address/i),
      'user@example.com'
    );
    await userEvent.click(
      screen.getByRole('button', { name: /Verify Email/i })
    );

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(
        '/auth/resetpassword?email=user@example.com'
      );
    });
  });

  it('shows Google account warning if account is Google registered', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        status: 200,
        json: () =>
          Promise.resolve({
            message:
              'This user is registered via Google. Please set a website password first.',
            googleAccount: true,
          }),
      })
    );

    render(<ForgotPassword />, { wrapper: MemoryRouter });

    await userEvent.type(
      screen.getByLabelText(/Email Address/i),
      'googleuser@example.com'
    );
    await userEvent.click(
      screen.getByRole('button', { name: /Verify Email/i })
    );

    expect(
      await screen.findByText(/registered via Google/i)
    ).toBeInTheDocument();
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
