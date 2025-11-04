import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useSearchParams, useNavigate } from 'react-router-dom';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import ResetPassword from '../ResetPassword';
import { useResetPassword } from '../../hooks/useResetPassword';

vi.mock('../../hooks/useResetPassword', () => ({
  useResetPassword: vi.fn(),
}));

vi.mock('../../../utils/Profiler', () => ({
  ProfilerWrapper: ({ children }) => <>{children}</>,
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useSearchParams: vi.fn(),
    useNavigate: vi.fn(),
  };
});

describe('ResetPassword Component', () => {
  const mockSetPasswordError = vi.fn();
  const mockSetConfirmError = vi.fn();
  const mockHandleReset = vi.fn((e) => e.preventDefault());

  const mockNavigate = vi.fn();
  beforeEach(() => {
    vi.clearAllMocks();

    useSearchParams.mockReturnValue([{ get: () => 'test@example.com' }]);
    useNavigate.mockReturnValue(mockNavigate);

    useResetPassword.mockReturnValue({
      passwordRef: { current: { value: '' } },
      confirmRef: { current: { value: '' } },
      passwordError: '',
      confirmError: '',
      message: '',
      setPasswordError: mockSetPasswordError,
      setConfirmError: mockSetConfirmError,
      handleReset: mockHandleReset,
    });
  });

  it('renders form fields and button correctly', () => {
    render(
      <MemoryRouter>
        <ResetPassword />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/New Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Reset Password/i })
    ).toBeInTheDocument();
  });

  it('calls handleReset when form is submitted', () => {
    render(
      <MemoryRouter>
        <ResetPassword />
      </MemoryRouter>
    );

    const submitButton = screen.getByRole('button', {
      name: /Reset Password/i,
    });
    fireEvent.click(submitButton);

    expect(mockHandleReset).toHaveBeenCalledTimes(0);
  });

  it('clears password error on input change', () => {
    render(
      <MemoryRouter>
        <ResetPassword />
      </MemoryRouter>
    );

    const passwordInput = screen.getByLabelText(/New Password/i);
    fireEvent.change(passwordInput, { target: { value: 'newpass123!' } });
    expect(mockSetPasswordError).toHaveBeenCalledWith('');
  });

  it('clears confirm error on input change', () => {
    render(
      <MemoryRouter>
        <ResetPassword />
      </MemoryRouter>
    );

    const confirmInput = screen.getByLabelText(/Confirm Password/i);
    fireEvent.change(confirmInput, { target: { value: 'newpass123!' } });
    expect(mockSetConfirmError).toHaveBeenCalledWith('');
  });

  it('displays password and confirm errors', () => {
    useResetPassword.mockReturnValue({
      passwordRef: { current: { value: '' } },
      confirmRef: { current: { value: '' } },
      passwordError: 'Password too short',
      confirmError: 'Passwords do not match',
      message: '',
      setPasswordError: mockSetPasswordError,
      setConfirmError: mockSetConfirmError,
      handleReset: mockHandleReset,
    });

    render(
      <MemoryRouter>
        <ResetPassword />
      </MemoryRouter>
    );

    expect(screen.getByText('Password too short')).toBeInTheDocument();
    expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
  });

  it('displays success message when message exists', () => {
    useResetPassword.mockReturnValue({
      passwordRef: { current: { value: '' } },
      confirmRef: { current: { value: '' } },
      passwordError: '',
      confirmError: '',
      message: 'Password reset successful',
      setPasswordError: mockSetPasswordError,
      setConfirmError: mockSetConfirmError,
      handleReset: mockHandleReset,
    });

    render(
      <MemoryRouter>
        <ResetPassword />
      </MemoryRouter>
    );

    expect(screen.getByText('Password reset successful')).toBeInTheDocument();
  });
});
