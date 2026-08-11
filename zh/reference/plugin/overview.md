# 概览

`osslibraries-hvigor-plugin` 是一个 Hvigor 任务，负责扫描 HarmonyOS 项目的 OHPM 依赖，并生成 OSSLibraries 需要的许可证元数据。

它是项目的构建期部分。与库的配合方式见[架构](/zh/reference/architecture)。

## 功能

- 查找 `oh_modules/` 下所有的依赖。
- 规范化每个 `oh-package.json5` 清单。
- 通过 SPDX 管线解析许可证声明。
- 优先读取包内自带的 LICENSE 文件，缺失时使用 SPDX 规范文本。
- 每个版本的依赖单独列出一条记录。
- 将结果以 JSON 或 MessagePack 写入模块的 `rawfile/`。

## 环境要求

- 使用 Hvigor 构建系统的 HarmonyOS 项目。
- 对模块的 `src/main/resources/rawfile/` 目录有写权限。

## 开始使用

- [安装](/zh/guide/plugin/installation)
- [配置](/zh/reference/plugin/configuration)
- [插件 API 参考](/zh/reference/plugin/api)
