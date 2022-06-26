import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="header">
      <Link className="header__logo" to="/"></Link>
    </header>
  );
};
