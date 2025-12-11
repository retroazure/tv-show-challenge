export interface IEpisode {
  id: number;
  name: string;
  url: string;
  image?: {
    medium: string;
    original: string;
  };
  season: number;
  number: number;
  airdate: string;
  summary?: string;
  runtime: number;
}

export interface IShowDetails {
  title: string;
  description: string;
  coverImage: string;
  episodes: IEpisode[];
}
