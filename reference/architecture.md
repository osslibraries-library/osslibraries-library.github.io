# Architecture

OSSLibraries consists of a build-time scanner and a runtime renderer. The sections below describe the complete flow from dependencies to the rendered list.

## Two stages

1. **Build time — the Hvigor plugin** reads every OHPM dependency installed under `oh_modules/`, resolves licenses, and writes the result to a file in the module's `rawfile/` directory.
2. **Run time — the library** loads that file from the rawfile, parses it into typed objects, and renders it, either through the provided pages or through a custom UI.

The rawfile artifact is the contract between the two stages. JSON and MessagePack serializations of it carry the same shape:

```json [osslibraries.json]
{
  "libraries": [
    {
      "uniqueId": "@ohos/hypium",
      "artifactVersion": "1.0.28",
      "licenses": ["533c62b5…"]
    }
  ],
  "licenses": {
    "533c62b5…": { "hash": "533c62b5…", "name": "…", "spdxId": "…", "content": "…" }
  }
}
```

`libraries` is a list of library entries. `licenses` is a map from content hash to license entry. A library references its licenses by hash; identical license text is stored once.

## Build stage

The plugin runs a task named `ossScanLicenses` before the module's `CompileArkTS` task. Each build it:

1. Discovers every `oh-package.json5` under `oh_modules/`.
2. Reads and normalizes each manifest — name, version, description, author, repository, and license declarations.
3. Resolves each license declaration through the SPDX pipeline.
4. Reads the LICENSE file bundled in the package when present.
5. Deduplicates identical license text by content hash.
6. Sorts libraries by name, then version.
7. Writes the artifact into `rawfile/`.

The artifact is packaged into the HAP like any other resource.

## Run stage

At run time, the library looks for `osslibraries.msgpack` first, then falls back to `osslibraries.json`. This order allows a smaller MessagePack build while keeping a JSON copy for debugging.

- `LibsLoader.fromRawfile(context)` — loads and parses, returns a sorted `Libs`.
- `Libs.fromJson` / `Libs.fromMsgpack` — parse a raw string or byte array.
- `LibsHolder` — shares a `Libs` instance between pages.

## Why a rawfile artifact

Putting the metadata in the rawfile keeps the two pieces decoupled:

- The scanner writes data only; it does not depend on the UI.
- The library reads data only; it does not depend on the build system.

Either side can be swapped: point the plugin at a different output, or load a hand-written JSON file — the library behaves the same.

## More

- The data shape in detail: [Data Model](/reference/data-model).
- Scanner internals: [How It Works](/reference/plugin/how-it-works).
