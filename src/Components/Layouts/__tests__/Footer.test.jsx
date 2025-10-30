import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from '../Main_Layouts/Footer';

describe('Footer Component', () => {
  test('renders brand name', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(screen.getByText('CodeDynamo')).toBeInTheDocument();
  });

  test('renders email', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(
      screen.getByText('muhammadsaqibyounas11@gmail.com')
    ).toBeInTheDocument();
  });

  test('renders phone number', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(screen.getByText('03420339016')).toBeInTheDocument();
  });

  test('renders location', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(screen.getByText(/lahore pakistan/i)).toBeInTheDocument();
  });

  test('renders all service items', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    const services = [
      'Web Development',
      'Mobile Apps',
      'AI Integration',
      'UI/UX Design',
      'QA & Testing',
      'Cloud Services',
    ];

    services.forEach((service) => {
      expect(screen.getByText(service)).toBeInTheDocument();
    });
  });

  test('renders all quick links', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    const links = screen.getAllByTestId('services');
    for (let i = 0; i < links.length; i++) {
      expect(links[i]).toBeInTheDocument();
    }
  });

  test('renders social icons', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    const icons = screen.getAllByRole('link');
    expect(icons.length).toBeGreaterThanOrEqual(4); // Facebook, LinkedIn, GitHub, Email
  });

  test('renders copyright', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    const year = new Date().getFullYear();
    expect(
      screen.getByText(`© ${year} CodeDynamo. All rights reserved.`)
    ).toBeInTheDocument();
  });
});
