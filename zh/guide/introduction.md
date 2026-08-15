# 简介

OSSLibraries 为 HarmonyOS 应用提供开源许可证的展示能力。它在构建时扫描 OHPM 依赖，将许可证信息写入应用的资源目录；运行时将其渲染为列表页与详情页。

该清单无需手动维护，也不会过时：列表内容与 HAP 中实际打包的依赖一致。

::: warning 不支持仓颉（Cangjie）应用
按照华为的文档，仓颉鸿蒙应用既不能增加 ArkTS 页面，也不能调用三方 ArkTS 库，而本库正是建立在 ArkTS 页面与组件之上的，所以仓颉应用用不了它。
:::

## 两个部分

项目由两个包组成，分别对应构建时与运行时：

- **`osslibraries`**（HarmonyOS 库）——运行时的部分。负责从 rawfile 中读取、解析数据，提供两种用法：使用预定义的列表页与详情页，或仅使用其核心 API 自行构建界面。
- **`osslibraries-hvigor-plugin`**（Hvigor 插件）——构建时的部分。以 Hvigor 任务的形式运行，扫描 `oh_modules/` 下的依赖，将许可证元数据写入模块的 `rawfile/` 目录。

两个包可搭配使用，也可单独使用：只用插件生成数据，或只用核心库读取数据。

## 为什么需要它

HarmonyOS 应用会打包多个三方 OHPM 库，每个库都带有各自的许可证义务。手工维护许可证列表容易失真：依赖升级、新增包、模块改名后，列表很快就会与 HAP 中实际发布的依赖不一致。

OSSLibraries 将维护工作交给构建过程：每次构建时插件检查真实的依赖树，库渲染的即当时实际存在的依赖。

## 功能

- 从 `oh_modules/` 生成的许可证元数据，而非手工维护的 JSON。
- 每个依赖的完整许可证全文：优先读取包内自带的 LICENSE 文件，缺失时使用 SPDX 规范文本。
- 正确处理 SPDX 表达式（`Apache-2.0 OR MIT`）、常见拼写错误、同一依赖多版本等情况。
- 运行时的两种选择：使用预定义页面，或使用核心 API 自建 UI。

::: info 什么是 SPDX？
[SPDX](https://spdx.dev/learn/overview/)（Software Package Data Exchange，软件包数据交换标准）是一项用于交换软件物料清单信息的开放标准，涵盖来源、许可、安全及其他相关信息。SPDX 通过为组织和社区提供共享重要数据的通用格式，减少了重复工作，从而简化并提升了合规性、安全性和可靠性。SPDX 规范已被作为安全、许可合规性及其他软件供应链工件的国际开放标准（ISO/IEC 5962:2021）。

OSSLibraries 使用 [SPDX License List](https://spdx.org/licenses/) 来识别并展示每个依赖的许可证。
:::

## 环境要求

- 一个基于 ArkTS 页面（ArkUI）构建的 HarmonyOS 应用。
- 带 Hvigor 构建系统的 DevEco Studio。

## 接下来读什么

- [快速上手](/zh/guide/getting-started) —— 开始使用。
- [架构](/zh/reference/architecture) —— 两个部分的配合方式。
