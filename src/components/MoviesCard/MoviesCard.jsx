import "./MoviesCard.css";

export const MoviesCard = ({ isSaved }) => {
  return (
    <li className="card">
      <div className="card__head">
        <div className="card__name">
          <p className="card__title">33 слова о дизайне</p>
          <p className="card__duration">1ч 47м</p>
        </div>
        {isSaved ? (
          <button className="card__delete"></button>
        ) : (
          <button className="card__icon"></button>
        )}
      </div>
      <div className="card__img"></div>
    </li>
  );
};
