'use client'

import HeroSection from "@/components/HeroSection";
import NavBar from "@/components/NavBar";
import RecentlyAired from "@/components/RecentlyAired";
import Recommendations from "@/components/RecommendAnime";
import RecommendationHero from "@/components/RecommendationHero";
import AnimeFeatureCard from "@/components/AnimeFeaturesCard";
import { useState, useEffect } from "react";
import NewEpisodesToday from "@/components/NewEpisode";

type AnimeData = {
    mal_id: number;
    title: string;
    synopsis: string;
    images: {
      jpg: { large_image_url: string };
    };
  };

export default function Dashboard(){    
    const [animes, setAnimes] = useState<AnimeData[]>([]);

    useEffect(() => {
      async function fetchAnime(title: string): Promise<AnimeData | null> {
        try {
          const res = await fetch(`https://api.jikan.moe/v4/anime?q=${title}&limit=1`);
          const json = await res.json();
          return json.data?.[0] ?? null;
        } catch (err) {
          console.error(`Failed to fetch ${title}:`, err);
          return null;
        }
      }
  
      async function loadFeatured() {
        const jjk = await fetchAnime('jujutsu kaisen');
        const onePiece = await fetchAnime('one piece');
        setAnimes([jjk, onePiece].filter(Boolean) as AnimeData[]);
      }
  
      loadFeatured();
    }, []);
    return(
        <div>
            <NavBar/>
            <HeroSection />
            <RecentlyAired />
            <Recommendations />
            <RecommendationHero />
            <section className="px-6 py-10 bg-black">
                {animes.map(anime => (
                    <AnimeFeatureCard key={anime.mal_id} anime={anime} />
                ))}
                </section>
            <NewEpisodesToday />
        </div>
    )
}