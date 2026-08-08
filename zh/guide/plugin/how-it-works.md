# 工作原理

插件注册的 `ossScanLicenses` 任务在每次构建时运行一条小型流水线，共六步。

## 1. 查找依赖

扫描器在项目的每个 `oh_modules/` 目录中查找 `oh-package.json5` 文件，覆盖普通包（`oh_modules/foo/`）与作用域包（`oh_modules/@scope/bar/`）。

## 2. 规范化清单

每个清单均为 JSON5，字段类型不统一：`author`、`repository`、`license` 各有多种形态（字符串或对象、字符串或数组）。扫描器将其统一规范化为严格的模型，后续步骤均基于该模型。

## 3. 解析许可证

每条许可证声明都经过 SPDX 管线：

- 合法的 SPDX 表达式（如 `Apache-2.0 OR MIT`）会被解析出其中的许可证 ID。
- 常见的拼写错误会被纠正（`apache2` → `Apache-2.0`）。
- 规范名称、URL 和完整文本，都取自 SPDX 许可证列表。

## 4. 读取包内许可证文本

包自带 LICENSE 文件时，其文本优先于 SPDX 文本。扫描器匹配 `LICENSE`、`COPYING`、`NOTICE` 的常见拼写与大小写形式。

## 5. 去重

内容相同的许可证文本归并为单一条目，以 SHA-256 内容哈希为键。同一 `name@version` 安装在多个模块中时只收集一次。

## 6. 排序与写入

库先按名称、再按版本排序，版本排序支持 semver。结果序列化后写入 rawfile，构建日志输出本次找到的库数量。

## 哪些模块会被排除

注册插件所在的模块总是会从列表移除，因为其依赖属于项目自身的模块，而非第三方库。需排除其他本地模块时，使用 `selfModules` 配置，见[配置](/zh/guide/plugin/configuration)。
