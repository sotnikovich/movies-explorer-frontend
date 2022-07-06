import React from "react";
import { Header } from "../Header/Header";
import "./Profile.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
export const Profile = ({
  isLogged,
  onSignOut,
  changeProfile,
  profileError,
  setProfileError,
}) => {
  const currentUser = React.useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, resetForm, setValues } =
    useFormWithValidation();

  function editUserProfile(e) {
    e.preventDefault();
    changeProfile({ email: values.email, name: values.name });
    resetForm();
  }
  function handleClickSignOut() {
    resetForm();
    onSignOut();
  }
  function handleChangeInput(e) {
    handleChange(e);
    if (profileError.length > 0) {
      setProfileError("");
    }
  }
  React.useEffect(() => {
    setValues(currentUser);
  }, [currentUser, setValues]);
  return (
    <section className="profle">
      <Header
        isLogged={isLogged}
        isMain={false}
        isProfile={true}
        isMovies={false}
        isSavedMovies={false}
      />
      <h1 className="profile__title">Привет, {currentUser.name}</h1>
      <form className="profile__form" onSubmit={editUserProfile}>
        <div className="profile__fields">
          <div className="profile__field">
            <p className="profile__text">Имя</p>
            <input
              className="profile__input"
              name="name"
              value={values.name || ""}
              pattern="[а-яА-Яa-zA-ZёË\- ]{1,}"
              type="text"
              onChange={handleChangeInput}
              minLength="2"
              required
            />
            <span className="profile__error">{errors.name}</span>
          </div>
          <div className="profile__field">
            <p className="profile__text">E-mail</p>
            <input
              className="profile__input"
              name="email"
              value={values.email || ""}
              onChange={handleChangeInput}
              type="email"
              required
            />
            <span className="profile__error">{errors.email}</span>
          </div>
        </div>
        <div className="profile__buttons">
          <button
            className={
              isValid
                ? "profile__button-submit"
                : "profile__button-submit profile__button_invalid"
            }
            disabled={!isValid}
            type="submit"
          >
            Редактировать
          </button>
          <button
            className="profile__button-logout"
            type="button"
            onClick={handleClickSignOut}
          >
            Выйти из аккаунта{" "}
          </button>
        </div>
      </form>
    </section>
  );
};
