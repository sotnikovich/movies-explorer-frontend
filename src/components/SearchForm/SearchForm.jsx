import "./SearchForm.css";
export const SearchForm = () => {
  return (
    <>
      <form className="search-form">
        <div className="search-form__icon"></div>
        <input
          className="search-form__input"
          type="text"
          placeholder="Фильм"
          required
          minLength="2"
        />
        <div className="search-form__right">
          <button className="search-form__button" type="submit"></button>
        </div>
        <div className="filter-checkbox">
          <button
            type="button"
            className="filter-checkbox__button filter-checkbox__button_active"
          ></button>
          <p className="filter-checkbox__text">Короткометражки</p>
        </div>
      </form>
      <div className="filter-checkbox_mobile">
        <button
          type="button"
          className="filter-checkbox__button filter-checkbox__button_active"
        ></button>
        <p className="filter-checkbox__text">Короткометражки</p>
      </div>
    </>
  );
};
