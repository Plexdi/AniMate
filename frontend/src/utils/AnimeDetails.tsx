export async function fetchAnimeDetails(id: number) {
    const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
    const json = await res.json();
    return json.data;
  }
  