/** @format */
"use client";
import useAppStore from "@/stores/appStore";
import "./style.scss";
import { Tab, Tabs } from "@heroui/tabs";

function Header() {
	const mode = useAppStore((state) => state.mode);
	const setMode = useAppStore((state) => state.setMode);
	return (
		<header className="header">
			<h1 className="header__title">Generate your {mode}</h1>
			<div className="">
				<Tabs size="lg" variant="underlined" className="header__tabs">
					<Tab
						onClick={() => {
							setMode("gradient");
						}}
						title="Gradient"
					></Tab>
					<Tab
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
