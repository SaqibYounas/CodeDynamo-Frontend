import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent, screen, act } from '@testing-library/react';
import { useLogin } from '../login';
import { loginAPI } from '../../api/loginAPI';
import { loginMessages } from '../../constant/loginMessages';
import { STATUS_CODES } from '../../constant/statusCodes';
import { MemoryRouter } from 'react-router-dom';

vi.mock('../../api/loginAPI', () => ({
  loginAPI: vi.fn(),
}));

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

function TestLogin() {
  const {
    emailRef,
    passwordRef,
    emailError,
    passwordError,
    response,
    pending,
    showPassword,
    setShowPassword,
    handleBlur,
    handleSubmit,
  } = useLogin();

  return (
    <form onSubmit={handleSubmit} data-testid="form">
      <input ref={emailRef} placeholder="Email" onBlur={handleBlur} />
      {emailError && <div>{emailError}</div>}
      <input ref={passwordRef} placeholder="Password" />
      {passwordError && <div>{passwordError}</div>}
      <button type="submit">Login</button>
      {response && <div>{response}</div>}
      <div data-testid="pending">{pending ? 'true' : 'false'}</div>
      <div data-testid="showPassword">{showPassword ? 'true' : 'false'}</div>
      <button type="button" onClick={() => setShowPassword(!showPassword)}>
        Toggle Password
      </button>
    </form>
  );
}

describe('useLogin Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('shows errors when inputs are empty', async () => {
    render(
      <MemoryRouter>
        <TestLogin />
      </MemoryRouter>
    );

    await act(async () => {
      fireEvent.submit(screen.getByTestId('form'));
    });

    expect(screen.getByText(loginMessages.emailRequired)).toBeDefined();
  });

  it('shows invalid email error', async () => {
    render(
      <MemoryRouter>
        <TestLogin />
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
      fireEvent.change(passwordInput, { target: { value: 'Password123' } });
      fireEvent.submit(screen.getByTestId('form'));
    });

    expect(screen.getByText(loginMessages.invalidEmail)).toBeDefined();
  });

  it('calls API and shows password mismatch', async () => {
    loginAPI.mockResolvedValue({
      status: STATUS_CODES.BAD_REQUEST,
      data: { message: loginMessages.passwordMismatch },
    });

    render(
      <MemoryRouter>
        <TestLogin />
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'wrongpass' } });
      fireEvent.submit(screen.getByTestId('form'));
    });

    expect(screen.getByText(loginMessages.passwordMismatch)).toBeDefined();
  });

  it('navigates on successful login', async () => {
    loginAPI.mockResolvedValue({
      status: STATUS_CODES.SUCCESS,
      data: { role: 'user' },
    });

    render(
      <MemoryRouter>
        <TestLogin />
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'Password123' } });
      fireEvent.submit(screen.getByTestId('form'));
    });

    expect(mockNavigate).toHaveBeenCalledWith('/user/dashboard');
    expect(localStorage.getItem('login-form')).toBeNull();
  });

  it('toggles showPassword state', async () => {
    render(
      <MemoryRouter>
        <TestLogin />
      </MemoryRouter>
    );

    const toggleButton = screen.getByText('Toggle Password');

    expect(screen.getByTestId('showPassword').textContent).toBe('false');

    fireEvent.click(toggleButton);
    expect(screen.getByTestId('showPassword').textContent).toBe('true');

    fireEvent.click(toggleButton);
    expect(screen.getByTestId('showPassword').textContent).toBe('false');
  });
});
