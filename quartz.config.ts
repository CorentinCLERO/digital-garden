import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

const config: QuartzConfig = {
  configuration: {
    pageTitle: "Digital Garden",
    pageTitleSuffix: "A way to share my thoughts",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "misterxcrypt.github.io",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Offside",
        body: "Overpass",
        code: "JetBrains Mono",
      },
      colors: {
        lightMode: {
          light: "#FFFFFF",
          lightgray: "#F0F2F5",
          gray: "#94A3B8",
          darkgray: "#334155",
          dark: "#0F172A",
          secondary: "#3B82F6",
          tertiary: "#60A5FA",
          highlight: "rgba(59, 130, 246, 0.15)",
          textHighlight: "#FEF08A"
        },
        darkMode: {
          light: "#101D29",
          lightgray: "#1C3144",
          gray: "#41739F",
          darkgray: "#E8DAB2",
          dark: "#FF9A1F",
          secondary: "#8F4F00",
          tertiary: "#522D00",
          highlight: "rgba(143, 159, 169, 0.15)",
          textHighlight: "#FFDD4A"
        }
        // darkMode: {
        //   light: "#373534",        // Darker background for better contrast  
        //   lightgray: "#494745",    // Subtle contrast for UI elements  
        //   gray: "#8d8d8d",         // Medium gray for secondary elements  
        //   darkgray: "#d4d4d4",     // Well-balanced gray for subtext and secondary text  
        //   dark: "#fcf2d8",         // Warm beige for main text (readable but not harsh)  
        //   secondary: "#feb976",    // Muted golden-yellow for buttons and accents  
        //   tertiary: "#bb8a3e",     // Darker gold for subheadings (less bright)  
        //   highlight: "rgba(131, 165, 152, 0.3)",  // Soft teal-green for background highlights  
        //   textHighlight: "#7b6e1b", // Muted teal-blue for text highlights (clear contrast with white text)  
        // }
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
          dark: "github-dark",
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
