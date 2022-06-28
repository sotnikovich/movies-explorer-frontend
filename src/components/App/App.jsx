import { Main } from "../Main/Main";
import { Routes, Route } from "react-router-dom";
import { Movies } from "../Movies/Movies";
import { useState } from "react";
import { SavedMovies } from "../SavedMovies/SavedMovies";
import { Profile } from "../Profile/Profile";
import { Register } from "../Register/Register";
import { Login } from "../Login/Login";
import { NotFound } from "../../NotFound/NotFound";

function App() {
  const [isLogged] = useState(false);

  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/movies" element={<Movies isLogged={isLogged} />} />
        <Route
          path="/saved-movies"
          element={<SavedMovies isLogged={isLogged} />}
        />
        <Route path="/profile" element={<Profile isLogged={true} />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
