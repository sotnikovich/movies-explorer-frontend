import { Header } from "../Header/Header";
import "./Profile.css";
export const Profile = () => {
  return (
    <section className="profle">
      <Header
        isLogged={true}
        isMain={false}
        isMovies={true}
        isSavedMovies={false}
        isProfile={true}
      />
      <h1 className="profile__title">Привет, Максим!</h1>
      <form className="profile__form">
        <div className="profile__fields">
          <div className="profile__field">
            <p className="profile__text">Имя</p>
            <p className="profile__text">Максим</p>
          </div>
          <div className="profile__field">
            <p className="profile__text">E-mail</p>
            <p className="profile__text">pochta@yandex.ru</p>
          </div>
        </div>
        <div className="profile__buttons">
          <button className="profile__button-submit">Редактировать</button>
          <button className="profile__button-logout">Выйти из аккаунта </button>
        </div>
      </form>
    </section>
  );
};
