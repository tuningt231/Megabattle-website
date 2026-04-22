import React, { useEffect, useMemo, useState } from 'react';
import { Api } from '../api';
import '../styles/event-list.css';

const monthNames = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

const monthNamesForm2 = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
];

export default function EventList({ startDate = 'november 2025' }) {
  const [events, setEvents] = useState([]);
  const [selected, setSelected] = useState(null);

  // показать 12 месяцев со стартовой даты
  const allDates = useMemo(() => {
    const start = new Date(startDate);
    return Array.from({ length: 12 }, (_, i) => {
      const d = new Date(start);
      d.setMonth(start.getMonth() + i);
      return d;
    });
  }, [startDate]);

  // заголовок: "События 2025" или "События 2025 - 2026"
  const title = useMemo(() => {
    const firstYear = allDates[0]?.getFullYear();
    const lastYear = allDates[allDates.length - 1]?.getFullYear();
    if (!firstYear) return 'СОБЫТИЯ';
    return firstYear === lastYear ? `СОБЫТИЯ ${firstYear}` : `СОБЫТИЯ ${firstYear} - ${lastYear}`;
  }, [allDates]);

  // получить данные с API
  useEffect(() => {
    Api.getEvents()
      .then(setEvents)
      .catch(console.error);
  }, []);

  // установить выбранную по умолчанию дату на текущий месяц
  useEffect(() => {
    const now = new Date();
    const hasNowInRange = allDates.some(
      (d) => d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    );

    if (hasNowInRange) {
      setSelected({ month: now.getMonth(), year: now.getFullYear() });
    } else {
      setSelected({ month: allDates[0].getMonth(), year: allDates[0].getFullYear() });
    }

  }, [allDates]);

  // отфильтровать события по выбранному месяцу
  const visibleEvents = useMemo(() => {
    if (!selected) return [];
    return events.filter((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getMonth() === selected.month && eventDate.getFullYear() === selected.year
      );
    });
  }, [events, selected]);

  return (
    <>
      <h1>{title}</h1>

      <div className="months-container">
        <div className="months-scroll">
          {allDates.map((date) => {
            const isActive =
              selected &&
              selected.month === date.getMonth() &&
              selected.year === date.getFullYear();
            return (
              <button
                key={`${date.getMonth()}-${date.getFullYear()}`}
                className={`button month${isActive ? ' active' : ''}`}
                data-month={date.getMonth()}
                data-year={date.getFullYear()}
                onClick={() => setSelected({ month: date.getMonth(), year: date.getFullYear() })}
              >
                {monthNames[date.getMonth()]}
              </button>
            );
          })}
        </div>
      </div>

      <div className="event-cards">
        {visibleEvents.map((event) => {
          const dateObj = new Date(event.date);
          const dateDay = dateObj.getDate().toString();
          const dateMonth = monthNamesForm2[dateObj.getMonth()];

          return (
            <div className="event-card active" key={event.key ?? `${event.name}-${event.date}`}>
              <div className="event-image">
                <img src={Api.normalizeURL(event.image)} alt={event.name} />
              </div>
              <div className="event-info">
                <h3>{event.name}</h3>
                <div className="event-date">
                  {dateDay} {dateMonth}
                </div>
                <div className="event-location">{event.address}</div>
                <div className="event-description">{event.description}</div>
              </div>
            </div>
          );
        })}

        {visibleEvents.length === 0 && <div className="null-event">В этом месяце нет событий :(</div>}
      </div>
    </>
  );
}
