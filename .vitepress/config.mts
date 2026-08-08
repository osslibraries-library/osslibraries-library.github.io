import { readFileSync } from "node:fs";
import { defineConfig } from "vitepress";
import { groupIconMdPlugin, groupIconVitePlugin } from "vitepress-plugin-group-icons";

const readSvg = (name: string) =>
  readFileSync(new URL(`./theme/icons/${name}`, import.meta.url), "utf8")
    .replace(/^<\?xml[^>]*\?>/, "")
    .trimStart();

const ogDescription =
  "Open-source license scanning and display for HarmonyOS. Scan OHPM dependencies at build time and render a complete license list in your app.";

export default defineConfig({
  lang: "en-US",
  title: "OSSLibraries",
  description: ogDescription,
  cleanUrls: true,
  lastUpdated: true,
  head: [
    ["meta", { name: "theme-color", content: "#0a0c12" }],
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:title", content: "OSSLibraries" }],
    ["meta", { property: "og:description", content: ogDescription }],
  ],

  locales: {
    root: {
      label: "English",
      lang: "en",
      link: "/",
      themeConfig: {
        nav: [
          { text: "Guide", link: "/guide/introduction", activeMatch: "/guide/" },
          { text: "Library", link: "/guide/library/quick-start", activeMatch: "/guide/library/" },
          { text: "Hvigor Plugin", link: "/guide/plugin/overview", activeMatch: "/guide/plugin/" },
          {
            text: "GitHub",
            link: "https://github.com/composable-tu/osslibraries",
          },
        ],
        sidebar: [
          {
            text: "Getting Started",
            items: [
              { text: "Introduction", link: "/guide/introduction" },
              { text: "Quick Start", link: "/guide/getting-started" },
              { text: "Architecture", link: "/guide/architecture" },
            ],
          },
          {
            text: "Library",
            items: [
              { text: "Prebuilt UI Pages", link: "/guide/library/quick-start" },
              { text: "Wearable Apps", link: "/guide/library/wearable" },
              { text: "Custom UI", link: "/guide/library/custom-ui" },
              { text: "Loading & Parsing", link: "/guide/library/loading" },
              { text: "Data Model", link: "/guide/library/data-model" },
            ],
          },
          {
            text: "Hvigor Plugin",
            items: [
              { text: "Overview", link: "/guide/plugin/overview" },
              { text: "Installation", link: "/guide/plugin/installation" },
              { text: "Configuration", link: "/guide/plugin/configuration" },
              { text: "Output Formats", link: "/guide/plugin/output-formats" },
              { text: "How It Works", link: "/guide/plugin/how-it-works" },
              { text: "Programmatic Use", link: "/guide/plugin/programmatic" },
            ],
          },
        ],
      },
    },
    zh: {
      label: "简体中文",
      lang: "zh-CN",
      link: "/zh/",
      markdown: {
        container: {
          tipLabel: "提示",
          infoLabel: "信息",
          warningLabel: "警告",
          dangerLabel: "危险",
          noteLabel: "备注",
          detailsLabel: "详情",
          importantLabel: "重要",
          cautionLabel: "注意",
        },
        codeCopyButton: {
          tooltipText: "复制代码",
          copiedText: "已复制",
        },
      },
      themeConfig: {
        nav: [
          { text: "指南", link: "/zh/guide/introduction", activeMatch: "/zh/guide/" },
          {
            text: "Library",
            link: "/zh/guide/library/quick-start",
            activeMatch: "/zh/guide/library/",
          },
          {
            text: "Hvigor Plugin",
            link: "/zh/guide/plugin/overview",
            activeMatch: "/zh/guide/plugin/",
          },
          {
            text: "GitHub",
            link: "https://github.com/composable-tu/osslibraries",
          },
        ],
        sidebar: [
          {
            text: "开始使用",
            items: [
              { text: "简介", link: "/zh/guide/introduction" },
              { text: "快速上手", link: "/zh/guide/getting-started" },
              { text: "架构", link: "/zh/guide/architecture" },
            ],
          },
          {
            text: "Library",
            items: [
              { text: "预定义 UI", link: "/zh/guide/library/quick-start" },
              { text: "穿戴设备应用", link: "/zh/guide/library/wearable" },
              { text: "自定义 UI", link: "/zh/guide/library/custom-ui" },
              { text: "加载与解析", link: "/zh/guide/library/loading" },
              { text: "数据模型", link: "/zh/guide/library/data-model" },
            ],
          },
          {
            text: "Hvigor Plugin",
            items: [
              { text: "概览", link: "/zh/guide/plugin/overview" },
              { text: "安装", link: "/zh/guide/plugin/installation" },
              { text: "配置", link: "/zh/guide/plugin/configuration" },
              { text: "输出格式", link: "/zh/guide/plugin/output-formats" },
              { text: "工作原理", link: "/zh/guide/plugin/how-it-works" },
              { text: "编程式调用", link: "/zh/guide/plugin/programmatic" },
            ],
          },
        ],
        outline: { label: "本页目录" },
        docFooter: { prev: "上一页", next: "下一页" },
        darkModeSwitchLabel: "外观",
        darkModeSwitchTitle: "切换到深色模式",
        lightModeSwitchTitle: "切换到浅色模式",
        sidebarMenuLabel: "菜单",
        returnToTopLabel: "返回顶部",
        langMenuLabel: "切换语言",
        skipToContentLabel: "跳转到内容",
        lastUpdated: { text: "最后更新于" },
        editLink: {
          pattern: "https://github.com/osslibraries-library/docs/edit/main/:path",
          text: "在 GitHub 上编辑此页",
        },
      },
    },
  },

  themeConfig: {
    siteTitle: "OSSLibraries",
    socialLinks: [{ icon: "github", link: "https://github.com/composable-tu/osslibraries" }],
    editLink: {
      pattern: "https://github.com/osslibraries-library/docs/edit/main/:path",
      text: "Edit this page on GitHub",
    },
    search: {
      provider: "local",
      options: {
        locales: {
          root: {
            translations: {
              button: { buttonText: "Search docs", buttonAriaLabel: "Search docs" },
              modal: {
                noResultsText: "No results for",
                resetButtonTitle: "Clear query",
                footer: { selectText: "to select", navigateText: "to navigate" },
              },
            },
          },
          zh: {
            translations: {
              button: { buttonText: "搜索文档", buttonAriaLabel: "搜索文档" },
              modal: {
                displayDetails: "显示详细信息",
                cancelButtonTitle: "取消",
                resetButtonTitle: "清除查询",
                backButtonTitle: "返回",
                noResultsText: "没有找到相关结果",
                footer: { selectText: "选择", navigateText: "切换", closeText: "关闭" },
              },
            },
          },
        },
      },
    },
  },

  markdown: {
    lineNumbers: false,
    languageAlias: {
      ets: "ts",
      arcts: "ts",
    },
    config(md) {
      md.use(groupIconMdPlugin);
    },
  },

  vite: {
    plugins: [
      groupIconVitePlugin({
        customIcon: {
          ".ets": readSvg("arkts.svg"),
          vlt: {
            light: readSvg("vlt-dark.svg"),
            dark: readSvg("vlt-light.svg"),
          },
        },
      }),
    ],
  },
});
