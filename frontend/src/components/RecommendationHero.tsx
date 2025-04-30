'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RecommendationHero() {
  const [anime, setAnime] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchDemonSlayer() {
      const res = await fetch('https://api.jikan.moe/v4/anime?q=kimetsu%20no%20yaiba&limit=1');
      const json = await res.json();
      setAnime(json.data[0]);
    }

    fetchDemonSlayer();
  }, []);

  if (!anime) return null;

  return (
    <div
      className="relative w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden mb-10"
      style={{
        backgroundImage: `url(${anime.images.jpg.large_image_url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center justify-end pr-10">
        <div className="text-right text-white">
          <h2 className="text-3xl font-bold mb-4">{anime.title}</h2>
          <button
            onClick={() => router.push(`/anime/${anime.mal_id}`)}
            className="bg-white text-red-500 font-semibold px-6 py-2 rounded hover:bg-gray-100 transition"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
