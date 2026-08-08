# Quick Start

This guide walks through a minimal setup: register the plugin, add the UI package, and show the license list.

The setup assumes a standard HarmonyOS project with an `entry` module.

> [!TIP]
> This library ships skills that you can install so an AI agent can wire them into your project for you.
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

## 1. Install the packages

Two packages are involved. The UI package comes from OHPM:

```zsh
ohpm install osslibraries_ui
```

The scanner is a Hvigor plugin published to npm. Install it as a dev dependency:

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

```sh [bun]
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

## 2. Register the plugin

Open `entry/hvigorfile.ts` and add the plugin to the `plugins` array:

```ts [hvigorfile.ts]
import { hapTasks } from "@ohos/hvigor-ohos-plugin";
import { ossScanPlugin } from "osslibraries-hvigor-plugin";

export default {
  system: hapTasks,
  plugins: [ossScanPlugin()],
};
```

On each build, the plugin scans `oh_modules/` and writes `entry/src/main/resources/rawfile/osslibraries.json`.

The module you register the plugin on is always excluded from the license list. To exclude additional local modules, pass their names in `selfModules`:

```ts [hvigorfile.ts]
plugins: [ossScanPlugin({ selfModules: ["mylibrary", "3rdlibrary"] })];
```

## 3. Import the pages

The UI package provides two pages reachable by named route. Import them at the top of any page file in the `entry` module, for example `Index.ets`:

```ets [Index.ets]
import 'osslibraries_ui/src/main/ets/pages/OSSLibrariesLicenseListPage';
import 'osslibraries_ui/src/main/ets/pages/OSSLibrariesLicenseDetailPage';
```

The imports register the routes; `main_pages.json` does not need to be changed.

## 4. Navigate to the license list

From any page, use `pushNamedRoute` with the list page's route name:

```ets
this.getUIContext().getRouter().pushNamedRoute({
  name: 'OSSLibrariesLicenseListPage'
});
```

## 5. Build and run

Run the app in DevEco Studio. On build, the plugin logs the scan result:

```text
[osslibraries] scanning OHPM dependencies at /path/to/project
[osslibraries] wrote 128 libraries to .../rawfile/osslibraries.json (JSON)
```

Open the license page to see the list of dependencies; each entry opens a detail view with the full license text.

## What's next

- Wearable apps use a separate UI module. See [Wearables](/guide/library/wearable).
- For custom rendering, use the core package instead. See [Custom UI](/guide/library/custom-ui).
- Scanner behavior is configurable. See [Configuration](/guide/plugin/configuration).
