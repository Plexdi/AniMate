export async function fetchAnimeEpisodes(id: number) {
    const res = await fetch(`https://api.jikan.moe/v4/anime/${id}/episodes`);
    const json = await res.json();
    return json.data;
  }
  