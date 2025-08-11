/** @format */

"use client";
import "./Gradient.scss";
import "../../styles/reset.scss";
import "../../styles/main.scss";
import { Card } from "@heroui/card";
import { Tab, Tabs } from "@heroui/tabs";
import { Slider } from "@heroui/slider";
import { Button } from "@heroui/button";
import { addToast } from "@heroui/toast";
import useGradientStore from "@/stores/gradientStore";
import { useEffect, useRef, useState } from "react";
import useAppStore from "@/stores/appStore";

export default function Gradient() {
	const degrees = useGradientStore((state) => state.degrees);
	const setDegrees = useGradientStore((state) => state.setDegrees);
	const type = useGradientStore((state) => state.type);
	const setType = useGradientStore((state) => state.setType);
	const addColor = useGradientStore((state) => state.addColor);
	const colorsList = useGradientStore((state) => state.colorsList);
	const changeColor = useGradientStore((state) => state.changeColor);
	const changePos = useGradientStore((state) => state.changePos);
	const randomizeColors = useGradientStore((state) => state.randomizeColors);
	const deleteColor = useGradientStore((state) => state.deleteColor);

	const copied = useAppStore((state) => state.copied);
	const setCopied = useAppStore((state) => state.setCopied);

	let colorsCss = "";
	const sortedColorsList = [...colorsList].sort((a, b) => a.position - b.position);
	sortedColorsList.forEach((val) => {
		colorsCss += val.color + " " + val.position + "%,";
	});
	useEffect(() => {
		// randomizeColors()
	});
	colorsCss = colorsCss.slice(0, -1);
	console.log(colorsCss);
	// changePos(0,35)
	return (
		<div className="conteiner">
			<div className="gradient main">
				<Card className="box">
					<div style={{ backgroundImage: `${type}-gradient(${type == "linear" ? degrees + "deg," : ""} ${colorsCss} )` }} className="gradient__example"></div>
				</Card>
				<Card className="settings">
					<Tabs selectedKey={type} className="gradient__tabs">
						<Tab key={"linear"} onClick={() => setType("linear")} title="Linear"></Tab>
						<Tab key={"radial"} onClick={() => setType("radial")} title="Radial"></Tab>
					</Tabs>

					<Slider
						classNames={{
							base: "max-w-md",
							label: "text-medium",
						}}
						label="Rotation"
						maxValue={360}
						minValue={0}
						isDisabled={type == "radial"}
						renderValue={({ children, ...props }) => (
							<output {...props}>
								<input
									max={360}
									min={0}
									aria-label="Rotation value"
									className="gradient__degrees"
									type="number"
									value={degrees}
									disabled={type == "radial"}
									onChange={(e) => {
										const v = parseFloat(e.target.value);
										if (v <= 360) setDegrees(v);
										if (v > 360) setDegrees(360);
										if (v < 0) setDegrees(0);
										if (Number.isNaN(v)) setDegrees(0);
									}}
									onKeyDown={(e) => {
										if (e.key === "Enter" && !isNaN(Number(degrees))) {
											setDegrees(Number(degrees));
										}
									}}
								/>
							</output>
						)}
						size="md"
						step={1}
						value={degrees}
						onChange={(e) => {
							setDegrees(typeof e == "number" ? e : e[0]);
						}}
					/>

					<div className="gradient__colorBlocks">
						{colorsList.map((data, id) => (
							<div key={id} className="gradient__colorBlock">
								<input
									type="color"
									onChange={(e) => {
										changeColor(id, e.target.value);
										console.log(e.target.value);
										console.log(id);
									}}
									value={data.color}
									className="gradient__color"
								/>
								<input
									type="text"
									onChange={(e) => {
										changeColor(id, e.target.value);
									}}
									value={data.color}
									className="gradient__colorCode"
								/>
								<Slider
									value={data.position}
									onChange={(e) => {
										changePos(id, typeof e == "number" ? e : e[0]);
									}}
									aria-label="Temperature"
									className="max-w-md gradient__positionSlider"
									maxValue={100}
									minValue={0}
									size="sm"
									step={1}
								/>
								<input
									max={100}
									min={0}
									aria-label="Position value"
									className="gradient__degrees"
									type="number"
									value={data.position}
									onChange={(e) => {
										const v = parseFloat(e.target.value);
										if (v <= 100) changePos(id, v);
										if (v > 100) changePos(id, 100);
										if (v < 0) changePos(id, 0);
										if (Number.isNaN(v)) changePos(id, 0);
									}}
								/>

								<button
									className="gradient__crossButton"
									onClick={() => {
										if (colorsList.length > 1) deleteColor(id);
									}}
								>
									×
								</button>
							</div>
						))}
						<div className="gradient__addColorBox">
							<button
								className="gradient__addColorButton"
								onClick={() => {
									addColor();
								}}
							>
								+
							</button>
						</div>
					</div>
					<Button
						color="primary"
						className="copyButton"
						variant="solid"
						onPress={() => {
							navigator.clipboard
								.writeText(`background-image: ${type}-gradient(${type == "linear" ? degrees + "deg," : ""} ${colorsCss});`)

								.then(() => {
									setCopied(true);
									setTimeout(() => setCopied(false), 2000);

									addToast({
										color: "success",
										title: "Copied successfully!",
										description: "Code has been copied to clipboard.",
									});
								})
								.catch((err) => {
									console.error("Failed to copy: ", err);

									addToast({
										color: "danger",
										title: "Copy failed",
										description: "Could not copy to clipboard.",
									});
								});
						}}
					>
						Copy CSS
					</Button>
					<Button
						size="md"
						className="randomizeButton"
						onClick={() => {
							randomizeColors();
						}}
					>
						Randomize
					</Button>
				</Card>
			</div>
		</div>
	);
}
