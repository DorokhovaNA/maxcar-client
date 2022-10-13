import { Link } from "react-router-dom";
import Slider from "react-slick";
import { IAdsItemProps } from "../../types";
import { formatDate } from "../../utils/arrayUtils";
import "./styles.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const AdsItem = ({ ad }: IAdsItemProps) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: "slides",
  };
  return (
    <li className="ad-item" id={ad._id as string}>
      <div className="ad-item__content">
        <div className="ad-item__slider">
          <ul className="file-preview">
            <Slider {...settings}>
              {!ad.attachment
                ? ""
                : Array.from(ad.attachment)?.map((file, index) => (
                    <li className="file-preview__item" key={index}>
                      <img
                        className="slider__img"
                        loading="lazy"
                        height="140"
                        width="190"
                        src={`${process.env.REACT_APP_SERVER_URL}/${file.filename}`}
                        alt={file.filename}
                      />
                    </li>
                  ))}
            </Slider>
          </ul>
        </div>
        <div className="ad-item__description">
          <h6 className="ad-item__title">{ad.title}</h6>
          <div className="d-flex justify-content-between">
            <p>{ad.mileage} км</p>
            <p>{ad.year}</p>
          </div>
          <div className="d-flex justify-content-between">
            <p>{ad.modification} л.с.</p>
            <p>{ad.body}</p>
          </div>
          <div className="d-flex justify-content-between">
            <p>{ad.transmission}</p>
            <p>{ad.drive}</p>
          </div>
          <Link className="ad-item__link" to={`/ads/${ad._id}`}>
            Полное описание
          </Link>
        </div>

        <div className="ad-item__info">
          <div className="d-flex justify-content-between">
            <span></span>
            <span className="ad-item__info-price">{ad.price} &#8381;</span>
          </div>
          <div className="d-flex justify-content-between">
            <span></span>
            <span className="ad-status">{ad.status}</span>
          </div>
          <p className="ad-item__info-date">
            Опубликовано {formatDate(ad.date as string)}
          </p>
        </div>
      </div>
    </li>
  );
};
