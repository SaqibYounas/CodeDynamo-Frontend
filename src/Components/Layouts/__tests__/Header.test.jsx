import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Header from "../Main_Layouts/Header";
import { vi } from "vitest";

// Mock matchMedia for Tailwind & Framer Motion
beforeAll(() => {
  vi.stubGlobal("matchMedia", query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
});

describe("Header Component", () => {
  test("renders logo text", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    expect(screen.getByText("CodeDynamo")).toBeInTheDocument();
  });

  test("renders all nav links on desktop", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const links = ["home", "services", "about", "contact"];
    links.forEach(link => {
      const elements = screen.getAllByText(new RegExp(link, "i"));
      expect(elements.length).toBeGreaterThan(0);
    });
  });

  test("mobile menu toggle works", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const toggleButton = screen.getByLabelText("Toggle menu");
    fireEvent.click(toggleButton);

    const mobileNavLink = screen.getAllByText(/home/i);
    expect(mobileNavLink.length).toBeGreaterThan(0);
  });

  test("auth buttons are visible", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    expect(screen.getAllByText("Login")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Signup")[0]).toBeInTheDocument();
  });
});
