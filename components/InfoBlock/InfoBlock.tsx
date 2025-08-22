/** @format */
"use client";
import "./InfoBlock.scss";
import "../../styles/reset.scss";
import "../../styles/main.scss";
import { Popover, PopoverContent, PopoverTrigger } from "@heroui/popover";
import { Button } from "@heroui/button";
import { Tab, Tabs } from "@heroui/tabs";
import { Card } from "@heroui/card";
import { Github, Moon, Sun, SunMoon } from "lucide-react";
import useAppStore from "@/stores/appStore";
import Link from "next/link";

function InfoBlock() {
	const theme = useAppStore((state) => state.theme);
	const setTheme = useAppStore((state) => state.setTheme);
	return (
		<Card className="infoBlock">
			<Popover key="top-start" placement="top-start">
				<PopoverTrigger>
					<button className="capitalize infoBlock__themeButton">{theme == "dark" ? <Moon /> : theme == "light" ? <Sun /> : <SunMoon />}</button>
				</PopoverTrigger>
				<PopoverContent className="bg-default-100">
					<div className="g-default-300">
						<Tabs selectedKey={theme}>
							<Tab
								key={"light"}
								onClick={() => setTheme("light")}
								title={
									<div className="flex items-center space-x-2">
										<Sun className="infoBlock__icon" />
										<span>Light</span>
									</div>
								}
							></Tab>
							<Tab
								key={"system"}
								onClick={() => setTheme("system")}
								title={
									<div className="flex items-center space-x-2">
										<SunMoon className="infoBlock__icon" />
										<span>System</span>
									</div>
								}
							></Tab>
							<Tab
								key={"dark"}
								onClick={() => setTheme("dark")}
								title={
									<div className="flex items-center space-x-2">
										<Moon className="infoBlock__icon" />
										<span>Dark</span>
									</div>
								}
							></Tab>
						</Tabs>
					</div>
				</PopoverContent>
			</Popover>
			<Link href="https://github.com/Arsenijpotap" className="infoBlock__link">
				<Github />
			</Link>
		</Card>
	);
}

export default InfoBlock;
