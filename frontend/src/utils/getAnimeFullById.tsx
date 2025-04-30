export async function getAnimeFullById(id: string | number) {
    const res = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`);
    if (!res.ok) throw new Error('Failed to fetch anime');
    return await res.json();
  }
  