import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProjectsSection } from '../ProjectSection';
import { projects } from '../../data/About';

describe('ProjectsSection Component', () => {
  it('renders the section heading correctly', () => {
    render(<ProjectsSection />);
    expect(screen.getByText(/Our Work in Action/i)).toBeInTheDocument();
  });

  it('renders all project items from the data', () => {
    render(<ProjectsSection />);
    projects.forEach((project) => {
      expect(screen.getByText(project.title)).toBeInTheDocument();
      expect(screen.getByText(project.description)).toBeInTheDocument();
    });
  });

  it('renders images with correct alt text for each project', () => {
    render(<ProjectsSection />);
    projects.forEach((project) => {
      const img = screen.getByAltText(project.title);
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', project.image);
    });
  });
});
