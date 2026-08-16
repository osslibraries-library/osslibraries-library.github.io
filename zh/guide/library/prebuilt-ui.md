# 预定义 UI <Badge type="tip" text="手机" /> <Badge type="tip" text="平板" /> <Badge type="tip" text="折叠屏" /> <Badge type="tip" text="智慧屏" />

`osslibraries_ui` 包提供一个可嵌入应用的自适应 ArkUI 页面：依赖列表，以及每个依赖对应的详情视图。

## 安装

```zsh [ohpm]
ohpm install osslibraries_ui
```

该包依赖核心 `osslibraries` 包，安装时自动带入。

## 注册路由

页面通过命名路由声明，无需修改 `main_pages.json`。在 `entry` 模块的页面文件顶部导入它以注册路由：

```ets [Index.ets]
import 'osslibraries_ui/src/main/ets/pages/OSSLibrariesLicensePage';
```

任意属于该模块的页面文件均可，通常选择 `Index.ets`。

## 展示列表

用 `pushNamedRoute` 跳到许可页：

```ets [ArkTS]
this.getUIContext().getRouter().pushNamedRoute({
  name: 'OSSLibrariesLicensePage'
});
```

页面通过 `LibsLoader` 自行加载数据，无需传入参数。每行渲染一个库，点击后打开详情视图。

## 详情视图

页面会把库的 `uniqueId` 交给详情视图：

```ts
interface LicenseDetailParams {
  uniqueId: string;
}
```

详情视图读取参数，通过 `LibsHolder` 查找库，并展示其链接与完整许可证全文。库既无许可证也无网站时，对应行不可点击。

## 页面自带的东西

- 加载中、空数据、出错三种状态均已内置。
- 基于 ArkUI 与 UI Design Kit 组件构建。
- 点击链接通过 `startAbility` 打开系统浏览器。

数据获取方式见[加载与解析](/zh/reference/library/loading)，自定义 UI 见[自定义 UI](/zh/guide/library/custom-ui)。
