import { afterAll, afterEach, beforeAll } from 'vitest';
import { server } from './mocks/server';
import '@testing-library/jest-dom';

// Start API mocking before all tests
beforeAll(() => server.listen());

// Reset handlers after each test to avoid test pollution
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished
afterAll(() => server.close());
