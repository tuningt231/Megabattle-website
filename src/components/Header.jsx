import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <nav>
        <ul className="nav-links">
          {/* <li>
            <Link to="/">Главная</Link>
          </li>
          <li>
            <Link to="/">О проекте</Link>
          </li>
          <li>
            <Link to="/">События</Link>
          </li>
          <li>
            <Link to="/people">Команда</Link>
          </li>
          <li>
            <Link to="/people">Организаторы</Link>
          </li>
          <li>
            <Link to="/people">Ответственные</Link>
          </li>
          <li>
            <Link to="/people">Участники</Link>
          </li>
          <li>
            <Link to="/">Контакты</Link>
          </li> */}
          <li>
            <Link to="/">Главная</Link>
          </li>
          <li>
            <Link to="/people">Люди</Link>
          </li>
        </ul>
      </nav>
      <div className="outer-corner" data-tag="1"></div>
      <div className="outer-corner" data-tag="2"></div>
    </header>
  );
}
