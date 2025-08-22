/** @format */
"use client";
import useAppStore from "@/stores/appStore";
import "./Header.scss";
import "../../styles/reset.scss";
import "../../styles/main.scss";
import { Tab, Tabs } from "@heroui/tabs";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { Moon, PencilRuler, Sun, SunMoon } from "lucide-react";
import Link from "next/link";

function Header() {
	const pathname = usePathname();
	const mode = useAppStore((state) => state.mode);
	const setMode = useAppStore((state) => state.setMode);

	useEffect(() => {
		switch (pathname) {
			case "/gradient":
				setMode("gradient");
				break;
			case "/neonText":
				setMode("neon text");
				break;
			case "/borderRadius":
				setMode("border radius");
				break;
			default:
				break;
		}
	}, [pathname, setMode]);

	return (
		<header className="header">
			<div className="conteiner header__wrapper">
				<div className="header__name">
					<Link href="/">
						<PencilRuler className="header__logo" />
					</Link>
					<h1 className="header__title">Generate your {pathname != "/" ? mode : "css code"}</h1>
				</div>
				<div className="">
					{/* <Tabs variant="bordered" className="header__themeButtons" selectedKey={theme} size="sm">
						<Tab
							key="light"
							title={<Sun size={18} />}
							onClick={() => {
								setTheme("light");
							}}
						/>
						<Tab
							className="header__themeButton"
							key="dark"
							title={<Moon size={18} />}
							onClick={() => {
								setTheme("dark");
							}}
						/>
						<Tab
							key="system"
							title={<SunMoon />}
							onClick={() => {
								setTheme("system");
							}}
						/>
					</Tabs> */}
					<Tabs selectedKey={pathname} size="lg" variant="underlined" className="header__tabs">
						<Tab key="/gradient" href="/gradient" title="Gradient" />
						<Tab key="/neonText" href="/neonText" title="Neon text" />
						<Tab key="/borderRadius" href="/borderRadius" title="Border radius" />
					</Tabs>
				</div>
			</div>
		</header>
	);
}

export default Header;
