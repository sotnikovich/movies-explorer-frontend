import { Header } from "../Header/Header";
import { NavTab } from "../NavTab/NavTab";
import "./Promo.css";

export const Promo = ({ isLogged, isProfile, isMain }) => {
  return (
    <>
      <Header isLogged={isLogged} isMain={isMain} isProfile={isProfile} />
      <section className="promo">
        <h1 className="promo__title">
          Учебный проект студента факультета Веб-разработки.
        </h1>
        <NavTab />
      </section>
    </>
  );
};
