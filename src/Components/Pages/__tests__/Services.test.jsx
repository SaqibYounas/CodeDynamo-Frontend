import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Services from "../Services";
import { describe, it, expect } from "vitest";

const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("Services Component", () => {
  it("renders all service titles", () => {
    renderWithRouter(<Services />);

    expect(screen.getByText("AI Integration")).toBeInTheDocument();
    expect(screen.getByText("Web Development")).toBeInTheDocument();
    expect(screen.getByText("Mobile Apps")).toBeInTheDocument();
    expect(screen.getByText("UI/UX Design")).toBeInTheDocument();
    expect(screen.getByText("QA & Testing")).toBeInTheDocument();
    expect(screen.getByText("Cloud Services")).toBeInTheDocument();
  });

  it("renders 'Our Services' heading", () => {
    renderWithRouter(<Services />);
    expect(screen.getByText(/our services/i)).toBeInTheDocument();
  });

  it("renders 'Why Choose CodeDynamo' section if showWhyChoose is true", () => {
    renderWithRouter(<Services showWhyChoose={true} />);
    expect(screen.getByText(/why choose services from/i)).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /why choose codedynamo/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /get in touch/i })).toBeInTheDocument();
  });

  it("does not render 'Why Choose Us' section if showWhyChoose is false", () => {
    renderWithRouter(<Services showWhyChoose={false} />);
    expect(screen.queryByText(/why choose services from/i)).not.toBeInTheDocument();
  });
});
