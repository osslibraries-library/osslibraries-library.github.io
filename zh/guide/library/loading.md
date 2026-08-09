# 加载与解析

核心包将 rawfile 产物转换为类型化对象。本页介绍涉及的类。

## LibsLoader

`LibsLoader.fromRawfile(context)` 读取 rawfile、解析，并按名称对库排序。

加载顺序：

1. `osslibraries.msgpack` —— 用 `Libs.fromMsgpack` 解析。
2. `osslibraries.json` —— 用 `Libs.fromJson` 解析。

两个文件均不存在时，抛出加载 JSON 时的异常。MessagePack 文件不可用时，加载器会打印警告，便于区分文件缺失与解码失败。

## Libs

容器类，持有 `libraries: Library[]` 与 `licenses: License[]`，并提供：

- `findLibrary(uniqueId)` —— 返回第一个匹配项，找不到返回 `undefined`。
- `findLicense(hash)` —— 返回第一个匹配项，找不到返回 `undefined`。
- `fromJson(json)` / `fromMsgpack(bytes)` —— 直接解析原始值。
- `new Libs(libraries, licenses)` —— 手动构建实例。

## Parser

解析器同时处理两种格式，逻辑一致：先读取许可证映射，再据此解析每个库的许可证引用。缺少 `uniqueId` 的条目会被跳过并记录日志，脏数据不会以空行出现在列表中。

## LibsHolder

用于在页面间共享 `Libs` 实例的静态持有者：

```ets [ArkTS]
LibsHolder.set(libs);
const libs = LibsHolder.get();
```

预定义页面通过它共享数据，避免详情页重复加载文件。
