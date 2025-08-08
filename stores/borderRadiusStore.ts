/** @format */

import colors from "@/constants/colors";
import { create } from "zustand";

interface BorderRadiusStore {
	unit: "%" | "px";
	setUnit: (val: "%" | "px") => void;
}

const useBorderRadiusStore = create<BorderRadiusStore>()((set) => ({
	unit: "px",
	setUnit: (value) => set((state) => ({ unit: value })),
}));
export default useBorderRadiusStore;
