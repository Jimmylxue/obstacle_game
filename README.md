# 躲避障碍小游戏

由于微信小程序本身平台的特殊性，使得我们如果要实现在微信小程序内开发小游戏变得异常的困难，不然微信开发者工具中就没有必要将 **小程序** 和 **小游戏** 独立开来。

## 前言

这是一个taro干净项目，安装依赖之后构建 微信小程序 即可体验。

## 难点：

- 原生canvas本身难度偏高

  由于市面上 绝大多数的 canvas库 在小程序平台都无法使用，所以如果我们遇到这种需求，那么就只能使用原生的 **canvas** 来写啦~，一开始肯定是非常的煎熬的，因为 canvas 的API过于底层。但是如果写多了，理解 **每一帧** 都是渲染出来的概念，加上多写，就能理解的比较快了。

- 需要适配机型

  canvas 的 API 涉及单位的都是 **px**，而不像正常的页面元素一样可以使用 **rpx**，所以当我们兴致满满的开发完成之后切换一个不同尺寸的手机就会发现有着适配问题，因为px就是有适配问题。

## 解决方法

- 使用原生 **canvas** + **tween.js** 缓动动画库

  这里只能多写多理解了~

- 自行封装一个 `px2rem` 工具方法，将所有涉及到的单位都经过一层转换，就能过解决这个问题啦

## 收获

通过这个demo案例，我对于canvas的理解比原来更上一层楼了，所以代码还是得多写呀~

同时经过三次重构！知道了小游戏开发和我们页面开发还是有着天壤之别的，如果我们使用方式或者理解上出了问题，那么导致的结果就是我们的小游戏会异常的卡顿！所以这个是很重要的。

## 后续

这个demo我会不断的完善下去，优化的点还有很多，比如：**动画**、**逻辑**、**代码编写优化**，等等，如果有兴趣的小伙伴可以给我提PR，一起学习呀~💪🏻
