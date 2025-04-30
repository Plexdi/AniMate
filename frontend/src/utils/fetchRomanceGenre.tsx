export async function fetchRomanceAnime(page: number = 1) {
    const res = await fetch(`https://api.jikan.moe/v4/anime?genres=22&page=${page}&limit=10`);
    const json = await res.json();
    return json.data;
  }
  