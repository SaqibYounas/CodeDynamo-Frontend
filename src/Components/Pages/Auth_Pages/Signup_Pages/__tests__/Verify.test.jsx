import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Verify from '../Verify';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';

// Mock fetch globally
global.fetch = vi.fn();

// Mock localStorage globally
vi.stubGlobal('localStorage', {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn()
});

// Mock useNavigate from react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(), // mocked navigate
  };
});

const setup = () => {
  render(
    <BrowserRouter>
      <Verify />
    </BrowserRouter>
  );
};

describe('Verify component', () => {
  beforeEach(() => {
    fetch.mockReset();
    localStorage.getItem.mockReset();
    localStorage.removeItem.mockReset();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('shows error when code is not 6 digits', async () => {
    setup();

    const input = screen.getByPlaceholderText("Enter code");
    fireEvent.change(input, { target: { value: '123' } });

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(await screen.findByText("Enter 6 digit number")).toBeInTheDocument();
  });

  it('sends request and handles success', async () => {
    localStorage.getItem.mockReturnValue('test@example.com');
    fetch.mockResolvedValueOnce({
      status: 200,
      json: async () => ({ message: "✅ Email verified successfully!" })
    });

    setup();

    const input = screen.getByPlaceholderText("Enter code");
    fireEvent.change(input, { target: { value: '123456' } });

    const button = screen.getByRole('button');
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("✅ Email verified successfully!")).toBeInTheDocument();
    });

    expect(localStorage.removeItem).toHaveBeenCalledWith("email");
  });

  it('shows error on code mismatch', async () => {
    localStorage.getItem.mockReturnValue('test@example.com');
    fetch.mockResolvedValueOnce({
      status: 401,
      json: async () => ({ message: "Code is not matched" })
    });

    setup();

    const input = screen.getByPlaceholderText("Enter code");
    fireEvent.change(input, { target: { value: '999999' } });

    const button = screen.getByRole('button');
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("❌ Code is not matched")).toBeInTheDocument();
    });
  });

  it('shows server error on fetch fail', async () => {
    localStorage.getItem.mockReturnValue('test@example.com');
    fetch.mockRejectedValueOnce(new Error('Fetch failed'));

    setup();

    const input = screen.getByPlaceholderText("Enter code");
    fireEvent.change(input, { target: { value: '123456' } });

    const button = screen.getByRole('button');
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("❌ Server error.")).toBeInTheDocument();
    });
  });
});
