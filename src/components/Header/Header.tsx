import { useStore } from "effector-react";
import { Link } from "react-router-dom";
import { useTheme } from "../../hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Nav } from "./Nav";
import { $username } from "../../context/auth";
import {
  faLightbulb,
  faMoon,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import "./styles.css";

export const Header = () => {
  const { toggleTheme, theme } = useTheme();
  const username = useStore($username);
  return (
    <header
      className={`navbar navbar-dark pb-0 bg-${
        theme === "dark" ? "dark" : "light"
      }`}
    >
      <div className="header">
        <div className="d-flex justify-content-between align-items-center w-100">
          <Link to="/">
            <img
              className="logo"
              loading="lazy"
              src="https://static.tildacdn.com/tild3665-6366-4230-b839-383433613039/maxcar-black-tagline.png"
              alt="logo"
            />
          </Link>
          <div className="d-flex justify-content-between align-items-center">
            <div className="user-block">
              <Link to="/login" className="user-link_text">
                <div className="user-link">
                  <FontAwesomeIcon icon={faUser} />
                  {username.length ? (
                    <h6 className="ml-1 mb-0">{username}</h6>
                  ) : (
                    ""
                  )}
                </div>
              </Link>
              <div className="tooltip-icon">
                Перейти на страницу авторизации
              </div>
            </div>
            <div className="theme-toggle__block">
              <button onClick={toggleTheme} className="btn-toggle">
                {theme === "dark" ? (
                  <FontAwesomeIcon icon={faLightbulb} />
                ) : (
                  <FontAwesomeIcon icon={faMoon} />
                )}
              </button>
              <div className="tooltip-icon tooltip-icon__button">
                Изменить на {theme === "dark" ? "светлую" : "темную"} тему
              </div>
            </div>
          </div>
        </div>
      </div>
      <Nav />
    </header>
  );
};
