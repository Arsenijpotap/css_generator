/** @format */

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "CSS Generator",
	description: "Generate beautiful CSS code for gradients, neon text effects, and border radius with easy-to-use visual tools.",
	navItems: [
		{
			label: "Home",
			href: "/",
		},
		{
			label: "Gradient",
			href: "/gradient",
		},
		{
			label: "Neon Text",
			href: "/neonText",
		},
		{
			label: "Border Radius",
			href: "/borderRadius",
		},
	],
	navMenuItems: [
		{
			label: "Gradient Generator",
			href: "/gradient",
		},
		{
			label: "Neon Text Generator",
			href: "/neonText",
		},
		{
			label: "Border Radius Generator",
			href: "/borderRadius",
		},
		{
			label: "Home",
			href: "/",
		},
	],
	links: {
		github: "https://github.com/Arsenijpotap/css_generator",
	},
};
