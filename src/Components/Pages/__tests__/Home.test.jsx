import { render, screen, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from '../Home';
import { vi } from 'vitest';

vi.mock('./utils/Profiler', () => ({
  ProfilerWrapper: ({ children }) => <>{children}</>,
}));

vi.mock('./data/Home', () => ({
  sectionBoxes: {
    whyChooseUs: [{ title: 'Fast Delivery' }],
    trackRecord: [{ title: 'Proven Success' }],
    workingCycle: [{ title: 'Plan' }],
  },
}));
vi.mock('./Services', () => ({
  default: () => <div data-testid="services-wrapper">Services Component</div>,
}));

vi.mock('./Box/Section', () => ({
  Section: ({ title }) => <div data-testid={`section-${title}`}>{title}</div>,
}));

vi.mock('./common/ProjectSection', () => ({
  ProjectsSection: () => (
    <div data-testid="projects-section">Projects Section</div>
  ),
}));

vi.mock('./common/ourDevelopment', () => ({
  ApproachSection: () => (
    <div data-testid="approach-section">Approach Section</div>
  ),
}));

vi.mock('./Box/TeachStack', () => ({
  TechStack: () => <div data-testid="techstack-section">TechStack Section</div>,
}));

vi.mock('framer-motion', () => ({
  motion: {
    h1: ({ children }) => <h1>{children}</h1>,
  },
}));

describe('Home Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it('renders Get Started link correctly', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const link = screen.getByTestId('get-started-link');
    expect(link).toBeInTheDocument();
    expect(link.getAttribute('href')).toBe('/auth/signup');
  });

  it('renders Hero Section with content', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByTestId('hero-section')).toBeInTheDocument();
    expect(screen.getByTestId('hero-text')).toBeInTheDocument();
    expect(screen.getByTestId('hero-buttons')).toBeInTheDocument();
    expect(screen.getByTestId('hero-image-container')).toBeInTheDocument();
  });
  it('renders Services section', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByTestId('services-wrapper')).toBeInTheDocument();
  });
});
