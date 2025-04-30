export async function fetchAnimeRecommendations() {
    const res = await fetch(`https://api.jikan.moe/v4/recommendations/anime`);
    const json = await res.json();
    return json.data;
  }
  