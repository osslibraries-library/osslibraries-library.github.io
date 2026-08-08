# Data Model

The metadata follows a single shape whether it is JSON or MessagePack. This page documents that shape and the ArkTS types it maps to.

## The root object

```json [osslibraries.json]
{
  "libraries": [{ "…": "…", "licenses": ["<hash>"] }],
  "licenses": { "<hash>": { "…": "…" } }
}
```

`libraries` is an array of library entries. `licenses` is a map from a content hash to a license entry. A library references its licenses by hash; identical license text resolves to a single shared entry.

## Library

| Field             | Type                 | Notes                                        |
| ----------------- | -------------------- | -------------------------------------------- |
| `uniqueId`        | string               | Package name without version. Required.      |
| `artifactVersion` | string               | Version of the artifact.                     |
| `name`            | string               | Display name. Falls back to `uniqueId`.      |
| `description`     | string               |                                              |
| `website`         | string               |                                              |
| `developers`      | Developer[]          |                                              |
| `organization`    | Organization \| null |                                              |
| `scm`             | Scm \| null          |                                              |
| `licenses`        | License[]            | Resolved from hash references at parse time. |
| `funding`         | Funding[]            |                                              |
| `tag`             | string[]             |                                              |

In code, each entry is a `Library` instance with two convenience getters: `artifactId` returns `uniqueId:artifactVersion`, and `openSource` is true when `scm.url` is set.

## License

| Field     | Type   | Notes                              |
| --------- | ------ | ---------------------------------- |
| `hash`    | string | Unique key; references this entry. |
| `name`    | string | Human-readable name.               |
| `url`     | string | Hosted form of the license.        |
| `spdxId`  | string | SPDX identifier, e.g. `MIT`.       |
| `content` | string | Full license text.                 |

In ArkTS the text field is called `licenseContent`, and `year` is parsed when present.

## Developer, Organization, Scm, Funding

- `Developer` — name, organisationUrl
- `Organization` — name, url
- `Scm` — connection, developerConnection, url
- `Funding` — platform, url

## A real example

This is an actual entry from a scanned project, trimmed to the essentials:

```json [osslibraries.json]
{
  "uniqueId": "@ohos/hypium",
  "artifactVersion": "1.0.28",
  "name": "@ohos/hypium",
  "description": "A mock framework for OpenHarmony application.",
  "website": "https://gitee.com/openharmony/testfwk_arkxtest",
  "developers": [{ "name": "huawei", "organisationUrl": "" }],
  "scm": {
    "connection": "",
    "developerConnection": "",
    "url": "https://gitee.com/openharmony/testfwk_arkxtest"
  },
  "organization": null,
  "funding": [],
  "tag": [],
  "licenses": ["533c62b51f490ec5ba0118d19bb2caef961c3b630bf4355eb1e360026db6fda2"]
}
```

Its license entry holds the full text, keyed by the SHA-256 hash of that text:

```json [osslibraries.json]
{
  "hash": "0cec06e0e55fbc3dc5cee4fca9b607f66cb8f4e4dbcf3b3c013594dd156732e9",
  "name": "Apache License, Version 2.0",
  "url": "https://www.apache.org/licenses/LICENSE-2.0",
  "spdxId": "Apache-2.0",
  "content": "Apache License\nVersion 2.0, January 2004\nhttp://www.apache.org/licenses/\n\nTERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION…"
}
```

Note that the hash here is the SHA-256 of the bundled LICENSE file text. When a package ships no LICENSE file, the entry is keyed by its SPDX id instead (for example `"MIT"`), and the text comes from the canonical SPDX license list.
