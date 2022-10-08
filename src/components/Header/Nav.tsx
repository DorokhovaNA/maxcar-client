import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { getAdsFilteredFx } from "../../api/AdsClient";
import { Spinner } from "../Spinner/Spinner";
import { IAds } from "../../types";
import { useDebounce } from "../../hooks/useDebounce";
import "./styles.css";

export const Nav = () => {
  const [value, setValue] = useState("");
  const [results, setResults] = useState<IAds[]>([]);
  const [dropdown, setDropdown] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const navigate = useNavigate();

  const debounced = useDebounce<string>(value, 500);

  const redirectToAd = (ad: IAds) => {
    return (event: React.MouseEvent) => {
      navigate(`/ads/${ad._id}`);
      setDropdown(false);
      setValue("");
      event.preventDefault();
    };
  };

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    if (debounced.length >= 3) {
      handleFilteredAds(debounced).then(() => setDropdown(true));
    } else {
      setDropdown(false);
    }
  }, [debounced]);

  const handleFilteredAds = async (search: string) => {
    setSpinner(true);
    const ads = await getAdsFilteredFx({
      url: "/ads",
      data: { title: search },
    });

    setSpinner(false);
    setResults(ads);
  };

  const setActive = ({ isActive }: any) =>
    isActive ? "menu__item menu__item_active" : "menu__item";

  const renderDropdown = () => {
    if (results.length === 0) {
      return <p className="text-center">No results!</p>;
    }

    return results.map((ad) => (
      <li
        key={ad._id}
        onClick={redirectToAd(ad)}
        className="search-dropdown__item"
      >
        {ad.title}
      </li>
    ));
  };
  return (
    <div className="nav-block" onClick={() => setDropdown(false)}>
      <nav className="menu">
        <input id="menu__toggle" type="checkbox" />
        <label className="menu__btn" htmlFor="menu__toggle">
          <span></span>
        </label>
        <ul className="menu-box">
          <li className="menu-list">
            <NavLink to="/" className={setActive}>
              Главная
            </NavLink>
          </li>
          <li className="menu-list">
            <NavLink to="/ads" className={setActive}>
              Каталог
            </NavLink>
          </li>
          <li className="menu-list">
            <NavLink to="/magazine" className={setActive}>
              Журнал
            </NavLink>
          </li>
          <li className="menu-list">
            <NavLink to="/about" className={setActive}>
              О компании
            </NavLink>
          </li>
          <li className="menu-list">
            <NavLink to="/contacts" className={setActive}>
              Контакты
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="input-search position-relative">
        <input
          type="search"
          value={value}
          onChange={changeHandler}
          placeholder="Поиск по объявлениям"
          style={{ color: "rgb(117, 115, 115)" }}
        />
        <FontAwesomeIcon icon={faSearch} />
        {spinner && <Spinner top={0} left={100} />}
        {dropdown && (
          <ul
            className="search-dropdown"
            onClick={(event) => event.stopPropagation()}
          >
            {renderDropdown()}
          </ul>
        )}
      </div>
    </div>
  );
};
