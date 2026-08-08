# Introduction

OSSLibraries brings open-source license metadata to HarmonyOS apps. It scans your OHPM dependencies at build time, writes the license information into your app's resource directory, and renders it as a list page and a detail page at run time.

The list needs no manual maintenance and never goes stale: it always matches the dependencies actually packaged into the HAP.

The project is split into two packages:

- **osslibraries** — the runtime library for HarmonyOS. It loads the license data from your app's rawfile and provides both ready-to-use UI pages and a core API for building your own.
- **osslibraries-hvigor-plugin** — the build-time scanner. It runs as a Hvigor task, reads every dependency under `oh_modules/`, and writes the license metadata into your module's `rawfile/` directory.

The two pieces are designed to work together, and each can be used independently.

## Why this exists

HarmonyOS apps bundle third-party OHPM libraries, and every one of them carries license obligations. Keeping a license list accurate by hand is hard: dependencies change, versions change, and the list drifts from what you actually ship.

OSSLibraries leaves the maintenance to the build: the plugin inspects the real dependency tree on every build, and the library renders what it finds.

## Features

- License metadata generated from `oh_modules/`, not from a hand-maintained file.
- Full license text for every dependency, read from the bundled LICENSE file or the canonical SPDX text.
- Correct handling of SPDX expressions (`Apache-2.0 OR MIT`), misspellings, and multiple versions of the same dependency.
- Two options at runtime: prebuilt UI pages, or the core data API with your own UI.

## Requirements

- A HarmonyOS app built with ArkTS pages (ArkUI).
- DevEco Studio with the Hvigor build system.

::: warning Cangjie apps are not supported
Per Huawei's documentation, Cangjie HarmonyOS apps cannot add ArkTS pages or call third-party ArkTS libraries. This library is built on ArkTS pages and components, so Cangjie apps cannot use it.
:::

## Next steps

- [Quick Start](/guide/getting-started) — get a license list on screen in a few minutes.
- [Architecture](/guide/architecture) — understand how the plugin and the library fit together.
