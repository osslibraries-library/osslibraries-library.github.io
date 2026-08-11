# Use the Plugin Programmatically

The scanner exports as a plain library and runs outside Hvigor, in a custom task, a script, or a test. The examples below require a HarmonyOS project (or any directory containing `oh_modules/`) and Node.js.

## Scan a project

Import `scanProject` and point it at the project root:

```ts
import { scanProject } from "osslibraries-hvigor-plugin";

const result = scanProject("/path/to/project", { selfModules: new Set(["entry"]) });
```

`result` has the `{ libraries, licenses }` shape described in [Data Model](/reference/data-model). Pass local modules in `selfModules` to keep local code out of the list; `"entry"` is always excluded on top of the set.

## Write the result in a format

Both output formats are available. For JSON, use `serializeResult`. For MessagePack, resolve the serializer and encode:

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

## Reuse a single pipeline stage

The scanner's stages are exported individually and can be used one at a time:

- `readOhPackage` / `parseOhPackage` / `parseJson5` — read and normalize a manifest.
- `resolveLicense(decl)` — resolve one license declaration to entries.
- `contentHash(text)` — SHA-256 of license text.
- `buildLibrary(pkg, pkgDir)` — assemble one library entry from a manifest.
- `toOutputObject(result)` — the plain object the serializers encode.

Signatures for all of these are in [Plugin API Reference](/reference/plugin/api).

## A complete example

A Node script that scans the current project and prints a summary:

```ts
import { scanProject } from "osslibraries-hvigor-plugin";

const result = scanProject(process.cwd());

console.log(
  `${result.libraries.length} libraries, ${Object.keys(result.licenses).length} unique licenses`,
);
```
