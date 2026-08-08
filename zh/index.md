---
layout: home

hero:
  name: OSSLibraries
  text: for HarmonyOS apps
  tagline: 在构建时扫描 OHPM 依赖，并在应用内渲染对应的许可证列表。
  actions:
    - theme: brand
      text: 快速上手
      link: /zh/guide/introduction
    - theme: alt
      text: 在 GitHub 上查看
      link: https://github.com/composable-tu/osslibraries

features:
  - title: 端到端
    details: 从依赖扫描到应用内展示由同一条流水线完成，列表反映实际打包进 HAP 的依赖。
  - title: 开箱即用
    details: 注册一次 Hvigor 插件，每次构建都会根据当前 `oh_modules` 重新生成元数据。
  - title: 预定义 UI
    details: 基于 ArkUI 和 UI Design Kit 的列表页与详情页，导入页面即可通过命名路由访问。
  - title: 精准识别
    details: 完整解析 `Apache-2.0 OR MIT` 等 SPDX 表达式，并自动纠正常见的拼写错误。
  - title: 完整许可证全文
    details: 优先读取包内自带的 LICENSE 文件，缺失时回退到 SPDX 规范文本。
  - title: 自定义 UI
    details: 可单独使用 Core 包加载并解析数据，渲染方式由你决定。
---
