# 安装

插件作为开发依赖安装到 HarmonyOS 项目：

::: code-group

```sh [npm]
npm install -D osslibraries-hvigor-plugin
```

```sh [pnpm]
pnpm add -D osslibraries-hvigor-plugin
```

```sh [Yarn]
yarn add -D osslibraries-hvigor-plugin
```

```sh [Bun]
bun add -D osslibraries-hvigor-plugin
```

```sh [Deno]
deno add --dev npm:osslibraries-hvigor-plugin
```

```sh [Vite+]
vp add -D osslibraries-hvigor-plugin
```

```sh [vlt]
vlt install -D osslibraries-hvigor-plugin
```

:::

## 注册

打开输出目标模块的 `hvigorfile.ts`（通常是 `entry`），将插件加入 `plugins` 数组：

```ts [hvigorfile.ts]
import { hapTasks } from "@ohos/hvigor-ohos-plugin";
import { ossScanPlugin } from "osslibraries-hvigor-plugin";

export default {
  system: hapTasks,
  plugins: [ossScanPlugin()],
};
```

注册后，插件会在 `CompileArkTS` 之前注册名为 `ossScanLicenses` 的任务。每次构建，该任务扫描 `oh_modules/`，并将元数据写入 `src/main/resources/rawfile/osslibraries.json`。

## 验证

运行一次构建，在日志中查找插件的输出：

```text
[osslibraries] scanning OHPM dependencies at /path/to/project
[osslibraries] wrote 128 libraries to .../rawfile/osslibraries.json (JSON)
```

文件会出现在模块的 rawfile 目录中。接下来安装 UI 包或核心包来渲染它，完整的接入步骤见[快速上手](/zh/guide/getting-started)。
