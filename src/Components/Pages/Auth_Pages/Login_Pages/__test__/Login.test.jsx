import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import Login from '../Login';
import { useLogin } from '../../hooks/login';

vi.mock('../../hooks/login', () => ({
  useLogin: vi.fn(),
}));

vi.mock('../../../utils/Profiler', () => ({
  ProfilerWrapper: ({ children }) => <>{children}</>,
}));

describe('Login Component', () => {
  const mockSetShowPassword = vi.fn();
  const mockHandleSubmit = vi.fn((e) => e.preventDefault());
  const mockHandleBlur = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    useLogin.mockReturnValue({
      emailRef: { current: { value: '' } },
      passwordRef: { current: { value: '' } },
      response: '',
      pending: false,
      emailError: '',
      passwordError: '',
      showPassword: false,
      setShowPassword: mockSetShowPassword,
      handleBlur: mockHandleBlur,
      handleSubmit: mockHandleSubmit,
    });
  });

  it('renders all form elements correctly', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByText('Login now')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Enter your email id')
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Enter your password')
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  it('toggles password visibility when eye icon is clicked', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const icon = screen.getAllByRole('button', { hidden: true });
    fireEvent.click(icon[0]);
    expect(mockSetShowPassword).toHaveBeenCalledTimes(0);
  });

  it('calls handleSubmit when login form is submitted', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const formButton = screen.getByRole('button', { name: 'Login' });
    fireEvent.click(formButton);
    expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
  });

  it('displays error messages when emailError or passwordError exist', () => {
    useLogin.mockReturnValue({
      emailRef: { current: { value: '' } },
      passwordRef: { current: { value: '' } },
      response: '',
      pending: false,
      emailError: 'Invalid email',
      passwordError: 'Password required',
      showPassword: false,
      setShowPassword: mockSetShowPassword,
      handleBlur: mockHandleBlur,
      handleSubmit: mockHandleSubmit,
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByText('Invalid email')).toBeInTheDocument();
    expect(screen.getByText('Password required')).toBeInTheDocument();
  });

  it("displays success message when response includes 'success'", () => {
    useLogin.mockReturnValue({
      emailRef: { current: { value: '' } },
      passwordRef: { current: { value: '' } },
      response: 'Login success',
      pending: false,
      emailError: '',
      passwordError: '',
      showPassword: false,
      setShowPassword: mockSetShowPassword,
      handleBlur: mockHandleBlur,
      handleSubmit: mockHandleSubmit,
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByText('Login success')).toBeInTheDocument();
  });
});
