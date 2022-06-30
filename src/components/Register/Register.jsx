import "./Register.css";
import { Link } from "react-router-dom";
export const Register = () => {
  return (
    <section className="register">
      <Link to="/" className="register__logo"></Link>
      <h1 className="register__title">Добро пожаловать!</h1>
      <form className="register__form">
        <fieldset className="register__fieldset">
          <p className="register__text">Имя</p>
          <input
            className="register__input"
            type="text"
            name="name"
            pattern="[а-яА-Яa-zA-ZёË\- ]{1,}"
            required
            minLength="2"
            autoComplete="off"
          />
          <span className="register__error"></span>
          <p className="register__text">E-mail</p>
          <input
            className="register__input"
            type="email"
            name="email"
            required
            autoComplete="off"
          />
          <span className="register__error"></span>
          <p className="register__text">Пароль</p>
          <input
            className="register__input"
            type="password"
            name="password"
            required
            minLength="8"
            autoComplete="off"
          />
          <span className="register__error">Что-то пошло не так...</span>
        </fieldset>
        <div className="register__bottom">
          <button className="register__button" type="submit">
            Зарегистрироваться
          </button>
          <div className="register__links">
            <p className="register__answer">Уже зарегистрированы?</p>
            <Link className="register__link" to="/signin">
              Войти
            </Link>
          </div>
        </div>
      </form>
    </section>
  );
};
