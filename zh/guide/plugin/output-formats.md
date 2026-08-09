# 输出格式

插件可以用两种格式写出许可证元数据。它们序列化的是同一份数据，只是编码方式不同。

## JSON

人类可读，也是默认格式，写入 `osslibraries.json`。

- 便于直接查看和 diff。
- 调试时或依赖树较小时推荐使用。

## MessagePack

紧凑的二进制格式，写入 `osslibraries.msgpack`。

- 磁盘占用更小，解析更快。
- 需要控制 HAP 体积时推荐使用。

## 运行时行为

运行时，库优先读取 `osslibraries.msgpack`，找不到再回退到 `osslibraries.json`。

## 选择

| `format`                   | 输出文件               | 体积 | 人类可读 |
| -------------------------- | ---------------------- | ---- | -------- |
| `OutputFormat.JSON`        | `osslibraries.json`    | 较大 | 是       |
| `OutputFormat.MessagePack` | `osslibraries.msgpack` | 较小 | 否       |

文件扩展名随 `format` 自动确定，除非显式设置了 `outputFile`。
