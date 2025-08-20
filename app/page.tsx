/** @format */

"use client";
import "./Home.scss";
import "../styles/reset.scss";
import "../styles/main.scss";
import { useEffect } from "react";
import { Button } from "@heroui/button";
export default function App() {
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
					<div className="home__line"></div>
					<div className="home__line"></div>
					<div className="home__line"></div>
					<div className="home__content">
						<h1 className="home__title">Generate CSS in a Snap – Code Less, Design More!</h1>
						<div className="home__buttonBlocks">
							<div className="home__buttonBlock">
								<Button className="home__button" size="lg" color="primary" variant="ghost">
									Create your gradient
								</Button>
							</div>
							<div className="home__buttonBlock">
								<Button className="home__button" size="lg" color="primary" variant="ghost">
									Create your neon text
								</Button>
							</div>
							<div className="home__buttonBlock">
								<Button className="home__button" size="lg" color="primary" variant="ghost">
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
