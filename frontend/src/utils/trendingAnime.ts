// utils/fetchTrendingAnime.ts
export async function fetchTrendingAnime() {
    const response = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        query: `
          query {
            Page(perPage: 10) {
              media(type: ANIME, sort: TRENDING_DESC) {
                id
                title {
                  romaji
                  english
                }
                coverImage {
                  large
                }
                bannerImage
                description
                genres
                averageScore
              }
            }
          }
        `
      })
    });
  
    const json = await response.json();
    return json.data.Page.media;
  }
  