const API_BASE = '/data';

async function fetchJson(path) {
  const response = await fetch(`${API_BASE}/${path}`);
  if (!response.ok) {
    throw new Error(`Failed to load ${path}: ${response.status}`);
  }
  return response.json();
}

export const Api = {
  getEvents() {
    return fetchJson('events.json');
  },

  getOrganizers() {
    return fetchJson('organizers.json');
  },

  getResponsible() {
    return fetchJson('responsible.json');
  },

  getStories() {
    return fetchJson('stories.json');
  },
};
