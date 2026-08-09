# Prebuilt UI Pages

The `osslibraries_ui` package provides two ArkUI pages you can embed in your app: a list of every dependency and a detail page for each one.

## Install

```zsh [ohpm]
ohpm install osslibraries_ui
```

The package depends on the core `osslibraries` package and brings it in automatically.

## Register the routes

The pages are declared with named routes, so you do not edit `main_pages.json`. Import them at the top of a page file in the `entry` module to register the routes:

```ets [Index.ets]
import 'osslibraries_ui/src/main/ets/pages/OSSLibrariesLicenseListPage';
import 'osslibraries_ui/src/main/ets/pages/OSSLibrariesLicenseDetailPage';
```

Any page file works as long as it is part of the module. `Index.ets` is the usual choice.

## Show the list

Navigate to the list page with `pushNamedRoute`:

```ets [ArkTS]
this.getUIContext().getRouter().pushNamedRoute({
  name: 'OSSLibrariesLicenseListPage'
});
```

The list page loads its data through `LibsLoader`; no parameters are passed in. Each row renders one library, and tapping it opens the detail page.

## The detail page

The list page passes the library's `uniqueId` to the detail page:

```ts
interface LicenseDetailParams {
  uniqueId: string;
}
```

The detail page reads the parameters, looks the library up through `LibsHolder`, and shows its links and full license text. A row is not tappable when the library has neither licenses nor a website.

## What the pages include

- Loading, empty, and error states are built in.
- The pages are built on ArkUI and UI Design Kit components.
- Link taps open the system browser through `startAbility`.

See [Loading & Parsing](/guide/library/loading) for how the pages get their data, and [Custom UI](/guide/library/custom-ui) for replacing the pages with your own.
