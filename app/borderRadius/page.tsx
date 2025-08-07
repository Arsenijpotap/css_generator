/** @format */

"use client";
import "./BorderRadius.scss";
import "../../styles/reset.scss";
import "../../styles/main.scss";
import { Card } from "@heroui/card";
import useGradientStore from "@/stores/gradientStore";

export default function BorderRadius() {
	const degrees = useGradientStore((state) => state.degrees);

	return (
		<div className="conteiner">
			<div className="borderRadius main">
				<Card className="box">
					<div className="borderRadius__example"></div>
				</Card>
				<Card className="settings"></Card>
			</div>
		</div>
	);
}
