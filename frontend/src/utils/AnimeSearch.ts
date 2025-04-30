export async function SearchAnime(){
    const res = await fetch('https://api.jikan.moe/v4/anime')
    const json = await res.json();
    return json.data;

}