/** @format */

import colors from "@/constants/colors";
import { create } from "zustand";

interface BorderRadiusStore {
	unit: "%" | "px";
	setUnit: (val: "%" | "px") => void;

	linkType: "off" | "all" | "horizontal" | "vertical" | "diagonal";
	setLinkType: (type: "off" | "all" | "horizontal" | "vertical" | "diagonal") => void;

	isSimmetryActive: boolean;
	toggleSimmetryActive: () => void;

	radiusValues: {
		"top-left": {
			first: number;
			second: number;
		};
		"top-right": {
			first: number;
			second: number;
		};
		"bottom-left": {
			first: number;
			second: number;
		};
		"bottom-right": {
			first: number;
			second: number;
		};
	};
	setValue: (pos: "top-right" | "top-left" | "bottom-left" | "bottom-right", value: number) => void;
	setSplitValues: (pos: "top-right" | "top-left" | "bottom-left" | "bottom-right", firstValue: number, secondValue: number) => void;
	updateValues: () => void;
}

const linkScheme = {
	off: [["top-right"], ["top-left"], ["bottom-left"], ["bottom-right"]],
	all: [["top-right", "top-left", "bottom-left", "bottom-right"]],
	horizontal: [
		["top-right", "top-left"],
		["bottom-left", "bottom-right"],
	],
	diagonal: [
		["top-right", "bottom-left"],
		["top-left", "bottom-right"],
	],
	vertical: [
		["top-right", "bottom-right"],
		["bottom-left", "top-left"],
	],
};

const useBorderRadiusStore = create<BorderRadiusStore>()((set) => ({
	linkType: "off",
	setLinkType: (type) => set((state) => ({ linkType: type })),

	isSimmetryActive: true,
	toggleSimmetryActive: () => set((state) => ({ isSimmetryActive: !state.isSimmetryActive })),

	unit: "px",
	setUnit: (value) => set((state) => ({ unit: value })),

	setValue: (pos, val) =>
		set((state) => {
			let finalObj = {
				[pos]: {
					first: val,
					second: val,
				},
			};
			linkScheme[state.linkType].forEach((arr) => {
				if (arr.includes(pos)) {
					arr.forEach((name) => {
						finalObj[name] = {
							first: val,
							second: val,
						};
					});
				}
			});
			return {
				radiusValues: {
					...state.radiusValues,
					...finalObj,
				},
			};
		}),
	setSplitValues: (pos, val1, val2) =>
		set((state) => {
			let finalObj = {
				[pos]: {
					first: val1,
					second: val2,
				},
			};
			linkScheme[state.linkType].forEach((arr) => {
				if (arr.includes(pos)) {
					arr.forEach((name) => {
						finalObj[name] = {
							first: val1,
							second: val2,
						};
					});
				}
			});
			return {
				radiusValues: {
					...state.radiusValues,
					...finalObj,
				},
			};
		}),
	radiusValues: {
		"top-left": {
			first: 50,
			second: 50,
		},
		"top-right": {
			first: 50,
			second: 50,
		},
		"bottom-left": {
			first: 50,
			second: 50,
		},
		"bottom-right": {
			first: 50,
			second: 50,
		},
	},
	updateValues: () =>
		set((state) => {
			// Создаем копию текущих значений
			const newRadiusValues = { ...state.radiusValues };

			// Обновляем значения согласно схеме связей
			linkScheme.all[0].forEach((direction) => {
				const val1 = state.radiusValues[direction as "top-right" | "top-left" | "bottom-left" | "bottom-right"].first;
				const val2 = state.radiusValues[direction as "top-right" | "top-left" | "bottom-left" | "bottom-right"].second;

				// Обновляем текущее направление
				newRadiusValues[direction as "top-right" | "top-left" | "bottom-left" | "bottom-right"] = { first: val1, second: val2 };

				// Обновляем связанные направления
				linkScheme[state.linkType].forEach((arr) => {
					if (arr.includes(direction)) {
						arr.forEach((name) => {
							newRadiusValues[name as "top-right" | "top-left" | "bottom-left" | "bottom-right"] = { first: val1, second: val2 };
						});
					}
				});
			});

			// Возвращаем обновленное состояние
			return { radiusValues: newRadiusValues };
		}),
}));
export default useBorderRadiusStore;
