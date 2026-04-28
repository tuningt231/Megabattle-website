import React, { useEffect, useState } from "react";
import { Api } from "../api";
import "../styles/stories-list.css";
import { useQuery } from "@tanstack/react-query";

export default function StoriesList() {

  // получить данные с API (или из кэша)
  const stories = useQuery({
    queryKey: ["stories"],
    queryFn: Api.getStories,
    initialData: [],
  }).data;

  return (
    <div className="stories-container">
      <div className="stories-scroll">
        {stories.map((story, idx) => (
          <div className="story-card" key={story.key ?? `${story.name}-${idx}`}>
            <div className="story-image-container">
              <img
                src={Api.normalizeURL(story.image)}
                alt={story.name}
                className="story-image"
              />
            </div>
            <h3 className="story-name">{story.name}</h3>
            <p className="story-faculty">{story.faculty}</p>
            <p className="story-description">{story.description}</p>
            <p className="story-date">{story.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
