import React from "react";
import EventList from "./components/EventList";
import MemberList from "./components/MemberList";
import StoriesList from "./components/StoriesList";
import heroVideo from "/hero-video.mp4";
import heroImg from "/megabattle.svg";
import aboutImg from "/images/about-image.png";

export default function App() {
  return (
    <>
      <header className="header">
        <nav>
          <ul className="nav-links">
            <li>
              <a href="#home">Главная</a>
            </li>
            <li>
              <a href="#about">О проекте</a>
            </li>
            <li>
              <a href="#events">События</a>
            </li>
            <li>
              <a href="#team">Команда</a>
            </li>
            <li>
              <a href="#organizers">Организаторы</a>
            </li>
            <li>
              <a href="#responsible">Ответственные</a>
            </li>
            <li>
              <a href="#stories">Участники</a>
            </li>
            <li>
              <a href="#contacts">Контакты</a>
            </li>
          </ul>
        </nav>
        <div className="outer-corner" data-tag="1"></div>
        <div className="outer-corner" data-tag="2"></div>
      </header>

      <main>
        <div className="hero" id="home">
          <div className="video-background">
            <video autoPlay muted loop playsInline>
              <source src={heroVideo} type="video/mp4" />
            </video>
          </div>
          <div className="hero-content">
            <img
              className="hero-title"
              src={heroImg}
              alt="ITMO.MEGABATTLE"
            />
            <p className="hero-slogan">Не для всех, а для каждого</p>
          </div>
        </div>

        <section id="about" className="about">
          <h1>О ПРОЕКТЕ</h1>
          <div className="about-content">
            <img
              src={aboutImg}
              width="670"
              height="777"
              alt="О проекте"
              className="about-image"
            />
            <div className="about-text">
              <p>
                ITMO.Megabattle — проект, представляющий собой масштабную
                студенческую инициативу, нацеленную на создание открытой,
                многоуровневой площадки для культурно-творческого,
                организаторского и личностного роста студентов Университета
                ИТМО. Проект соединил в себе традиции двух ранее существовавших
                мероприятий — «Весна в ИТМО» и «Я первокурсник», образовав
                целостную экосистему, где каждый студент может найти себе
                подходящую роль.
              </p>
              <p>
                Уникальность проекта заключается в полном цикле организации и
                реализации силами студенческого актива без привлечения внешних
                специалистов.
              </p>
              <p>
                ITMO.Megabattle — это не просто серия мероприятий, а полноценная
                экосистема, стимулирующая развитие творческого, организаторского
                и профессионального потенциала студентов. Проект формирует
                сильное студенческое сообщество, создает условия для реализации
                самых разнообразных идей и проектов, укрепляет бренд
                Университета ИТМО как места, где каждый может раскрыть себя и
                получить бесценный опыт.
              </p>
            </div>
          </div>
        </section>

        <section id="events" className="events">
          <EventList startDate="november 2025" />
        </section>

        <span id="organizers"></span>
        <span id="responsible"></span>

        <section className="team" id="team">
          <h1 className="team-title">КОМАНДА</h1>
          <MemberList />
        </section>

        <section id="stories" className="stories">
          <h1>ИСТОРИИ УЧАСТНИКОВ</h1>
          <StoriesList />
        </section>

        <section id="contacts" className="contacts">
          <h1>КОНТАКТЫ</h1>
          <div className="contacts-container">
            <iframe
              className="map"
              title="Карта ИТМО"
              src="https://yandex.ru/map-widget/v1/?ll=30.338712%2C59.926503&z=16&pt=30.338712,59.926503,pm2blm"
            ></iframe>
            <div className="contact-info">
              <p>ул. Ломоносова, д.9</p>
              <p>+7 (999) 999-99-99</p>
              <p>artem.b@itmo.ru</p>
              <button
                className="button"
                type="button"
                onClick={() =>
                  window.open(
                    "https://yandex.ru/maps/?rtext=~59.926503,30.338712&rtt=auto",
                    "_blank",
                  )
                }
              >
                Построить маршрут
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">ITMO.MEGABATTLE</div>
          <div className="footer-info">
            <p>© 1993-2024</p>
            <p>г. Санкт-Петербург</p>
            <p>ул. Ломоносова, д.9</p>
          </div>
          <div className="footer-links">
            <h3>Главная</h3>
            <ul>
              <li>
                <a href="#about">Мероприятия</a>
              </li>
              <li>
                <a href="#team">Команда</a>
              </li>
              <li>
                <a href="#contacts">Контакты</a>
              </li>
            </ul>
          </div>
          <div className="footer-policy">
            <h3>Политика конфиденциальности</h3>
          </div>
        </div>
      </footer>
    </>
  );
}
