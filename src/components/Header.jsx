export default function Header() {
  return (
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
  );
}
