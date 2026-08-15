---
layout: home

hero:
  name: OSSLibraries
  text: for HarmonyOS apps
  tagline: 在构建时扫描 OHPM 依赖，并在应用内渲染对应的许可证列表。
  actions:
    - theme: brand
      text: 快速上手
      link: /zh/guide/getting-started
    - theme: alt
      text: 在 GitHub 上查看
      link: https://github.com/composable-tu/osslibraries

features:
  - title: 端到端
    details: 从依赖扫描到应用内展示由同一条流水线完成，列表反映实际打包进 HAP 的依赖。
  - title: 开箱即用
    details: 注册一次 Hvigor 插件，每次构建都会根据当前 oh_modules 重新生成元数据。
  - title: 预定义 UI
    details: 基于 ArkUI 和 UI Design Kit 的列表页与详情页，导入页面即可通过命名路由访问。
  - title: 精准识别
    details: 完整解析 Apache-2.0 OR MIT 等 SPDX 表达式，并自动纠正常见的拼写错误。
  - title: 完整许可证全文
    details: 优先读取包内自带的 LICENSE 文件，缺失时回退到 SPDX 规范文本。
  - title: 自定义 UI
    details: 可单独使用 Core 包加载并解析数据，渲染方式由你决定。
---

> [!TIP]
> 本项目提供 Skills，可让 AI Agent 帮你完成项目接入。
>
> ::: code-group
>
> ```zsh [npm]
> npx skills add composable-tu/osslibraries
> ```
>
> ```zsh [pnpm]
> pnpm dlx skills add composable-tu/osslibraries
> ```
>
> ```zsh [Yarn]
> yarn dlx skills add composable-tu/osslibraries
> ```
>
> ```zsh [Bun]
> bunx skills add composable-tu/osslibraries
> ```
>
> ```zsh [Deno]
> deno x npm:skills add composable-tu/osslibraries
> ```
>
> ```zsh [Vite+]
> vpx skills add composable-tu/osslibraries
> ```
>
> ```zsh [vlt]
> vlx skills add composable-tu/osslibraries
> ```
>
> :::

::: info 什么是 SPDX？
[SPDX](https://spdx.dev/learn/overview/)（Software Package Data Exchange，软件包数据交换标准）是一项用于交换软件物料清单信息的开放标准，涵盖来源、许可、安全及其他相关信息。SPDX 通过为组织和社区提供共享重要数据的通用格式，减少了重复工作，从而简化并提升了合规性、安全性和可靠性。SPDX 规范已被作为安全、许可合规性及其他软件供应链工件的国际开放标准（ISO/IEC 5962:2021）。

OSSLibraries 使用 [SPDX License List](https://spdx.org/licenses/) 来识别并展示每个依赖的许可证。
:::
