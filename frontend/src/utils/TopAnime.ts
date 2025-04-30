export async function fetchTopAnime(){
    const res = await fetch('https://api.jikan.moe/v4/top/anime');
    const json = await res.json();
    return json.data;
}