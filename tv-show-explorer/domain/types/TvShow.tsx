export interface IEpisode {
  id: number;
  title: string;
  url: string;
}

export interface IShowDetails {
  title: string;
  description: string;
  coverImage: string;
  episodes: IEpisode[];
}
