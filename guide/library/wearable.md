# Prebuilt UI <Badge type="tip" text="Wearable" />

The wearable prebuilt UI uses a separate module, `osslibraries_ui_wear`, with pages tuned for watch screens.

## Install

```zsh [ohpm]
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

```ets [ArkTS]
import 'osslibraries_ui_wear/src/main/ets/pages/OSSLibrariesLicenseListPageWear';
import 'osslibraries_ui_wear/src/main/ets/pages/OSSLibrariesLicenseDetailPageWear';
```

## Navigate

Use the list page's route name:

```ets [ArkTS]
this.getUIContext().getRouter().pushNamedRoute({
  name: 'OSSLibrariesLicenseListPageWear'
});
```

The rest works the same as the phone module: the list loads its own data, and tapping a row opens the detail page.
