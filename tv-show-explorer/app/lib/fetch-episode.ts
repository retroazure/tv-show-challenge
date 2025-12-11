import { IEpisode } from '@/domain/types/TvShow';

export async function fetchEpisode(episodeId: number): Promise<IEpisode | null> {
    try {
        const response = await fetch(
            `https://api.tvmaze.com/episodes/${episodeId}`
        );
        if (!response.ok) return null;
        const data = await response.json();
        return {
            id: data.id,
            name: data.name,
            season: data.season,
            number: data.number,
            summary: data.summary,
            airdate: data.airdate,
            runtime: data.runtime,
            image: data.image,
            url: data.url,
        };
    } catch {
        return null;
    }
}