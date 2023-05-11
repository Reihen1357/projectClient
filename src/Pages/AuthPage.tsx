import React, { ChangeEvent, FC, useContext, useState } from "react";
import "../styles/AuthPage.css";
import { useNavigate } from "react-router-dom";
import { login } from "../Api/UserApi";
import { Context } from "../index";
import { REGISTRATION_ROUTE } from "../utils/consts";

const AuthPage: FC = () => {
  const { user } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleLogin = async () => {
    const response = await login(email, password);
    user.setUser(response);
    user.setIsAuth(true);
    navigate(`/${user.user?.id}`);
  };

  return (
    <main className="authPage__main">
      <div className="authPage__container">
        <h1 className="authPage__header">Добро пожаловать</h1>
        <div className="authPage__content">
          <input
            value={email}
            type="text"
            className="authPage__input"
            placeholder="Введите почту"
            onChange={handleEmail}
          />
          <input
            value={password}
            type="password"
            className="authPage__input"
            placeholder="Введите пароль"
            onChange={handlePassword}
          />
          <button
            className="authPage__button"
            onClick={handleLogin}
          >
            Войти
          </button>
          <button
            onClick={() => navigate(REGISTRATION_ROUTE)}
            className="authPage__register"
          >
            Нет аккаунта? Зарегистрируйтесь!
          </button>
        </div>
      </div>
    </main>
  );
};

export default AuthPage;
