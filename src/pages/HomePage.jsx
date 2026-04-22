import EventList from "../components/EventList";
import heroVideo from "/hero-video.mp4";
import heroImg from "/megabattle.svg";
import aboutImg from "/images/about-image.png";
import '../styles/page-home.css';

export default function HomePage() {
  return (
    <>
      <div className="hero" id="home">
        <div className="video-background">
          <video autoPlay muted loop playsInline>
            <source src={heroVideo} type="video/mp4" />
          </video>
        </div>
        <div className="hero-content">
          <img className="hero-title" src={heroImg} alt="ITMO.MEGABATTLE" />
          <p className="hero-slogan">Не для всех, а для каждого</p>
        </div>
      </div>
      <main>
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

        <section id="contacts" className="contacts">
          <h1>КОНТАКТЫ</h1>
          <div className="contacts-container">
            <iframe
              className="yandex-map"
              title="Карта ИТМО"
              src="https://yandex.ru/map-widget/v1/org/itmo_university/1536000555/?ll=30.338712%2C59.926503&z=16"
            >
              Карта ИТМО
            </iframe>
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
    </>
  );
}
