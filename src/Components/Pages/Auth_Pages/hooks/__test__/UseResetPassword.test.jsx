import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent, screen, act } from '@testing-library/react';
import { useResetPassword } from '../useResetPassword';
import { resetPasswordAPI } from '../../api/resetPasswords';
import { STATUS_CODES } from '../../constant/statusCodes';
import { RESET_PASSWORD_MESSAGES } from '../../constant/resetMessages';

vi.mock('../../api/resetPasswords', () => ({
  resetPasswordAPI: vi.fn(),
}));

function TestComponent({ email, navigate }) {
  const {
    passwordRef,
    confirmRef,
    passwordError,
    confirmError,
    message,
    handleReset,
  } = useResetPassword(email, navigate);

  return (
    <form onSubmit={handleReset} data-testid="form">
      <input ref={passwordRef} placeholder="Password" />
      {passwordError && <div>{passwordError}</div>}
      <input ref={confirmRef} placeholder="Confirm Password" />
      {confirmError && <div>{confirmError}</div>}
      <button type="submit">Reset</button>
      {message && <div>{message}</div>}
    </form>
  );
}

describe('useResetPassword Hook', () => {
  const email = 'test@example.com';
  const navigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows errors for empty inputs', async () => {
    render(<TestComponent email={email} navigate={navigate} />);

    await act(async () => {
      fireEvent.submit(screen.getByTestId('form'));
    });

    expect(
      screen.getByText(RESET_PASSWORD_MESSAGES.passwordRequired)
    ).toBeDefined();
    expect(
      screen.getByText(RESET_PASSWORD_MESSAGES.confirmRequired)
    ).toBeDefined();
  });

  it('shows password mismatch error', async () => {
    render(<TestComponent email={email} navigate={navigate} />);

    const passwordInput = screen.getByPlaceholderText('Password');
    const confirmInput = screen.getByPlaceholderText('Confirm Password');

    await act(async () => {
      fireEvent.change(passwordInput, { target: { value: 'Password123!' } });
      fireEvent.change(confirmInput, { target: { value: 'Password456!' } });
      fireEvent.submit(screen.getByTestId('form'));
    });

    expect(
      screen.getByText(RESET_PASSWORD_MESSAGES.passwordMismatch)
    ).toBeDefined();
  });

  it('calls API and navigates on success', async () => {
    resetPasswordAPI.mockResolvedValue({
      status: STATUS_CODES.SUCCESS,
      data: { message: RESET_PASSWORD_MESSAGES.success },
    });

    vi.useFakeTimers();
    render(<TestComponent email={email} navigate={navigate} />);

    const passwordInput = screen.getByPlaceholderText('Password');
    const confirmInput = screen.getByPlaceholderText('Confirm Password');

    await act(async () => {
      fireEvent.change(passwordInput, { target: { value: 'Password123!' } });
      fireEvent.change(confirmInput, { target: { value: 'Password123!' } });
      fireEvent.submit(screen.getByTestId('form'));
    });

    expect(
      screen.getByText(RESET_PASSWORD_MESSAGES.successRedirect)
    ).toBeDefined();

    act(() => {
      vi.runAllTimers();
    });

    expect(navigate).toHaveBeenCalledWith('/auth/login');
    vi.useRealTimers();
  });
});
