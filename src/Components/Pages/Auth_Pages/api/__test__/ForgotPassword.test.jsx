import { describe, it, expect, vi, beforeEach } from 'vitest';
import { checkEmail } from '../forgotPassword';
import { url } from '../../Login_Pages/Port';

describe('checkEmail API', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should return success when email exists', async () => {
    const mockResponse = { message: 'Email found' };
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve(mockResponse),
      })
    );

    const result = await checkEmail('test@example.com');

    expect(result.status).toBe(200);
    expect(result.data).toEqual(mockResponse);
    expect(globalThis.fetch).toHaveBeenCalledWith(`${url}/auth/check-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ emailkey: 'test@example.com' }),
    });
  });

  it('should return not registered email', async () => {
    const mockResponse = { message: 'Not registered' };
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve(mockResponse),
      })
    );

    const result = await checkEmail('unknown@example.com');

    expect(result.status).toBe(200);
    expect(result.data).toEqual(mockResponse);
  });

  it('should handle network errors', async () => {
    globalThis.fetch = vi.fn(() => Promise.reject(new Error('Network Error')));

    const result = await checkEmail('test@example.com');

    expect(result.status).toBe(500);
    expect(result.data).toEqual({ message: 'Network Error' });
  });
});
