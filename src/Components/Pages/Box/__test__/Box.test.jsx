// src/Components/Box/__test__/Box.test.jsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Box, Box_Two } from "../Box";

describe("Box Component", () => {
  it("renders with image correctly", () => {
    render(
      <Box
        image="test.png"
        title="Test Title"
        description="Test Description"
      />
    );

    expect(screen.getByAltText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("renders with icon correctly when no image", () => {
    render(
      <Box
        icon={<span>🌟</span>}
        title="Icon Title"
        description="Icon Description"
      />
    );

    expect(screen.getByText("🌟")).toBeInTheDocument();
    expect(screen.getByText("Icon Title")).toBeInTheDocument();
    expect(screen.getByText("Icon Description")).toBeInTheDocument();
  });
});

describe("Box_Two Component", () => {
  it("renders icon, title, and description correctly", () => {
    render(
      <Box_Two
        icon={<span>🔥</span>}
        title="Box Two Title"
        description="Box Two Description"
      />
    );

    expect(screen.getByText("🔥")).toBeInTheDocument();
    expect(screen.getByText("Box Two Title")).toBeInTheDocument();
    expect(screen.getByText("Box Two Description")).toBeInTheDocument();
  });
});
