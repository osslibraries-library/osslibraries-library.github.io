# Library API 参考

核心包 `osslibraries` 暴露了以下类。所有 ArkTS 代码示例均从 `'osslibraries'` 导入。

## Libs

访问扫描数据的主要入口，持有库列表与去重后的许可证集合。

```ts
new Libs(libraries?: Library[], licenses?: License[])
```

**字段**

- `libraries: Library[]`
- `licenses: License[]`

**方法**

- `findLibrary(uniqueId: string): Library | undefined` —— 返回 `uniqueId` 匹配的第一个库，未找到返回 `undefined`。
- `findLicense(hash: string): License | undefined` —— 返回 `hash` 匹配的第一个许可证，未找到返回 `undefined`。

**静态方法**

- `Libs.fromJson(json: string): Libs` —— 解析 OSSLibraries 格式的 JSON 字符串。库按名称排序（不区分大小写）。
- `Libs.fromMsgpack(bytes: Uint8Array): Libs` —— 解析 MessagePack 二进制数据。排序方式相同。

```ets
const libs = Libs.fromJson(jsonString);
const lib = libs.findLibrary('@ohos/hypium');
const license = libs.findLicense(hash);
```

## LibsLoader

从模块上下文加载并解析 rawfile 产物。

```ets
static async fromRawfile(context: common.Context): Promise<Libs>
```

优先加载 `osslibraries.msgpack`，回退到 `osslibraries.json`。两者都缺失时抛出 JSON 加载时的错误。

```ets
const context: common.Context = this.getUIContext().getHostContext() as common.Context;
const libs: Libs = await LibsLoader.fromRawfile(context);
```

## LibsHolder

用于在页面之间共享 `Libs` 实例的静态持有器。

```ets
static set(libs: Libs | undefined): void
static get(): Libs | undefined
```

内置页面使用它，这样详情视图不需要重新加载文件。

```ets
LibsHolder.set(libs);
const cached = LibsHolder.get();
```

## Parser

把原始 OSSLibraries 数据解析为 `Library` 与 `License` 对象。`Libs.fromJson` 与 `Libs.fromMsgpack` 在内部使用解析器。

```ets
static parse(json: string): ParseResult
static parseMsgpack(bytes: Uint8Array): ParseResult
```

`ParseResult` 包含 `libraries: Library[]` 与 `licenses: License[]`。缺少 `uniqueId` 的条目会被跳过并记录日志。

## Library

单个依赖。每个字段都是公开属性。

| 字段              | 类型                      | 说明                     |
| ----------------- | ------------------------- | ------------------------ |
| `uniqueId`        | string                    | 不含版本号的包名。       |
| `artifactVersion` | string                    | 产物版本。               |
| `name`            | string                    | 显示名称。               |
| `description`     | string                    |                          |
| `website`         | string                    |                          |
| `developers`      | Developer[]               |                          |
| `organization`    | Organization \| undefined |                          |
| `scm`             | Scm \| undefined          |                          |
| `licenses`        | License[]                 | 解析时根据哈希引用解析。 |
| `funding`         | Funding[]                 |                          |
| `tag`             | string[]                  |                          |

**Getter**

- `artifactId: string` —— 返回 `uniqueId:artifactVersion`。
- `openSource: boolean` —— `scm.url` 非空时为 `true`。

## License

单个许可证条目。

| 字段             | 类型   | 说明                     |
| ---------------- | ------ | ------------------------ |
| `hash`           | string | 唯一键；引用本条目。     |
| `name`           | string | 人类可读的名称。         |
| `url`            | string | 许可证的托管页面。       |
| `year`           | string | 许可证年份，存在时解析。 |
| `spdxId`         | string | SPDX 标识符，如 `MIT`。  |
| `licenseContent` | string | 完整许可证全文。         |

原始数据中该文本字段名为 `content`，解析器会映射为 `licenseContent`。

## Developer、Organization、Scm、Funding

每个都是带公开字段的小型值类：

- `Developer` —— `name`、`organisationUrl`
- `Organization` —— `name`、`url`
- `Scm` —— `connection`、`developerConnection`、`url`
- `Funding` —— `platform`、`url`

原始 JSON 结构见[数据模型](/zh/reference/data-model)，读取数据并自定义渲染的完整示例见[自定义 UI](/zh/guide/library/custom-ui)。
