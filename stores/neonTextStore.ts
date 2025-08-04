/** @format */

import colors from "@/constants/colors";
import { create } from "zustand";

interface NeonTextStore {
	blur: number;
	setBlur: (val: number) => void;

	size: number;
	setSize: (val: number) => void;

	color: string;
	setColor: (val: string) => void;

	opacity: number;
	setOpacity: (val: number) => void;

	level: number;
	setLevel: (val: number) => void;

	time: number;
	setTime: (val: number) => void;

	animationType: "off" | "smooth" | "sharp" | "pulse";
	setAnimationType: (val: "off" | "smooth" | "sharp" | "pulse") => void;

	randomizeValues: () => void;
}

const useNeonTextStore = create<NeonTextStore>()((set) => ({
	blur: 50,
	setBlur: (value) => set((state) => ({ blur: value })),

	size: 5,
	setSize: (value) => set((state) => ({ size: value })),

	color: "#29d4ff",
	setColor: (value) => set((state) => ({ color: value })),

	opacity: 100,
	setOpacity: (value) => set((state) => ({ opacity: value })),

	time: 3,
	setTime: (value) => set((state) => ({ time: value })),

	level: 50,
	setLevel: (value) => set((state) => ({ level: value })),

	animationType: "off",
	setAnimationType: (value) => set((state) => ({ animationType: value })),

	randomizeValues: () =>
		set((state) => ({
			opacity: Math.round(50 + Math.random() * 50),
			blur: Math.round(20 + Math.random() * 80),
			size: Math.round(1 + Math.random() * 6),
			color: colors[Math.round(Math.random() * (colors.length - 1))],
		})),
}));
export default useNeonTextStore;
