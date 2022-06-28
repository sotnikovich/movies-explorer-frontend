import { Link } from "react-router-dom";
import { Navigation } from "../Navigation/Navigation";
import "./Header.css";

export const Header = ({
  isLogged,
  isMain,
  isProfile,
  isMovies,
  isSavedMovies,
  onClick,
}) => {
  return (
    <header className="header">
      <Link className="header__logo" to="/"></Link>
      <Navigation
        isLogged={isLogged}
        isMain={isMain}
        isProfile={isProfile}
        isMovies={isMovies}
        isSavedMovies={isSavedMovies}
        onClick={onClick}
      />
    </header>
  );
};
