/** @format */

import { Button } from "@heroui/button";

function RandomizeButton({ randomizeFunction }: { randomizeFunction: () => void }) {
	return (
		<Button
			size="md"
			className="randomizeButton"
			onClick={() => {
				randomizeFunction();
			}}
		>
			Randomize
		</Button>
	);
}

export default RandomizeButton;
