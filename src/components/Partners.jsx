import { Api } from "../api";
import "../styles/partners.css";
import { useQuery } from "@tanstack/react-query";

export default function Partners() {
  // получить данные с API (или из кэша)
  const partners = useQuery({
    queryKey: ["partners"],
    queryFn: Api.getPartners,
    initialData: [],
  }).data;

  const row1 = partners.filter((_, i) => i % 2 === 0);
  const row2 = partners.filter((_, i) => i % 2 !== 0);

  const renderCard = (p, uniqueKey) => {
    return (
      <a
        key={uniqueKey}
        className="partner-card"
        href={p.link}
        target="_blank"
        rel="noreferrer"
        aria-label={p.name}
      >
        <div className="avatar">
          <img src={Api.normalizeURL(p.logo)} alt={p.name} />
        </div>
      </a>
    );
  };

  return (
    <div className="partners-section">
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
