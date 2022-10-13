---
title: Ubuntu 安装 GNOME 之后开机进不了桌面
date: 2018-04-17
---

折腾了两晚上，终于解决了这个问题，进入了桌面。

问题是这样产生的：我安装了 ubuntu-gnome-shell 这个包，然后出现配置 display manager 的选项，有 gdm3 和 lightdm，我随便选了一个 gdm3，重启后开机就开不了。

解决办法：进入命令行 ∧ + alt + f2/f3/f4/f5，登录进去。

运行命令，重新配置：

``` shell
$ sudo dpkg-reconfigure lightdm
```

然后就出现了配置 display manager 的选项，选择 lightdm，重启一下就好了。

我在进入命令行这个地方卡了很久，怎么也进不去。后来乱滚键盘，才进去的。