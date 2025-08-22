/** @format */

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
interface AppStore {
	mode: "gradient" | "border radius" | "neon text";
	setMode: (val: "gradient" | "border radius" | "neon text") => void;

	theme: "light" | "dark" | "system";
	setTheme: (val: "light" | "dark" | "system") => void;
}

const useAppStore = create<AppStore>()(
	persist(
		(set) => ({
			mode: "gradient",
			setMode: (value) =>
				set((state) => {
					return { mode: value };
				}),

			theme: "system",
			setTheme: (value) => set({ theme: value }),
		}),
		{
			name: "app-storage",
			storage: createJSONStorage(() => localStorage),

			partialize: (state) => ({ theme: state.theme }),
		}
	)
);
export default useAppStore;
