import { MoviesCard } from "../MoviesCard/MoviesCard";
import { Preloader } from "../Preloader/Preloader";
import "./MovieCardList.css";
export const MovieCardList = ({ isLoadingMovies, isSaved }) => {
  return (
    <section className="movie-card-list">
      <Preloader isLoadingMovies={isLoadingMovies} />
      <ul className="movies__gallery">
        <MoviesCard isSaved={isSaved} />
        <MoviesCard isSaved={isSaved} />
        <MoviesCard isSaved={isSaved} />
        <MoviesCard isSaved={isSaved} />
        <MoviesCard isSaved={isSaved} />
        <MoviesCard isSaved={isSaved} />
        <MoviesCard isSaved={isSaved} />
        <MoviesCard isSaved={isSaved} />
        <MoviesCard isSaved={isSaved} />
      </ul>
    </section>
  );
};
