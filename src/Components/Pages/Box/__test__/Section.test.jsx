import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Section } from "../Section";

describe("Section Component", () => {
  const boxes = [
    { icon: <span>🔥</span>, title: "Box 1", description: "Description 1" },
    { icon: <span>🌟</span>, title: "Box 2", description: "Description 2" },
    { icon: <span>💧</span>, title: "Box 3", description: "Description 3" },
  ];

  it("renders section title correctly", () => {
    render(<Section title="Test Section" boxes={boxes} />);
    expect(screen.getByText("Test Section")).toBeInTheDocument();
  });

  it("renders all boxes correctly", () => {
    render(<Section title="Test Section" boxes={boxes} />);
    boxes.forEach((box) => {
      expect(screen.getByText(box.title)).toBeInTheDocument();
      expect(screen.getByText(box.description)).toBeInTheDocument();
      expect(screen.getByText(box.icon.props.children)).toBeInTheDocument();
    });
  });

  it("renders correct number of boxes", () => {
    render(<Section title="Test Section" boxes={boxes} />);
    const renderedBoxes = screen.getAllByText(/Box/i);
    expect(renderedBoxes.length).toBe(boxes.length);
  });
});
