/** @format */
"use client";
import { Card } from "@heroui/card";
import "./NeonText.scss";
import "../../styles/reset.scss";
import "../../styles/main.scss";
import { Slider } from "@heroui/slider";
import useNeonTextStore from "@/stores/neonTextStore";
import { Button } from "@heroui/button";
import { Tab, Tabs } from "@heroui/react";
import { useEffect, useState } from "react";
import useAppStore from "@/stores/appStore";

function NeonText() {
	const blur = useNeonTextStore((state) => state.blur);
	const setBlur = useNeonTextStore((state) => state.setBlur);
	const size = useNeonTextStore((state) => state.size);
	const setSize = useNeonTextStore((state) => state.setSize);
	const color = useNeonTextStore((state) => state.color);
	const setColor = useNeonTextStore((state) => state.setColor);
	const opacity = useNeonTextStore((state) => state.opacity);
	const setOpacity = useNeonTextStore((state) => state.setOpacity);
	const time = useNeonTextStore((state) => state.time);
	const setTime = useNeonTextStore((state) => state.setTime);
	const level = useNeonTextStore((state) => state.level);
	const setLevel = useNeonTextStore((state) => state.setLevel);
	const animationType = useNeonTextStore((state) => state.animationType);
	const setAnimationType = useNeonTextStore((state) => state.setAnimationType);
	const randomizeValues = useNeonTextStore((state) => state.randomizeValues);

	const copied = useAppStore((state) => state.copied);
	const setCopied = useAppStore((state) => state.setCopied);

	let animationCss = "";
	useEffect(() => {
		const style = document.createElement("style");
		switch (animationType) {
			case "pulse":
				animationCss = `
      @keyframes neonAnimation {
        0%,100% { transform: scale(1);  }
        50% { transform: scale(${1 + level / 100}); }
       
      }
      .neonText__exampleText {
        animation: neonAnimation ${time}s infinite;
      }
    `;
				style.textContent = animationCss;
				break;
			case "sharp":
				let shadowCss = "";
				for (let i = 5; i <= 20; i *= 2) {
					shadowCss += `0 0 ${(i / 50) * blur}px #fff,`;
				}
				for (let i = 20; i <= 40 + 10 * size; i += 10) {
					shadowCss += `0 0 ${(i / 50) * blur}px ${
						color +
						Math.round(opacity * 2.55)
							.toString(16)
							.padStart(2, "0")
					},`;
				}
				console.log(41 + Math.min(Math.round(30 / time) / 10, 1));
				shadowCss = shadowCss.slice(0, -1);
				animationCss = `
      @keyframes neonAnimation {
      0%,40%,${41 + Math.min(Math.round(30 / time) / 10, 1)}%,${Math.round(41 + Math.min(18 / time, 10)) + Math.min(Math.round(30 / time) / 10, 1)}%,100%   { text-shadow: ${shadowCss}}
	  41%,${Math.round(41 + Math.min(18 / time, 10))}% { text-shadow: none }
    
    
	
      }
      .neonText__exampleText {
	  transition:0s;
    animation: neonAnimation ${time}s step-end infinite;
      }
    `;
				style.textContent = animationCss;
				break;
			case "smooth":
				let inithialShadowCss = "";
				for (let i = 5; i <= 20; i *= 2) {
					inithialShadowCss += `0 0 ${(i / 50) * blur + level / 10}px #fff,`;
				}
				for (let i = 20; i <= 40 + 10 * size; i += 10) {
					inithialShadowCss += `0 0 ${(i / 50) * blur}px ${
						color +
						Math.round(opacity * 2.55)
							.toString(16)
							.padStart(2, "0")
					},`;
				}
				let endShadowCss = "";
				for (let i = 5; i <= 20; i *= 2) {
					endShadowCss += `0 0 ${(i / 50) * blur}px #fff,`;
				}
				for (let i = 20; i <= 40 + 10 * size; i += 10) {
					endShadowCss += `0 0 ${(i / 50) * blur + level / 4}px ${
						color +
						Math.round(opacity * 2.55)
							.toString(16)
							.padStart(2, "0")
					},`;
				}
				inithialShadowCss = inithialShadowCss.slice(0, -1);
				endShadowCss = endShadowCss.slice(0, -1);

				animationCss = `
      @keyframes neonAnimation {
        0%,100% { text-shadow: ${inithialShadowCss}}
        40% { text-shadow: ${endShadowCss} }
       
      }
      .neonText__exampleText {
        animation: neonAnimation ${time}s infinite;
      }
    `;
				style.textContent = animationCss;
				break;
			default:
				break;
		}

		document.head.appendChild(style);

		return () => {
			// Очистка при размонтировании
			document.head.removeChild(style);
		};
	}, [time, level, animationType, blur, size, color, opacity, copied]);
	let shadowCss = "";
	if (animationType == "off" || animationType == "pulse") {
		for (let i = 5; i <= 20; i *= 2) {
			shadowCss += `0 0 ${Math.round((i / 5) * blur) / 10}px #fff,`;
		}
		for (let i = 20; i <= 40 + 10 * size; i += 10) {
			shadowCss += `0 0 ${Math.round((i / 5) * blur) / 10}px ${
				color +
				Math.round(opacity * 2.55)
					.toString(16)
					.padStart(2, "0")
			},`;
		}
		shadowCss = shadowCss.slice(0, -1);
	}
	return (
		<div className="conteiner">
			<div className="neonText main">
				<Card className="box">
					<div className="neonText__example">
						<p className="neonText__exampleText" style={{ textShadow: shadowCss }}>
							Neon text
						</p>
					</div>
				</Card>
				<Card className="settings">
					<Slider
						classNames={{
							base: "max-w-md",
							label: "text-medium",
						}}
						label="Blur"
						maxValue={100}
						minValue={0}
						renderValue={({ children, ...props }) => (
							<output {...props}>
								<input
									max={100}
									min={0}
									aria-label="Blur value"
									className="neonText__numberBox"
									type="number"
									value={blur}
									onChange={(e) => {
										const v = parseFloat(e.target.value);
										if (v <= 100) setBlur(v);
										if (v > 100) setBlur(100);
										if (v < 0) setBlur(0);
										if (Number.isNaN(v)) setBlur(0);
									}}
									onKeyDown={(e) => {
										if (e.key === "Enter" && !isNaN(Number(blur))) {
											setBlur(Number(blur));
										}
									}}
								/>
							</output>
						)}
						size="md"
						step={1}
						value={blur}
						onChange={(e) => {
							setBlur(typeof e == "number" ? e : e[0]);
						}}
					/>
					<Slider
						classNames={{
							base: "max-w-md",
							label: "text-medium",
						}}
						label="Size"
						maxValue={10}
						minValue={0}
						renderValue={({ children, ...props }) => (
							<output {...props}>
								<input
									max={10}
									min={0}
									aria-label="Size value"
									className="neonText__numberBox"
									type="number"
									value={size}
									onChange={(e) => {
										const v = parseFloat(e.target.value);
										if (v <= 10) setSize(v);
										if (v > 10) setSize(10);
										if (v < 0) setSize(0);
										if (Number.isNaN(v)) setSize(0);
									}}
									onKeyDown={(e) => {
										if (e.key === "Enter" && !isNaN(Number(size))) {
											setSize(Number(size));
										}
									}}
								/>
							</output>
						)}
						size="md"
						step={1}
						value={size}
						onChange={(e) => {
							setSize(typeof e == "number" ? e : e[0]);
						}}
					/>

					<div className="neonText__colorBlock">
						<input
							type="color"
							onChange={(e) => {
								setColor(e.target.value);
								console.log(e.target.value);
							}}
							value={color}
							className="neonText__color"
						/>
						<input
							type="text"
							onChange={(e) => {
								setColor(e.target.value);
							}}
							value={color}
							className="neonText__colorCode"
						/>
						<Slider
							value={opacity}
							onChange={(e) => {
								setOpacity(typeof e == "number" ? e : e[0]);
							}}
							aria-label="Opacity"
							className="max-w-md neonText__opacitySlider"
							maxValue={100}
							minValue={0}
							size="sm"
							step={1}
						/>
						<input
							max={100}
							min={0}
							aria-label="Opacity value"
							className="neonText__opacity"
							type="number"
							value={opacity}
							onChange={(e) => {
								const v = parseFloat(e.target.value);
								if (v <= 100) setOpacity(v);
								if (v > 100) setOpacity(100);
								if (v < 0) setOpacity(0);
								if (Number.isNaN(v)) setOpacity(0);
							}}
						/>
					</div>
					<p className="neonText__text">Animation</p>
					<Tabs selectedKey={animationType} className="neonText__tabs">
						<Tab key={"off"} onClick={() => setAnimationType("off")} title="Off"></Tab>
						<Tab key={"smooth"} onClick={() => setAnimationType("smooth")} title="Smooth"></Tab>
						<Tab key={"sharp"} onClick={() => setAnimationType("sharp")} title="Sharp"></Tab>
						<Tab key={"pulse"} onClick={() => setAnimationType("pulse")} title="Pulse"></Tab>
					</Tabs>
					<Slider
						classNames={{
							base: "max-w-md",
							label: "text-medium",
						}}
						label="Time"
						isDisabled={animationType == "off"}
						maxValue={10}
						minValue={0}
						renderValue={({ children, ...props }) => (
							<output {...props}>
								<input
									max={10}
									min={0}
									aria-label="Time value"
									className="neonText__numberBox"
									type="number"
									step={0.1}
									value={time}
									onChange={(e) => {
										const v = parseFloat(e.target.value);
										if (v <= 10) setTime(v);
										if (v > 10) setTime(10);
										if (v < 0) setTime(0);
										if (Number.isNaN(v)) setTime(0);
									}}
									onKeyDown={(e) => {
										if (e.key === "Enter" && !isNaN(Number(time))) {
											setTime(Number(time));
										}
									}}
								/>
							</output>
						)}
						size="md"
						step={0.1}
						value={time}
						onChange={(e) => {
							setTime(typeof e == "number" ? e : e[0]);
						}}
					></Slider>

					<Slider
						classNames={{
							base: "max-w-md",
							label: "text-medium",
						}}
						isDisabled={animationType == "off" || animationType == "sharp"}
						label="Level"
						maxValue={100}
						minValue={0}
						renderValue={({ children, ...props }) => (
							<output {...props}>
								<input
									max={100}
									min={0}
									aria-label="Level value"
									className="neonText__numberBox"
									type="number"
									value={level}
									onChange={(e) => {
										const v = parseFloat(e.target.value);
										if (v <= 100) setLevel(v);
										if (v > 100) setLevel(100);
										if (v < 0) setLevel(0);
										if (Number.isNaN(v)) setLevel(0);
									}}
									onKeyDown={(e) => {
										if (e.key === "Enter" && !isNaN(Number(level))) {
											setLevel(Number(level));
										}
									}}
								/>
							</output>
						)}
						size="md"
						step={1}
						value={level}
						onChange={(e) => {
							setLevel(typeof e == "number" ? e : e[0]);
						}}
					></Slider>
					<Button
						onClick={() => {
							let copyText = "";
							if (animationType == "off") {
								copyText = "text-shadow: " + shadowCss + ";";
							} else {
								copyText = animationCss.replace(".neonText__exampleText {", ".NeonText {" + shadowCss);
								console.log(copyText);
							}
							navigator.clipboard.writeText(copyText).then(() => {
								setCopied(true);
								setTimeout(() => setCopied(false), 2000);
							});
						}}
						color="primary"
						className="neonText__copyButton"
						variant="solid"
					>
						Copy CSS
					</Button>
					<Button
						size="md"
						className="neonText__randomizeButton"
						onClick={() => {
							randomizeValues();
						}}
					>
						Randomize
					</Button>
				</Card>
			</div>
		</div>
	);
}

export default NeonText;
