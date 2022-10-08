import React, { MutableRefObject, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthClient } from "../../api/authClient";
import { Spinner } from "../Spinner/Spinner";
import { handleAlertMessage } from "../../utils/auth";
import "./styles.css";

export const AuthPage = ({ type }: { type: "login" | "registration" }) => {
  const [spinner, setSpinner] = useState(false);
  const usernameRef = useRef() as MutableRefObject<HTMLInputElement>;
  const passwordRef = useRef() as MutableRefObject<HTMLInputElement>;
  const navigate = useNavigate();
  const currentAuthTitle = type === "login" ? "Вход на сайт" : "Регистрация";

  const handleAuthResponse = (
    result: boolean | undefined,
    navigatePath: string,
    alertText: string
  ) => {
    if (!result) {
      setSpinner(false);
      return;
    }

    setSpinner(false);
    navigate(navigatePath);
    handleAlertMessage({ alertText: alertText, alertStatus: "success" });
  };

  const handleLogin = async (username: string, password: string) => {
    if (!username || !password) {
      setSpinner(false);
      handleAlertMessage({
        alertText: "Заполните все поля",
        alertStatus: "warning",
      });
      return;
    }

    const result = await AuthClient.login(username, password);

    handleAuthResponse(result, "/ads", "Вход выполнен");
  };

  const handleRegistration = async (username: string, password: string) => {
    if (!username || !password) {
      setSpinner(false);
      handleAlertMessage({
        alertText: "Заполните все поля",
        alertStatus: "warning",
      });
      return;
    }

    if (password.length < 4) {
      setSpinner(false);
      handleAlertMessage({
        alertText: "Пароль должен содержать больше 4 символов",
        alertStatus: "warning",
      });
      return;
    }

    const result = await AuthClient.registration(username, password);

    handleAuthResponse(result, "/login", "Регистрация прошла успешно");

    usernameRef.current.value = "";
    passwordRef.current.value = "";
  };

  const handleAuth = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSpinner(true);

    switch (type) {
      case "login":
        handleLogin(usernameRef.current.value, passwordRef.current.value);
        break;
      case "registration":
        handleRegistration(
          usernameRef.current.value,
          passwordRef.current.value
        );
        break;
    }
  };
  return (
    <div className="auth-container">
      <h4 className="auth-title">{currentAuthTitle}</h4>
      <form onSubmit={handleAuth} className="form-group">
        <div className="form-item">
          <span className="auth-label">Введите имя пользователя</span>
          <input ref={usernameRef} type="text" className="auth__input" />
        </div>
        <div className="form-item">
          <span className="auth-label">Введите пароль</span>
          <input ref={passwordRef} type="password" className="auth__input" />
        </div>
        <button className="btn auth__btn">
          {spinner ? <Spinner top={5} left={20} /> : currentAuthTitle}
        </button>
      </form>
      {type === "login" ? (
        <div className="mb-4">
          <span className="question-text">Еще нет аккаунта?</span>
          <Link className="auth__link" to={"/registration"}>
            Зарегистрироваться
          </Link>
        </div>
      ) : (
        <div className="mb-4">
          <span className="question-text">Уже есть аккаунт?</span>
          <Link className="auth__link" to={"/login"}>
            Войти
          </Link>
        </div>
      )}
    </div>
  );
};
