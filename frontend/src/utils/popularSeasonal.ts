export async function fetchPopularSeasonals() {
    const response = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          query {
            Page(perPage: 10) {
              media(type: ANIME, sort: POPULARITY_DESC, season: SPRING, seasonYear: 2025) {
                id
                title {
                  romaji
                }
                coverImage {
                  large
                }
              }
            }
          }
        `
      })
    });
  
    const json = await response.json();
    return json.data.Page.media;
  }
  