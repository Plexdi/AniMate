export async function fetchRecentlyAired() {
    const response = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          query {
            Page(perPage: 10) {
              media(sort: UPDATED_AT_DESC, type: ANIME) {
                id
                title {
                  romaji
                }
                nextAiringEpisode {
                  airingAt
                  episode
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
  