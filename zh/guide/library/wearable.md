# 预定义 UI（穿戴设备）

穿戴设备的预定义 UI 使用独立的模块 `osslibraries_ui_wear`，其页面针对手表屏幕做了适配。

## 安装

```zsh [ohpm]
ohpm install osslibraries_ui_wear
```

## 注册插件

在穿戴模块的 `hvigorfile.ts` 中注册扫描器：

```ts [hvigorfile.ts]
import { hapTasks } from "@ohos/hvigor-ohos-plugin";
import { ossScanPlugin } from "osslibraries-hvigor-plugin";

export default {
  system: hapTasks,
  plugins: [ossScanPlugin()],
};
```

## 注册路由

导入即注册路由。在模块的页面文件顶部导入穿戴版页面：

```ets [ArkTS]
import 'osslibraries_ui_wear/src/main/ets/pages/OSSLibrariesLicenseListPageWear';
import 'osslibraries_ui_wear/src/main/ets/pages/OSSLibrariesLicenseDetailPageWear';
```

## 跳转

使用列表页的路由名：

```ets [ArkTS]
this.getUIContext().getRouter().pushNamedRoute({
  name: 'OSSLibrariesLicenseListPageWear'
});
```

其余流程与手机模块一致：列表自行加载数据，点击行打开详情页。
