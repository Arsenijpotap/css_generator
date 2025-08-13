/** @format */

"use client";
import "./BorderRadius.scss";
import "../../styles/reset.scss";
import "../../styles/main.scss";
import { Card } from "@heroui/card";
import { Select, SelectItem } from "@heroui/select";
import { Tabs, Tab } from "@heroui/tabs";
import { Switch } from "@heroui/switch";
import { Button } from "@heroui/button";
import { Slider } from "@heroui/slider";
import { addToast } from "@heroui/toast";
import useGradientStore from "@/stores/gradientStore";
import off from "@/public/images/off.png";
import hor from "@/public/images/hor.png";
import vert from "@/public/images/vert.png";
import all from "@/public/images/all.png";
import diag from "@/public/images/diag.png";
import border from "@/public/images/border.png";
import Image from "next/image";
import useBorderRadiusStore from "@/stores/borderRadiusStore";
import useAppStore from "@/stores/appStore";
import CopyButton from "@/components/CopyButton/CopyButton";
import RandomizeButton from "@/components/RandomizeButton/RandomizeButton";

export const linkTypes = [
	{
		id: 1,
		name: "Off",
		avatar: off,
	},
	{
		id: 2,
		name: "All",
		avatar: all,
	},
	{
		id: 3,
		name: "Horizontal",
		avatar: hor,
	},
	{
		id: 4,
		name: "Vertical",
		avatar: vert,
	},
	{
		id: 5,
		name: "Diagonal",
		avatar: diag,
	},
];
export default function BorderRadius() {
	const directions = [
		["top", "left"],
		["top", "right"],
		["bottom", "right"],
		["bottom", "left"],
	];

	const unit = useBorderRadiusStore((state) => state.unit);
	const setUnit = useBorderRadiusStore((state) => state.setUnit);
	const radiusValues = useBorderRadiusStore((state) => state.radiusValues);
	const setValue = useBorderRadiusStore((state) => state.setValue);
	const setSplitValues = useBorderRadiusStore((state) => state.setSplitValues);
	const isSimmetryActive = useBorderRadiusStore((state) => state.isSimmetryActive);
	const toggleSimmetryActive = useBorderRadiusStore((state) => state.toggleSimmetryActive);
	const linkType = useBorderRadiusStore((state) => state.linkType);
	const setLinkType = useBorderRadiusStore((state) => state.setLinkType);
	const updateValues = useBorderRadiusStore((state) => state.updateValues);
	const randomizeValues = useBorderRadiusStore((state) => state.randomizeValues);
	let borderRadiusCss = +!isSimmetryActive
		? "" +
			radiusValues["top-left"].first +
			unit +
			" " +
			radiusValues["top-right"].first +
			unit +
			" " +
			radiusValues["bottom-right"].first +
			unit +
			" " +
			radiusValues["bottom-left"].first +
			unit +
			" " +
			"/  " +
			radiusValues["top-left"].second +
			unit +
			" " +
			radiusValues["top-right"].second +
			unit +
			" " +
			radiusValues["bottom-right"].second +
			unit +
			" " +
			radiusValues["bottom-left"].second +
			unit
		: "" + radiusValues["top-left"].first + unit + " " + radiusValues["top-right"].first + unit + " " + radiusValues["bottom-right"].first + unit + " " + radiusValues["bottom-left"].first + unit + " ";
	console.log(borderRadiusCss);
	let index = 1;
	linkTypes.forEach((value, ind) => {
		console.log(value.name, linkType);
		if (value.name.toLowerCase() == linkType) {
			index = ind + 1;
		}
	});
	let copyText = "	border-radius: " + borderRadiusCss + ";";
	return (
		<div className="conteiner">
			<div className="main borderRadius">
				<Card className="box">
					<div className="borderRadius__example" style={{ borderRadius: borderRadiusCss }}></div>
				</Card>
				<Card className="settings">
					<div className="borderRadius__wrapper">
						<div>
							<p className="borderRadius__text">Link type</p>

							<Select
								classNames={{
									base: "w-[200px] borderRadius__select",
									trigger: "h-12 borderRadius__select",
								}}
								items={linkTypes}
								// size=""
								// label="Link type"
								labelPlacement="outside"
								defaultSelectedKeys={index.toString()}
								placeholder="Select a link type"
								renderValue={(items) => {
									return items.map((item) => (
										<div key={item.key} className="flex items-center gap-2">
											<Image alt={item.data?.name || "type "} className="shrink-0 borderRadius__avatar" src={item.data?.avatar || off} />
											<div className="flex flex-col">
												<span>{item.data?.name}</span>
											</div>
										</div>
									));
								}}
							>
								{(type) => (
									<SelectItem
										onClick={() => {
											setLinkType((type.name.toLowerCase() as "off" | "all" | "horizontal" | "vertical" | "diagonal") || "off");
											updateValues();
										}}
										key={type.id}
										textValue={type.name}
									>
										<div className="flex gap-2 items-center">
											<Image alt={type.name} className="borderRadius__avatar shrink-0" src={type.avatar} />
											<div className="flex flex-col">
												<span className="text-small">{type.name}</span>
											</div>
										</div>
									</SelectItem>
								)}
							</Select>
						</div>
						<div>
							<p className="borderRadius__text">Unit</p>
							<Tabs selectedKey={unit} className="borderRadius__tabs" size="lg">
								<Tab className="borderRadius__tab" key={"px"} onClick={() => setUnit("px")} title="Px"></Tab>
								<Tab className="borderRadius__tab" key={"%"} onClick={() => setUnit("%")} title="%"></Tab>
							</Tabs>
						</div>
					</div>
					<div className="borderRadius__wrapper">
						<p className="borderRadius__text">Symmetry</p>

						<Switch
							onChange={(e) => {
								toggleSimmetryActive();
								setTimeout(() => {
									directions.forEach((arr) => {
										let name = (arr[0] + "-" + arr[1]) as "top-right" | "top-left" | "bottom-left" | "bottom-right";
										setValue(name, radiusValues[name].first);
									});
									console.log(isSimmetryActive);
								}, 100);
							}}
							defaultSelected
							size="sm"
							isSelected={isSimmetryActive}
						></Switch>
					</div>
					<div className="borderRadius__line"></div>
					{directions.map((arr, index) => {
						let rotate = -90 + index * 90;
						let name = (arr[0] + "-" + arr[1]) as "top-right" | "top-left" | "bottom-left" | "bottom-right";
						console.log(name);
						return (
							<div key={name}>
								<div className="borderRadius__radiusBlock">
									<Image className="borderRadius__avatar" style={{ rotate: rotate + "deg" }} alt={arr[0] + "-" + arr[1] + " direction"} src={border}></Image>
									<div className="borderRadius__box">
										{/* <p className="borderRadius__text">{name}</p> */}
										<div className="borderRadius__slidersWrapper">
											{isSimmetryActive ? (
												<div style={{ width: isSimmetryActive ? "330px" : "" }} className="borderRadius__sliderWrapper">
													<Slider
														value={radiusValues[name].first}
														onChange={(e) => {
															setValue(name, typeof e == "number" ? e : e[0]);
														}}
														aria-label="Radius value"
														className="max-w-md borderRadius__firstValueSlider"
														maxValue={100}
														minValue={0}
														size="sm"
														step={1}
													/>
													<input
														max={100}
														min={0}
														aria-label="Radius value"
														className="borderRadius__firstValue"
														type="number"
														value={radiusValues[name].first}
														onChange={(e) => {
															const v = parseFloat(e.target.value);
															if (v <= 100) setValue(name, v);
															if (v > 100) setValue(name, 100);
															if (v < 0) setValue(name, 0);
															if (Number.isNaN(v)) setValue(name, 0);
														}}
													/>
												</div>
											) : (
												<div style={{ width: isSimmetryActive ? "330px" : "" }} className="borderRadius__sliderWrapper">
													<Slider
														value={radiusValues[name].first}
														onChange={(e) => {
															setSplitValues(name, typeof e == "number" ? e : e[0], radiusValues[name].second);
														}}
														aria-label="Radius value"
														className="max-w-md borderRadius__firstValueSlider"
														maxValue={100}
														minValue={0}
														size="sm"
														step={1}
													/>
													<input
														max={100}
														min={0}
														aria-label="Radius value"
														className="borderRadius__firstValue"
														type="number"
														value={radiusValues[name].first}
														onChange={(e) => {
															const v = parseFloat(e.target.value);
															if (v <= 100) setSplitValues(name, v, radiusValues[name].second);
															if (v > 100) setSplitValues(name, 100, radiusValues[name].second);
															if (v < 0) setSplitValues(name, 0, radiusValues[name].second);
															if (Number.isNaN(v)) setSplitValues(name, 0, radiusValues[name].second);
														}}
													/>
												</div>
											)}
											<div style={{}} className="borderRadius__sliderWrapper">
												<Slider
													value={radiusValues[name].second}
													onChange={(e) => {
														setSplitValues(name, radiusValues[name].first, typeof e == "number" ? e : e[0]);
													}}
													aria-label="Radius value"
													className="max-w-md borderRadius__firstValueSlider"
													maxValue={100}
													minValue={0}
													size="sm"
													step={1}
												/>
												<input
													max={100}
													min={0}
													aria-label="Radius value"
													className="borderRadius__firstValue"
													type="number"
													value={radiusValues[name].second}
													onChange={(e) => {
														const v = parseFloat(e.target.value);
														if (v <= 100) setSplitValues(name, radiusValues[name].first, v);
														if (v > 100) setSplitValues(name, radiusValues[name].first, 100);
														if (v < 0) setSplitValues(name, radiusValues[name].first, 0);
														if (Number.isNaN(v)) setSplitValues(name, radiusValues[name].first, 0);
													}}
												/>
											</div>
										</div>
									</div>
								</div>

								{index < 3 ? <div className="borderRadius__line"></div> : <></>}
							</div>
						);
					})}
					<CopyButton text={copyText}></CopyButton>
					<RandomizeButton randomizeFunction={randomizeValues}></RandomizeButton>
				</Card>
			</div>
		</div>
	);
}
