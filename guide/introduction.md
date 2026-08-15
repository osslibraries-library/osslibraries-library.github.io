# Introduction

OSSLibraries brings open-source license metadata to HarmonyOS apps. It scans OHPM dependencies at build time, writes the license information into the app's resource directory, and renders it as a list page and a detail page at run time.

The list needs no manual maintenance and never goes stale: it always matches the dependencies actually packaged into the HAP.

The project is split into two packages:

- **osslibraries** — the runtime library for HarmonyOS. It loads the license data from the app's rawfile and provides ready-to-use UI pages and a core API for building custom ones.
- **osslibraries-hvigor-plugin** — the build-time scanner. It runs as a Hvigor task, reads every dependency under `oh_modules/`, and writes the license metadata into the module's `rawfile/` directory.

The two pieces are designed to work together, and each can be used independently.

::: warning Cangjie apps are not supported
Per Huawei's documentation, Cangjie HarmonyOS apps cannot add ArkTS pages or call third-party ArkTS libraries. This library is built on ArkTS pages and components, so Cangjie apps cannot use it.
:::

## Why this exists

HarmonyOS apps bundle third-party OHPM libraries, and every one of them carries license obligations. Keeping a license list accurate by hand is hard: dependencies change, versions change, and the list drifts from what the app actually ships.

OSSLibraries leaves the maintenance to the build: the plugin inspects the real dependency tree on every build, and the library renders what it finds.

## Features

- License metadata generated from `oh_modules/`, not from a hand-maintained file.
- Full license text for every dependency, read from the bundled LICENSE file or the canonical SPDX text.
- Correct handling of SPDX expressions (`Apache-2.0 OR MIT`), misspellings, and multiple versions of the same dependency.
- Two options at runtime: prebuilt UI pages, or the core data API with a custom UI.

::: info What is SPDX?
[SPDX](https://spdx.dev/learn/overview/) (Software Package Data Exchange) is an open standard for communicating software bill of material information, including provenance, license, security, and other related information. SPDX reduces redundant work by providing common formats for organizations and communities to share important data, thereby streamlining and improving compliance, security, and dependability. The SPDX specification is recognized as the international open standard for security, license compliance, and other software supply chain artifacts as ISO/IEC 5962:2021.

OSSLibraries uses [SPDX License List](https://spdx.org/licenses/) to identify and display the license of every dependency.
:::

## Requirements

- A HarmonyOS app built with ArkTS pages (ArkUI).
- DevEco Studio with the Hvigor build system.

## Next steps

- [Quick Start](/guide/getting-started) — wire the plugin and library into a project.
- [Architecture](/reference/architecture) — how the plugin and the library fit together.
