import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import "./styles.css";

export const Footer = () => {
  return (
    <footer className="footer__wrapper">
      <div className="footer bg-dark">
        <div className="footer__owner">
          <Link to="/">
            <img
              className="footer__logo"
              loading="lazy"
              src="https://static.tildacdn.com/tild3665-6366-4230-b839-383433613039/maxcar-black-tagline.png"
              alt="logo"
            />
          </Link>
          <p className="footer__text">© 2015 ИП Мошконов О.И.</p>
        </div>
        {/* <p className="footer__text" >
                        Мы предлагаем большой выбор электромобилей с возможностью доставки 
                        по всей территории РФ, а также обслуживание и предоставление запчастей 
                        в краткие сроки. Работаем напрямую с заводами, тем самым 
                        гарантируя отличные цены и сроки доставки.
                    </p> */}
        <div className="footer__right">
          {/* <p className="footer__text">
            Новая Москва, поселение Воскресенское, деревня Расторопово,
            дом&nbsp;80.
            <br />
            <span style={{ color: "rgb(185, 178, 178)" }}>
              Ссылка на карту
              <a
                href="https://yandex.com/maps/213/moscow/house/derevnya_rastoropovo_80/Z04YcgNmSkMFQFtvfXlxdXRqYA==/?ll=37.446363%2C55.504894&z=17"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__text_links"
              >
                здесь.
              </a>
            </span>
          </p> */}
          <div className="footer-contacts">
            <a href="tel:+79262182893" className="footer-contacts__links">
              <FontAwesomeIcon icon={faPhone} />
            </a>
            <a
              href="https://wa.me/+79262182893"
              className="footer-contacts__links"
            >
              <FontAwesomeIcon icon={faWhatsapp} />
            </a>
          </div>
        </div>
        {/* <nav className="footer__menu">
                    <ul className="footer__menu-box">
                        <li className="menu-list">
                            <NavLink className="footer__menu-item" to='/' >Главная</NavLink>
                        </li>
                        <li className="menu-list">
                            <NavLink to='/ads' className="footer__menu-item">Каталог</NavLink>
                        </li>
                        <li className="menu-list">
                            <NavLink to='/magazine' className="footer__menu-item">Журнал</NavLink>
                        </li>
                        <li className="menu-list">
                            <NavLink to='/about' className="footer__menu-item">О компании</NavLink>
                        </li>
                        <li className="menu-list">
                            <NavLink to='/contacts' className="footer__menu-item">Контакты</NavLink>
                        </li>
                    </ul>
                </nav> */}
      </div>
      <div className="footer-bottom">
        <span className="footer-bottom__author">© Created by DorokhovaNA</span>
      </div>
    </footer>
  );
};
