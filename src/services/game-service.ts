import apiClient from './api-client';
import { Game } from '../types/game';
import { Genre } from '../store/gameStore';

export interface FetchGamesResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Game[];
}

class GameService {
    getAll = async (page = 1, pageSize = 20) => {
        const response = await apiClient.get<FetchGamesResponse>('/games', {
            params: {
                page,
                page_size: pageSize,
            },
        });
        return response.data;
    };

    getById = async (id: number) => {
        const response = await apiClient.get<Game>(`/games/${id}`);
        return response.data;
    };

    getGenres = async () => {
        const response = await apiClient.get<{ results: Genre[] }>('/genres');
        return response.data.results;
    };

    getGamesByGenre = async (genreId: number, page = 1, pageSize = 20) => {
        const response = await apiClient.get<FetchGamesResponse>('/games', {
            params: {
                genres: genreId,
                page,
                page_size: pageSize,
            },
        });
        return response.data;
    };

    getPopular = async (page = 1, pageSize = 20) => {
        const response = await apiClient.get<FetchGamesResponse>('/games', {
            params: {
                ordering: '-rating',
                page,
                page_size: pageSize,
            },
        });
        return response.data;
    };

    getNewReleases = async (page = 1, pageSize = 20) => {
        const currentDate = new Date().toISOString().split('T')[0];
        const lastYear = new Date();
        lastYear.setFullYear(lastYear.getFullYear() - 1);
        const lastYearDate = lastYear.toISOString().split('T')[0];

        const response = await apiClient.get<FetchGamesResponse>('/games', {
            params: {
                dates: `${lastYearDate},${currentDate}`,
                ordering: '-released',
                page,
                page_size: pageSize,
            },
        });
        return response.data;
    };

    searchGames = async (searchText: string) => {
        const response = await apiClient.get<FetchGamesResponse>('/games', {
            params: {
                search: searchText,
            },
        });
        return response.data;
    };
}

export default new GameService();