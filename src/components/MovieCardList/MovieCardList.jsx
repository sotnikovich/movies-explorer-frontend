import { MoviesCard } from "../MoviesCard/MoviesCard";
import { Preloader } from "../Preloader/Preloader";
import "./MovieCardList.css";
export const MovieCardList = ({
  moviesCollection,
  isSaved,
  isLoadingMovies,
  savedMovies,
  movieDeleteFromSavedMovies,
  movieSaveInStore,
  foundError,
  serverError,
}) => {
  return (
    <section className="movie-card-list">
      <Preloader isLoadingMovies={isLoadingMovies} />
      <span className="search-form__error">
        {foundError ? "Ничего не найдено" : ""}
      </span>
      <span className="server__error">
        {serverError
          ? "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
          : ""}
      </span>
      <ul className="movies__gallery">
        {moviesCollection.map((movies) => (
          <MoviesCard
            key={isSaved ? movies._id : movies.id}
            movies={movies}
            isSaved={isSaved}
            savedMovies={savedMovies}
            movieDeleteFromSavedMovies={movieDeleteFromSavedMovies}
            movieSaveInStore={movieSaveInStore}
          />
        ))}
      </ul>
    </section>
  );
};
