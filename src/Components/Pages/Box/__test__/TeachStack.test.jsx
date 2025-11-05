// src/Components/TechStack/__test__/TechStack.test.jsx
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TechStack } from '../TeachStack.jsx';
import { techStackData } from '../../data/teachStackData.jsx';

describe('TechStack Component', () => {
  it('renders the main title correctly', () => {
    render(<TechStack />);
    expect(screen.getByText(/Our/i)).toBeInTheDocument();
    expect(screen.getByText(/Tech Stack/i)).toBeInTheDocument();
  });

  it('renders all tabs correctly', () => {
    render(<TechStack />);
    Object.keys(techStackData).forEach((tab) => {
      expect(screen.getByText(tab)).toBeInTheDocument();
    });
  });

  it('renders tech icons for the default active tab (Backend)', () => {
    render(<TechStack />);
    const defaultTab = 'Backend';
    techStackData[defaultTab].forEach((tech) => {
      const img = screen.getByAltText(tech.name);
      expect(img).toBeInTheDocument();
      expect(img.src).toContain(tech.url);
    });
  });

  it('changes active tab when a tab button is clicked', () => {
    render(<TechStack />);
    const tabToClick = Object.keys(techStackData).find(
      (tab) => tab !== 'Backend'
    );

    const button = screen.getByText(tabToClick);
    fireEvent.click(button);

    techStackData[tabToClick].forEach((tech) => {
      const img = screen.getByAltText(tech.name);
      expect(img).toBeInTheDocument();
    });
  });
});
