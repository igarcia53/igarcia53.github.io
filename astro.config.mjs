import {defineConfig} from "astro/config"
import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"
import tailwind from "@astrojs/tailwind"
import solidJs from "@astrojs/solid-js"
import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
    site: "https://igarcia53.github.io",
    integrations: [
        mdx(),
        sitemap(),
        solidJs(),
        tailwind({applyBaseStyles: false}),
        partytown({
            config: {
                forward: ["dataLayer.push"],
            },
        }),
    ],
})