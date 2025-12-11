'use server';

import { IEpisode } from '@/domain/types/TvShow';
import fs from 'fs/promises';
import path from 'path';

const favoritesFile = path.join(process.cwd(), 'data', 'favorites.json');

async function readFavorites(): Promise<IEpisode[]> {
    try {
        const data = await fs.readFile(favoritesFile, 'utf-8');
        return JSON.parse(data);
    } catch {
        return [];
    }
}

async function writeFavorites(favorites: IEpisode[]): Promise<void> {
    await fs.writeFile(favoritesFile, JSON.stringify(favorites, null, 2));
}

export async function toggleFavorite(episode: IEpisode) {
    try {
        const favorites = await readFavorites();
        const index = favorites.findIndex(fav => fav.id === episode.id);

        if (index > -1) {
            favorites.splice(index, 1);
        } else {
            favorites.push(episode);
        }

        await writeFavorites(favorites);
        return { success: true, isFavorited: index === -1 };
    } catch {
        return { success: false, isFavorited: false };
    }
}

export async function isFavoritedEpisode(episodeId: number) {
    try {
        const favorites = await readFavorites();
        return favorites.some(fav => fav.id === episodeId);
    } catch {
        return false;
    }
}

export async function getFavorites() {
    try {
        return await readFavorites();
    } catch {
        return [];
    }
}