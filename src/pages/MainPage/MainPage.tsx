import { useStore } from "effector-react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { AdsItem } from "../../components/AdsItem/AdsItem";
import { getAdsFx } from "../../api/AdsClient";
import { $ads, setAds } from "../../context";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styles.css";

export const MainPage = () => {
  const store = useStore($ads);

  const shouldLoadAds = useRef(true);

  useEffect(() => {
    if (shouldLoadAds.current) {
      shouldLoadAds.current = false;
      handleGetAds();
    }
  }, []);

  const handleGetAds = async () => {
    const ads = await getAdsFx({
      url: "/ads",
    });

    setAds(ads);
  };
  return (
    <section className="main-content">
      <div className="main-preview">
        <div className="main-preview__info">
          <h5 className="main-preview__title">MAXCAR</h5>
          <p className="main-preview__text">
            Мы предлагаем только лучшие электромобили из Европы и Азии. Работаем
            напрямую с поставщиками, тем самым гарантируя отличные цены и сроки
            доставки.
          </p>
          <Link to={"/ads"}>
            <button className="btn main-preview__btn">Перейти в каталог</button>
          </Link>
        </div>
        <div className="main-preview__centr">
          <img
            className="main-preview__main-img"
            loading="lazy"
            alt="car"
            src="/img/audi.jpg"
          />
          <img
            className="main-preview__side-img"
            loading="lazy"
            alt="car"
            src="/img/tesla1.jpg"
          />
        </div>
      </div>
      <div className="main-magazine">
        <ul className="main-magazine__card-block">
          <li className="main-magazine__card">
            <h6 className="main-magazine__card-title">
              Как и где купить новый электромобиль
            </h6>
            <p className="main-magazine__card-text">
              Варианты, выгоды и сложности приобретения электрического
              транспорта
            </p>
          </li>
          <li className="main-magazine__card">
            <h6 className="main-magazine__card-title">
              Как эксплуатировать электромобиль зимой и&nbsp;летом
            </h6>
            <p className="main-magazine__card-text">
              О чём нужно помнить владельцу электромобиля и&nbsp;зимой,
              и&nbsp;летом
            </p>
          </li>
          <li className="main-magazine__card">
            <h6 className="main-magazine__card-title">
              Почему электромобили выгоднее машин с&nbsp;ДВС
            </h6>
            <p className="main-magazine__card-text">
              Считаем, насколько дешевле ездить на электричестве, чем на бензине
            </p>
          </li>
          <li className="main-magazine__card">
            <h6 className="main-magazine__card-title">
              Где и как заряжать электромобили
            </h6>
            <p className="main-magazine__card-text">
              Все, что надо знать о стандартах, терминалах и зарядных сетях
            </p>
          </li>
          <li className="main-magazine__card">
            <h6 className="main-magazine__card-title">
              Как устроены батареи электромобилей
            </h6>
            <p className="main-magazine__card-text">
              Что нужно знать о самом дорогом узле в электромобиле
            </p>
          </li>
        </ul>
      </div>
      <div className="main-feedback">
        <div className="main-feedback__card">
          <p className="main-feedback__text">
            Не нашли, то что искали? Свяжитесь с&nbsp;нами
          </p>
          <div className="main-feedback__contacts">
            <button className="btn main-preview__btn mb-2">
              <a href="tel:+79262182893" className="main-feedback__link">
                <FontAwesomeIcon icon={faPhone} />
                +7-926-218-28-93
              </a>
            </button>
            <button className="btn main-preview__btn">
              <a
                href="https://wa.me/+79262182893"
                className="main-feedback__link"
              >
                <FontAwesomeIcon icon={faWhatsapp} />
                Написать в WhatsApp
              </a>
            </button>
          </div>
        </div>
        <div>
          <img
            className="main-feedback__img"
            loading="lazy"
            alt="car"
            src="/img/leaf.png"
          />
        </div>
      </div>
      <div className="main-ads">
        <h5 className="main-ads__subtitle">Последние добавленные объявления</h5>
        <ul className="list-group mt-4">
          {store.slice(0, 3).map((ad, index) => (
            <AdsItem key={ad._id as string} ad={ad} index={index + 1} />
          ))}
        </ul>
      </div>
    </section>
  );
};
