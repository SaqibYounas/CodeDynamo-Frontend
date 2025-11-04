import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent, screen, act } from '@testing-library/react';
import { useForgotPassword } from '../useForgotPassword';
import { checkEmail } from '../../api/forgotPassword';
import { STATUS_CODES } from '../../constant/statusCodes';
import { forgotMessages } from '../../constant/forgotMessages';
import { MemoryRouter } from 'react-router-dom';

vi.mock('../../api/forgotPassword', () => ({
  checkEmail: vi.fn(),
}));

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

function TestForgot() {
  const { message, handleForgotPassword } = useForgotPassword(mockNavigate);
  const [email, setEmail] = React.useState('');

  return (
    <div>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={() => handleForgotPassword(email)} data-testid="submit">
        Submit
      </button>
      {message && <div data-testid="message">{message}</div>}
    </div>
  );
}

describe('useForgotPassword Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows not registered message', async () => {
    checkEmail.mockResolvedValue({
      status: STATUS_CODES.SUCCESS,
      data: { message: forgotMessages.notRegistered },
    });

    render(
      <MemoryRouter>
        <TestForgot />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText('Email');
    const button = screen.getByTestId('submit');

    fireEvent.change(input, { target: { value: 'test@example.com' } });

    await act(async () => {
      fireEvent.click(button);
    });

    expect(screen.getByTestId('message').textContent).toBe(
      forgotMessages.notRegistered
    );
  });

  it('navigates on email found', async () => {
    checkEmail.mockResolvedValue({
      status: STATUS_CODES.SUCCESS,
      data: { message: forgotMessages.emailFound },
    });

    render(
      <MemoryRouter>
        <TestForgot />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText('Email');
    const button = screen.getByTestId('submit');

    fireEvent.change(input, { target: { value: 'user@example.com' } });

    await act(async () => {
      fireEvent.click(button);
    });

    expect(mockNavigate).toHaveBeenCalledWith(
      `/auth/resetpassword?email=user@example.com`
    );
  });

  it('shows Google account message', async () => {
    checkEmail.mockResolvedValue({
      status: STATUS_CODES.SUCCESS,
      data: { message: forgotMessages.googleAccount, googleAccount: true },
    });

    render(
      <MemoryRouter>
        <TestForgot />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText('Email');
    const button = screen.getByTestId('submit');

    fireEvent.change(input, { target: { value: 'google@example.com' } });

    await act(async () => {
      fireEvent.click(button);
    });

    expect(screen.getByTestId('message').textContent).toBe(
      forgotMessages.googleAccount
    );
  });

  it('shows server error message', async () => {
    checkEmail.mockResolvedValue({
      status: STATUS_CODES.SERVER_ERROR,
      data: {},
    });

    render(
      <MemoryRouter>
        <TestForgot />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText('Email');
    const button = screen.getByTestId('submit');

    fireEvent.change(input, { target: { value: 'server@example.com' } });

    await act(async () => {
      fireEvent.click(button);
    });

    expect(screen.getByTestId('message').textContent).toBe(
      forgotMessages.serverError
    );
  });

  it('shows network error on exception', async () => {
    checkEmail.mockRejectedValue(new Error('Network error'));

    render(
      <MemoryRouter>
        <TestForgot />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText('Email');
    const button = screen.getByTestId('submit');

    fireEvent.change(input, { target: { value: 'error@example.com' } });

    await act(async () => {
      fireEvent.click(button);
    });

    expect(screen.getByTestId('message').textContent).toBe(
      forgotMessages.networkError
    );
  });
});
