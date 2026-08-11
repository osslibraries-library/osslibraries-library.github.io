# 编程式调用

扫描器以普通库形式导出，可在 Hvigor 之外运行——自定义任务、脚本或测试。以下示例需要一个 HarmonyOS 项目（或任意包含 `oh_modules/` 的目录）和 Node.js。

## 扫描项目

导入 `scanProject`，指向项目根目录：

```ts
import { scanProject } from "osslibraries-hvigor-plugin";

const result = scanProject("/path/to/project", { selfModules: new Set(["entry"]) });
```

`result` 具有[数据模型](/zh/reference/data-model)描述的 `{ libraries, licenses }` 结构。把本地模块传给 `selfModules` 以排除自身代码；除此之外，`"entry"` 总是会被排除。

## 以某种格式写出结果

两种输出格式都可用。JSON 使用 `serializeResult`；MessagePack 需要解析出序列化器再编码：

```ts
import {
  scanProject,
  serializeResult,
  getSerializer,
  OutputFormat,
} from "osslibraries-hvigor-plugin";

const result = scanProject("/path/to/project");

const json = serializeResult(result); // JSON 字符串
const bytes = getSerializer(OutputFormat.MessagePack).encode(result); // Buffer
```

## 复用流水线的某一阶段

扫描器的各个阶段均以独立函数导出，可单独使用：

- `readOhPackage` / `parseOhPackage` / `parseJson5` —— 读取并规范化清单。
- `resolveLicense(decl)` —— 将一条许可证声明解析为条目。
- `contentHash(text)` —— 许可证文本的 SHA-256。
- `buildLibrary(pkg, pkgDir)` —— 从清单组装一条库记录。
- `toOutputObject(result)` —— 序列化器所编码的纯对象。

以上所有函数的签名见[插件 API 参考](/zh/reference/plugin/api)。

## 完整示例

以下 Node 脚本扫描当前项目并打印摘要：

```ts
import { scanProject } from "osslibraries-hvigor-plugin";

const result = scanProject(process.cwd());

console.log(
  `${result.libraries.length} libraries, ${Object.keys(result.licenses).length} unique licenses`,
);
```
