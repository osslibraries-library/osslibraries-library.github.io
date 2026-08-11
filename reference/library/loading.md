# Loading & Parsing

The plugin writes a rawfile artifact at build time. The core package reads it at run time and parses it into typed objects. Class signatures are in [Library API Reference](/reference/library/api).

## The artifact

The plugin writes one file into `rawfile/` on every build. The library reads the file; it does not scan dependencies itself. The scanner does not render, and the library does not depend on the build system. The file is the only contract between the two.

## Load order

The same data can be written as JSON or MessagePack. Both encode an identical structure ([Data Model](/reference/data-model)); only the encoding differs. JSON is readable and easier to debug. MessagePack is smaller and faster to parse.

The loader follows a fixed order and does not let the caller choose:

1. `osslibraries.msgpack` — parsed with `Libs.fromMsgpack`.
2. `osslibraries.json` — parsed with `Libs.fromJson`.

A project can ship the compact binary and keep the JSON file for debugging, without extra configuration. When the MessagePack file is missing, the loader logs a warning and falls back. The warning distinguishes a missing file from a decode failure.

## Deduplication

License text is stored once per unique content hash. Libraries reference their licenses by hash. Identical text across packages collapses into a single shared entry, which keeps the HAP payload small. The parser resolves hash references against the license map, so the returned objects are already linked.

## Sorting

The plugin writes libraries in sorted order. The library sorts them again by name (case-insensitive) on load. Sorting at load time keeps the ordering consistent regardless of the data source.

## Malformed data

`uniqueId` is the only required field. Entries without it are skipped and logged, so broken data does not appear as empty rows. Missing values in other fields become empty strings or empty arrays.

## Shared instance

The list and detail pages show the same data. Loading and parsing the file once is enough. The pages use the static holder `LibsHolder` to pass the loaded `Libs` instance to the detail page, instead of reading the file on every navigation. Custom pages can use the same holder ([Custom UI](/guide/library/custom-ui)).
