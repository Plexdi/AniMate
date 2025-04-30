'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getAnimeFullById } from '@/utils/getAnimeFullById';
import NavBar from '@/components/NavBar';

type AnimeData = {
  title: string;
  synopsis: string;
  images: {
    jpg: {
      large_image_url: string;
    };
  };
  trailer: {
    embed_url: string;
  };
  episodes: number;
  status: string;
  duration: string;
  rating: string;
  score: number;
};

export default function AnimeInfoPage() {
  const { id } = useParams();
  const animeId = id as string;

  const [anime, setAnime] = useState<AnimeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAnime() {
      try {
        const res = await getAnimeFullById(animeId);
        console.log('Fetched anime data:', res);
        setAnime(res.data);
      } catch (error) {
        console.error('Failed to fetch anime:', error);
      } finally {
        setLoading(false);
      }
    }
  
    if (animeId) loadAnime();
  }, [animeId]);
  

  if (loading) return <div className="p-6 text-white">Loading...</div>;
  if (!anime || !anime.title || !anime.images?.jpg?.large_image_url) {
    return <div className="p-6 text-red-500">Anime not found or incomplete.</div>;
  }
  

  return (
    <div className='h-[100vh] text-white'>
      <div>
        <NavBar />
      </div>
      {/* body */}
      <div className="relative h-[250px] bg-[#1b2338] px-14 py-8 flex items-center">
        <img
          src={anime.images.jpg.large_image_url}
          alt={anime.title}
          className="absolute left-14 top-8 w-60 h-auto rounded-md shadow-lg"
        />

        <div className="ml-[290px]"> {/* Enough left margin to avoid overlapping the image */}
          <h1 className="text-3xl font-bold text-white">{anime.title}</h1>
          <p className="mt-2 text-gray-300 max-w-4xl text-sm">
            {anime.synopsis}
          </p>
        </div>
      </div>
      <div className="flex px-14 py-10 gap-8 bg-[#151922]">
  {/* Left Sidebar */}
  <aside className="w-64 space-y-14">
    {/* Add to List / Favorite */}
    <div className="flex items-center gap-2">
      <button className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700">Add to List ▾</button>
      <button className="p-2 bg-red-600 rounded hover:bg-red-700">
        ❤️
      </button>
    </div>

    {/* Badges */}
    <div className="space-y-2">
      <div className="flex items-center bg-[#1b2338] p-2 rounded">
        ⭐ <span className="ml-2 text-sm">#51 Highest Rated 2025</span>
      </div>
      <div className="flex items-center bg-[#1b2338] p-2 rounded">
        ❤️ <span className="ml-2 text-sm">#53 Most Popular 2025</span>
      </div>
    </div>

    {/* Stats Box */}
    <div className="bg-[#1b2338] p-4 rounded space-y-2 text-sm">
      <p><strong>Airing:</strong> Ep 5 · 6d 2h 7m</p>
      <p><strong>Format:</strong> TV</p>
      <p><strong>Episodes:</strong> {anime.episodes}</p>
      <p><strong>Duration:</strong> {anime.duration}</p>
      <p><strong>Status:</strong> {anime.status}</p>
      <p><strong>Start:</strong> Apr 8, 2025</p>
      <p><strong>End:</strong> Jun 24, 2025</p>
      <p><strong>Rating:</strong> {anime.rating}</p>
      <p><strong>Score:</strong> {anime.score}</p>
    </div>
  </aside>

  {/* Right Main Content */}
  <main className="flex-1 space-y-10">
    {/* Relations */}
    <section>
      <h2 className="text-xl font-semibold mb-4">Relations</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {/* Repeat for each relation */}
        <div className="bg-[#1b2338] p-4 rounded flex gap-4">
          <img src="/path/to/source.jpg" alt="Source" className="w-16 rounded" />
          <div>
            <p className="text-blue-400">Source</p>
            <p>The Shiunji Family Children</p>
            <p className="text-xs text-gray-400">Manga · Releasing</p>
          </div>
        </div>
      </div>
    </section>

    {/* Characters */}
    <section>
      <h2 className="text-xl font-semibold mb-4">Characters</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {/* Repeat for each character */}
        <div className="bg-[#1b2338] p-4 rounded flex gap-3 items-center">
          <img src="/path/to/char.jpg" alt="Arata Shiunji" className="w-12 h-12 rounded" />
          <div>
            <p className="font-medium">Arata Shiunji</p>
            <p className="text-xs text-gray-400">Main · Japanese</p>
          </div>
        </div>
      </div>
    </section>

    {/* Staff */}
    <section>
      <h2 className="text-xl font-semibold mb-4">Staff</h2>
      <div className="grid grid-cols-2 gap-6">
        {/* Repeat for each staff member */}
        <div className="bg-[#1b2338] p-4 rounded flex gap-3 items-center">
          <img src="/path/to/staff.jpg" alt="Reiji Miyajima" className="w-12 h-12 rounded" />
          <div>
            <p className="font-medium">Reiji Miyajima</p>
            <p className="text-xs text-gray-400">Original Creator</p>
          </div>
        </div>
      </div>
    </section>

    {/* Distributions */}
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h3 className="text-lg font-semibold mb-2">Status Distribution</h3>
        <div className="flex gap-2 flex-wrap">
          <span className="px-3 py-1 bg-green-500 rounded text-xs">Current</span>
          <span className="px-3 py-1 bg-blue-500 rounded text-xs">Planning</span>
          <span className="px-3 py-1 bg-purple-500 rounded text-xs">Dropped</span>
          <span className="px-3 py-1 bg-pink-500 rounded text-xs">Paused</span>
          <span className="px-3 py-1 bg-red-500 rounded text-xs">Completed</span>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Score Distribution</h3>
        {/* Replace with your chart or static bars */}
        <div className="space-y-1">
          <div className="h-2 bg-gray-700 rounded w-5/6"></div>
          <div className="h-2 bg-gray-700 rounded w-4/6"></div>
          <div className="h-2 bg-gray-700 rounded w-3/6"></div>
          {/* … */}
        </div>
      </div>
    </section>
  </main>
</div>

    </div>
  );
}
