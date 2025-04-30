export async function SeasonalAnime(){
    const res = await fetch('https://api.jikan.moe/v4/seasons/upcoming');
    const json = await res.json();
    return json.data;
}