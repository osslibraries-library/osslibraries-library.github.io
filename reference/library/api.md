# Library API Reference

The core package `osslibraries` exposes the classes below. All ArkTS code examples import from `'osslibraries'`.

## Libs

The main access point to the scanned data. Holds the list of libraries and the set of unique licenses.

```ts
new Libs(libraries?: Library[], licenses?: License[])
```

**Fields**

- `libraries: Library[]`
- `licenses: License[]`

**Methods**

- `findLibrary(uniqueId: string): Library | undefined` — first library whose `uniqueId` matches, or `undefined`.
- `findLicense(hash: string): License | undefined` — first license whose `hash` matches, or `undefined`.

**Static methods**

- `Libs.fromJson(json: string): Libs` — parse a JSON string in OSSLibraries format. Libraries are sorted by name (case-insensitive).
- `Libs.fromMsgpack(bytes: Uint8Array): Libs` — parse MessagePack binary data. Libraries are sorted the same way.

```ets
const libs = Libs.fromJson(jsonString);
const lib = libs.findLibrary('@ohos/hypium');
const license = libs.findLicense(hash);
```

## LibsLoader

Loads and parses the rawfile artifact from a module context.

```ets
static async fromRawfile(context: common.Context): Promise<Libs>
```

Loads `osslibraries.msgpack` first, then falls back to `osslibraries.json`. Throws the JSON load error when both are missing.

```ets
const context: common.Context = this.getUIContext().getHostContext() as common.Context;
const libs: Libs = await LibsLoader.fromRawfile(context);
```

## LibsHolder

A static holder for sharing a `Libs` instance between pages.

```ets
static set(libs: Libs | undefined): void
static get(): Libs | undefined
```

The built-in page uses it so the detail view does not load the file again.

```ets
LibsHolder.set(libs);
const cached = LibsHolder.get();
```

## Parser

Parses raw OSSLibraries data into `Library` and `License` objects. `Libs.fromJson` and `Libs.fromMsgpack` use the parser internally.

```ets
static parse(json: string): ParseResult
static parseMsgpack(bytes: Uint8Array): ParseResult
```

`ParseResult` has `libraries: Library[]` and `licenses: License[]`. Entries without a `uniqueId` are skipped and logged.

## Library

One dependency. Each field is a public property.

| Field             | Type                      | Notes                                        |
| ----------------- | ------------------------- | -------------------------------------------- |
| `uniqueId`        | string                    | Package name without version.                |
| `artifactVersion` | string                    | Version of the artifact.                     |
| `name`            | string                    | Display name.                                |
| `description`     | string                    |                                              |
| `website`         | string                    |                                              |
| `developers`      | Developer[]               |                                              |
| `organization`    | Organization \| undefined |                                              |
| `scm`             | Scm \| undefined          |                                              |
| `licenses`        | License[]                 | Resolved from hash references at parse time. |
| `funding`         | Funding[]                 |                                              |
| `tag`             | string[]                  |                                              |

**Getters**

- `artifactId: string` — returns `uniqueId:artifactVersion`.
- `openSource: boolean` — `true` when `scm.url` is set.

## License

One license entry.

| Field            | Type   | Notes                                |
| ---------------- | ------ | ------------------------------------ |
| `hash`           | string | Unique key; references this entry.   |
| `name`           | string | Human-readable name.                 |
| `url`            | string | Hosted form of the license.          |
| `year`           | string | Year of the license, when available. |
| `spdxId`         | string | SPDX identifier, e.g. `MIT`.         |
| `licenseContent` | string | Full license text.                   |

In the raw data the text field is named `content`; the parser maps it to `licenseContent`.

## Developer, Organization, Scm, Funding

Each is a small value class with public fields:

- `Developer` — `name`, `organisationUrl`
- `Organization` — `name`, `url`
- `Scm` — `connection`, `developerConnection`, `url`
- `Funding` — `platform`, `url`

See [Data Model](/reference/data-model) for the raw JSON shape, and [Custom UI](/guide/library/custom-ui) for a complete example of reading the data with your own UI.
