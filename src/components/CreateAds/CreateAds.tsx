import React, { MutableRefObject, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faXmark,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { createAdFx } from "../../api/AdsClient";
import { createAd } from "../../context";
import { getAuthDataFromLS, handleAlertMessage } from "../../utils/auth";
import { validationInputs } from "../../utils/validation";
import { Spinner } from "../Spinner/Spinner";
import "./styles.css";

export const CreateAds = () => {
  const [spinner, setSpinner] = useState(false);
  const [create, setCreate] = useState(false);
  const [filesArr, setFilesArray] = useState<FileList | null>(null);
  const titleRef = useRef() as MutableRefObject<HTMLInputElement>;
  const priceRef = useRef() as MutableRefObject<HTMLInputElement>;
  const yearRef = useRef() as MutableRefObject<HTMLInputElement>;
  const driveRef = useRef() as MutableRefObject<HTMLSelectElement>;
  const transmissionRef = useRef() as MutableRefObject<HTMLSelectElement>;
  const modificationRef = useRef() as MutableRefObject<HTMLInputElement>;
  const mileageRef = useRef() as MutableRefObject<HTMLInputElement>;
  const bodyRef = useRef() as MutableRefObject<HTMLSelectElement>;
  const descriptionRef = useRef() as MutableRefObject<HTMLTextAreaElement>;
  const filesRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef() as MutableRefObject<HTMLSelectElement>;

  const allowCreateAd = () => setCreate(true);
  const cancelCreateAd = () => {
    setCreate(false);
    titleRef.current.value = "";
    priceRef.current.value = "";
    descriptionRef.current.value = "";
    yearRef.current.value = "";
    driveRef.current.value = "";
    transmissionRef.current.value = "";
    modificationRef.current.value = "";
    mileageRef.current.value = "";
    bodyRef.current.value = "";
    statusRef.current.value = "";

    if (filesRef.current?.value) {
      filesRef.current.value = "";
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilesArray(e.target.files);
  };

  const resetFile = (index: number) => {
    const dt = new DataTransfer();

    for (let i = 0; i < filesArr!.length; i++) {
      const file: any = filesArr?.[i];

      if (index !== i) {
        dt.items.add(file);
      }
    }

    setFilesArray(dt.files);
  };

  const formSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSpinner(true);

    const titleInputValue = titleRef.current.value;
    const priceInputValue = priceRef.current.value;
    const descriptionTextAreaValue = descriptionRef.current.value;
    const yearInputValue = yearRef.current.value;
    const driveSelectValue = driveRef.current.value;
    const transmissionSelectValue = transmissionRef.current.value;
    const modificationInputValue = modificationRef.current.value;
    const mileageInputValue = mileageRef.current.value;
    const bodySelectValue = bodyRef.current.value;
    const statusSelectValue = statusRef.current.value;

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
      setSpinner(false);
      return;
    }

    const authData = getAuthDataFromLS();

    const ad = await createAdFx({
      url: "/ads",
      ad: {
        price: parseInt(priceInputValue),
        description: descriptionTextAreaValue,
        title: titleInputValue,
        date: new Date(),
        year: yearInputValue,
        drive: driveSelectValue,
        transmission: transmissionSelectValue,
        modification: modificationInputValue,
        mileage: mileageInputValue,
        body: bodySelectValue,
        status: statusSelectValue,
        attachment: filesRef.current?.files,
      },
      token: authData.access_token,
    });

    if (!ad) {
      setSpinner(false);
      return;
    }

    setSpinner(false);

    createAd(ad);
    cancelCreateAd();

    handleAlertMessage({
      alertText: "Успешно добавлено",
      alertStatus: "success",
    });
  };

  return (
    <div className="mt-3 d-flex flex-column">
      {create ? (
        <div className="mt-3 d-flex flex-column">
          <div className="d-flex align-self-end">
            <button className="btn btn-create" onClick={cancelCreateAd}>
              <FontAwesomeIcon icon={faXmark} className="icon" />
              Отмена
            </button>
          </div>
          <div className="mt-3">
            <form onSubmit={formSubmit}>
              <div className="ad-block">
                <h6 className="form-text text-center mb-3">
                  Создать объявление
                </h6>
                <div className="form-item">
                  <span className="label-input mb-3">Марка автомобиля</span>
                  <input ref={titleRef} type="text" className="text-input" />
                </div>
                <div className="form-item">
                  <span className="label-input mb-3">Цена</span>
                  <input ref={priceRef} type="text" className="text-input" />
                </div>
                <div className="form-item">
                  <span className="label-input mb-3">Статус</span>
                  <select
                    ref={statusRef}
                    className="search-input search-input__mg"
                    defaultValue={""}
                  >
                    <option value="" className="d-none"></option>
                    <option>Под заказ</option>
                    <option>Ожидается</option>
                    <option>В наличии</option>
                  </select>
                </div>
                <h6 className="form-text text-center mb-3">Характеристики</h6>
                <div className="form-item">
                  <span className="label-input mb-3">Год выпуска</span>
                  <input ref={yearRef} type="text" className="text-input" />
                </div>
                <div className="form-item">
                  <span className="label-input mb-3">Привод</span>
                  <select
                    ref={driveRef}
                    className="search-input search-input__mg"
                    defaultValue={""}
                  >
                    <option value="" className="d-none"></option>
                    <option>Передний</option>
                    <option>Задний</option>
                    <option>Полный</option>
                  </select>
                </div>
                <div className="form-item">
                  <span className="label-input mb-3">Модификация (л.с.)</span>
                  <input
                    ref={modificationRef}
                    type="text"
                    className="text-input"
                  />
                </div>
                <div className="form-item">
                  <span className="label-input mb-3">Пробег</span>
                  <input ref={mileageRef} type="text" className="text-input" />
                </div>
                <div className="form-item">
                  <span className="label-input mb-3">Кузов</span>
                  <select
                    ref={bodyRef}
                    className="search-input search-input__mg"
                    defaultValue={""}
                  >
                    <option value="" className="d-none"></option>
                    <option>Седан</option>
                    <option>Хэтчбек</option>
                    <option>Внедорожник</option>
                    <option>Универсал</option>
                    <option>Купе</option>
                    <option>Минивэн</option>
                  </select>
                </div>
                <div className="form-item">
                  <span className="label-input mb-3">Коробка передач</span>
                  <select
                    ref={transmissionRef}
                    className="search-input search-input__mg"
                    defaultValue={""}
                  >
                    <option value="" className="d-none"></option>
                    <option>Механическая</option>
                    <option>Автоматическая</option>
                  </select>
                </div>
                <div className="form-item">
                  <span className="label-input mb-3">Описание</span>
                  <textarea
                    ref={descriptionRef}
                    className="text-input description-input"
                  />
                </div>
              </div>
              <div className="ad-block">
                <h6 className="form-text text-center mb-3">Фото</h6>
                <div className="field__wrapper">
                  <input
                    name="file"
                    onChange={handleFileInput}
                    ref={filesRef}
                    type="file"
                    id="field-file"
                    className="field file-input"
                    multiple
                  />
                  <label className="file-input__wrapper" htmlFor="field-file">
                    <div className="file-input__fake">
                      {!filesArr?.length
                        ? "Файл не выбран"
                        : `Количество файлов: ${filesArr?.length}`}
                    </div>
                    <div className="file-input__button">Выбрать</div>
                  </label>
                  <aside className="mt-2">
                    <p className="form-text">
                      {!filesArr?.length
                        ? ""
                        : `Количество файлов: ${filesArr?.length}`}
                    </p>
                    <ul className="file-preview">
                      {!filesArr
                        ? ""
                        : Array.from(filesArr as ArrayLike<File>)?.map(
                            (file, index) => (
                              <li className="file-preview__item" key={index}>
                                <p className="file-preview__item-text">
                                  {file.name}
                                </p>
                                <img
                                  className="file-preview__img"
                                  loading="lazy"
                                  height="100"
                                  width="150"
                                  src={URL.createObjectURL(file)}
                                  alt={file.name}
                                />
                                <button
                                  className="file-preview__btn-delete"
                                  type="reset"
                                  onClick={() => resetFile(index)}
                                >
                                  <FontAwesomeIcon icon={faXmarkCircle} />
                                </button>
                              </li>
                            )
                          )}
                    </ul>
                  </aside>
                </div>
              </div>
              <button className="btn add-btn">
                {spinner ? <Spinner top={5} left={20} /> : "Добавить"}
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="d-flex align-self-end mt-3">
          <button className="btn btn-create" onClick={allowCreateAd}>
            <FontAwesomeIcon icon={faPlus} className="icon" />
            Создать объявление
          </button>
        </div>
      )}
    </div>
  );
};
