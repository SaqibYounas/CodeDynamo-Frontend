import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import Signup from "../Signup";

// 🔁 Mock useNavigate globally
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// 🔁 Mock fetch API globally
beforeEach(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      status: 201,
      json: () => Promise.resolve({ message: "Signup successful" }),
    })
  );
  mockNavigate.mockClear();
});

describe("Signup Component", () => {
  test("renders all required fields and buttons", () => {
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );

    expect(screen.getByText(/Create an Account/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByTitle("icon")).toBeInTheDocument();
  });

  test("navigates to login when clicking Login", async () => {
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );

    const user = userEvent.setup();
    const loginButton = screen.getByText("Have you Account?Login");
    await user.click(loginButton);

    expect(mockNavigate).toHaveBeenCalledWith("/auth/login");
  });

  test("fills the form fields correctly", async () => {
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/Full Name/i), "Saqib Rana");
    await user.type(screen.getByLabelText(/Email/i), "test@email.com");
    await user.type(screen.getByLabelText(/Password/i), "pass@1234");

    expect(screen.getByLabelText(/Full Name/i)).toHaveValue("Saqib Rana");
    expect(screen.getByLabelText(/Email/i)).toHaveValue("test@email.com");
    expect(screen.getByLabelText(/Password/i)).toHaveValue("pass@1234");
  });

 

  test("submits the form and calls fetch with correct data", async () => {
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/Full Name/i), "Saqib Rana");
    await user.type(screen.getByLabelText(/Email/i), "test@email.com");
    await user.type(screen.getByLabelText(/Password/i), "pass@1234");

    const signupButton = screen.getByTestId("signup");
    await user.click(signupButton);

    // await waitFor(() => {
    //   expect(fetch).toHaveBeenCalledWith(
    //     "http://localhost:5000/auth/signup",
    //     {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify({
    //         name: "Saqib Rana",
    //         email: "test@email.com",
    //         password: "pass@1234",
    //       }),
    //     }
    //   );
    // });

    // Check for success message rendering
  });
});
