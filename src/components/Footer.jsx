import { Link } from "react-router-dom";
import "../styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <Link to="/">
          <img className="footer-logo" src="logo.svg" />
        </Link>
        <div className="footer-info">
          <p>
            <a href="https://itmo.ru/" target="_blank">
              Университет ИТМО
              <br />© 1993-{new Date().getFullYear()}
            </a>
          </p>
          <p>
            г. Санкт-Петербург
            <br />
            ул. Ломоносова, д.9
          </p>
        </div>
        <div className="footer-policy">
          <a href="https://www.youtube.com/watch?v=0H_69KHDcP0" target="_blank">
            Политика конфиденциальности
          </a>
        </div>
      </div>
    </footer>
  );
}
