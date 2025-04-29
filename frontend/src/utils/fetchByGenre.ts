export async function fetchAnimeByGenre(genre = "Action") {
    const response = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          query ($genre: String) {
            Page(perPage: 10) {
              media(genre_in: [$genre], type: ANIME, sort: POPULARITY_DESC) {
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
        `,
        variables: { genre }
      })
    });
  
    const json = await response.json();
    return json.data.Page.media;
  }
  