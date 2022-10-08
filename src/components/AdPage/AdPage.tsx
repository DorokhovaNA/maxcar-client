import { MutableRefObject, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useStore } from "effector-react";
import Slider from "react-slick";
import { $auth } from "../../context/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { deleteAdFx, updateAdFx } from "../../api/AdsClient";
import { $ads, removeAd, updatedAd } from "../../context";
import { formatDate } from "../../utils/arrayUtils";
import { getAuthDataFromLS, handleAlertMessage } from "../../utils/auth";
import { validationInputs } from "../../utils/validation";
import { Spinner } from "../Spinner/Spinner";
import "./styles.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const AdPage = () => {
  const { id } = useParams();
  const store = useStore($ads);
  const adFromStorage: string | null = window.sessionStorage.getItem(`ad${id}`);

  const ad = store.length
    ? store.find((item) => item._id === id)
    : JSON.parse(adFromStorage!);
  window.sessionStorage.setItem(`ad${id}`, JSON.stringify(ad));

  const [edit, setEdit] = useState(false);
  const isLoggedIn = useStore($auth);
  const [deleteSpinner, setDeleteSpinner] = useState(false);
  const [editSpinner, setEditSpinner] = useState(false);
  const [newTitle, setNewTitle] = useState(ad!.title);
  const [newDescription, setNewDescription] = useState(ad!.description);
  const [newPrice, setNewPrice] = useState<string | number>(ad!.price);
  const [newYear, setNewYear] = useState(ad!.year);
  const [newTransmission, setNewTransmission] = useState(ad!.transmission);
  const [newDrive, setNewDrive] = useState(ad!.drive);
  const [newModification, setNewModification] = useState(ad!.modification);
  const [newMileage, setNewMileage] = useState(ad!.mileage);
  const [newBody, setNewBody] = useState(ad!.body);
  const [newStatus, setNewStatus] = useState(ad!.status);

  const titleRef = useRef() as MutableRefObject<HTMLInputElement>;
  const priceRef = useRef() as MutableRefObject<HTMLInputElement>;
  const descriptionRef = useRef() as MutableRefObject<HTMLTextAreaElement>;
  const yearRef = useRef() as MutableRefObject<HTMLInputElement>;
  const driveRef = useRef() as MutableRefObject<HTMLSelectElement>;
  const transmissionRef = useRef() as MutableRefObject<HTMLSelectElement>;
  const modificationRef = useRef() as MutableRefObject<HTMLInputElement>;
  const mileageRef = useRef() as MutableRefObject<HTMLInputElement>;
  const bodyRef = useRef() as MutableRefObject<HTMLSelectElement>;
  const statusRef = useRef() as MutableRefObject<HTMLSelectElement>;

  const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) =>
    setNewTitle(event.target.value);
  const handleChangePrice = (event: React.ChangeEvent<HTMLInputElement>) =>
    setNewPrice(event.target.value);
  const handleChangeDescription = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => setNewDescription(event.target.value);
  const handleChangeYear = (event: React.ChangeEvent<HTMLInputElement>) =>
    setNewYear(event.target.value);
  const handleChangeDrive = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setNewDrive(event.target.value);
  const handleChangeTransmission = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => setNewTransmission(event.target.value);
  const handleChangeModification = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => setNewModification(event.target.value);
  const handleChangeMileage = (event: React.ChangeEvent<HTMLInputElement>) =>
    setNewMileage(event.target.value);
  const handleChangeBody = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setNewBody(event.target.value);
  const handleChangeStatus = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setNewStatus(event.target.value);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    focusOnSelect: true,
  };

  const allowEditAd = () => setEdit(true);
  const cancelEditAd = () => {
    setEdit(false);
    setEditSpinner(false);
  };

  const checkChanges = () => {
    return (
      newTitle === ad!.title &&
      +newPrice === +ad!.price &&
      newDescription === ad!.description &&
      newYear === ad!.year &&
      newBody === ad!.body &&
      newDrive === ad!.drive &&
      newMileage === ad!.mileage &&
      newModification === ad!.modification &&
      newTransmission === ad!.transmission &&
      newStatus === ad!.status
    );
  };

  const handleEditAd = async () => {
    setEditSpinner(true);

    if (checkChanges()) {
      setEditSpinner(false);
      setEdit(false);
      return;
    }

    if (
      !validationInputs(
        titleRef,
        priceRef,
        descriptionRef,
        yearRef,
        driveRef,
        transmissionRef,
        modificationRef,
        mileageRef,
        bodyRef,
        statusRef
      )
    ) {
      setEditSpinner(false);
      return;
    }

    const authData = getAuthDataFromLS();

    const editedAd = await updateAdFx({
      url: "/ads",
      token: authData.access_token,
      ad: {
        title: newTitle,
        price: +newPrice,
        description: newDescription,
        date: new Date(),
        year: newYear,
        drive: newDrive,
        transmission: newTransmission,
        modification: newModification,
        mileage: newMileage,
        body: newBody,
        status: newStatus,
      },
      id: ad!._id as string,
    });

    if (!editedAd) {
      setEditSpinner(false);
      setEdit(false);
      return;
    }

    setEdit(false);
    setEditSpinner(false);
    updatedAd(editedAd);
    handleAlertMessage({
      alertText: "Успешно обновлено",
      alertStatus: "success",
    });
  };

  const deleteAd = async () => {
    setDeleteSpinner(true);

    const authData = getAuthDataFromLS();

    await deleteAdFx({
      url: "/ads",
      token: authData.access_token,
      id: ad!._id as string,
    });

    setDeleteSpinner(false);
    removeAd(ad!._id as string);
    handleAlertMessage({
      alertText: "Уснешно удалено!",
      alertStatus: "success",
    });
  };
  return (
    <div className="ad-container">
      <div className="d-flex justify-content-between">
        <Link className="ad__link" to={"/ads"}>
          <FontAwesomeIcon className="mr-1" to={"/ads"} icon={faArrowLeft} />
          Вернуться к каталогу
        </Link>
        {isLoggedIn ? (
          <div>
            <div className="ad__btn-block d-flex">
              {edit ? (
                <div className="btn-block__inner">
                  <button
                    className="btn btn-outline-secondary btn__mr btn-width"
                    onClick={handleEditAd}
                  >
                    {editSpinner ? <Spinner top={5} left={38} /> : "Сохранить"}
                  </button>
                  <button
                    className="btn btn-outline-danger btn-cancel btn-width"
                    onClick={cancelEditAd}
                  >
                    Отмена
                  </button>
                </div>
              ) : (
                <button
                  className="btn btn-secondary btn__mr btn-width"
                  onClick={allowEditAd}
                >
                  Изменить
                </button>
              )}
              <button className="btn btn-delete btn-width" onClick={deleteAd}>
                {deleteSpinner ? <Spinner top={5} left={7} /> : "Удалить"}
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="ad-content">
        <div className="ad-content__header">
          {edit ? (
            <input
              ref={titleRef}
              onChange={handleChangeText}
              value={newTitle}
              type="text"
              className="text-input_width text-input_width-lg"
            />
          ) : (
            <h6 className="ad-item__title_lg">{ad!.title}</h6>
          )}
          {edit ? (
            <select
              ref={statusRef}
              className="search-input_width"
              onChange={handleChangeStatus}
              value={newStatus}
            >
              <option value="" className="d-none"></option>
              <option>Под заказ</option>
              <option>Ожидается</option>
              <option>В наличии</option>
            </select>
          ) : (
            <p className="ad-status">{ad!.status}</p>
          )}
          {edit ? (
            <input
              ref={priceRef}
              onChange={handleChangePrice}
              value={newPrice}
              type="text"
              className="text-input_width"
            />
          ) : (
            <p className="ad-item__info-price_lg">{ad!.price} &#8381;</p>
          )}
        </div>
        <div className="ad-item__main">
          <div className="ad-item__slider">
            <ul className="file-preview">
              <Slider className="slider_size_lg" {...settings}>
                {!ad.attachment
                  ? ""
                  : Array.from(ad!.attachment)?.map((file, index) => (
                      <li className="file-preview__item" key={index}>
                        <img
                          className="slider-img"
                          loading="lazy"
                          // @ts-ignore
                          src={`http://localhost:3000/${file.filename}`}
                          // @ts-ignore
                          alt={file.filename}
                        />
                      </li>
                    ))}
              </Slider>
            </ul>
          </div>
          <div>
            <div className="ad__info">
              <div className="d-flex justify-content-between">
                <p>Год</p>
                {edit ? (
                  <input
                    ref={yearRef}
                    onChange={handleChangeYear}
                    value={newYear}
                    type="text"
                    className="text-input_width"
                  />
                ) : (
                  <span>{ad!.year}</span>
                )}
              </div>
              <div className="d-flex justify-content-between">
                <p>Пробег</p>
                {edit ? (
                  <input
                    ref={mileageRef}
                    onChange={handleChangeMileage}
                    value={newMileage}
                    type="text"
                    className="text-input_width"
                  />
                ) : (
                  <p>{ad!.mileage} км</p>
                )}
              </div>
              <div className="d-flex justify-content-between">
                <p>Привод</p>
                {edit ? (
                  <select
                    ref={driveRef}
                    className="search-input_width"
                    onChange={handleChangeDrive}
                    value={newDrive}
                  >
                    <option value="" className="d-none"></option>
                    <option>Передний</option>
                    <option>Задний</option>
                    <option>Полный</option>
                  </select>
                ) : (
                  <p>{ad!.drive}</p>
                )}
              </div>
              <div className="d-flex justify-content-between">
                <p className="mr-2">Модификация</p>
                {edit ? (
                  <input
                    ref={modificationRef}
                    onChange={handleChangeModification}
                    value={newModification}
                    type="text"
                    className="text-input_width"
                  />
                ) : (
                  <p>{ad!.modification} л.с.</p>
                )}
              </div>
              <div className="d-flex justify-content-between">
                <p>Кузов</p>
                {edit ? (
                  <select
                    ref={bodyRef}
                    className="search-input_width"
                    onChange={handleChangeBody}
                    value={newBody}
                  >
                    <option value="" className="d-none"></option>
                    <option>Седан</option>
                    <option>Хэтчбек</option>
                    <option>Внедорожник</option>
                    <option>Универсал</option>
                    <option>Купе</option>
                    <option>Минивэн</option>
                  </select>
                ) : (
                  <p>{ad!.body}</p>
                )}
              </div>
              <div className="d-flex justify-content-between">
                <p>Коробка передач</p>
                {edit ? (
                  <select
                    ref={transmissionRef}
                    className="search-input_width"
                    onChange={handleChangeTransmission}
                    value={newTransmission}
                  >
                    <option value="" className="d-none"></option>
                    <option>Механическая</option>
                    <option>Автоматическая</option>
                  </select>
                ) : (
                  <span>{ad!.transmission}</span>
                )}
              </div>
              <div className="ad__description">
                {edit ? (
                  <textarea
                    ref={descriptionRef}
                    onChange={handleChangeDescription}
                    value={newDescription}
                    className="text-input description-input"
                  />
                ) : (
                  <span className="ad__description-text">
                    {ad!.description}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        <p className="ad-item__info-date">
          Опубликовано {formatDate(ad!.date as string)}
        </p>
      </div>
    </div>
  );
};
