import { create } from 'zustand';
import type {UnsplashPhoto} from "../types.ts";


interface State {
    favorites: UnsplashPhoto[];
    toggleFavorite: (photo: UnsplashPhoto) => void;
}

export const useFavoritesStore = create<State>((set, get) => ({
    favorites: [],
    toggleFavorite: (photo) => {
        const exists = get().favorites.some((p) => p.id === photo.id);
        set({
            favorites: exists
                ? get().favorites.filter((p) => p.id !== photo.id)
                : [...get().favorites, photo],
        });
    },
}));
