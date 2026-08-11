# Overview

`osslibraries-hvigor-plugin` is a Hvigor task that scans the OHPM dependencies of a HarmonyOS project and generates license metadata for OSSLibraries.

It is the build-time half of the project. See [Architecture](/reference/architecture) for how it fits together with the library.

## What it does

- Discovers every dependency under `oh_modules/`.
- Normalizes each `oh-package.json5` manifest.
- Resolves license declarations through the SPDX pipeline.
- Prefers the LICENSE file bundled in each package; falls back to canonical SPDX text.
- Lists every version of a dependency as its own entry.
- Writes the result to the module's `rawfile/` as JSON or MessagePack.

## Requirements

- A HarmonyOS project using the Hvigor build system.
- Write access to the module's `src/main/resources/rawfile/` directory.

## Get started

- [Installation](/guide/plugin/installation)
- [Configuration](/reference/plugin/configuration)
- [Plugin API Reference](/reference/plugin/api)
