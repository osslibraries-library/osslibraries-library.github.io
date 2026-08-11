# 配置

`ossScanPlugin` 接受一个配置对象，所有字段均为可选。

## 选项

| 选项          | 类型           | 默认值                                          |
| ------------- | -------------- | ----------------------------------------------- |
| `selfModules` | `string[]`     | `[]` —— 注册插件所在的模块总是会被自动排除      |
| `outputFile`  | `string`       | `src/main/resources/rawfile/osslibraries.<ext>` |
| `format`      | `OutputFormat` | `OutputFormat.JSON`                             |

## selfModules

属于项目自身、不应出现在许可证列表中的模块。注册插件所在的模块总是会被自动排除；其他本地模块在此列出：

```ts
plugins: [ossScanPlugin({ selfModules: ["mylibrary", "3rdlibrary"] })];
```

## outputFile

相对模块目录的输出路径。需要将输出写到默认 rawfile 位置以外时设置它：

```ts
plugins: [ossScanPlugin({ outputFile: "src/main/resources/rawfile/licenses.json" })];
```

## format

输出格式，JSON 或 MessagePack。建议优先使用枚举成员而非原始字符串，以保证重命名安全与自动补全：

```ts
import { ossScanPlugin, OutputFormat } from "osslibraries-hvigor-plugin";

plugins: [ossScanPlugin({ format: OutputFormat.MessagePack })];
```

也接受原始字符串：`'json'` 或 `'message-pack'`。

输出文件的扩展名随 `format` 而定，除非显式设置了 `outputFile`。两种格式的区别见[输出格式](/zh/reference/plugin/output-formats)。
