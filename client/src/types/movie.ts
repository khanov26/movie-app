export interface Movie {
  id?: string;
  title: string;
  poster?: string;
  backdrop?: string;
  rating?: number;
  releaseDate: number;
  overview: string;
  runtime: number;
  genres: string[];
}

export type MovieSearchParams = Record<string, string | string[] | number>;

export type FilterValue = {
  updateField: string;
  updateValue: string | string[] | number | null;
};
