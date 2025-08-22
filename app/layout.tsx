/** @format */

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import Header from "../components/Header/Header";
import { HeroUIProvider } from "@heroui/system";
import { Providers } from "./providers";
import { ThemeProvider } from "next-themes";
import { ToastProvider } from "@heroui/toast";
import InfoBlock from "@/components/InfoBlock/InfoBlock";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "CSS generator",
	description: "Generate CSS code instantly with our free online tool. Perfect for developers and designers!",
	keywords: ["CSS generator", "web development", "frontend tools"],
	openGraph: {
		title: "Generate CSS Code",
		description: "Free online CSS code generator for developers.",
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${geistSans.variable} ${geistMono.variable}`}>
				<Providers>
					<HeroUIProvider>
						<Header />
						{children}
						<InfoBlock />
					</HeroUIProvider>
				</Providers>
			</body>
		</html>
	);
}
