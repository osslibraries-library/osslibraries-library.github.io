# Prebuilt UI <Badge type="tip" text="Phone" /> <Badge type="tip" text="Tablet" /> <Badge type="tip" text="Foldable" /> <Badge type="tip" text="TV" />

The `osslibraries_ui` package provides an embeddable adaptive ArkUI page that shows a list of every dependency and a detail view for each one.

## Install

```zsh [ohpm]
ohpm install osslibraries_ui
```

The package depends on the core `osslibraries` package and brings it in automatically.

## Register the route

The page is declared with a named route, so you do not edit `main_pages.json`. Import it at the top of a page file in the `entry` module to register the route:

```ets [Index.ets]
import 'osslibraries_ui/src/main/ets/pages/OSSLibrariesLicensePage';
```

Any page file works as long as it is part of the module. `Index.ets` is the usual choice.

## Show the list

Navigate to the license page with `pushNamedRoute`:

```ets [ArkTS]
this.getUIContext().getRouter().pushNamedRoute({
  name: 'OSSLibrariesLicensePage'
});
```

The page loads its data through `LibsLoader`; no parameters are passed in. Each row renders one library, and tapping it opens the detail view.

## The detail view

The page passes the library's `uniqueId` to the detail view:

```ts
interface LicenseDetailParams {
  uniqueId: string;
}
```

The detail view reads the parameters, looks the library up through `LibsHolder`, and shows its links and full license text. A row is not tappable when the library has neither licenses nor a website.

## What the pages include

- Loading, empty, and error states are built in.
- The pages are built on ArkUI and UI Design Kit components.
- Link taps open the system browser through `startAbility`.

See [Loading & Parsing](/reference/library/loading) for how the pages get their data, and [Custom UI](/guide/library/custom-ui) for replacing the pages with your own.
