import { Link } from "react-router-dom";
import "./styles.css";

export const NotFound = () => {
  return (
    <section className="notfound-block">
      <h5 className="notfound-block__title">Кажется, что-то сломалось...</h5>
      <img width="350" src="/img/notfound.png" alt="" loading="lazy" />
      <Link className="notfound-block__link" to={"/"}>
        Перейти на главную страницу
      </Link>
    </section>
  );
};
