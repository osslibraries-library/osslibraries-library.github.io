# Wearable Apps

Wearable apps use a separate UI module, `osslibraries_ui_wear`, with pages tuned for watch screens.

## Install

```zsh
ohpm install osslibraries_ui_wear
```

## Register the plugin

Register the scanner in the wearable module's `hvigorfile.ts`, same as for a phone module:

```ts [hvigorfile.ts]
import { hapTasks } from "@ohos/hvigor-ohos-plugin";
import { ossScanPlugin } from "osslibraries-hvigor-plugin";

export default {
  system: hapTasks,
  plugins: [ossScanPlugin()],
};
```

## Register the routes

Import the wearable pages at the top of a page file in the module:

```ets
import 'osslibraries_ui_wear/src/main/ets/pages/OSSLibrariesLicenseListPageWear';
import 'osslibraries_ui_wear/src/main/ets/pages/OSSLibrariesLicenseDetailPageWear';
```

## Navigate

Use the list page's route name:

```ets
this.getUIContext().getRouter().pushNamedRoute({
  name: 'OSSLibrariesLicenseListPageWear'
});
```

The rest works the same as the phone module: the list loads its own data, and tapping a row opens the detail page.
