/** @format */

"use client";
import "./BorderRadius.scss";
import "../../styles/reset.scss";
import "../../styles/main.scss";
import { Card } from "@heroui/card";
import { Select, SelectItem } from "@heroui/select";
import { Tabs, Tab } from "@heroui/tabs";
import { Switch } from "@heroui/switch";
import useGradientStore from "@/stores/gradientStore";
import off from "@/public/images/off.png";
import hor from "@/public/images/hor.png";
import vert from "@/public/images/vert.png";
import all from "@/public/images/all.png";
import diag from "@/public/images/diag.png";
import border from "@/public/images/border.png";
import Image from "next/image";
import useBorderRadiusStore from "@/stores/borderRadiusStore";

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

	return (
		<div className="conteiner">
			<div className="borderRadius main">
				<Card className="box">
					<div className="borderRadius__example"></div>
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
								defaultSelectedKeys={"2"}
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
									<SelectItem key={type.id} textValue={type.name}>
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

						<Switch defaultSelected size="sm"></Switch>
					</div>
					<div className="borderRadius__line"></div>
					{directions.map((arr, index) => {
						let rotate = -90 + index * 90;
						return (
							<div className="borderRadius__radiusBlock">
								<Image className="borderRadius__avatar" style={{ rotate: rotate + "deg" }} alt={arr[0] + "-" + arr[1] + " direction"} src={border}></Image>
								<p className="borderRadius__text">{arr[0] + "-" + arr[1]}</p>
								<div className="borderRadius__line"></div>
							</div>
						);
					})}
				</Card>
			</div>
		</div>
	);
}
