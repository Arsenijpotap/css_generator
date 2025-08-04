/** @format */
"use client";
import useAppStore from "@/stores/appStore";
import "./Header.scss";
import { Tab, Tabs } from "@heroui/tabs";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

function Header() {
	const pathname = usePathname();
	useEffect(() => {
		switch (pathname) {
			case "/gradient":
				setMode("gradient");
				break;
			case "/neonText":
				setMode("neon text");
				break;

			default:
				break;
		}
	});
	const mode = useAppStore((state) => state.mode);
	const setMode = useAppStore((state) => state.setMode);
	return (
		<header className="header">
			<h1 className="header__title">Generate your {mode}</h1>
			<div className="">
				<Tabs selectedKey={pathname} size="lg" variant="underlined" className="header__tabs">
					<Tab
						key="/gradient"
						href="/gradient"
						onClick={() => {
							setMode("gradient");
						}}
						title="Gradient"
					></Tab>
					<Tab
						key="/neonText"
						href="/neonText"
						onClick={() => {
							setMode("neon text");
						}}
						title="Neon text"
					></Tab>
				</Tabs>
			</div>
		</header>
	);
}

export default Header;
