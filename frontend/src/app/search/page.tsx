'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchResults() {
      if (!query) return;
      setLoading(true);
      try {
        const res = await fetch(`https://api.jikan.moe/v4/anime?q=${query}&limit=10`);
        const data = await res.json();
        setResults(data.data);
      } catch (err) {
        console.error('Failed to fetch search results:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchResults();
  }, [query]);

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Search Results for "{query}"</h1>
      {loading ? (
        <p>Loading...</p>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {results.map((anime) => (
            <div key={anime.mal_id} className="bg-gray-800 p-3 rounded shadow">
              <img src={anime.images.jpg.image_url} alt={anime.title} className="w-full rounded" />
              <h2 className="mt-2 text-sm font-semibold">{anime.title}</h2>
            </div>
          ))}
        </div>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}
