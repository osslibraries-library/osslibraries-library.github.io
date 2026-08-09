# Loading & Parsing

The core package turns the rawfile artifact into typed objects. This page describes the classes involved.

## LibsLoader

The entry point. `LibsLoader.fromRawfile(context)` reads the rawfile, parses it, and sorts the libraries by name.

Load order:

1. `osslibraries.msgpack` — parsed with `Libs.fromMsgpack`.
2. `osslibraries.json` — parsed with `Libs.fromJson`.

If both files are missing, the JSON load error is thrown. When the MessagePack file is unavailable, the loader logs a warning, distinguishing a missing file from a decode failure.

## Libs

The container. It holds `libraries: Library[]` and `licenses: License[]`, and provides:

- `findLibrary(uniqueId)` — first match, or `undefined`.
- `findLicense(hash)` — first match, or `undefined`.
- `fromJson(json)` / `fromMsgpack(bytes)` — parse raw values directly.
- `new Libs(libraries, licenses)` — build an instance manually.

## Parser

The parser handles both formats. It reads the license map first, then resolves each library's license references against it. Entries without a `uniqueId` are skipped and logged, so malformed data never shows up as empty rows.

## LibsHolder

A simple static holder for sharing a `Libs` instance across pages:

```ets [ArkTS]
LibsHolder.set(libs);
const libs = LibsHolder.get();
```

The built-in pages use it so the detail page does not load the file again.
