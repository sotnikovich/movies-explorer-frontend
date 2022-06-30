import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { MovieCardList } from "../MovieCardList/MovieCardList";
import { SearchForm } from "../SearchForm/SearchForm";
import "./SavedMovies.css";
export const SavedMovies = () => {
  return (
    <section className="saved-movies">
      <Header
        isLogged={true}
        isMain={false}
        isMovies={false}
        isSavedMovies={true}
        isProfile={false}
      />
      <SearchForm />
      <MovieCardList isSaved={true} />
      <Footer />
    </section>
  );
};
