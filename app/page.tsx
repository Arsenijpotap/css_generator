/** @format */

"use client";
import "./Home.scss";
import "../styles/reset.scss";
import "../styles/main.scss";
import { Button } from "@heroui/button";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

export default function App() {
	const { theme, systemTheme } = useTheme();

	const currentTheme = theme === "system" ? systemTheme : theme;
	const router = useRouter();
	return (
		<div className="home">
			<div className="conteiner">
				<div className="home__contentBox">
					<div className="home__line"></div>
					<div className="home__line"></div>
					<div className="home__line"></div>
					<div className="home__line"></div>
					<div className="home__line"></div>
					<div className="home__line"></div>
					<div className="home__line"></div>
					<div className="home__line"></div>
					<div className="home__line"></div>
					<div className="home__content">
						<h1 className="home__title">Generate CSS in a Snap – Code Less, Design More!</h1>
						<h1 className="home__description">Try to create your own unique style!</h1>
						<div className="home__buttonBlocks">
							<div className="home__buttonBlock">
								<Button
									onPress={() => {
										router.push("/gradient");
									}}
									className={currentTheme == "dark" ? "home__button home__button_dark" : "home__button"}
									size="lg"
									color="primary"
									variant={currentTheme == "dark" ? "ghost" : "solid"}
								>
									Create your gradient
								</Button>
							</div>
							<div className="home__buttonBlock">
								<Button
									onPress={() => {
										router.push("/neonText");
									}}
									className={currentTheme == "dark" ? "home__button home__button_dark" : "home__button"}
									size="lg"
									color="primary"
									variant={currentTheme == "dark" ? "ghost" : "solid"}
								>
									Create your neon text
								</Button>
							</div>
							<div className="home__buttonBlock">
								<Button
									onPress={() => {
										router.push("/borderRadius");
									}}
									className={currentTheme == "dark" ? "home__button home__button_dark" : "home__button"}
									size="lg"
									color="primary"
									variant={currentTheme == "dark" ? "ghost" : "solid"}
								>
									Create your border radius
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
