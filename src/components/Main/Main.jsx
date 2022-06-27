import { AboutMe } from "../AboutMe/AboutMe";
import { AboutProject } from "../AboutProject/AboutProject";
import { Footer } from "../Footer/Footer";
import { Portfolio } from "../Portfolio/Portfolio";
import { Promo } from "../Promo/Promo";
import { Techs } from "../Techs/Techs";

export const Main = () => {
  return (
    <>
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
      <Footer />
    </>
  );
};
