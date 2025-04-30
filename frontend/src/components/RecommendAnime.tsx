'use client';
import { useEffect, useState } from 'react';
import { fetchAnimeRecommendations } from '@/utils/AnimeRecommendation';
import { useRouter } from 'next/navigation';

export default function GlobalRecommendations() {
  const [entries, setEntries] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function loadData() {
      const data = await fetchAnimeRecommendations();
      const flattened = data.flatMap((rec: any) => rec.entry);
      setEntries(flattened);
    }
    loadData();
  }, []);

  const handleClick = (id: number) => {
    router.push(`/anime/${id}`);
  };

  return (
    <section className="mt-12 px-6">
      <h2 className="text-2xl font-bold text-white">🎯 Anime You Might Like</h2>
      <p className="text-sm text-gray-400 mb-4">
        Based on what people commonly enjoy together.
      </p>

      <div className="flex gap-4 overflow-x-auto">
        {entries.map((anime: any) => {
          const img = anime?.images?.jpg?.image_url;

          return (
            <div
              key={anime.mal_id}
              onClick={() => handleClick(anime.mal_id)}
              className="min-w-[160px] cursor-pointer transition-transform hover:scale-105"
            >
              {img ? (
                <img src={img} alt={anime.title} className="w-full rounded-md" />
              ) : (
                <div className="w-full h-[230px] bg-gray-700 rounded flex items-center justify-center text-white text-sm">
                  No Image
                </div>
              )}
              <p className="text-sm mt-1 text-white">{anime.title}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
