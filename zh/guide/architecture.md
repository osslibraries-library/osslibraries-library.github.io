# 架构

OSSLibraries 分为构建期与运行期两部分：构建期由 Hvigor 插件扫描依赖、解析许可证，运行期由库加载数据并渲染页面。数据从依赖到屏幕的完整过程如下。

## 两个阶段

整个过程分两步，中间靠一个文件衔接：

1. **构建期——Hvigor 插件**。遍历 `oh_modules/` 下的每个 OHPM 依赖，解析许可证，将结果写入模块 `rawfile/` 目录下的文件。
2. **运行期——库**。从 rawfile 加载该文件，解析为类型化对象并渲染，可选用预定义页面或自定义 UI。

这个 rawfile 文件是两个阶段之间的契约。JSON 与 MessagePack 两种序列化形式携带的数据结构相同：

```json [osslibraries.json]
{
  "libraries": [
    {
      "uniqueId": "@ohos/hypium",
      "artifactVersion": "1.0.28",
      "licenses": ["533c62b5…"]
    }
  ],
  "licenses": {
    "533c62b5…": { "hash": "533c62b5…", "name": "…", "spdxId": "…", "content": "…" }
  }
}
```

`libraries` 是库条目的数组，`licenses` 是从内容哈希到许可证条目的映射。库通过哈希引用其许可证，内容相同的许可证文本只存储一份。

## 构建阶段

插件注册了名为 `ossScanLicenses` 的任务，安排在模块的 `CompileArkTS` 任务之前。每次构建，该任务会执行以下步骤：

1. 查找 `oh_modules/` 下所有的 `oh-package.json5`。
2. 读取并规范化每个清单——名称、版本、描述、作者、仓库及许可证声明。
3. 通过 SPDX 管线解析每条许可证声明。
4. 读取包内自带的 LICENSE 文件全文（若存在）。
5. 按内容哈希对相同许可证文本去重。
6. 库先按名称、再按版本排序。
7. 将产物写入 `rawfile/`。

任务在编译前运行，产物会随其他资源一起被打进 HAP。

## 运行阶段

运行时，库优先查找 `osslibraries.msgpack`，找不到再回退到 `osslibraries.json`。该顺序允许在构建中使用体积更小的 MessagePack，同时保留一份 JSON 用于调试。

- `LibsLoader.fromRawfile(context)` — 加载并解析，返回排好序的 `Libs`。
- `Libs.fromJson` / `Libs.fromMsgpack` — 直接解析原始字符串或字节数组。
- `LibsHolder` — 在多个页面间共享 `Libs` 实例。

## 为什么使用 rawfile 产物

将元数据放入 rawfile，可使两个部分解耦：

- 扫描器只写数据，不依赖你的 UI。
- 库只读数据，不依赖你的构建系统。

任一侧均可替换：修改插件的输出路径，或加载手写的 JSON 文件，库的行为保持一致。

## 延伸阅读

- 数据结构的具体定义，见[数据模型](/zh/guide/library/data-model)。
- 扫描器内部实现，见[工作原理](/zh/guide/plugin/how-it-works)。
