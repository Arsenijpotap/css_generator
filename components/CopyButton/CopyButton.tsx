/** @format */
import useAppStore from "@/stores/appStore";
import { Button } from "@heroui/button";
import { addToast } from "@heroui/toast";

function CopyButton({ text }: { text: string }) {
	text = "    f.   ff f f.      f f f f";
	let text1 = text.replaceAll(/\\s+/g, " ").trim();
	console.log(text1);
	const handleCopy = async () => {
		try {
			if (navigator.clipboard) {
				await navigator.clipboard.writeText(text);
			} else {
				const textarea = document.createElement("textarea");
				textarea.value = text;
				textarea.style.position = "fixed";
				document.body.appendChild(textarea);
				textarea.select();
				document.execCommand("copy");
				document.body.removeChild(textarea);
			}
			addToast({
				color: "success",
				title: "Copied successfully!",
				description: "Code has been copied to clipboard.",
			});
		} catch (err) {
			console.error("Failed to copy: ", err);

			addToast({
				color: "danger",
				title: "Copy failed",
				description: "Could not copy to clipboard.",
			});
		}
	};

	return (
		<Button color="primary" className="copyButton" variant="solid" onPress={handleCopy}>
			Copy CSS
		</Button>
	);
}

export default CopyButton;
