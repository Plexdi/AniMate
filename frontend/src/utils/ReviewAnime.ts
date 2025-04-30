type AnimeIdProps = {
    id: number; // or string, depending on your usage
  };
  

  export async function ReviewAnime({ id }: AnimeIdProps) {
    const res = await fetch(`https://api.jikan.moe/v4/anime/${id}/reviews`);
    const json = await res.json();
    return json.data; // returns reviews
  }
  