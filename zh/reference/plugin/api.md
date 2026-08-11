# Hvigor Plugin API 参考

`osslibraries-hvigor-plugin` 包的所有导出都在同一个入口。每个导出在下文中列出，附签名与行为。

## ossScanPlugin

创建 Hvigor 插件。在 `hvigorfile.ts` 中调用它，并把返回值放进 `plugins` 数组。

```ts
ossScanPlugin(options?: OssScanPluginOptions): HvigorPlugin
```

`OssScanPluginOptions` 的每个字段都是可选的。

### 选项

**`selfModules`** _(string[]，默认 `[]`)_
属于项目自身、不应出现在许可证列表中的模块名。注册插件所在的模块总是会被自动排除。

**`outputFile`** _(string)_
相对模块目录的输出路径。省略时默认为 `src/main/resources/rawfile/osslibraries.<ext>`，其中 `<ext>` 跟随 `format`。

**`format`** _(OutputFormat，默认 `OutputFormat.JSON`)_
生成元数据的输出格式。建议优先使用 `OutputFormat` 枚举成员而非原始字符串。

## OutputFormat

支持的输出格式枚举：

| 成员          | 值               |
| ------------- | ---------------- |
| `JSON`        | `"json"`         |
| `MessagePack` | `"message-pack"` |

任何期望枚举的位置也接受原始字符串（`"json"`、`"message-pack"`）。

## scanProject

运行完整扫描并返回结果。

```ts
scanProject(projectRoot: string, options?: ScanOptions): ScanResult
```

`ScanOptions` 携带 `selfModules?: Set<string>` —— 需要跳过的模块名。默认集合始终包含 `"entry"`，外加你提供的模块。

`ScanResult` 有两个字段：

- `libraries: LibraryEntry[]` —— 每个依赖一条记录，按名称、再按 semver 排序。
- `licenses: Record<string, LicenseEntry>` —— 从内容哈希到许可证条目的映射。

## serializeResult

把 `ScanResult` 序列化为 JSON 字符串。

```ts
serializeResult(result: ScanResult): string
```

## toOutputObject

构建 OSSLibraries 运行时消费的纯对象结构。两个序列化器编码的正是这一结构，所以它是插件与库之间的共享契约。

```ts
toOutputObject(result: ScanResult): {
  libraries: LibraryEntry[];
  licenses: Record<string, LicenseEntry>;
}
```

## getSerializer

把格式名解析为对应的 `Serializer`。遇到未知格式会抛错，并列出合法的格式名。

```ts
getSerializer(format: string): Serializer
```

一个 `Serializer` 包含：

- `extension: string` —— 不带前导点的文件扩展名（`"json"` 或 `"msgpack"`）。
- `name: string` —— 人类可读的格式名，出现在构建日志中。
- `encode(result: ScanResult): Buffer` —— 把结果编码为可直接写入磁盘的字节。

## buildLibrary

从规范化后的清单组装一个库条目。

```ts
buildLibrary(pkg: OhPackage, pkgDir: string): { lib: LibraryEntry; licenses: LicenseEntry[] }
```

包目录中存在 LICENSE 文件时读取它，并用作完整许可证文本。

## resolveLicense

把一条许可证声明解析为一个或多个许可证条目。

```ts
resolveLicense(declaration: string): LicenseEntry[]
```

能正确处理合法的 SPDX 表达式（`Apache-2.0 OR MIT`），通过 `spdx-correct` 纠正常见拼写错误，并从 SPDX 许可证列表填充规范名称、URL 和全文。未知声明退化为以声明文本命名的精简条目。

## contentHash

计算许可证文本的 SHA-256 十六进制摘要 —— 用于对相同许可证条目去重的键。

```ts
contentHash(text: string): string
```

## oh-package 读取

```ts
parseJson5(text: string): Record<string, unknown>
parseOhPackage(obj: Record<string, unknown>): OhPackage
readOhPackage(filePath: string, fallbackName: string): OhPackage | null
```

`parseJson5` 把 JSON5 字符串解析为纯对象。`parseOhPackage` 把原始清单转换为严格的 `OhPackage` 模型，归一化松散类型的 `author`、`repository`、`license` 字段。`readOhPackage` 读取并解析文件，清单缺省名称时回退到 `fallbackName`，文件不可读时返回 `null`。

## 类型

**`LibraryEntry`**

| 字段              | 类型                                               |
| ----------------- | -------------------------------------------------- |
| `uniqueId`        | string                                             |
| `artifactVersion` | string                                             |
| `name`            | string                                             |
| `description`     | string                                             |
| `website`         | string                                             |
| `developers`      | `Array<{ name, organisationUrl }>`                 |
| `scm`             | `{ connection, developerConnection, url } \| null` |
| `organization`    | unknown                                            |
| `funding`         | unknown[]                                          |
| `tag`             | string[]                                           |
| `licenses`        | string[] —— 哈希引用                               |

**`LicenseEntry`**

| 字段      | 类型   |
| --------- | ------ |
| `hash`    | string |
| `name`    | string |
| `url`     | string |
| `spdxId`  | string |
| `content` | string |

**`ScanResult`**、**`ScanOptions`**、**`OhPackage`**、**`Serializer`** 均以类型形式导出。`OhPackage` 保存归一化后的清单字段：`name`、`version`、`description`、`homepage`、`authorName`、`authorUrl`、`repoUrl`、`licenseDecls`、`keywords`。

编码格式见[输出格式](/zh/reference/plugin/output-formats)，这些结构与运行时库的对应关系见[数据模型](/zh/reference/data-model)。
