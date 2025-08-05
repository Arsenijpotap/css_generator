/** @format */

import { create } from "zustand";

interface AppStore {
	mode: "gradient" | "neon text";
	setMode: (val: "gradient" | "neon text") => void;

	copied: boolean;
	setCopied: (val: boolean) => void;
}

const useAppStore = create<AppStore>()((set) => ({
	mode: "gradient",
	setMode: (value) => set((state) => ({ mode: value })),

	copied: false,
	setCopied: (value) => set((state) => ({ copied: value })),
}));
export default useAppStore;
