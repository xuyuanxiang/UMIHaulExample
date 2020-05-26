# UMIHaulExample

[umi-react-native](https://github.com/xuyuanxiang/umi-react-native#readme)示例工程。

在开发阶段使用[React Native CLI](https://github.com/react-native-community/cli/blob/master/docs/commands.md#commands)，不拆包，因为：

1. [haul](https://github.com/callstack/haul)不支持：Fast Refresh, Live Reloading, Hot Replacement...
2. [umi-react-native-multibundle](https://github.com/xuyuanxiang/umi-react-native/tree/master/packages/umi-react-native-multibundle)目前还不支持从远程 URL 下载 JS Bundle...

在发布阶段使用[haul](https://github.com/callstack/haul)进行拆包。

当前 master 分支最新代码集成了：

- [DvaJS](https://dvajs.com/)
- [@ant-design/react-native](https://rn.mobile.ant.design/index-cn)
- [react-navigation](https://reactnavigation.org/)

**需要配置好 RN 开发环境：[Setting up the development environment](https://reactnative.dev/docs/environment-setup)，才能查看应用运行效果。**

你可以使用**UMIHaulExample**作为模板，[快速开始](#%E5%BF%AB%E9%80%9F%E5%BC%80%E5%A7%8B)业务开发；

也可以从零开始徒手搭建，在[变更记录](#%E5%8F%98%E6%9B%B4%E8%AE%B0%E5%BD%95)中追溯每一步代码变动的内容。

扫码下载 Android 示例：



## 目录

- [快速开始](#%E5%BF%AB%E9%80%9F%E5%BC%80%E5%A7%8B)
  - [开发](#%E5%BC%80%E5%8F%91)
  - [发布](#%E5%8F%91%E5%B8%83)
    - [仅输出 JS Bundle](#%E4%BB%85%E8%BE%93%E5%87%BA-js-bundle)
      - [Android](#android)
      - [iOS](#ios)
    - [构建 iOS App](#%E6%9E%84%E5%BB%BA-ios-app)
    - [构建 Android App](#%E6%9E%84%E5%BB%BA-android-app)
- [拆包](#%E6%8B%86%E5%8C%85)
  - [拆包策略](#%E6%8B%86%E5%8C%85%E7%AD%96%E7%95%A5)
  - [将拆包加入原生 App 构建流程](#%E5%B0%86%E6%8B%86%E5%8C%85%E5%8A%A0%E5%85%A5%E5%8E%9F%E7%94%9F-app-%E6%9E%84%E5%BB%BA%E6%B5%81%E7%A8%8B)
    - [Android](#android-1)
    - [iOS](#ios-1)
- [变更记录](#%E5%8F%98%E6%9B%B4%E8%AE%B0%E5%BD%95)
  - [0.0.1-初始工程](#001-%E5%88%9D%E5%A7%8B%E5%B7%A5%E7%A8%8B)
  - [0.0.2-安装 haul](#002-%E5%AE%89%E8%A3%85-haul)
  - [0.1.0-安装 umi 和 umi-preset-react-native](#010-%E5%AE%89%E8%A3%85-umi-%E5%92%8C-umi-preset-react-native)
  - [1.0.0-集成 DvaJS](#100-%E9%9B%86%E6%88%90-dvajs)
  - [1.1.0-集成 @ant-design/react-native](#110-%E9%9B%86%E6%88%90-ant-designreact-native)
  - [1.2.0-集成 react-navigation](#120-%E9%9B%86%E6%88%90-react-navigation)

## 快速开始

### 开发

clone 到本地后，进到工程根目录，使用 yarn 安装依赖：

```npm
yarn
```

进到 ios 工程目录使用 pod 安装原生依赖（Android 跳过这一步）：

```shell
cd ios && pod install && cd -
```

启动 watch 进程，监听文件变动，重新生成中间代码：

```npm
yarn watch
```

再另启一个终端，启动 Android 应用：

```npm
yarn android
```

或者启动 iOS 应用：

```npm
yarn ios
```

### 发布

#### 仅输出 JS Bundle

执行下面命令，会输出 js bundle 到 `/dist/ios`和`/dist/android`目录。

```npm
yarn bundle
```

之后可以提供给原生开发的同学。

##### Android

将`/dist`目录下的`/android`目录重名为`assets`并移动到下图位置：

![](https://cdn.xuyuanxiang.me/android_multibundle_ad44930f.png)

##### iOS

将`/dist/ios`目录下所有文件和目录直接拖拽到 Xcode 中即可：

![](https://cdn.xuyuanxiang.me/ios_multibundle_894ca845.png)

_Xcode 会自动把这些文件和目录添加到右侧的`Copy Bundle Resources`中。_

#### 构建 iOS App

执行下面命令，会先构建生成 iOS 的 JS bundle，然后再使用`xcodebuild`命令行工具构建 App：

```npm
yarn release:ios
```

#### 构建 Android App

执行下面命令，会先构建生成 Android 的 JS bundle，然后再使用`gradle`命令行工具构建 App：

```npm
yarn release:android
```

## 拆包

### 拆包策略

- 主包包含：
  - umi 生成的临时文件；
  - 依赖项：
    - react-router
    - history
    - react
    - react-native
    - react-router-native
    - umi-react-native-multibundle
    - dva
    - @react-native-community/masked-view
    - react-native-gesture-handler
    - react-native-reanimated
    - react-native-safe-area-context
    - react-native-screens
    - umi-renderer-react-navigation
    - umi

* 分包：pages 目录下每个页面都单独拆为一个分包，路由访问到时按需加载。

### 将拆包加入原生 App 构建流程

按照如下描述追加相关配置后，在构建正式的 iOS/Android 安装包时，会使用 haul 拆包：

#### Android

按照下图，在`build.gradle`文件中添加`bundleCommand`配置：

![](https://cdn.xuyuanxiang.me/android_build_config_0f53bcb0.png)

_cliPath: 由 haul 添加。_

#### iOS

在 Xcode `Build Phases` 选项卡中找到截图所示位置，添加`BUNDLE_COMMAND`环境变量：

![](https://cdn.xuyuanxiang.me/ios_build_config_7e22a742.png)

_CLI_PATH: 由 haul 添加。_

## 变更记录

### 0.0.1-初始工程

使用`react-native init`得到初始代码：[0.0.1](https://github.com/xuyuanxiang/UMIHaulExample/tree/0.0.1)

```npm
npx react-native init UMIHaulExample
```

### 0.0.2-安装 haul

代码：[0.0.2](https://github.com/xuyuanxiang/UMIHaulExample/tree/0.0.2) 。

```npm
yarn add @haul-bundler/cli --dev && yarn haul init
```

查看变更内容：

- [compare/0.0.1...0.0.2](https://github.com/xuyuanxiang/UMIHaulExample/compare/0.0.1...0.0.2)

### 0.1.0-安装 umi 和 umi-preset-react-native

代码：[0.1.0](https://github.com/xuyuanxiang/UMIHaulExample/tree/0.1.0) 。

```npm
yarn add umi umi-preset-react-native --dev
```

查看变更内容：

- [compare/0.0.2...0.1.0](https://github.com/xuyuanxiang/UMIHaulExample/compare/0.0.2...0.1.0)

### 1.0.0-集成 DvaJS

代码：[1.0.0](https://github.com/xuyuanxiang/UMIHaulExample/tree/1.0.0)。

```npm
yarn add @umijs/plugin-dva --dev
```

查看变动内容：

- [compare/0.1.0...1.0.0](https://github.com/xuyuanxiang/UMIHaulExample/compare/0.1.0...1.0.0)

### 1.1.0-集成 @ant-design/react-native

代码：[1.1.0](https://github.com/xuyuanxiang/UMIHaulExample/tree/1.1.0)。

```npm
yarn add @ant-design/react-native && yarn add umi-plugin-antd-react-native --dev && yarn react-native link
```

查看变动内容：

- [compare/1.0.0...1.1.0](https://github.com/xuyuanxiang/UMIHaulExample/compare/1.0.0...1.1.0)

### 1.2.0-集成 react-navigation

代码：[1.2.0](https://github.com/xuyuanxiang/UMIHaulExample/tree/1.2.0)。

```npm
yarn add umi-preset-react-navigation --dev && yarn add react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view && cd ios && pod install && cd -
```

查看变动内容：

- [compare/1.1.0...1.2.0](https://github.com/xuyuanxiang/UMIHaulExample/compare/1.0.0...1.2.0)
