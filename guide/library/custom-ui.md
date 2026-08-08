# Custom UI

To render the data with your own UI, use the core `osslibraries` package directly.

## Install

```zsh
ohpm install osslibraries
```

This installs the core package `osslibraries`, which contains no pages; the provided pages live in `osslibraries_ui`.

## Load the data

Call `LibsLoader.fromRawfile` with your module context to get a sorted `Libs` instance:

```ets
import { common } from '@kit.AbilityKit';
import { Libs, LibsLoader } from 'osslibraries';

const context: common.Context = this.getUIContext().getHostContext() as common.Context;

const libs: Libs = await LibsLoader.fromRawfile(context);
```

The loader checks `osslibraries.msgpack` first, then `osslibraries.json`.

## Read the data

`Libs` exposes the parsed collections and a couple of lookup helpers:

```ets
const lib = libs.findLibrary('@ohos/hypium');
const license = libs.findLicense(hash);
```

For each library you get:

- name, description, website
- developers, organization, scm
- licenses — resolved `License` objects, not hashes
- tag

Build your UI as needed. The [Data Model](/guide/library/data-model) page lists every field.

## Share data across pages

The default pages share one `Libs` instance between the list and the detail page. Do the same with `LibsHolder`:

```ets
LibsHolder.set(libs);
const cached = LibsHolder.get();
```

This avoids loading and parsing the file on every navigation.

## Parse from raw values

If you obtain the metadata some other way — a network response, a file, a test fixture — use `Libs.fromJson` or `Libs.fromMsgpack`:

```ets
const libs = Libs.fromJson(jsonString);
const libs = Libs.fromMsgpack(byteArray);
```
