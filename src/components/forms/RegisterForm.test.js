import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RegisterForm from "../../components/forms/RegisterForm";
import "../../tests/i18n";
import { apiPost } from "../../apiService";

jest.mock("../../apiService", () => ({
  apiPost: jest.fn(),
}));

describe("RegisterForm Component", () => {
  test("Отображает все поля формы", () => {
    render(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/ФИО/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Придумайте пароль/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Повторите пароль/i)).toBeInTheDocument();
    expect(screen.getByText(/Выберите роль/i)).toBeInTheDocument();
    expect(screen.getByText(/Создать аккаунт/i)).toBeInTheDocument();
  });

  test("Пароль должен содержать минимум 8 символов, заглавную букву и цифру", async () => {
    render(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>
    );

    const passwordInput = screen.getByPlaceholderText(/Придумайте пароль/i);
    fireEvent.change(passwordInput, { target: { value: "short" } });
    fireEvent.blur(passwordInput);

    await waitFor(() => {
      expect(screen.getByText(/Пароль должен содержать минимум 8 символов/i)).toBeInTheDocument();
    });

    fireEvent.change(passwordInput, { target: { value: "longEnough" } });
    fireEvent.blur(passwordInput);

    await waitFor(() => {
      expect(screen.getByText(/Пароль должен содержать хотя бы одну цифру/i)).toBeInTheDocument();
    });

    fireEvent.change(passwordInput, { target: { value: "Valid123" } });
    fireEvent.blur(passwordInput);

    await waitFor(() => {
      expect(screen.queryByText(/Пароль должен/i)).toBeNull();
    });
  });
});
