import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ResetPassword from "../ResetPassword"; // ✅ Adjust this path as per your folder structure
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";

// ✅ Mock navigate and search params
const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useSearchParams: () => [new URLSearchParams("email=test@example.com")],
  };
});

beforeEach(() => {
  vi.clearAllMocks();
  global.fetch = vi.fn(); // 👈 reset fetch before every test
});

describe("ResetPassword (Vitest)", () => {
  it("renders all inputs and button correctly", () => {
    render(<ResetPassword />, { wrapper: MemoryRouter });
    let reset = screen.getAllByText("Reset Password");

    expect(reset[0]).toBeInTheDocument();
    expect(screen.getByLabelText(/New Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
    let button = screen.getAllByRole("button");
    expect(button[0], { name: /Reset Password/i }).toBeInTheDocument();
  });

  it("shows error if passwords do not match", async () => {
    render(<ResetPassword />, { wrapper: MemoryRouter });

    await userEvent.type(
      screen.getByLabelText(/New Password/i),
      "Password@123"
    );
    await userEvent.type(
      screen.getByLabelText(/Confirm Password/i),
      "WrongPass@123"
    );
    let button = screen.getAllByRole("button");
    await userEvent.click(button[0], { name: /Reset Password/i });

    expect(
      await screen.findByText(/Passwords do not match/i)
    ).toBeInTheDocument();
  });

  it("submits and redirects if passwords match and API returns success", async () => {
    global.fetch.mockResolvedValueOnce({
      status: 200,
      json: async () => ({
        message: "Password updated successfully. Please login.",
      }),
    });

    render(<ResetPassword />, { wrapper: MemoryRouter });

    await userEvent.type(
      screen.getByLabelText(/New Password/i),
      "Password@123"
    );
    await userEvent.type(
      screen.getByLabelText(/Confirm Password/i),
      "Password@123"
    );
    let button = screen.getAllByRole("button");
    await userEvent.click(button[0]);

    expect(
      await screen.findByText(/Password has been reset/i)
    ).toBeInTheDocument();
    await waitFor(
      () => expect(mockNavigate).toHaveBeenCalledWith("/auth/login"),
      { timeout: 2500 } // a little more than your 2s timeout
    );
  });
});
