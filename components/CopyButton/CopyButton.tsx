/** @format */
import useAppStore from "@/stores/appStore";
import { Button } from "@heroui/button";
import { addToast } from "@heroui/toast";
function CopyButton({ text }: { text: string }) {
	const copied = useAppStore((state) => state.copied);
	const setCopied = useAppStore((state) => state.setCopied);
	const handleCopy = async () => {
		try {
			// Пытаемся использовать modern API
			if (navigator.clipboard) {
				await navigator.clipboard.writeText(text);
			} else {
				// Fallback для старых браузеров
				const textarea = document.createElement("textarea");
				textarea.value = text;
				textarea.style.position = "fixed";
				document.body.appendChild(textarea);
				textarea.select();
				document.execCommand("copy");
				document.body.removeChild(textarea);
			}

			setCopied(true);
			setTimeout(() => setCopied(false), 2000);

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
