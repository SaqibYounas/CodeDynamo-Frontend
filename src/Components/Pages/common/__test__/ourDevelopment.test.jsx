import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ApproachSection } from '../ourDevelopment';
import { approaches } from '../../data/Approach';

describe('ApproachSection Component', () => {
  it('renders the main headings correctly', () => {
    render(<ApproachSection />);
    expect(screen.getByText(/Our design and/i)).toBeInTheDocument();
    expect(screen.getByText(/development approach/i)).toBeInTheDocument();
  });

  it('renders all approach items from the data', () => {
    render(<ApproachSection />);
    approaches.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
    });
  });

  it('renders the icons for each approach item', () => {
    const { container } = render(<ApproachSection />);

    approaches.forEach((item) => {
      const iconElement = Array.from(container.querySelectorAll('div')).find(
        (el) => el.className && el.className.includes(item.color)
      );

      expect(iconElement).toBeInTheDocument();
    });
  });
});
