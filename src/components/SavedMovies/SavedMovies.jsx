import React from "react";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { MovieCardList } from "../MovieCardList/MovieCardList";
import { SearchForm } from "../SearchForm/SearchForm";
import "./SavedMovies.css";
export const SavedMovies = ({
  isLogged,
  moviesCollection,
  searchMovies,
  searchSavedMovies,
  isLoadingMovies,
  savedMovies,
  movieDeleteFromSavedMovies,
  movieSaveInStore,
  clearAllErrors,
  setSearchShortMovies,
  isFilterSavedMovies,
  changeFilter,
  foundError,
  serverError,
}) => {
  React.useEffect(() => {
    clearAllErrors();
  }, []);

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
        isFilterSavedMovies={isFilterSavedMovies}
        changeFilter={changeFilter}
        setSearchShortMovies={setSearchShortMovies}
      />
      <MovieCardList
        moviesCollection={moviesCollection}
        isSaved={true}
        isLoadingMovies={isLoadingMovies}
        savedMovies={savedMovies}
        movieDeleteFromSavedMovies={movieDeleteFromSavedMovies}
        movieSaveInStore={movieSaveInStore}
        foundError={foundError}
        serverError={serverError}
      />
      <Footer />
    </section>
  );
};
