# 快速上手

本教程把 OSSLibraries 接入一个 HarmonyOS 应用，并在屏幕上显示许可证列表。列表包含应用打包的每一个 OHPM 依赖。点击每一项进入详情页，查看完整许可证全文。插件在每次构建时重新生成数据，列表始终与实际打包的依赖一致。

> [!TIP]
> 本项目提供 Skills，可让 AI Agent 帮你完成项目接入。
>
> ::: code-group
>
> ```zsh [npm]
> npx skills add composable-tu/osslibraries
> ```
>
> ```zsh [pnpm]
> pnpm dlx skills add composable-tu/osslibraries
> ```
>
> ```zsh [Yarn]
> yarn dlx skills add composable-tu/osslibraries
> ```
>
> ```zsh [Bun]
> bunx skills add composable-tu/osslibraries
> ```
>
> ```zsh [Deno]
> deno x npm:skills add composable-tu/osslibraries
> ```
>
> ```zsh [Vite+]
> vpx skills add composable-tu/osslibraries
> ```
>
> ```zsh [vlt]
> vlx skills add composable-tu/osslibraries
> ```
>
> :::

## 前置条件

- 带 `entry` 模块的 HarmonyOS 项目，使用 DevEco Studio 与 ArkTS 页面（ArkUI）构建。
- 构建机上安装有 [OHPM](https://ohpm.openharmony.cn/) 与 npm（或其他 Node 包管理器）。

::: warning 不支持仓颉（Cangjie）应用
按照华为的文档，仓颉鸿蒙应用既不能增加 ArkTS 页面，也不能调用三方 ArkTS 库，而本库正是建立在 ArkTS 页面与组件之上的，所以仓颉应用用不了它。
:::

## 第 1 步 — 安装两个包

一个包负责渲染许可证列表，另一个在构建时扫描依赖。

从 OHPM 安装 UI 包：

::: code-group

```zsh [ohpm - 手机 / 平板 / 折叠屏 / 智慧屏]
ohpm install osslibraries_ui
```

```zsh [ohpm - 穿戴]
ohpm install osslibraries_ui_wear
```

:::

扫描器是发布到 npm 的 Hvigor 插件，按开发依赖安装：

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

**验证：** 两个包都出现在项目的锁文件中——`osslibraries_ui` 或 `osslibraries_ui_wear` 在 OHPM 侧，`osslibraries-hvigor-plugin` 在 npm/pnpm 侧。

## 第 2 步 — 注册插件

打开 `entry/hvigorfile.ts`，把插件加进 `plugins` 数组：

```ts [hvigorfile.ts]
import { hapTasks } from "@ohos/hvigor-ohos-plugin";
import { ossScanPlugin } from "osslibraries-hvigor-plugin";

export default {
  system: hapTasks,
  plugins: [ossScanPlugin()],
};
```

每次构建时，插件都会扫描 `oh_modules/`，并把许可证元数据写入 `entry/src/main/resources/rawfile/osslibraries.json`。

注册插件所在的模块总是会被排除在许可证列表之外。如需排除其他本地模块，把模块名传给 `selfModules`：

```ts [hvigorfile.ts]
plugins: [ossScanPlugin({ selfModules: ["mylibrary", "3rdlibrary"] })];
```

## 第 3 步 — 导入页面

UI 包提供了一个通过命名路由访问的页面。在 `entry` 模块的任意页面文件顶部（比如 `Index.ets`）导入它：

::: code-group

```ets [ArkTS - 手机 / 平板 / 折叠屏 / 智慧屏]
import 'osslibraries_ui/src/main/ets/pages/OSSLibrariesLicensePage';
```

```ets [ArkTS - 穿戴]
import 'osslibraries_ui_wear/src/main/ets/pages/OSSLibrariesLicenseListPageWear';
import 'osslibraries_ui_wear/src/main/ets/pages/OSSLibrariesLicenseDetailPageWear';
```

:::

导入即注册路由，`main_pages.json` 无需改动。

## 第 4 步 — 构建以生成数据

在 DevEco Studio 中执行一次构建。插件会在日志中输出扫描结果：

```text
[osslibraries] scanning OHPM dependencies at /path/to/project
[osslibraries] wrote 128 libraries to .../rawfile/osslibraries.json (JSON)
```

**验证：** `entry/src/main/resources/rawfile/osslibraries.json` 文件现在存在，并包含一个 `libraries` 数组。它的结构见[数据模型](/zh/reference/data-model)。

## 第 5 步 — 跳转到许可证页

在任意页面通过 `pushNamedRoute` 跳转：

::: code-group

```ets [ArkTS - 手机 / 平板 / 折叠屏 / 智慧屏]
this.getUIContext().getRouter().pushNamedRoute({
  name: 'OSSLibrariesLicensePage'
});
```

```ets [ArkTS - 穿戴]
this.getUIContext().getRouter().pushNamedRoute({
  name: 'OSSLibrariesLicenseListPageWear'
});
```

:::

**验证：** 许可证页打开并展示依赖列表，每个库一行。点击任意一行进入包含完整许可证全文的详情视图。

## 接下来

- [配置](/zh/reference/plugin/configuration) —— 扫描器选项与输出格式。
- [预定义 UI（穿戴设备）](/zh/guide/library/wearable) —— 面向手表屏幕的独立模块。
- [自定义 UI](/zh/guide/library/custom-ui) —— 用自定义页面渲染数据。
