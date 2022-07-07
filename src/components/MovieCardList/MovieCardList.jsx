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
          ? "Данный фильм содержит невалидные данные, поэтому невозможно добавить его в избранное"
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
