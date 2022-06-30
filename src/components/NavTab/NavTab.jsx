import { HashLink } from "react-router-hash-link";
import "./NavTab.css";

export const NavTab = () => {
  return (
    <nav className="nav-tab">
      <div className="nav-tab__wrapper">
        <HashLink to="/#project" className="nav-tab__link">
          О проекте
        </HashLink>
      </div>
      <div className="nav-tab__wrapper">
        <HashLink to="/#techs" className="nav-tab__link">
          Технологии
        </HashLink>
      </div>
      <div className="nav-tab__wrapper">
        <HashLink to="/#about" className="nav-tab__link">
          Студент
        </HashLink>
      </div>
    </nav>
  );
};
