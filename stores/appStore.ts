/** @format */

import { create } from "zustand";

interface AppStore {
	mode: "gradient" | "border radius" | "neon text";
	setMode: (val: "gradient" | "border radius" | "neon text") => void;

	copied: boolean;
	setCopied: (val: boolean) => void;
}

const useAppStore = create<AppStore>()((set) => ({
	mode: "gradient",
	setMode: (value) =>
		set((state) => {
			console.log(state.mode, value);
			return { mode: value };
		}),

	copied: false,
	setCopied: (value) => set((state) => ({ copied: value })),
}));
export default useAppStore;
