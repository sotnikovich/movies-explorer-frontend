import "./AboutMe.css";
export const AboutMe = () => {
  return (
    <section className="about" id="about">
      <h3 className="about__title">Студент</h3>
      <div className="about__content">
        <div>
          <h4 className="about__content_name">Максим</h4>
          <p className="about__content_profession">
            Фронтенд-разработчик, 30 лет
          </p>
          <p className="about__content_description">
            Я родился в Саранске, сейчас живу в Москве. Закончил факультет
            экономики в МГУ имени Огарева. У меня есть любимая жена. Я люблю
            слушать музыку, а ещё увлекаюсь футболом. Недавно начал кодить. С
            2016 года работаю в компании «МВМ». В ближайщее время планирую
            перейти во фронтенд разработку.
          </p>
          <div className="about__content_links">
            <a
              className="about__content_link"
              href="https://vk.com/msotn91"
              target="_blank"
              rel="noreferrer"
            >
              VK
            </a>
            <a
              className="about__content_link"
              href="https://github.com/sotnikovich"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
          </div>
        </div>
        <div className="about__content_photo"></div>
      </div>
    </section>
  );
};
