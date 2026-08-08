# 编程式调用

插件的扫描器以普通库形式导出，可在 Hvigor 之外使用——自定义任务、脚本或测试。本页为指南级概览，完整 API 参考后续补充。

## scanProject

执行一次完整扫描，返回结果：

```ts
import { scanProject } from "osslibraries-hvigor-plugin";

const result = scanProject("/path/to/project", { selfModules: new Set(["entry"]) });
```

`result` 具有[数据模型](/zh/guide/library/data-model)描述的 `{ libraries, licenses }` 结构。

## 序列化

以任一格式写出结果：

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

## 底层辅助函数

流水线的各个环节均以独立函数导出，可单独复用：

- `readOhPackage` / `parseOhPackage` / `parseJson5` —— 读取并规范化清单。
- `resolveLicense(decl)` —— 将一条许可证声明解析为条目。
- `contentHash(text)` —— 许可证文本的 SHA-256。
- `buildLibrary(pkg, pkgDir)` —— 从清单组装一条库记录。
- `toOutputObject(result)` —— 序列化器所编码的纯对象。

## 完整示例

以下 Node 脚本扫描当前项目并打印摘要：

```ts
import { scanProject } from "osslibraries-hvigor-plugin";

const result = scanProject(process.cwd());

console.log(
  `${result.libraries.length} libraries, ${Object.keys(result.licenses).length} unique licenses`,
);
```
