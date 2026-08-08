# 快速上手

本节演示最小化的接入流程：注册插件、安装 UI 包、显示许可证列表。

下面的步骤假设你有一个标准的、带 `entry` 模块的 HarmonyOS 项目。

## 1. 安装依赖包

涉及两个包。UI 包来自 OHPM：

```zsh
ohpm install osslibraries_ui
```

扫描器是发布到 npm 上的 Hvigor 插件，按开发依赖装：

::: code-group

```sh [npm]
npm install -D osslibraries-hvigor-plugin
```

```sh [pnpm]
pnpm add -D osslibraries-hvigor-plugin
```

```sh [yarn]
yarn add -D osslibraries-hvigor-plugin
```

```sh [bun]
bun add -D osslibraries-hvigor-plugin
```

```sh [Vite+]
vp add -D osslibraries-hvigor-plugin
```

```sh [vlt]
vlt install -D osslibraries-hvigor-plugin
```

:::

## 2. 注册插件

打开 `entry/hvigorfile.ts`，把插件加进 `plugins` 数组：

```ts [hvigorfile.ts]
import { hapTasks } from "@ohos/hvigor-ohos-plugin";
import { ossScanPlugin } from "osslibraries-hvigor-plugin";

export default {
  system: hapTasks,
  plugins: [ossScanPlugin()],
};
```

每次构建时，插件都会扫描 `oh_modules/`，并把结果写入 `entry/src/main/resources/rawfile/osslibraries.json`。

注册插件所在的模块总是会被排除在许可证列表之外。如需排除其他本地模块，将模块名传入 `selfModules`：

```ts [hvigorfile.ts]
plugins: [ossScanPlugin({ selfModules: ["mylibrary", "3rdlibrary"] })];
```

## 3. 导入页面

UI 包提供了两个通过命名路由访问的页面。在 `entry` 模块的任意页面文件顶部（比如 `Index.ets`）导入它们：

```ets [Index.ets]
import 'osslibraries_ui/src/main/ets/pages/OSSLibrariesLicenseListPage';
import 'osslibraries_ui/src/main/ets/pages/OSSLibrariesLicenseDetailPage';
```

导入即注册路由，`main_pages.json` 无需改动。

## 4. 跳转到许可证列表页

在任意页面通过 `pushNamedRoute` 跳转：

```ets
this.getUIContext().getRouter().pushNamedRoute({
  name: 'OSSLibrariesLicenseListPage'
});
```

## 5. 构建并运行

在 DevEco Studio 中运行应用。构建时插件会在日志中输出扫描结果：

```text
[osslibraries] scanning OHPM dependencies at /path/to/project
[osslibraries] wrote 128 libraries to .../rawfile/osslibraries.json (JSON)
```

打开许可证页面即可看到依赖列表；点击每一项进入包含完整许可证全文的详情页。

## 接下来

- 穿戴设备应用使用独立的 UI 模块，见[穿戴设备应用](/zh/guide/library/wearable)。
- 需要自定义渲染时改用 Core 包，见[自定义 UI](/zh/guide/library/custom-ui)。
- 扫描器行为可配置，见[配置](/zh/guide/plugin/configuration)。
