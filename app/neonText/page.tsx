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
import { useEffect, useMemo, useCallback } from "react";
import useAppStore from "@/stores/appStore";

function NeonText() {
	const { blur, setBlur, size, setSize, color, setColor, opacity, setOpacity, time, setTime, level, setLevel, animationType, setAnimationType, randomizeValues } = useNeonTextStore();

	const { setCopied } = useAppStore();

	// Мемоизированное вычисление тени текста
	const shadowCss = useMemo(() => {
		if (animationType === "off" || animationType === "pulse") {
			let css = "";
			// Белые тени
			for (let i = 5; i <= 20; i *= 2) {
				css += `0 0 ${Math.round((i / 5) * blur) / 10}px #fff,`;
			}
			// Цветные тени
			for (let i = 20; i <= 40 + 10 * size; i += 10) {
				const opacityHex = Math.round(opacity * 2.55)
					.toString(16)
					.padStart(2, "0");
				css += `0 0 ${Math.round((i / 5) * blur) / 10}px ${color + opacityHex},`;
			}
			return css.slice(0, -1);
		}
		return "";
	}, [animationType, blur, size, color, opacity]);

	// Генерация и применение анимации
	useEffect(() => {
		const styleId = "neon-animation-style";
		let style = document.getElementById(styleId);

		if (!style) {
			style = document.createElement("style");
			style.id = styleId;
			document.head.appendChild(style);
		}

		if (animationType === "off") {
			style.textContent = "";
			return;
		}

		const opacityHex = Math.round(opacity * 2.55)
			.toString(16)
			.padStart(2, "0");
		const colorWithOpacity = color + opacityHex;

		let animationCss = "";
		switch (animationType) {
			case "pulse":
				animationCss = `
          @keyframes neonAnimation {
            0%,100% { transform: scale(1); }
            50% { transform: scale(${1 + level / 100}); }
          }
          .neonText__exampleText {
            animation: neonAnimation ${time}s infinite;
          }
        `;
				break;
			case "sharp":
				let sharpShadowCss = "";
				for (let i = 5; i <= 20; i *= 2) {
					sharpShadowCss += `0 0 ${(i / 50) * blur}px #fff,`;
				}
				for (let i = 20; i <= 40 + 10 * size; i += 10) {
					sharpShadowCss += `0 0 ${(i / 50) * blur}px ${colorWithOpacity},`;
				}
				sharpShadowCss = sharpShadowCss.slice(0, -1);

				const sharpEndPercent = Math.min(41 + Math.round(30 / time) / 10, 100);
				const sharpMiddlePercent = Math.round(41 + Math.min(18 / time, 10)) + Math.min(Math.round(30 / time) / 10, 1);

				animationCss = `
          @keyframes neonAnimation {
            0%,40%,${sharpEndPercent}%,${sharpMiddlePercent}%,100% {
              text-shadow: ${sharpShadowCss}
            }
            41%,${Math.round(41 + Math.min(18 / time, 10))}% {
              text-shadow: none
            }
          }
          .neonText__exampleText {
            transition: 0s;
            animation: neonAnimation ${time}s step-end infinite;
          }
        `;
				break;
			case "smooth":
				let initialShadowCss = "";
				for (let i = 5; i <= 20; i *= 2) {
					initialShadowCss += `0 0 ${(i / 50) * blur + level / 10}px #fff,`;
				}
				for (let i = 20; i <= 40 + 10 * size; i += 10) {
					initialShadowCss += `0 0 ${(i / 50) * blur}px ${colorWithOpacity},`;
				}
				initialShadowCss = initialShadowCss.slice(0, -1);

				let endShadowCss = "";
				for (let i = 5; i <= 20; i *= 2) {
					endShadowCss += `0 0 ${(i / 50) * blur}px #fff,`;
				}
				for (let i = 20; i <= 40 + 10 * size; i += 10) {
					endShadowCss += `0 0 ${(i / 50) * blur + level / 4}px ${colorWithOpacity},`;
				}
				endShadowCss = endShadowCss.slice(0, -1);

				animationCss = `
          @keyframes neonAnimation {
            0%,100% { text-shadow: ${initialShadowCss}}
            40% { text-shadow: ${endShadowCss} }
          }
          .neonText__exampleText {
            animation: neonAnimation ${time}s infinite;
          }
        `;
				break;
			default:
				break;
		}

		style.textContent = animationCss;
	}, [time, level, animationType, blur, size, color, opacity]);

	// Оптимизированные обработчики изменений
	const handleNumberInputChange = useCallback((value: string, setter: (value: number) => void, max: number, min: number = 0) => {
		const numValue = parseFloat(value);
		if (!isNaN(numValue)) {
			setter(Math.max(min, Math.min(numValue, max)));
		}
	}, []);

	const handleSliderChange = useCallback((value: number | number[], setter: (value: number) => void) => {
		setter(typeof value === "number" ? value : value[0]);
	}, []);

	const handleCopyCss = useCallback(() => {
		let copyText = "";
		if (animationType === "off") {
			copyText = `text-shadow: ${shadowCss};`;
		} else {
			const styleElement = document.getElementById("neon-animation-style");
			if (styleElement) {
				copyText = styleElement.textContent?.replace(".neonText__exampleText {", ".neon-text {")?.replace("text-shadow: none", "") || "";
			}
		}

		navigator.clipboard.writeText(copyText).then(() => {
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		});
	}, [animationType, shadowCss, setCopied]);

	return (
		<div className="conteiner">
			<div className="neonText">
				<Card className="neonText__box">
					<div className="neonText__example">
						<p
							className="neonText__exampleText"
							style={{
								textShadow: shadowCss,
								animationPlayState: animationType === "off" ? "paused" : "running",
							}}
						>
							Neon text
						</p>
					</div>
				</Card>

				<Card className="neonText__settings">
					{/* Blur Slider */}
					<Slider
						classNames={{ base: "max-w-md", label: "text-medium" }}
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
									onChange={(e) => handleNumberInputChange(e.target.value, setBlur, 100)}
									onKeyDown={(e) => e.key === "Enter" && setBlur(blur)}
								/>
							</output>
						)}
						size="md"
						step={1}
						value={blur}
						onChange={(value) => handleSliderChange(value, setBlur)}
					/>

					{/* Size Slider */}
					<Slider
						classNames={{ base: "max-w-md", label: "text-medium" }}
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
									onChange={(e) => handleNumberInputChange(e.target.value, setSize, 10)}
									onKeyDown={(e) => e.key === "Enter" && setSize(size)}
								/>
							</output>
						)}
						size="md"
						step={1}
						value={size}
						onChange={(value) => handleSliderChange(value, setSize)}
					/>

					{/* Color Block */}
					<div className="neonText__colorBlock">
						<input type="color" onChange={(e) => setColor(e.target.value)} value={color} className="neonText__color" />
						<input type="text" onChange={(e) => setColor(e.target.value)} value={color} className="neonText__colorCode" />
						<Slider value={opacity} onChange={(value) => handleSliderChange(value, setOpacity)} aria-label="Opacity" className="max-w-md neonText__opacitySlider" maxValue={100} minValue={0} size="sm" step={1} />
						<input max={100} min={0} aria-label="Opacity value" className="neonText__opacity" type="number" value={opacity} onChange={(e) => handleNumberInputChange(e.target.value, setOpacity, 100)} />
					</div>

					{/* Animation Tabs */}
					<p className="neonText__text">Animation</p>
					<Tabs selectedKey={animationType} className="neonText__tabs" onChange={(key) => setAnimationType(key as any)}>
						<Tab key="off" title="Off" />
						<Tab key="smooth" title="Smooth" />
						<Tab key="sharp" title="Sharp" />
						<Tab key="pulse" title="Pulse" />
					</Tabs>

					{/* Time Slider */}
					<Slider
						classNames={{ base: "max-w-md", label: "text-medium" }}
						label="Time"
						isDisabled={animationType === "off"}
						maxValue={10}
						minValue={0.1}
						renderValue={({ children, ...props }) => (
							<output {...props}>
								<input
									max={10}
									min={0.1}
									step={0.1}
									aria-label="Time value"
									className="neonText__numberBox"
									type="number"
									value={time}
									onChange={(e) => handleNumberInputChange(e.target.value, setTime, 10, 0.1)}
									onKeyDown={(e) => e.key === "Enter" && setTime(time)}
								/>
							</output>
						)}
						size="md"
						step={0.1}
						value={time}
						onChange={(value) => handleSliderChange(value, setTime)}
					/>

					{/* Level Slider */}
					<Slider
						classNames={{ base: "max-w-md", label: "text-medium" }}
						isDisabled={animationType === "off" || animationType === "sharp"}
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
									onChange={(e) => handleNumberInputChange(e.target.value, setLevel, 100)}
									onKeyDown={(e) => e.key === "Enter" && setLevel(level)}
								/>
							</output>
						)}
						size="md"
						step={1}
						value={level}
						onChange={(value) => handleSliderChange(value, setLevel)}
					/>

					{/* Action Buttons */}
					<Button onClick={handleCopyCss} color="primary" className="gradient__copyButton" variant="solid">
						Copy CSS
					</Button>

					<Button size="md" className="neonText__randomizeButton" onClick={randomizeValues}>
						Randomize
					</Button>
				</Card>
			</div>
		</div>
	);
}

export default NeonText;
