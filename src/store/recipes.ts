import AsyncStorage from '@react-native-async-storage/async-storage';
import create from 'zustand';
import { nanoid } from 'nanoid/non-secure';

export type Recipe = {
  id: string;
  title: string;
  imageUri?: string;
  ingredients: string[];
  steps: string[];
  prepMinutes?: number;
  servings?: number;
  calories?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
  category?: string;
  isFavorite?: boolean;
  createdAt: number;
  author: 'me' | 'community';
};

type Store = {
  recipes: Recipe[];
  hydrate: () => Promise<void>;
  add: (data: Omit<Recipe,'id'|'createdAt'|'author'|'isFavorite'>) => Promise<string>;
  update: (id: string, patch: Partial<Recipe>) => Promise<void>;
  remove: (id: string) => Promise<void>;
  toggleFavorite: (id: string) => Promise<void>;
};

const KEY = 'foodie:recipes';

function seedData(): Recipe[] {
  return [
    {
      id: 'seed-1',
      title: 'Avocado Toast',
      imageUri: undefined,
      ingredients: ['2 slices bread','1 avocado','salt','pepper','lemon'],
      steps: ['Toast bread','Mash avocado','Season','Spread and serve'],
      prepMinutes: 10, servings: 1, calories: 320, difficulty: 'easy',
      category: 'Breakfast', isFavorite: false, createdAt: Date.now() - 86400000, author: 'community'
    }
  ];
}

export const useRecipes = create<Store>((set, get) => ({
  recipes: [],
  hydrate: async () => {
    const raw = await AsyncStorage.getItem(KEY);
    set({ recipes: raw ? JSON.parse(raw) : seedData() });
  },
  add: async (data) => {
    const id = nanoid();
    const rec: Recipe = { id, createdAt: Date.now(), author: 'me', isFavorite: false, ...data };
    const list = [rec, ...get().recipes];
    await AsyncStorage.setItem(KEY, JSON.stringify(list));
    set({ recipes: list });
    return id;
  },
  update: async (id, patch) => {
    const list = get().recipes.map(r => r.id === id ? { ...r, ...patch } : r);
    await AsyncStorage.setItem(KEY, JSON.stringify(list));
    set({ recipes: list });
  },
  remove: async (id) => {
    const list = get().recipes.filter(r => r.id !== id);
    await AsyncStorage.setItem(KEY, JSON.stringify(list));
    set({ recipes: list });
  },
  toggleFavorite: async (id) => {
    const list = get().recipes.map(r => r.id === id ? { ...r, isFavorite: !r.isFavorite } : r);
    await AsyncStorage.setItem(KEY, JSON.stringify(list));
    set({ recipes: list });
  },
}));
