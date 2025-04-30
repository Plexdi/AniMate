'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchRecentlyAired } from '@/utils/AiredAnime';
import Link from 'next/link';

export default function RecentlyAired() {
  const [animeList, setAnimeList] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function loadData() {
      const data = await fetchRecentlyAired();
      setAnimeList(data);
    }
    loadData();
  }, []);

  const handleClick = (id: number) => {
    router.push(`/anime/${id}`);
  };

  return (
    <section className="mt-12 px-6">
      <h2 className="text-2xl font-bold mb-2 text-white">Recently Aired</h2>
      <p className="text-sm text-gray-400 mb-4">
        Latest episodes from your favorite anime.
      </p>

      <div className="flex gap-4 overflow-x-auto">
        {animeList.map((item) => {
          const anime = item.entry;
          const img = anime?.images?.jpg?.image_url;
          const epTitle = item.episodes?.[0]?.title ?? 'Episode Info N/A';
          const epDate = item.episodes?.[0]?.aired
            ? new Date(item.episodes[0].aired).toLocaleDateString()
            : 'Unknown Date';

          return (
            <Link 
              href={`/anime/${anime.mal_id}`}
              key={anime.mal_id}
              className="min-w-[160px] block hover:opacity-80 transition-opacity"
            >
              <div>
                <img src={img} alt={anime.title} className="w-full rounded-md" />
                <p className="text-sm mt-1 text-white">{anime.title}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
