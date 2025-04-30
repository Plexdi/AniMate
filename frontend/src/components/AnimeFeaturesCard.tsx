'use client';

import { useRouter } from 'next/navigation';

type AnimeFeatureCardProps = {
  anime: {
    mal_id: number;
    title: string;
    synopsis: string;
    images: {
      jpg: { large_image_url: string };
    };
  };
  onAddToList?: (id: number) => void;
};

export default function AnimeFeatureCard({ anime, onAddToList }: AnimeFeatureCardProps) {
  const router = useRouter();

  const handleDetails = () => {
    router.push(`/anime/${anime.mal_id}`);
  };

  const handleAddToList = () => {
    if (onAddToList) onAddToList(anime.mal_id);
    else alert(`Added "${anime.title}" to your list!`);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 bg-black text-white mb-10">
      <img
        src={anime.images.jpg.large_image_url}
        alt={anime.title}
        className="w-full md:w-[320px] h-auto rounded-lg object-cover"
      />

      <div className="flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-1">{anime.title}</h2>
          <p className="text-sm text-red-400 font-semibold">Series · Sub | Dub</p>
          <p className="text-sm text-gray-300 mt-2 max-w-xl">{anime.synopsis}</p>
        </div>

        <div className="flex gap-4 mt-4">
          <button
            onClick={handleDetails}
            className="bg-transparent text-red-500 border border-red-500 px-4 py-2 rounded hover:bg-red-600 hover:text-white transition"
          >
            VIEW DETAILS
          </button>
          <button
            onClick={handleAddToList}
            className="bg-transparent text-red-500 border border-red-500 px-4 py-2 rounded hover:bg-red-600 hover:text-white transition"
          >
            ADD TO LIST
          </button>
        </div>
      </div>
    </div>
  );
}
