# Installation

Install the plugin as a dev dependency of the HarmonyOS project:

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

## Register

Open the `hvigorfile.ts` of the module whose rawfile should receive the output — typically `entry` — and add the plugin:

```ts [hvigorfile.ts]
import { hapTasks } from "@ohos/hvigor-ohos-plugin";
import { ossScanPlugin } from "osslibraries-hvigor-plugin";

export default {
  system: hapTasks,
  plugins: [ossScanPlugin()],
};
```

The plugin registers a task named `ossScanLicenses` that runs before `CompileArkTS`. On every build it scans `oh_modules/` and writes the metadata to `src/main/resources/rawfile/osslibraries.json`.

## Verify

Run a build and look for the plugin's log lines:

```text
[osslibraries] scanning OHPM dependencies at /path/to/project
[osslibraries] wrote 128 libraries to .../rawfile/osslibraries.json (JSON)
```

The file appears in the module's rawfile directory. From here, install a UI package or the core package to render it — see [Quick Start](/guide/getting-started).
