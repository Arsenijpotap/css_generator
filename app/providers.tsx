/** @format */

"use client";

import type { ThemeProviderProps } from "next-themes";

import * as React from "react";
import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import useAppStore from "@/stores/appStore";
import { ToastProvider } from "@heroui/toast";
import { useEffect } from "react";

export interface ProvidersProps {
	children: React.ReactNode;
	themeProps?: ThemeProviderProps;
}

declare module "@react-types/shared" {
	interface RouterConfig {
		routerOptions: NonNullable<Parameters<ReturnType<typeof useRouter>["push"]>[1]>;
	}
}
function ThemeSync() {
	const { setTheme } = useTheme();
	const theme = useAppStore((state) => state.theme);

	useEffect(() => {
		// Синхронизируем тему из Zustand в next-themes
		if (theme) {
			setTheme(theme);
		}
	}, [theme, setTheme]);

	return null;
}
export function Providers({ children, themeProps }: ProvidersProps) {
	const router = useRouter();
	const theme = useAppStore((state) => state.theme);

	return (
		<HeroUIProvider navigate={router.push}>
			<ToastProvider placement="bottom-center" />

			<NextThemesProvider {...themeProps} attribute="class" defaultTheme={theme}>
				<ThemeSync />
				{children}
			</NextThemesProvider>
		</HeroUIProvider>
	);
}
