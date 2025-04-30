export async function fetchRecentlyAired() {
    const response = await fetch('https://api.jikan.moe/v4/watch/episodes');
    const json = await response.json();
    return json.data; // contains array of anime with latest episodes
  }
  