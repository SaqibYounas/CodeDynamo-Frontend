// src/__tests__/AppErrorBoundary.test.jsx
import { render, screen } from '@testing-library/react';
import AppErrorBoundary from '../AppErrorBoundary';
import { describe, it, expect } from 'vitest';

// Dummy component that throws an error
function ProblemChild() {
  throw new Error('Test error');
}

describe('AppErrorBoundary', () => {
  it('renders fallback UI when a child component throws an error', () => {
    render(
      <AppErrorBoundary>
        <ProblemChild />
      </AppErrorBoundary>
    );

    // Check if fallback UI is shown
    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
    expect(screen.getByText(/Test error/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Try Again/i })).toBeInTheDocument();
  });
});
