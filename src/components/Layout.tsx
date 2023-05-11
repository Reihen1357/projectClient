import React, {
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import "../styles/Layout.css";
import vkLogo from "../assets/vk_logo.png";
import { Context } from "../index";
import { useNavigate } from "react-router-dom";
import {
  FEED_ROUTE,
  FRIENDS_ROUTE,
  LOGIN_ROUTE,
  USER_ROUTE,
} from "../utils/consts";
import { observer } from "mobx-react-lite";
import { getUserAvatar } from "../Api/UserApi";

const Layout: FC<PropsWithChildren> = observer(({ children }) => {
  const { user } = useContext(Context);
  const [avatar, setAvatar] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getUserAvatar(user.user!.id).then((avatarURL) => {
      const imagePath = new URL(
        avatarURL ?? "",
        new URL(process.env.REACT_APP_API_URL ?? "").origin
      ).href;
      setAvatar(imagePath);
    });
  }, []);

  const logOut = () => {
    localStorage.removeItem("token");
    user.setIsAuth(false);
    user.setUser(null);
    navigate(LOGIN_ROUTE);
  };

  return (
    <div className="layout__root">
      <header className="layout__header">
        <img
          className="layout__logo"
          onClick={() => navigate(USER_ROUTE)}
          src={vkLogo}
          alt="vkLogo"
        />
        <div className="layout__menu">
          <img
            className="layout__menu-avatar"
            alt="userAvatar"
            src={avatar}
          />
          <button
            onClick={logOut}
            className="layout__menu-logout"
          >
            Выход
          </button>
        </div>
      </header>
      <aside className="layout__sidebar">
        <div
          className="layout__myPage"
          onClick={() => navigate(`/${user.user?.id}`)}
        >
          Моя страница
        </div>
        <div
          className="layout__feed"
          onClick={() => navigate(FEED_ROUTE)}
        >
          Лента новостей
        </div>
        <div
          className="layout__friends"
          onClick={() => navigate(FRIENDS_ROUTE)}
        >
          Мои друзья
        </div>
      </aside>
      <section className="layout__content">{children}</section>
    </div>
  );
});

export default Layout;
