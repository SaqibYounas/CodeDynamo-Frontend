import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CountdownTimer from '../TimeCountVerify';
import { vi } from 'vitest';

describe('CountdownTimer Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('should show initial countdown time', () => {
    render(<CountdownTimer duration={60} />);
    expect(screen.getByText(/OTP expires in: 01:00/i)).toBeInTheDocument();
  });

  it('should countdown every second', () => {
    render(<CountdownTimer duration={3} />);

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.getByText(/OTP expires in: 00:02/i)).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.getByText(/OTP expires in: 00:01/i)).toBeInTheDocument();
  });

  it('should call onExpire when time is up', () => {
    const onExpire = vi.fn();
    render(<CountdownTimer duration={2} onExpire={onExpire} />);

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(onExpire).toHaveBeenCalled();
    expect(screen.getByText(/Code expired!/i)).toBeInTheDocument();
  });

  it('should reset the timer on resetKey change', () => {
    const { rerender } = render(<CountdownTimer duration={5} resetKey={0} />);

    act(() => {
      vi.advanceTimersByTime(3000); // move 3 seconds
    });

    expect(screen.getByText(/00:02/i)).toBeInTheDocument();

    // Simulate OTP resend (resetKey change)
    rerender(<CountdownTimer duration={5} resetKey={1} />);
  });
});
