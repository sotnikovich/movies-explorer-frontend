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
  const nameRef = React.useRef("");
  const emailRef = React.useRef("");
  const { handleChange, errors, isValid, resetForm } = useFormWithValidation({
    name: nameRef.current.value,
    email: emailRef.current.value,
  });

  const [isUpdate, setIsUpdate] = React.useState(false);

  const onFormSumbit = (evt) => {
    evt.preventDefault();
    if (isValid) {
      const name = nameRef.current.value;
      const email = emailRef.current.value;
      changeProfile({ name, email });
      resetForm();
    }
  };

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
    if (
      nameRef.current.value === currentUser.name &&
      emailRef.current.value === currentUser.email
    ) {
      setIsUpdate(false);
    } else {
      setIsUpdate(true);
    }
  }, [
    nameRef.current.value,
    emailRef.current.value,
    currentUser.name,
    currentUser.email,
  ]);

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
      <form className="profile__form" onSubmit={onFormSumbit}>
        <div className="profile__fields">
          <div className="profile__field">
            <p className="profile__text">Имя</p>
            <input
              className="profile__input"
              name="name"
              ref={nameRef}
              values={nameRef.current.value}
              defaultValue={currentUser.name}
              pattern="[а-яА-Яa-zA-ZёË\- ]{1,}"
              type="text"
              onChange={handleChangeInput}
              minLength="2"
              required
              autoComplete="off"
            />
            <span className="profile__error">{errors.name}</span>
          </div>
          <div className="profile__field">
            <p className="profile__text">E-mail</p>
            <input
              className="profile__input"
              name="email"
              ref={emailRef}
              defaultValue={currentUser.email}
              values={emailRef.current.value}
              onChange={handleChangeInput}
              type="email"
              required
              autoComplete="off"
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
            disabled={!isValid || !isUpdate}
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
