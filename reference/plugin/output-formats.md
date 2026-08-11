# Output Formats

The plugin writes the license metadata in one of two formats. They serialize the same data; only the encoding differs.

## JSON

Human-readable, the default. Written to `osslibraries.json`.

- Easy to inspect and diff.
- The right choice while debugging, or for small dependency trees.

## MessagePack

Compact binary, written to `osslibraries.msgpack`.

- Smaller on disk, faster to parse.
- The right choice for keeping the HAP payload small.

## At run time

The library prefers `osslibraries.msgpack` and falls back to `osslibraries.json`.

## Choosing a format

| `format`                   | Output file            | Size    | Human-readable |
| -------------------------- | ---------------------- | ------- | -------------- |
| `OutputFormat.JSON`        | `osslibraries.json`    | larger  | yes            |
| `OutputFormat.MessagePack` | `osslibraries.msgpack` | smaller | no             |

The file extension follows the format automatically, unless you set `outputFile` explicitly.
