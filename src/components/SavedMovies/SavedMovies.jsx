import React from "react";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { MovieCardList } from "../MovieCardList/MovieCardList";
import { SearchForm } from "../SearchForm/SearchForm";
import "./SavedMovies.css";
export const SavedMovies = ({
  isLogged,
  setFilter,
  isFilterMovies,
  moviesCollection,
  searchMovies,
  searchSavedMovies,
  isLoadingMovies,
  savedMovies,
  movieDeleteFromSavedMovies,
  movieSaveInStore,
  serverError,
  clearAllErrors,
}) => {
  React.useEffect(() => {
    clearAllErrors();
  }, []);
  function changeFilter() {
    setFilter();
  }

  return (
    <section className="saved-movies">
      <Header
        isLogged={isLogged}
        isMain={false}
        isProfile={false}
        isMovies={false}
        isSavedMovies={true}
      />
      <SearchForm
        isSaved={true}
        searchMovies={searchMovies}
        searchSavedMovies={searchSavedMovies}
        isFilterMovies={isFilterMovies}
        changeFilter={changeFilter}
      />
      <MovieCardList
        moviesCollection={moviesCollection}
        isSaved={true}
        isLoadingMovies={isLoadingMovies}
        savedMovies={savedMovies}
        movieDeleteFromSavedMovies={movieDeleteFromSavedMovies}
        movieSaveInStore={movieSaveInStore}
        foundError={false}
        serverError={serverError}
      />
      <Footer />
    </section>
  );
};
