import "./styles.css";

export const Contacts = () => {
  return (
    <div className="contact-block">
      <h4 className="contact-block__title">
        Мы продаем электромобили и не только!
      </h4>
      <p className="contact-block__text">Вы всегда можете связаться с нами:</p>
      <div className="d-flex flex-column">
        <a href="tel:+79262182893" className="contact-block__link">
          +7-926-218-28-93
        </a>
        <a href="https://wa.me/+79262182893" className="contact-block__link">
          Написать в WhatsApp
        </a>
        <a href="https://maxcar.ru" className="contact-block__link">
          Наш основной сайт
        </a>
      </div>
      <div className="d-flex flex-column mt-3">
        <p className="contact-block__text">
          Будем рады Вас видеть по адресу: Москва, поселение Воскресенское,
          деревня Расторопово, дом 80
          <span>
            <a
              href="https://yandex.com/maps/213/moscow/house/derevnya_rastoropovo_80/Z04YcgNmSkMFQFtvfXlxdXRqYA==/?ll=37.446363%2C55.504894&z=17"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="contact-block__map mt-3"
                loading="lazy"
                alt="map"
                src="/img/map.png"
              />
            </a>
          </span>
        </p>
      </div>
    </div>
  );
};
