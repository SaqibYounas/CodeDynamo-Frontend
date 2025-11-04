import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ForgotPassword from '../ForgotPassword';

const mockUseForgotPassword = vi.fn();
const mockNavigate = vi.fn();

vi.mock('../hooks/useForgotPassword', () => ({
  useForgotPassword: mockUseForgotPassword,
}));

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('ForgotPassword Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders form elements correctly', () => {
    mockUseForgotPassword.mockReturnValue({
      message: '',
      setMessage: vi.fn(),
      handleForgotPassword: vi.fn(),
    });

    render(
      <MemoryRouter>
        <ForgotPassword />
      </MemoryRouter>
    );

    expect(screen.getByText('Forgot Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Verify Email/i })
    ).toBeInTheDocument();
  });

  it('calls handleForgotPassword when submit button clicked', () => {
    const mockHandleForgotPassword = vi.fn();

    mockUseForgotPassword.mockReturnValue({
      message: '',
      setMessage: vi.fn(),
      handleForgotPassword: mockHandleForgotPassword,
    });

    render(
      <MemoryRouter>
        <ForgotPassword />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('Email Address'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Verify Email/i }));
  });

  it('displays error message when message exists', () => {
    mockUseForgotPassword.mockReturnValue({
      message: 'Something went wrong!',
      setMessage: vi.fn(),
      handleForgotPassword: vi.fn(),
    });

    render(
      <MemoryRouter>
        <ForgotPassword />
      </MemoryRouter>
    );
  });
});
