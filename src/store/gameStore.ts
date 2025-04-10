import { create } from 'zustand';
import { Game } from '../types/game';
import gameService from '../services/game-service';

interface GameQuery {
  page?: number;
  pageSize?: number;
  searchText?: string;
}

export interface Genre {
  id: number;
  name: string;
  image_background?: string;
  games_count?: number;
  description?: string;
}

interface GameStore {
  games: Game[];
  popularGames: Game[];
  newReleases: Game[];
  selectedGame: Game | null;
  isLoading: boolean;
  error: string | null;
  gameQuery: GameQuery;
  totalGames: number;
  genres: Genre[];
  loading: boolean;

  // Actions
  setGameQuery: (query: GameQuery) => void;
  fetchGames: () => Promise<void>;
  fetchPopularGames: () => Promise<void>;
  fetchNewReleases: () => Promise<void>;
  fetchGameById: (id: number) => Promise<void>;
  fetchGenres: () => Promise<void>;
  fetchGamesByGenre: (genreId: number) => Promise<void>;
  searchGames: (searchText: string) => Promise<void>;
}

const useGameStore = create<GameStore>((set, get) => ({
  games: [],
  popularGames: [],
  newReleases: [],
  selectedGame: null,
  isLoading: false,
  error: null,
  gameQuery: { page: 1, pageSize: 20 },
  totalGames: 0,
  genres: [],
  loading: false,

  setGameQuery: (query) => set((state) => ({
    gameQuery: { ...state.gameQuery, ...query }
  })),

  fetchGames: async () => {
    set({ isLoading: true, loading: true, error: null });
    try {
      const { page, pageSize } = get().gameQuery;
      const response = await gameService.getAll(page, pageSize);
      set({
        games: response.results,
        totalGames: response.count,
        isLoading: false,
        loading: false
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred',
        isLoading: false,
        loading: false
      });
    }
  },

  fetchPopularGames: async () => {
    set({ isLoading: true, loading: true, error: null });
    try {
      const response = await gameService.getPopular();
      set({ popularGames: response.results, isLoading: false, loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred',
        isLoading: false,
        loading: false
      });
    }
  },

  fetchNewReleases: async () => {
    set({ isLoading: true, loading: true, error: null });
    try {
      const response = await gameService.getNewReleases();
      set({ newReleases: response.results, isLoading: false, loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred',
        isLoading: false,
        loading: false
      });
    }
  },

  fetchGameById: async (id: number) => {
    set({ isLoading: true, loading: true, error: null });
    try {
      const game = await gameService.getById(id);
      set({ selectedGame: game, isLoading: false, loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred',
        isLoading: false,
        loading: false
      });
    }
  },

  fetchGenres: async () => {
    set({ isLoading: true, loading: true, error: null });
    try {
      const genres = await gameService.getGenres();
      set({ genres, isLoading: false, loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred',
        isLoading: false,
        loading: false
      });
    }
  },

  fetchGamesByGenre: async (genreId: number) => {
    set({ isLoading: true, loading: true, error: null });
    try {
      const response = await gameService.getGamesByGenre(genreId);
      set({
        games: response.results,
        totalGames: response.count,
        isLoading: false,
        loading: false
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred',
        isLoading: false,
        loading: false
      });
    }
  },

  searchGames: async (searchText: string) => {
    set({ isLoading: true, loading: true, error: null });
    try {
      const response = await gameService.searchGames(searchText);
      set({
        games: response.results,
        totalGames: response.count,
        isLoading: false,
        loading: false
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred',
        isLoading: false,
        loading: false
      });
    }
  }
}));

export default useGameStore;