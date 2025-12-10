import { IEpisode, IShowDetails } from "@/domain/types/TvShow";
import { useQuery } from "@tanstack/react-query";

export function useShow(showId: number) {
  return useQuery({
    queryKey: ["show", showId],
    queryFn: async (): Promise<IShowDetails | null> => {
      const showResponse = await fetch(
        `https://api.tvmaze.com/shows/${showId}`
      );
      if (!showResponse.ok) throw new Error("Failed to fetch show");
      const showData = await showResponse.json();

      const episodesResponse = await fetch(
        `https://api.tvmaze.com/shows/${showId}/episodes`
      );
      const episodesData = episodesResponse.ok
        ? await episodesResponse.json()
        : [];

      return {
        title: showData.name,
        description: showData.summary || "",
        coverImage: showData.image?.medium || "",
        episodes: episodesData.map((ep: IEpisode) => ({
          id: ep.id,
          title: ep.title,
          url: ep.url,
        })),
      };
    },
  });
}
