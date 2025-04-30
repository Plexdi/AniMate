'use client';

import { useEffect, useState } from 'react';
import { fetchRecentEpisodes } from '@/utils/RecentEpisode';

export default function NewEpisodesToday() {
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    async function load() {
      const data = await fetchRecentEpisodes();
      setEpisodes(data); // Store all data
    }
    load();
  }, []);

  const showMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <section className="px-6 mt-10 text-white">
      <div className="flex justify-between items-center border-b border-[#f9c87c] pb-2 mb-4">
        <div>
          <h2 className="text-2xl font-bold">New Episodes</h2>
          <p className="text-gray-400">Today</p>
        </div>
        <button className="text-sm text-white hover:underline">
          VIEW RELEASE CALENDAR →
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {episodes.slice(0, visibleCount).map((entry, idx) => {
          const anime = entry.entry;
          const ep = entry.episodes[0];
          return (
            <div key={idx} className="flex gap-4 items-center">
              <img
                src={anime.images.jpg.image_url}
                alt={anime.title}
                className="w-28 h-16 rounded object-cover"
              />
              <div className="flex-1">
                <p className="text-sm font-semibold">{anime.title}</p>
                <p className="text-xs text-gray-300">
                  Episode {ep.episode} — {ep.title || 'No title'}
                </p>
                <p className="text-xs text-red-400">
                  {new Date(ep.aired).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {visibleCount < episodes.length && (
        <div className="mt-6">
          <button
            className="bg-[#f9c87c] w-full py-3 text-white font-semibold hover:bg-red-700 transition rounded"
            onClick={showMore}
          >
            SHOW MORE
          </button>
        </div>
      )}
    </section>
  );
}
