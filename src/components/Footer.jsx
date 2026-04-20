export default function Footer() {
  return (
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
  );
}
