# How It Works

The plugin's task, `ossScanLicenses`, runs a small pipeline on every build. This page walks through each stage.

## 1. Find dependencies

The scanner looks for `oh-package.json5` files inside every `oh_modules/` directory in the project. It finds both flat packages (`oh_modules/foo/`) and scoped ones (`oh_modules/@scope/bar/`).

## 2. Normalize the manifest

Each manifest is JSON5 and loosely typed. `author`, `repository`, and `license` each accept several shapes — string or object, string or array. The scanner normalizes them once into a strict model and works with that everywhere else.

## 3. Resolve licenses

Each license declaration goes through the SPDX pipeline:

- Valid SPDX expressions, such as `Apache-2.0 OR MIT`, are parsed into their license ids.
- Common misspellings are corrected (`apache2` → `Apache-2.0`).
- The canonical name, URL, and full text come from the SPDX license list.

## 4. Read bundled license text

When a package ships its own LICENSE file, its text wins over the SPDX text. The scanner matches common spellings and casings of `LICENSE`, `COPYING`, and `NOTICE`.

## 5. Deduplicate

Identical license text collapses into a single entry, keyed by a SHA-256 content hash. The same `name@version` installed into several modules is collected once.

## 6. Sort and write

Libraries are sorted by name, then by version with semver-aware ordering. The result is serialized and written to the rawfile, and the build logs how many libraries were found.

## Which modules are excluded

The module the plugin is registered on is always removed from the list, because its dependencies are your project's own modules, not third-party libraries. Exclude additional local modules with `selfModules` (see [Configuration](/guide/plugin/configuration)).
