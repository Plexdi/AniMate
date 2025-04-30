// utils/RecentEpisodes.ts
export async function fetchRecentEpisodes() {
    const res = await fetch('https://api.jikan.moe/v4/watch/episodes');
    const json = await res.json();
    return json.data;
  }
  