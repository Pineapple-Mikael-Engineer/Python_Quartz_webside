import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Python Documentacion PineApple",
    pageTitleSuffix: "",
    enableSPA: false,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "pineapple-mikael-engineer.github.io",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        // Mocha Frost — paleta NORD (Polar Night oscurecido + acento Frost).
        // El sitio es dark-only (saved-theme forzado a "dark"), por eso ambos
        // modos comparten la paleta oscura.
        lightMode: {
          light: "#242a34", // base — fondo de pagina
          lightgray: "#3b4252", // surf1 — bordes / hr
          gray: "#949eb2", // muted — texto tenue, lineas del grafo
          darkgray: "#d8dee9", // subtext — texto del cuerpo
          dark: "#eceff4", // text — titulos, iconos, negritas
          secondary: "#88c0d0", // frost1 — enlaces, nodo activo (acento)
          tertiary: "#81a1c1", // frost2 — hover, nodos visitados
          highlight: "rgba(136, 192, 208, 0.15)", // frost1 — fondo de enlaces internos / code
          textHighlight: "#ebcb8b88", // yellow — resaltado ==texto==
        },
        darkMode: {
          light: "#242a34",
          lightgray: "#3b4252",
          gray: "#949eb2",
          darkgray: "#d8dee9",
          dark: "#eceff4",
          secondary: "#88c0d0",
          tertiary: "#81a1c1",
          highlight: "rgba(136, 192, 208, 0.15)",
          textHighlight: "#ebcb8b88",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "nord",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
