import { describe, it, expect, vi, beforeEach } from 'vitest';
import { loginAPI } from '../loginAPI';
import { url } from '../../Login_Pages/Port';

describe('loginAPI', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should return success response', async () => {
    const mockResponse = { message: 'Login successful', role: 'user' };
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve(mockResponse),
      })
    );

    const result = await loginAPI('test@example.com', 'Password@123');

    expect(result.status).toBe(200);
    expect(result.data).toEqual(mockResponse);
    expect(globalThis.fetch).toHaveBeenCalledWith(`${url}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'Password@123',
      }),
    });
  });

  it('should return bad request response', async () => {
    const mockResponse = { message: 'Invalid credentials' };
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        status: 400,
        json: () => Promise.resolve(mockResponse),
      })
    );

    const result = await loginAPI('wrong@example.com', 'wrongpass');

    expect(result.status).toBe(400);
    expect(result.data).toEqual(mockResponse);
  });

  it('should handle network error', async () => {
    globalThis.fetch = vi.fn(() => Promise.reject(new Error('Network error')));

    try {
      await loginAPI('test@example.com', 'Password@123');
    } catch (error) {
      expect(error.message).toBe('Network error');
    }
  });
});
