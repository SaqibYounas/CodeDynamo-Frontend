import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import About from "../About"; // adjust the path if different

describe("About Page", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>
    );
  });

 

  it("renders mission, vision, and team cards", () => {
    expect(screen.getByText(/our mission/i)).toBeInTheDocument();
    expect(screen.getByText(/our vision/i)).toBeInTheDocument();
    expect(screen.getByText(/our team/i)).toBeInTheDocument();
  });

  it("displays the company story", () => {
    expect(screen.getByText(/our story/i)).toBeInTheDocument();
    expect(
      screen.getByText(/codedynamo was founded with a simple goal/i)
    ).toBeInTheDocument();
  });

  it("has a footer with developer name", () => {
    expect(screen.getByText(/developed by/i)).toBeInTheDocument();
    expect(screen.getByText(/saqib/i)).toBeInTheDocument();
  });
});
