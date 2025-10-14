import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
interface FavState { favs: Record<string, boolean>; toggle: (id: string) => void; hydrate: () => Promise<void>; }
export const useFavorites = create<FavState>((set, get) => ({
favs: {},
toggle: (id) => { const next = { ...get().favs, [id]: !get().favs[id] }; set({ favs: next }); AsyncStorage.setItem("favs", JSON.stringify(next)); },
hydrate: async () => { try { const raw = await AsyncStorage.getItem("favs"); if (raw) set({ favs: JSON.parse(raw) }); } catch {}
}
}));