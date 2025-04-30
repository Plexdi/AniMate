export async function fetchAnimeGenres() {
    const res = await fetch('https://api.jikan.moe/v4/genres/anime');
    const json = await res.json();
    return json.data;
  }