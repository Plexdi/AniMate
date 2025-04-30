export async function fetchAnimeCharacters(id: number) {
    const res = await fetch(`https://api.jikan.moe/v4/anime/${id}/characters`);
    const json = await res.json();
    return json.data;
  }
  