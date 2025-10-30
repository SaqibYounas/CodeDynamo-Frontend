import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Services from '../Services';

vi.mock('../utils/Profiler', () => ({
  ProfilerWrapper: ({ children }) => <>{children}</>,
}));

vi.mock('../Box/TeachStack', () => ({
  TechStack: () => <div data-testid="techstack">TechStack Component</div>,
}));

vi.mock('../data/Services', () => ({
  staticServices: [
    {
      icon: () => <svg data-testid="icon-1"></svg>,
      iconColor: 'text-blue-500',
      title: 'Web Development',
      description: 'We build responsive and scalable websites.',
      stack: ['React', 'Node.js'],
    },
    {
      icon: () => <svg data-testid="icon-2"></svg>,
      iconColor: 'text-green-500',
      title: 'App Development',
      description: 'We create high-performance mobile apps.',
      stack: ['Flutter', 'Firebase'],
    },
  ],
}));

vi.mock('../Box/Box', () => ({
  Box: ({ icon, title, description }) => (
    <div data-testid="service-box">
      {icon}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  ),
}));


describe('Services Component', () => {
  it('renders heading and all service boxes', () => {
    render(<Services showTechStack={false} />);

    expect(screen.getByText('Our Services')).toBeInTheDocument();

    expect(screen.getByText('Web Development')).toBeInTheDocument();
    expect(screen.getByText('App Development')).toBeInTheDocument();

    expect(
      screen.getByText(/responsive and scalable websites/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/high-performance mobile apps/i)
    ).toBeInTheDocument();

    const boxes = screen.getAllByTestId('service-box');
    expect(boxes).toHaveLength(2);
  });

  it('renders TechStack component when showTechStack=true', () => {
    render(<Services showTechStack={true} />);
    expect(screen.getByTestId('techstack')).toBeInTheDocument();
  });

  it('does not render TechStack when showTechStack=false', () => {
    render(<Services showTechStack={false} />);
    const techStack = screen.queryByTestId('techstack');
    expect(techStack).toBeNull();
  });

  it('renders correct layout and section classes', () => {
    const { container } = render(<Services />);

    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();

    expect(section.className).toMatch(/bg-\[#F9F9FF\]/);
    expect(section.className).toMatch(/py-16/);
    expect(section.className).toMatch(/bg-gradient-to-br/);
  });
});
