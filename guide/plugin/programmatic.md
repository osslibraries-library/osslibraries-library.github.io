# Programmatic Use

The plugin's scanner is exported as a plain library, so you can use it outside Hvigor — in a custom task, a script, or a test. This page is a guide-level overview; the full API reference will be added later.

## scanProject

Runs the full scan and returns the result:

```ts
import { scanProject } from "osslibraries-hvigor-plugin";

const result = scanProject("/path/to/project", { selfModules: new Set(["entry"]) });
```

`result` has the `{ libraries, licenses }` shape described in the [Data Model](/guide/library/data-model).

## Serialize

Write the result in either format:

```ts
import {
  scanProject,
  serializeResult,
  getSerializer,
  OutputFormat,
} from "osslibraries-hvigor-plugin";

const result = scanProject("/path/to/project");

const json = serializeResult(result); // JSON string
const bytes = getSerializer(OutputFormat.MessagePack).encode(result); // Buffer
```

## Lower-level helpers

The pipeline is exported in pieces, so you can reuse one stage at a time:

- `readOhPackage` / `parseOhPackage` / `parseJson5` — read and normalize a manifest.
- `resolveLicense(decl)` — resolve one license declaration to entries.
- `contentHash(text)` — SHA-256 of license text.
- `buildLibrary(pkg, pkgDir)` — assemble one library entry from a manifest.
- `toOutputObject(result)` — the plain object the serializers encode.

## A complete example

A Node script that scans the current project and prints a summary:

```ts
import { scanProject } from "osslibraries-hvigor-plugin";

const result = scanProject(process.cwd());

console.log(
  `${result.libraries.length} libraries, ${Object.keys(result.licenses).length} unique licenses`,
);
```
