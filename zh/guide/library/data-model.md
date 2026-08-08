# 数据模型

元数据无论以 JSON 还是 MessagePack 形式存在，都遵循同一种数据结构。本页给出该结构的完整定义及对应的 ArkTS 类型。

## 根对象

```json [osslibraries.json]
{
  "libraries": [{ "…": "…", "licenses": ["<hash>"] }],
  "licenses": { "<hash>": { "…": "…" } }
}
```

`libraries` 是库条目的数组，`licenses` 是一张从内容哈希到许可证条目的映射。库通过哈希来引用许可证——内容相同的许可证文本会归并成一条共享的条目，只存一份。

## Library

| 字段              | 类型                 | 说明                                |
| ----------------- | -------------------- | ----------------------------------- |
| `uniqueId`        | string               | 不含版本号的包名。必填。            |
| `artifactVersion` | string               | 产物版本。                          |
| `name`            | string               | 显示名称，缺失时回退为 `uniqueId`。 |
| `description`     | string               |                                     |
| `website`         | string               |                                     |
| `developers`      | Developer[]          |                                     |
| `organization`    | Organization \| null |                                     |
| `scm`             | Scm \| null          |                                     |
| `licenses`        | License[]            | 解析时根据哈希引用解析。            |
| `funding`         | Funding[]            |                                     |
| `tag`             | string[]             |                                     |

在代码中，每个条目是 `Library` 实例，带有两个便捷 getter：`artifactId` 返回 `uniqueId:artifactVersion`；`openSource` 在 `scm.url` 非空时为 true。

## License

| 字段      | 类型   | 说明                    |
| --------- | ------ | ----------------------- |
| `hash`    | string | 唯一键；引用本条目。    |
| `name`    | string | 人类可读的名称。        |
| `url`     | string | 许可证的托管页面。      |
| `spdxId`  | string | SPDX 标识符，如 `MIT`。 |
| `content` | string | 完整许可证全文。        |

在 ArkTS 中，文本字段名为 `licenseContent`（JSON 中为 `content`）。文本包含年份时，`year` 也会被解析。

## Developer、Organization、Scm、Funding

- `Developer` —— name、organisationUrl
- `Organization` —— name、url
- `Scm` —— connection、developerConnection、url
- `Funding` —— platform、url

## 一个真实示例

这是从某个扫描项目里提取的真实条目，稍作精简。一个库条目长这样：

```json [osslibraries.json]
{
  "uniqueId": "@ohos/hypium",
  "artifactVersion": "1.0.28",
  "name": "@ohos/hypium",
  "description": "A mock framework for OpenHarmony application.",
  "website": "https://gitee.com/openharmony/testfwk_arkxtest",
  "developers": [{ "name": "huawei", "organisationUrl": "" }],
  "scm": {
    "connection": "",
    "developerConnection": "",
    "url": "https://gitee.com/openharmony/testfwk_arkxtest"
  },
  "organization": null,
  "funding": [],
  "tag": [],
  "licenses": ["0cec06e0e55fbc3dc5cee4fca9b607f66cb8f4e4dbcf3b3c013594dd156732e9"]
}
```

它引用的许可证条目，以文本的 SHA-256 哈希作为键，带着完整全文：

```json [osslibraries.json]
{
  "hash": "0cec06e0e55fbc3dc5cee4fca9b607f66cb8f4e4dbcf3b3c013594dd156732e9",
  "name": "Apache License, Version 2.0",
  "url": "https://www.apache.org/licenses/LICENSE-2.0",
  "spdxId": "Apache-2.0",
  "content": "Apache License\nVersion 2.0, January 2004\nhttp://www.apache.org/licenses/\n\nTERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION…"
}
```

最后说明一下哈希的来历：这里的值是包内 LICENSE 文件文本的 SHA-256。当某个包没有自带 LICENSE 文件时，条目就改用它的 SPDX 标识符作键（比如 `"MIT"`），而文本则取自 SPDX 的规范许可证列表。
