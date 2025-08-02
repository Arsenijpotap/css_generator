/** @format */

import colors from "@/constants/colors";
import { create } from "zustand";
interface colorParams {
	position: number;
	color: string;
}

interface GradientStore {
	degrees: number;
	setDegrees: (val: number) => void;
	type: "linear" | "radial";
	setType: (val: "linear" | "radial") => void;
	colorsList: colorParams[];
	addColor: () => void;
	changeColor: (id: number, color: string) => void;
	changePos: (id: number, pos: number) => void;
	randomizeColors: () => void;
	deleteColor: (id: number) => void;
}

const useGradientStore = create<GradientStore>()((set) => ({
	degrees: 0,
	setDegrees: (value) => set((state) => ({ degrees: value })),

	type: "linear",
	setType: (value) => set((state) => ({ type: value })),
	colorsList: [
		{
			position: 20,
			color: "#89fbed",
		},
		{
			position: 80,
			color: "#fb14ff",
		},
	],
	addColor: () =>
		set((state) => {
			const randomColor = colors[Math.round(Math.random() * (colors.length - 1))];
			let maxPos = 0;
			state.colorsList.forEach((val) => {
				if (val.position > maxPos) maxPos = val.position;
			});

			return { colorsList: [...state.colorsList, { position: Math.round(maxPos / 2 + 50), color: randomColor }] };
		}),
	changeColor: (id, color) =>
		set((state) => ({
			colorsList: state.colorsList.map((item, index) => (index === id ? { ...item, color } : item)),
		})),
	changePos: (id, pos) =>
		set((state) => ({
			colorsList: state.colorsList.map((item, index) => (index === id ? { ...item, position: pos } : item)),
		})),
	randomizeColors: () =>
		set((state) => {
			let randomColorList = [];
			const colorCount = Math.random() * 1.4 + 1;
			for (let i = 0; i < colorCount; i++) {
				randomColorList.push({
					position: Math.round(Math.min((Math.random() * 100) / (colorCount + 3) + (100 / colorCount) * i, 100)),
					color: colors[Math.round(Math.random() * (colors.length - 1))],
				});
			}

			if (state.type == "linear") {
				return {
					colorsList: randomColorList,
					degrees: Math.round(Math.random() * 360),
				};
			} else {
				return {
					colorsList: randomColorList,
				};
			}
		}),

	deleteColor: (id) => set((state) => ({ colorsList: state.colorsList.filter((number) => number !== state.colorsList[id]) })),
}));
export default useGradientStore;
