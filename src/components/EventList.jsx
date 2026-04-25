import React, { useEffect, useMemo, useState } from "react";
import { Api } from "../api";
import "../styles/event-list.css";
import { useQuery } from "@tanstack/react-query";

const monthNamesForm2 = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

export default function EventList() {
  // const [events, setEvents] = useState([]);

  // получить данные с API
  // useEffect(() => {
  //   Api.getEvents().then(setEvents).catch(console.error);
  // }, []);
  // получить данные с API (или из кэша)
  const events = useQuery({
    queryKey: ["events"],
    queryFn: Api.getEvents,
    initialData: [],
  }).data;

  // показываем только события сегодня и в будущем
  const visibleEvents = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return events
      .filter((event) => {
        const eventDate = new Date(event.date);
        eventDate.setHours(0, 0, 0, 0);
        return eventDate >= today;
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [events]);

  return (
    <div className="event-cards">
      {visibleEvents.map((event) => {
        const dateObj = new Date(event.date);
        const dateDay = dateObj.getDate().toString();
        const dateMonth = monthNamesForm2[dateObj.getMonth()];
        const hours = dateObj.getHours();
        const minutes = dateObj.getMinutes();
        const hasEventTime = hours !== 0 || minutes !== 0;
        const eventTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;

        return (
          <div
            className="event-card"
            key={event.key ?? `${event.name}-${event.date}`}
          >
            <div className="event-image">
              <img src={Api.normalizeURL(event.image)} alt={event.name} />
            </div>
            <div className="event-info">
              <h3>{event.name}</h3>
              <div className="event-date">
                <i className="fa-regular fa-calendar" aria-hidden="true"></i>
                <span>
                  {dateDay} {dateMonth}
                  {hasEventTime ? `, ${eventTime}` : ""}
                </span>
              </div>
              <div className="event-location">
                <i className="fa-solid fa-location-dot" aria-hidden="true"></i>
                <span>{event.address}</span>
              </div>
              <div className="event-description">{event.description}</div>
            </div>
          </div>
        );
      })}

      {visibleEvents.length === 0 && (
        <div className="null-event">Пока нет ближайших событий :(</div>
      )}
    </div>
  );
}
