import { useState, useEffect } from "react";
import { Api } from "../api";
import "../styles/partners.css";

export default function Partners() {
  const [partners, setPartners] = useState([]);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    Api.getPartners()
      .then(setPartners)
      .catch(console.error);
  }, []);

  const row1 = partners.filter((_, i) => i % 2 === 0);
  const row2 = partners.filter((_, i) => i % 2 !== 0);

  const renderCard = (p, uniqueKey) => {
    const active = p.id === activeId;
    return (
      <div
        key={uniqueKey}
        className={`partner-card ${active ? "active" : ""}`}
        onClick={() => setActiveId(active ? null : p.id)}
      >
        <div className="avatar">
          <img src={Api.normalizeURL(p.logo)} alt="" />
        </div>
        <div className="content">
          <h3>{p.name}</h3>
          <p>{p.description}</p>
        </div>
      </div>
    );
  };

  return (
    <div className={`partners-section ${activeId ? "has-active" : ""}`}>
      <div className="partners-wrap">
        {/* Верхняя строка — открывается вверх */}
        <div className="carousel-row row-up">
          <div className="track">
            {row1.map((p, i) => renderCard(p, `r1-${i}`))}
            {row1.map((p, i) => renderCard(p, `r1-dup-${i}`))}
          </div>
        </div>

        {/* Нижняя строка — открывается вниз */}
        <div className="carousel-row row-down reverse">
          <div className="track">
            {row2.map((p, i) => renderCard(p, `r2-${i}`))}
            {row2.map((p, i) => renderCard(p, `r2-dup-${i}`))}
          </div>
        </div>
      </div>
    </div>
  );
}
