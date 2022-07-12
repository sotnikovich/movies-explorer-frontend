import React from "react";
import { Main } from "../Main/Main";
import {
  Route,
  useLocation,
  useHistory,
  Switch,
  Redirect,
} from "react-router-dom";
import { Movies } from "../Movies/Movies";
import { SavedMovies } from "../SavedMovies/SavedMovies";
import { Profile } from "../Profile/Profile";
import { Register } from "../Register/Register";
import { Login } from "../Login/Login";
import { NotFound } from "../NotFound/NotFound";
import * as MoviesApi from "../../utils/MoviesApi";
import * as MainApi from "../../utils/MainApi";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
  const [isLogged, setIsLogged] = React.useState(false);
  const [isFilterMovies, setIsFilterMovies] = React.useState(false);
  const [isFilterSavedMovies, setIsFilterSavedMovies] = React.useState(false);
  const [moviesCollection, setMoviesCollection] = React.useState([]);
  const [savedMoviesCollection, setSavedMoviesCollection] = React.useState([]);
  const [foundMoviesList, setFoundMoviesList] = React.useState([]);
  const [filterSavedMoviesCollection, setFilterSavedMoviesCollection] =
    React.useState([]);
  const [filterTimeMoviesCollection, setFilterTimeMoviesCollection] =
    React.useState([]);
  const [filterTimeSavedMoviesCollection, setFilterTimeSavedMoviesCollection] =
    React.useState([]);
  const [loginError, setLoginError] = React.useState("");
  const [registerError, setRegisterError] = React.useState("");
  const [foundError, setFoundError] = React.useState(false);
  const [serverError, setServerError] = React.useState(false);
  const [profileError, setProfileError] = React.useState("");
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoadingMovies, setIsLoadingMovies] = React.useState(false);
  const [token, setToken] = React.useState("");
  const SHORT_DURATION = 40;

  const history = useHistory();
  const pathname = useLocation();
  const isLocationMovies = pathname.pathname === "/movies";
  const isLocationSavedMovies = pathname.pathname === "/saved-movies";

  function changeFilter() {
    isLocationMovies
      ? setIsFilterMovies(!isFilterMovies)
      : setIsFilterSavedMovies(!isFilterSavedMovies);
  }

  function tokenCheck() {
    const jwt = localStorage.getItem("jwt");
    const movies = localStorage.getItem("movies");
    const savedMovies = localStorage.getItem("savedMovies");
    if (jwt) {
      setToken(jwt);
      if (movies) {
        const result = JSON.parse(movies);
        setMoviesCollection(result);
      }
      if (savedMovies) {
        const resultSave = JSON.parse(savedMovies);
        setSavedMoviesCollection(resultSave);
        setFilterSavedMoviesCollection(resultSave);
      }
      MainApi.getContent(jwt)
        .then((user) => {
          setCurrentUser(user);
          setIsLogged(true);
          history.push(pathname.pathname);
        })
        .catch((err) => {
          setServerError(true);
        });
    }
  }

  React.useEffect(() => {
    const searchResult = localStorage.getItem("searchResult");
    if (searchResult) {
      setFoundMoviesList(JSON.parse(searchResult));
    }
    const isChecked = localStorage.getItem("isChecked");
    if (isChecked) {
      setIsFilterMovies(JSON.parse(isChecked));
    }
    const shortResult = localStorage.getItem("shortResult");
    if (shortResult) {
      setFilterTimeMoviesCollection(JSON.parse(shortResult));
    }
    const isCheckedSaved = localStorage.getItem("isCheckedSaved");
    if (isCheckedSaved) {
      setIsFilterSavedMovies(JSON.parse(isCheckedSaved));
    }
    const shortResultSaved = localStorage.getItem("shortResultSaved");
    if (shortResultSaved) {
      setFilterTimeSavedMoviesCollection(JSON.parse(shortResultSaved));
    }
  }, [isLogged]);

  React.useEffect(() => {
    tokenCheck();
  }, []);

  function onRegister({ email, password, name }) {
    MainApi.register({ email, password, name })
      .then((data) => {
        if (data._id) {
          onLogin({ email, password });
        }
      })
      .catch((err) => {
        setRegisterError("Что-то пошло не так! Попробуйте ещё раз.");
        if (err === 400)
          return setRegisterError("Некорректно заполнено одно из полей ");
      });
  }

  function onLogin({ email, password }) {
    MainApi.authorize({ email, password })
      .then((data) => {
        if (data.token) {
          setToken(data.token);
          localStorage.setItem("jwt", data.token);
          setIsLogged(true);
          history.push("/movies");
          MainApi.getSavedMovies(data.token)
            .then((movies) => {
              setSavedMoviesCollection(movies);
              setFilterSavedMoviesCollection(movies);
              localStorage.setItem("savedMovies", JSON.stringify(movies));
            })
            .catch((err) => console.log(err));
          MainApi.getContent(data.token)
            .then((user) => {
              setCurrentUser(user);
            })
            .catch((err) => {
              setServerError(true);
            });
        }
      })
      .catch((err) => {
        if (err === 400) return setLoginError("Не передано одно из полей");
        if (err === 401) return setLoginError("Пользователь с email не найден");
        setLoginError("Попробуйте еще раз!");
        console.log(err);
      });
    if (isLogged) {
      MainApi.getContent()
        .then((user) => {
          setCurrentUser(user);
        })
        .catch((err) => setProfileError("Не удалось загрузить данные"));
    }
  }

  function onSignOut() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("movies");
    localStorage.removeItem("savedMovies");
    localStorage.removeItem("searchResult");
    localStorage.removeItem("isChecked");
    localStorage.removeItem("isCheckedSaved");
    localStorage.removeItem("shortResult");
    localStorage.removeItem("shortResultSaved");
    setIsLogged(false);
    setMoviesCollection([]);
    setSavedMoviesCollection([]);
    setFilterTimeSavedMoviesCollection([]);
    setFilterSavedMoviesCollection([]);
    setFilterTimeMoviesCollection([]);
    setFoundMoviesList([]);
    clearAllErrors();
    history.push("/");
  }

  function clearAllErrors() {
    setLoginError("");
    setRegisterError("");
    setFoundError(false);
    setServerError(false);
    setProfileError("");
  }

  function searchMovies(searchText) {
    setServerError(false);
    setIsLoadingMovies(true);
    if (moviesCollection.length > 0) {
      const result = search(moviesCollection, searchText);
      if (result.length > 0) {
        setFoundError(false);
      } else {
        setFoundError(true);
      }
      setFoundMoviesList(result);
      localStorage.setItem("searchResult", JSON.stringify(result));
    } else {
      MoviesApi.getInitialMovies()
        .then((res) => {
          setMoviesCollection(res);
          localStorage.setItem("movies", JSON.stringify(res));
          const result = search(res, searchText);
          if (result.length > 0) {
            setFoundError(false);
          } else {
            setFoundError(true);
          }
          setFoundMoviesList(result);
          if (isFilterMovies) {
            const resultTimeFilter = searchFilterTime(result);
            if (resultTimeFilter.length > 0) {
              setFoundError(false);
            } else {
              setFoundError(true);
            }
            setFilterTimeMoviesCollection(resultTimeFilter);
          }
        })
        .catch((err) => setServerError(true));
    }
    setTimeout(() => {
      setIsLoadingMovies(false);
    }, 1000);
  }

  function searchSavedMovies(searchText) {
    setServerError(false);
    setIsLoadingMovies(true);
    if (savedMoviesCollection.length > 0) {
      const result = search(savedMoviesCollection, searchText);
      if (result.length > 0) {
        setFoundError(false);
      } else {
        setFoundError(true);
      }
      setFilterSavedMoviesCollection(result);
      setTimeout(() => {
        setIsLoadingMovies(false);
      }, 1000);
    }
  }

  function search(collection, searchText) {
    let result = [];
    collection.forEach((movie) => {
      if (movie.nameRU.toLowerCase().indexOf(searchText.toLowerCase()) > -1) {
        result.push(movie);
      }
    });
    return result;
  }

  function searchFilterTime(collection) {
    let result = [];
    collection.forEach((movie) => {
      if (movie.duration <= SHORT_DURATION) {
        result.push(movie);
      }
    });
    return result;
  }

  React.useEffect(
    () => {
      setFoundError(false);
      localStorage.setItem("isChecked", isFilterMovies);
      if (isLocationMovies) {
        if (isFilterMovies) {
          if (moviesCollection.length > 0) {
            const result = searchFilterTime(foundMoviesList);
            if (result.length > 0) {
              setFoundError(false);
            } else {
              setFoundError(true);
            }
            setFilterTimeMoviesCollection(result);
            localStorage.setItem("shortResult", JSON.stringify(result));
          }
        }
      } else {
        localStorage.setItem("isCheckedSaved", isFilterSavedMovies);
        if (isLocationSavedMovies) {
          if (isFilterSavedMovies) {
            if (moviesCollection.length > 0) {
              const result = searchFilterTime(filterSavedMoviesCollection);
              if (result.length > 0) {
                setFoundError(false);
              } else {
                setFoundError(true);
              }
              setFilterTimeSavedMoviesCollection(result);
              localStorage.setItem("shortResultSaved", JSON.stringify(result));
            }
          }
        }
      }
    }, // eslint-disable-next-line
    [isFilterMovies, isFilterSavedMovies]
  );

  function movieSaveInStore(movie) {
    MainApi.saveMovie({ token, movie })
      .then((res) => {
        const movies = [...savedMoviesCollection, res];
        localStorage.setItem("savedMovies", JSON.stringify(movies));
        setSavedMoviesCollection((prev) => [...prev, res]);
        if (isFilterSavedMovies) {
          setFilterTimeSavedMoviesCollection((prev) => [...prev, res]);
          setFilterSavedMoviesCollection((prev) => [...prev, res]);
        } else {
          setFilterSavedMoviesCollection((prev) => [...prev, res]);
        }
      })
      .catch((err) => setServerError(true));
  }

  function movieDeleteFromSavedMovies(id) {
    MainApi.deleteSavedMovie({ token, id })
      .then(() => {
        const result = filterMoviesById(savedMoviesCollection, id);
        setSavedMoviesCollection(result);
        localStorage.setItem("savedMovies", JSON.stringify(result));
        setFilterSavedMoviesCollection(
          filterMoviesById(filterSavedMoviesCollection, id)
        );
        setFilterTimeSavedMoviesCollection(
          filterMoviesById(filterTimeMoviesCollection, id)
        );
      })
      .catch((err) => setServerError(true));
  }

  function filterMoviesById(collection, id) {
    return collection.filter((item) => {
      return item._id !== id;
    });
  }

  function changeProfile({ name, email }) {
    MainApi.editUserProfile({ token, name, email })
      .then((newUser) => {
        if (newUser._id) {
          setCurrentUser(newUser);
          setProfileError("Данные профиля успешно изменены");
        } else if (newUser.message) {
          setProfileError(newUser.message);
        }
      })
      .catch((err) =>
        setProfileError("Произошла ошибка при обновлении профиля")
      );
  }

  React.useEffect(() => {
    clearAllErrors();
    if (pathname === "/saved-movies") {
      setFilterSavedMoviesCollection(savedMoviesCollection);
    }
  }, [pathname]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Switch>
        <Route exact path="/" isLogged={isLogged}>
          <Main isLogged={isLogged} />
        </Route>
        <ProtectedRoute exact path="/movies" isLogged={isLogged}>
          <Movies
            isLogged={isLogged}
            isFilterMovies={isFilterMovies}
            changeFilter={changeFilter}
            moviesCollection={
              isFilterMovies ? filterTimeMoviesCollection : foundMoviesList
            }
            searchMovies={searchMovies}
            searchSavedMovies={searchSavedMovies}
            isLoadingMovies={isLoadingMovies}
            savedMovies={savedMoviesCollection}
            movieDeleteFromSavedMovies={movieDeleteFromSavedMovies}
            movieSaveInStore={movieSaveInStore}
            foundError={foundError}
            serverError={serverError}
            clearAllErrors={clearAllErrors}
          />
        </ProtectedRoute>
        <ProtectedRoute exact path="/saved-movies" isLogged={isLogged}>
          <SavedMovies
            isLogged={isLogged}
            isFilterSavedMovies={isFilterSavedMovies}
            changeFilter={changeFilter}
            moviesCollection={
              isFilterSavedMovies
                ? filterTimeSavedMoviesCollection
                : filterSavedMoviesCollection
            }
            searchMovies={searchMovies}
            searchSavedMovies={searchSavedMovies}
            isLoadingMovies={isLoadingMovies}
            savedMovies={savedMoviesCollection}
            movieDeleteFromSavedMovies={movieDeleteFromSavedMovies}
            movieSaveInStore={movieSaveInStore}
            foundError={foundError}
            serverError={serverError}
            clearAllErrors={clearAllErrors}
          />
        </ProtectedRoute>
        <ProtectedRoute exact path="/profile" isLogged={isLogged}>
          <Profile
            isLogged={isLogged}
            onSignOut={onSignOut}
            changeProfile={changeProfile}
            profileError={profileError}
            setProfileError={setProfileError}
          />
        </ProtectedRoute>
        <Route exact path="/signin">
          {isLogged ? (
            <Redirect to="/" />
          ) : (
            <Login
              onLogin={onLogin}
              clearErrors={clearAllErrors}
              loginError={loginError}
              setLoginError={setLoginError}
            />
          )}
        </Route>
        <Route exact path="/signup">
          {isLogged ? (
            <Redirect to="/" />
          ) : (
            <Register
              onRegister={onRegister}
              clearErrors={clearAllErrors}
              registerError={registerError}
              setRegisterError={setRegisterError}
            />
          )}
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </CurrentUserContext.Provider>
  );
}

export default App;
