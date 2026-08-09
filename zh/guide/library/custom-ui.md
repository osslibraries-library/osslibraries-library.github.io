# 自定义 UI

预定义页面不满足设计需求时，可直接使用核心 `osslibraries` 包加载并渲染数据。

## 安装

```zsh [ohpm]
ohpm install osslibraries
```

本包为核心包 `osslibraries`，不含预定义页面；需要预定义页面时安装 `osslibraries_ui`。

## 加载数据

用你的模块上下文调用 `LibsLoader.fromRawfile`，它会返回一个已经排好序的 `Libs` 实例：

```ets [ArkTS]
import { common } from '@kit.AbilityKit';
import { Libs, LibsLoader } from 'osslibraries';

const context: common.Context = this.getUIContext().getHostContext() as common.Context;

const libs: Libs = await LibsLoader.fromRawfile(context);
```

加载器会优先找 `osslibraries.msgpack`，找不到再退回 `osslibraries.json`。

## 读取数据

`Libs` 实例上有解析好的集合，还有几个现成的查找方法：

```ets [ArkTS]
const lib = libs.findLibrary('@ohos/hypium');
const license = libs.findLicense(hash);
```

每个库能拿到这些字段：

- name、description、website
- developers、organization、scm
- licenses —— 解析后的 `License` 对象（非哈希）
- tag

按需构建 UI。全部字段的定义见[数据模型](/zh/guide/library/data-model)。

## 跨页面共享数据

预定义页面的列表页和详情页之间，共享着同一个 `Libs` 实例。用 `LibsHolder` 就能实现同样的效果：

```ets [ArkTS]
LibsHolder.set(libs);
const cached = LibsHolder.get();
```

这样做可以省掉每次跳转都重新加载、解析文件的开销。

## 解析原始数据

元数据来自其他途径（网络响应、文件、测试夹具）时，使用 `Libs.fromJson` 或 `Libs.fromMsgpack` 直接解析：

```ets [ArkTS]
const libs = Libs.fromJson(jsonString);
const libs = Libs.fromMsgpack(byteArray);
```
