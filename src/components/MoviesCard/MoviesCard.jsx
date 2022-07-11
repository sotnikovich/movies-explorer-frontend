import React from "react";
import "./MoviesCard.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export const MoviesCard = ({
  movies,
  isSaved,
  savedMovies,
  movieDeleteFromSavedMovies,
  movieSaveInStore,
}) => {
  const [isLike, setIsLike] = React.useState(false);
  const currentUser = React.useContext(CurrentUserContext);
  const nowMovieSaved = savedMovies.find(
    (item) => item.nameRU === movies.nameRU && item.owner === currentUser._id
  );

  const movie = {
    country: movies.country || "Нет",
    director: movies.director || "Нет",
    duration: movies.duration || 0,
    year: movies.year || "Нет",
    description: movies.description || "Нет",
    image: isSaved
      ? movies.image
      : `https://api.nomoreparties.co${movies.image.url}`,
    trailerLink: isSaved ? movies.trailer : movies.trailerLink,
    thumbnail: isSaved
      ? movies.thumbnail
      : `https://api.nomoreparties.co${movies.image.formats.thumbnail.url}`,
    movieId: isSaved ? movies._id : movies.id,
    nameRU: movies.nameRU || "Нет",
    nameEN: movies.nameEN || "Нет",
  };

  const cardLikeButtonClassName = `card__like ${
    isLike ? "card__like_active" : " "
  }`;

  function handleLikeCard() {
    if (!isLike) {
      movieSaveInStore(movie);
    } else {
      const searchMovie = savedMovies.find(
        (item) => item.movieId === movies.id
      );
      movieDeleteFromSavedMovies(searchMovie._id);
      setIsLike(false);
    }
  }

  function deleteCard() {
    movieDeleteFromSavedMovies(movies._id);
  }
  React.useEffect(() => {
    if (nowMovieSaved) {
      setIsLike(true);
    }
  }, [nowMovieSaved]);
  const durationMovie = `${Math.trunc(movies.duration / 60)}ч ${
    movies.duration % 60
  }м`;

  return (
    <li className="card" id={isSaved ? movies._id : movies.id}>
      <div className="card__head">
        <div className="card__name">
          <p className="card__title">{movies.nameRU}</p>
          <p className="card__duration">{durationMovie}</p>
        </div>
        {isSaved ? (
          <button
            type="button"
            onClick={deleteCard}
            className={
              movies.owner === currentUser._id ? "card__delete" : "none"
            }
          ></button>
        ) : (
          <button
            type="button"
            onClick={handleLikeCard}
            className={cardLikeButtonClassName}
          ></button>
        )}
      </div>
      <a
        href={movies.trailerLink}
        className="card__trailer"
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="card__image"
          alt={movies.nameRU}
          src={
            isSaved
              ? movies.image
              : `https://api.nomoreparties.co${movies.image.url}`
          }
        />
      </a>
    </li>
  );
};
