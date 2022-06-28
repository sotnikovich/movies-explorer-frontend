import { Header } from "../Header/Header";
import { MovieCardList } from "../MovieCardList/MovieCardList";
import { SearchForm } from "../SearchForm/SearchForm";
import { Footer } from "../Footer/Footer";
import "./Movies.css";
export const Movies = () => {
  return (
    <section className="movies">
      <Header
        isLogged={true}
        isMain={false}
        isMovies={true}
        isSavedMovies={false}
        isProfile={false}
      />
      <SearchForm />
      <MovieCardList />
      <Footer />
    </section>
  );
};
