import { describe, it, expect, vi, beforeEach } from 'vitest';
import { resetPasswordAPI } from '../resetPasswords';
import { url } from '../../Login_Pages/Port';

describe('resetPasswordAPI', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should return success response', async () => {
    const mockResponse = { message: 'Password reset successful' };
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve(mockResponse),
      })
    );

    const result = await resetPasswordAPI('test@example.com', 'Password@123');
    expect(result.status).toBe(200);
    expect(result.data).toEqual(mockResponse);
    expect(globalThis.fetch).toHaveBeenCalledWith(
      `${url}/auth/reset-password`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'Password@123',
        }),
      }
    );
  });

  it('should return server error response', async () => {
    const mockResponse = { message: 'Server error' };
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        status: 500,
        json: () => Promise.resolve(mockResponse),
      })
    );

    const result = await resetPasswordAPI('test@example.com', 'Password@123');
    expect(result.status).toBe(500);
    expect(result.data).toEqual(mockResponse);
  });

  it('should handle network error', async () => {
    globalThis.fetch = vi.fn(() => Promise.reject(new Error('Network error')));

    const result = await resetPasswordAPI('test@example.com', 'Password@123');
    expect(result.status).toBe('NETWORK_ERROR');
    expect(result.data).toBeNull();
  });
});
