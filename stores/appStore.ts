/** @format */

import { create } from "zustand";

interface AppStore {
	mode: "gradient" | "neon text";
	setMode: (val: "gradient" | "neon text") => void;
}

const useAppStore = create<AppStore>()((set) => ({
	mode: "gradient",
	setMode: (value) => set((state) => ({ mode: value })),
}));
export default useAppStore;
