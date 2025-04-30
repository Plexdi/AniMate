'use client';

import { useEffect, useState } from 'react';
import { fetchRomanceAnime } from '@/utils/fetchRomanceGenre';
import Link from 'next/link';

export default function RomanceAnimeSection() {
  const [romanceList, setRomanceList] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const data = await fetchRomanceAnime(); // genre ID 22
      setRomanceList(data);
    }
    load();
  }, []);

  return (
    <section className="mt-12 px-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Wishing your life was like a romantic movie!</h2>
          <p className="text-sm text-gray-400">High school romance anime to cheer up your day.</p>
        </div>
        <button className="text-sm text-white hover:underline">VIEW ALL →</button>
      </div>

      <div className="flex gap-4 overflow-x-auto">
        {romanceList.map((anime) => (
          <Link href={`/anime/${anime.mal_id}`} key={anime.mal_id} className="min-w-[160px] block hover:opacity-80 transition-opacity">
            <div>
              <img
                src={anime.images.jpg.large_image_url}
                alt={anime.title}
                className="w-full h-[240px] object-cover rounded-md"
              />
              <p className="text-sm mt-1 text-white font-semibold">{anime.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
