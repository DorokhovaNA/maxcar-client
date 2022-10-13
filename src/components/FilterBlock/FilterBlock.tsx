import { MutableRefObject, useRef, useState } from "react";
import { getAdsFilteredFx } from "../../api/AdsClient";
import { setAds } from "../../context";
import "./styles.css";

export const FilterBlock = () => {
  const [spinner, setSpinner] = useState(false);
  const [filter, setFilterAds] = useState(false);
  const [maxPrice, setMaxPrice] = useState("600000");
  const [maxMileage, setMaxMileage] = useState("0");
  const titleSearchRef = useRef() as MutableRefObject<HTMLInputElement>;
  const priceFromSearchRef = useRef() as MutableRefObject<HTMLInputElement>;
  const priceToSearchRef = useRef() as MutableRefObject<HTMLInputElement>;
  const yearFromRef = useRef() as MutableRefObject<HTMLInputElement>;
  const yearToRef = useRef() as MutableRefObject<HTMLInputElement>;
  const mileageFromRef = useRef() as MutableRefObject<HTMLInputElement>;
  const mileageToRef = useRef() as MutableRefObject<HTMLInputElement>;
  const driveSearchRef = useRef() as MutableRefObject<HTMLSelectElement>;
  const transmissionSearchRef = useRef() as MutableRefObject<HTMLSelectElement>;
  const bodySearchRef = useRef() as MutableRefObject<HTMLSelectElement>;
  const statusSearchRef = useRef() as MutableRefObject<HTMLSelectElement>;

  const allowFilterAds = () => setFilterAds(true);

  const setMaxValuePrice = () => {
    priceToSearchRef.current.value = priceFromSearchRef.current.value;
    setMaxPrice(priceToSearchRef.current.value);
  };

  const setMaxValueMileage = () => {
    mileageToRef.current.value = mileageFromRef.current.value;
    setMaxMileage(priceToSearchRef.current.value);
  };

  const clearSearchInput = () => {
    titleSearchRef.current.value = "";
    priceFromSearchRef.current.value = "";
    priceToSearchRef.current.value = "";
    yearFromRef.current.value = "";
    driveSearchRef.current.value = "";
    transmissionSearchRef.current.value = "";
    yearToRef.current.value = "";
    mileageFromRef.current.value = "";
    mileageToRef.current.value = "";
    bodySearchRef.current.value = "";
    statusSearchRef.current.value = "";
  };

  const formSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = {
      title: titleSearchRef?.current?.value,
      drive: driveSearchRef?.current?.value,
      body: bodySearchRef.current?.value,
      transmission: transmissionSearchRef?.current?.value,
      priceFrom: priceFromSearchRef.current?.value,
      priceTo: priceToSearchRef.current?.value,
      mileageFrom: mileageFromRef.current?.value,
      mileageTo: mileageToRef.current?.value,
      yearFrom: yearFromRef.current?.value,
      yearTo: yearToRef.current?.value,
      status: statusSearchRef.current?.value,
    };

    const ads = await getAdsFilteredFx({
      url: "/ads",
      data,
    });

    setSpinner(false);
    setAds(ads);
  };

  return (
    <section className="search-block">
      <form onSubmit={formSubmit}>
        <div className="search-row">
          <div className="form-item search-input-w-l">
            <span className="label-search-input mb-3">Марка автомобиля</span>
            <input type="text" ref={titleSearchRef} className="search-input" />
          </div>
          <div className="form-item">
            <span className="label-search-input mb-3">Статус</span>
            <select
              ref={statusSearchRef}
              className="search-input search-input-w-s mr-0"
              defaultValue={""}
            >
              <option value="" className="d-none"></option>
              <option>Под заказ</option>
              <option>Ожидается</option>
              <option>В наличии</option>
            </select>
          </div>
        </div>
        <div className="search-row">
          <div className="search-input-block">
            <span className="label-search-input mb-3">Цена, руб</span>
            <input
              type="number"
              ref={priceFromSearchRef}
              min={600000}
              placeholder="от"
              onChange={setMaxValuePrice}
              className="search-input"
            />
            <input
              type="number"
              ref={priceToSearchRef}
              min={maxPrice}
              placeholder="до"
              className="search-input"
            />
          </div>
          <div className="search-input-block">
            <span className="label-search-input mb-3">Год</span>
            <input
              type="number"
              ref={yearFromRef}
              min={2000}
              max={2022}
              placeholder="от"
              className="search-input"
            />
            <input
              type="number"
              ref={yearToRef}
              min={2000}
              max={2022}
              placeholder="до"
              className="search-input"
            />
          </div>
          <div className="search-input-block">
            <span className="label-search-input mb-3">Пробег, км</span>
            <input
              type="number"
              ref={mileageFromRef}
              min={0}
              onChange={setMaxValueMileage}
              placeholder="от"
              className="search-input"
            />
            <input
              type="number"
              ref={mileageToRef}
              min={maxMileage}
              placeholder="до"
              className="search-input"
            />
          </div>
        </div>
        <div className="search-row">
          <div className="d-flex search-row__sub">
            <div className="input-item">
              <span className="label-search-input mb-3">Привод</span>
              <select
                ref={driveSearchRef}
                className="search-input search-input-w-s"
                defaultValue={""}
              >
                <option value="" className="d-none"></option>
                <option>Передний</option>
                <option>Задний</option>
                <option>Полный</option>
              </select>
            </div>
            <div className="input-item">
              <span className="label-search-input mb-3">Кузов</span>
              <select
                ref={bodySearchRef}
                className="search-input search-input-w-s"
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
            <div className="input-item">
              <span className="label-search-input mb-3">Коробка передач</span>
              <select
                ref={transmissionSearchRef}
                className="search-input search-input-w-s"
                defaultValue={""}
              >
                <option value="" className="d-none"></option>
                <option>Механическая</option>
                <option>Автоматическая</option>
              </select>
            </div>
          </div>
          <div className="d-flex btn-block">
            <button
              onClick={allowFilterAds}
              className="btn filter-btn search-btn"
            >
              Найти
            </button>
            <button
              onClick={clearSearchInput}
              className="btn filter-btn clear-btn"
            >
              Сброс
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};
