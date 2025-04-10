export interface Game {
  id: number;
  name: string;
  background_image: string;
  rating: number;
  metacritic: number;
  released: string;
  genres: { id: number; name: string }[];
  platforms: { 
    platform: { id: number; name: string };
    requirements?: {
      minimum?: string;
      recommended?: string;
    }
  }[];
  description: string;
  clip?: {
    clip: string;
    preview?: string;
  };
  short_screenshots?: { id: number; image: string }[];
}