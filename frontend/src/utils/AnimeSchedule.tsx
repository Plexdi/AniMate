export async function fetchAnimeSchedule() {
    const res = await fetch('https://api.jikan.moe/v4/schedules');
    const json = await res.json();
    return json.data;
  }