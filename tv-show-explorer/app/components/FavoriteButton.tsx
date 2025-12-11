"use client";

import { toggleFavorite } from "@/app/server/actions";
import { useState, useEffect } from "react";
import { IEpisode } from "@/domain/types/TvShow";
import { Heart } from "lucide-react";

interface FavoriteButtonProps {
  episode: IEpisode;
  initialIsFavorited: boolean;
}

export default function FavoriteButton({
  episode,
  initialIsFavorited,
}: FavoriteButtonProps) {
  const [isFavorited, setIsFavorited] = useState(initialIsFavorited);

  useEffect(() => {
    setIsFavorited(initialIsFavorited);
  }, [initialIsFavorited]);

  const handleToggle = async () => {
    const result = await toggleFavorite(episode);
    if (result.success) {
      setIsFavorited(result.isFavorited);
    }
  };

  const buttonClass = isFavorited
    ? "bg-red-600 text-white hover:bg-red-700"
    : "bg-gray-200 text-gray-900 hover:bg-gray-300";

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${buttonClass}`}
      aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
    >
      <Heart size={20} fill={isFavorited ? "currentColor" : "none"} />
      {isFavorited ? "Favorited" : "Add to Favorites"}
    </button>
  );
}
