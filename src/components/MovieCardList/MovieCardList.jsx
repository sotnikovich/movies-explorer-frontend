import { MoviesCard } from "../MoviesCard/MoviesCard";
import { Preloader } from "../Preloader/Preloader";
import "./MovieCardList.css";
export const MovieCardList = ({ isLoadingMovies }) => {
  return (
    <section className="movie-card-list">
      <Preloader isLoadingMovies={isLoadingMovies} />
      <ul className="movies__gallery">
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
      </ul>
      <button className="movies__more">Еще</button>
    </section>
  );
};
