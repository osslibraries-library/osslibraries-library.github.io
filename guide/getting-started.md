# Quick Start

This tutorial wires OSSLibraries into a HarmonyOS app and shows a license list on screen. The list contains every OHPM dependency the app ships. Each entry opens a detail view with the full license text. The plugin regenerates the data on every build, so the list always matches the packaged dependencies.

> [!TIP]
> This library ships skills you can install so an AI agent can wire them into your project for you.
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

## Prerequisites

- A HarmonyOS project with an `entry` module, built with ArkTS pages (ArkUI) in DevEco Studio.
- [OHPM](https://ohpm.openharmony.cn/) and npm (or another Node package manager) on the build machine.

::: warning Cangjie apps are not supported
Per Huawei's documentation, Cangjie HarmonyOS apps cannot add ArkTS pages or call third-party ArkTS libraries. This library is built on ArkTS pages and components, so Cangjie apps cannot use it.
:::

## Step 1 — Install the two packages

One package renders the license list; the other scans dependencies at build time.

Install the UI package from OHPM:

::: code-group

```zsh [ohpm - Phone / Tablet / Foldable / TV]
ohpm install osslibraries_ui
```

```zsh [ohpm - Wearable]
ohpm install osslibraries_ui_wear
```

:::

Install the scanner as a dev dependency. It is a Hvigor plugin published to npm:

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

**Verification:** both packages appear in the project's lock files — `osslibraries_ui` or `osslibraries_ui_wear` under OHPM, `osslibraries-hvigor-plugin` under npm/pnpm.

## Step 2 — Register the plugin

Open `entry/hvigorfile.ts` and add the plugin to the `plugins` array:

```ts [hvigorfile.ts]
import { hapTasks } from "@ohos/hvigor-ohos-plugin";
import { ossScanPlugin } from "osslibraries-hvigor-plugin";

export default {
  system: hapTasks,
  plugins: [ossScanPlugin()],
};
```

On each build, the plugin scans `oh_modules/` and writes the license metadata to `entry/src/main/resources/rawfile/osslibraries.json`.

The module you register the plugin on is always excluded from the license list. To exclude additional local modules, pass their names in `selfModules`:

```ts [hvigorfile.ts]
plugins: [ossScanPlugin({ selfModules: ["mylibrary", "3rdlibrary"] })];
```

## Step 3 — Import the page

The UI package provides one page reachable by named route. Import it at the top of any page file in the `entry` module, for example `Index.ets`:

::: code-group

```ets [ArkTS - Phone / Tablet / Foldable / TV]
import 'osslibraries_ui/src/main/ets/pages/OSSLibrariesLicensePage';
```

```ets [ArkTS - Wearable]
import 'osslibraries_ui_wear/src/main/ets/pages/OSSLibrariesLicenseListPageWear';
import 'osslibraries_ui_wear/src/main/ets/pages/OSSLibrariesLicenseDetailPageWear';
```

:::

The imports register the routes; `main_pages.json` does not need to be changed.

## Step 4 — Build to generate the data

Run a build in DevEco Studio. The plugin logs the scan result:

```text
[osslibraries] scanning OHPM dependencies at /path/to/project
[osslibraries] wrote 128 libraries to .../rawfile/osslibraries.json (JSON)
```

**Verification:** the file `entry/src/main/resources/rawfile/osslibraries.json` now exists and contains a `libraries` array. See [Data Model](/reference/data-model) for its shape.

## Step 5 — Navigate to the license list

From any page, use `pushNamedRoute` with the license page's route name:

::: code-group

```ets [ArkTS - Phone / Tablet / Foldable / TV]
this.getUIContext().getRouter().pushNamedRoute({
  name: 'OSSLibrariesLicensePage'
});
```

```ets [ArkTS - Wearable]
this.getUIContext().getRouter().pushNamedRoute({
  name: 'OSSLibrariesLicenseListPageWear'
});
```

:::

**Verification:** the license page opens and shows the dependencies, one row per library. Tapping a row opens the detail view with the full license text.

## Next steps

- [Configuration](/reference/plugin/configuration) — scanner options and output formats.
- [Prebuilt UI (Wearable)](/guide/library/wearable) — a separate module for watch screens.
- [Custom UI](/guide/library/custom-ui) — render the data with custom pages.
