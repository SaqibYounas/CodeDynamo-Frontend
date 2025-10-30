import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import AboutSection from '../About';
import * as AboutData from '../data/About';

vi.mock('../Box/Box', () => ({
  Box: ({ title, description }) => (
    <div data-testid="box">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  ),
}));

vi.mock('../common/ProjectSection', () => ({
  ProjectsSection: () => <div data-testid="projects-section">Projects</div>,
}));

describe('AboutSection Component', () => {
  it('renders the About heading and tagline', () => {
    render(<AboutSection />);
    expect(screen.getByText(/About CodeDynamo/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /Building intelligent, scalable, and user-focused digital solutions./i
      )
    ).toBeInTheDocument();
  });

  it('renders all about cards', () => {
    render(<AboutSection />);
    const boxes = screen.getAllByTestId('box');
    expect(boxes.length).toBe(AboutData.aboutCards.length);
  });

  it('renders "Our Story" section with correct content', () => {
    render(<AboutSection />);
    expect(screen.getByText(/Our Story/i)).toBeInTheDocument();
    expect(screen.getByText(AboutData.ourStory.story)).toBeInTheDocument();
  });

  it('renders ProjectsSection when showProjects is true', () => {
    render(<AboutSection showProjects={true} />);
    expect(screen.getByTestId('projects-section')).toBeInTheDocument();
  });

  it('does not render ProjectsSection when showProjects is false', () => {
    render(<AboutSection showProjects={false} />);
    expect(screen.queryByTestId('projects-section')).not.toBeInTheDocument();
  });
});
