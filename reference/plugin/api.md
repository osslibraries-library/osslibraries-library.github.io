# Hvigor Plugin API Reference

All exports of `osslibraries-hvigor-plugin` are available from a single entry point. Each export is listed below with its signature and behavior.

## ossScanPlugin

Creates the Hvigor plugin. Call it in `hvigorfile.ts` and put the result in the `plugins` array.

```ts
ossScanPlugin(options?: OssScanPluginOptions): HvigorPlugin
```

Every field of `OssScanPluginOptions` is optional.

### Options

**`selfModules`** _(string[], default `[]`)_
Module names that belong to the project and must not appear in the license list. The module the plugin is registered on is always excluded automatically.

**`outputFile`** _(string)_
Relative path from the module directory to the output file. When omitted, defaults to `src/main/resources/rawfile/osslibraries.<ext>`, where `<ext>` follows `format`.

**`format`** _(OutputFormat, default `OutputFormat.JSON`)_
Output format for the generated metadata. Prefer the `OutputFormat` enum members over raw strings.

## OutputFormat

Enum of the supported output formats:

| Member        | Value            |
| ------------- | ---------------- |
| `JSON`        | `"json"`         |
| `MessagePack` | `"message-pack"` |

Raw strings (`"json"`, `"message-pack"`) are accepted wherever the enum is expected.

## scanProject

Runs the full scan and returns the result.

```ts
scanProject(projectRoot: string, options?: ScanOptions): ScanResult
```

`ScanOptions` carries `selfModules?: Set<string>` — module names to skip. The defaults always include `"entry"` in addition to the set.

`ScanResult` has two fields:

- `libraries: LibraryEntry[]` — one entry per dependency, sorted by name then semver.
- `licenses: Record<string, LicenseEntry>` — map from content hash to license entry.

## serializeResult

Serializes a `ScanResult` to a JSON string.

```ts
serializeResult(result: ScanResult): string
```

## toOutputObject

Builds the plain object shape consumed by OSSLibraries at runtime. Both serializers encode exactly this structure, so it is the shared contract between the plugin and the library.

```ts
toOutputObject(result: ScanResult): {
  libraries: LibraryEntry[];
  licenses: Record<string, LicenseEntry>;
}
```

## getSerializer

Resolves a format name into its `Serializer`. Throws on unknown formats, listing the valid options.

```ts
getSerializer(format: string): Serializer
```

A `Serializer` has:

- `extension: string` — file extension without the leading dot (`"json"` or `"msgpack"`).
- `name: string` — human-readable format name, surfaced in build logs.
- `encode(result: ScanResult): Buffer` — encode a result into bytes ready to be written to disk.

## buildLibrary

Assembles one library entry from a normalized manifest.

```ts
buildLibrary(pkg: OhPackage, pkgDir: string): { lib: LibraryEntry; licenses: LicenseEntry[] }
```

Reads the LICENSE file bundled in the package directory when present and uses it as the full license text.

## resolveLicense

Resolves a license declaration to one or more license entries.

```ts
resolveLicense(declaration: string): LicenseEntry[]
```

Handles valid SPDX expressions (`Apache-2.0 OR MIT`), corrects common misspellings via `spdx-correct`, and fills canonical name, URL, and text from the SPDX license list. Unknown declarations degrade to a minimal entry named after the declaration.

## contentHash

Computes the SHA-256 hex digest of license text — the key used to deduplicate identical license entries.

```ts
contentHash(text: string): string
```

## oh-package reading

```ts
parseJson5(text: string): Record<string, unknown>
parseOhPackage(obj: Record<string, unknown>): OhPackage
readOhPackage(filePath: string, fallbackName: string): OhPackage | null
```

`parseJson5` parses a JSON5 string into a plain object. `parseOhPackage` converts a raw manifest into the strict `OhPackage` model, normalizing the loosely typed `author`, `repository`, and `license` fields. `readOhPackage` reads and parses a file, falling back to `fallbackName` when the manifest omits its name, and returns `null` when the file is unreadable.

## Types

**`LibraryEntry`**

| Field             | Type                                               |
| ----------------- | -------------------------------------------------- |
| `uniqueId`        | string                                             |
| `artifactVersion` | string                                             |
| `name`            | string                                             |
| `description`     | string                                             |
| `website`         | string                                             |
| `developers`      | `Array<{ name, organisationUrl }>`                 |
| `scm`             | `{ connection, developerConnection, url } \| null` |
| `organization`    | unknown                                            |
| `funding`         | unknown[]                                          |
| `tag`             | string[]                                           |
| `licenses`        | string[] — hash references                         |

**`LicenseEntry`**

| Field     | Type   |
| --------- | ------ |
| `hash`    | string |
| `name`    | string |
| `url`     | string |
| `spdxId`  | string |
| `content` | string |

**`ScanResult`**, **`ScanOptions`**, **`OhPackage`**, and **`Serializer`** are exported as types. `OhPackage` holds the normalized manifest fields `name`, `version`, `description`, `homepage`, `authorName`, `authorUrl`, `repoUrl`, `licenseDecls`, and `keywords`.

See [Output Formats](/reference/plugin/output-formats) for the encodings, and [Data Model](/reference/data-model) for how these shapes map to the runtime library.
