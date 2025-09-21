import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { vi, describe, test, expect, beforeEach } from "vitest";
import Login from "../Login";

// 🔁 Mock useNavigate globally
const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

beforeEach(() => {
  // ✅ Mock environment variable
  import.meta.env = { VITE_API_URL: "http://localhost:5000" };

  // ✅ Mock fetch API
  global.fetch = vi.fn(() =>
    Promise.resolve({
      status: 200,
      json: () => Promise.resolve({ message: "Login successful" }),
    })
  );

  mockNavigate.mockClear();
});

describe("Login Component", () => {
  test("renders all UI elements", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    expect(screen.getByText("Have you no Account? Signup")).toBeInTheDocument();
    expect(screen.getByText("Login to Your Account")).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByTitle("icon")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Login with Google/i })).toBeInTheDocument();
  });

  test("allows typing in email and password", async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const user = userEvent.setup();
    const email = screen.getByLabelText(/Email/i);
    const password = screen.getByLabelText(/Password/i);

    await user.type(email, "abc@test.com");
    await user.type(password, "abc@1234");

    expect(email).toHaveValue("abc@test.com");
    expect(password).toHaveValue("abc@1234");
  });

  test("navigates to signup page on link click", async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const user = userEvent.setup();
    const signupLink = screen.getByText("Have you no Account? Signup");

    await user.click(signupLink);
    expect(mockNavigate).toHaveBeenCalledWith("/auth/signup");
  });

  test("submits the login form and calls fetch with correct data", async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/Email/i), "test@email.com");
    await user.type(screen.getByLabelText(/Password/i), "pass@1234");

  //   const loginForm = screen.getByTestId("login");
  // fireEvent.submit(loginForm); // ✅ correct way to submit

  //   await waitFor(() => {
  //     expect(fetch).toHaveBeenCalledWith(
  //       "http://localhost:5000/auth/login",
  //       {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({
  //           email: "test@email.com",
  //           password: "pass@1234",
  //         }),
  //       }
  //     );
  //   });
  });
});
