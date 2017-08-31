# feidee_web_modifier
随手记WEB界面调整插件

用于随手记WEB界面做一些方便性的调整的工具

## 主要功能
1. 将隐藏在“新功能”导航下的二级导航“周期帐”，复制到一级导航栏，放在“记账”导航项后面。
2. 将“周期账”的日历视图中，已过期、部分已入账的样式，从原来的“已过期未入账”的红色改为“已过期已入账”的绿色。

## 使用方法
~~不知道什么时候，Safari扩展已经不能直接在Safari的“扩展创建器”中直接打包了。~~

~~所以现阶段只能手动下载源代码，并在“扩展创建器”中手动添加。~~

[点击这里下载并安装](https://raw.githubusercontent.com/athurg/feidee_web_modifier/master/dist/feidee_web_modifier.safariextz)

## TODO
- [x] 支持Safari扩展打包以直接下载安装。
- [ ] 所有功能支持通过配置来独立开启、关闭。
- [ ] 用更好的方式检测“周期帐”页面数据的刷新，并启动hook。（目前是注册了一个MutationObserver）
