---
title: Ubuntu 16.04 安装 Gnome 桌面环境
date: 2018-04-05
---

Linux平台上面的GNOME桌面有两种：一种是GNOME Shell（即本教程所讲的内容），另一种是 GNOME Desktop 。两者的区别在于：GNOME Shell 仅仅只是一个桌面环境，只修改用户界面；而 GNOME Desktop，包含了 GNOME Shell 和很多 GNOME 环境下特定的应用程序、包等等。如果你是一个新手，并且不知道装哪个好，那么就按照这篇教程的步骤安装 GNOME Shell 吧。

## 安装 GNOME
GNOME 已经包括在 Ubuntu（注：18.04 默认就是 GNOME 不需要折腾) 软件仓库了，所以可以直接用apt-get安装：
``` bash
$ sudo apt-get install gnome-shell
```
安装过程中会出现一个选择界面，如图所示，选择 lightdm 即可

安装好之后，注销，然后登录。在登录界面选择GNOME桌面，如图所示：

登录之后，看看，是不是比原来好看多了呢？

## 打造 OSX 风格桌面
先看两张折腾好的桌面截图：

要达到这样的效果是需要折腾一番的，这里将我折腾的过程，所需要安装的各种软件按顺序写出来，方便大家。

（0）注意：Ubuntu16.04及以下自带的gnome-shell最新版本为3.18，而该主题依赖至少为3.20，所以需要安装最新的gnome版本，不能使用系统自带仓库中的旧版本。使用下面的命令安装3.20版本：

``` bash
$ sudo add-apt-repository ppa:gnome3-team/gnome3-staging
$ sudo add-apt-repository ppa:gnome3-team/gnome3
$ sudo apt update
```

最后升级或者直接安装

``` bash
$ sudo apt dist-upgrade
# 如果之前没装gnome，替换为下面的直接安装命令
$ sudo apt install gnome-shell
```

（1）安装好gnome之后，安装一个最重要的工具：gnome-tweak-tool，我们将使用这个工具来加载主题，定制桌面组件的外观效果。

``` bash
$ sudo apt-get install gnome-tweak-tool
```

（2）下载主题资源。这个主题名为 Gnome-OSX，[点此链接](https://www.gnome-look.org/p/1171688/ "点此链接") 或 [我发现原来的资源失效，这里补上](https://www.gnome-look.org/p/1013714/ "我发现原来的资源失效，这里补上")访问其主页下载资源。注意，该主题有若干版本供下载，这里只需要选择文件名：Gnome-OSX-HSierra-light-menu V2.1--2themes.tar.xz 下载即可。 下载好解压，有两个子文件夹，一个名为 Gnome-OSX-V2-HSierra--light-menu，一个名为 Gnome-OSX-V2-HSierra-NT-light-menu，两者的区别是前者有透明效果，后者无透明。我用的是前者。将 Gnome-OSX-V2-HSierra--light-menu 移动到 /home/<your username>/.themes/ 目录下面，如果没有 .themes 目录则自己创建之。

（3）打开 gnome-tweak-tool，我们将用这个软件来加载主题，但在此之前必须先安装一些gnome扩展。打开[gnome extension](https://extensions.gnome.org/ "gnome extension") 网站，选择列表中的 User Themes 扩展，进入扩展详情页后，注意到 download 字样，在其右边，选择 gnome shell 3.20 版本和 gnome扩展 最新版本（目前为27），然后就开始生成文件自动下载了，其文件名为：user-theme@gnome-shell-extensions.gcampax.github.com.v27.shell-extension。然后回到刚才的页面，搜索框输入 “dash to dock“，打开扩展详情页，同上步骤下载之。这一步下载了两个 gnome 扩展：user themes 和 dash to dock。下一步安装之。

（4）上一步下载好扩展之后，打开 gnome-tweak-tool，切换到 extensions 页，点击 Install Shell Extension 右边的按钮，在文件选择框中选择刚才下载的扩展文件，确定，然后注销重新登录之后，再打开 gnome-tweak-tool，切换到 extensions 页看到扩展，就说明安装好了，如果切换选项是灰的，手动启用一下就好了。安装好 user themes 扩展之后才能安装 gnome 主题，安装好 dash to dock 扩展之后原先左边的应用列表就被固定到下面了。安装好之后如截图所示：
    
文件:Gnome-tweak-tool.png
（5）这一步安装主题，还是打开 gnome-tweak-tool，切换 Appearanc 页面，如图所示：

文件:Gnome-tweak-tool-2.png
，GTK+主题右边是主题选项，选择Gnome-OSX-V2-HSierra--light-menu，立刻就能看到桌面元素变成mac的风格了。如果你的样式不是截图所示，那么请先检查一下 gnome 版本是否为 3.20 及以上。

（6）顶部的标题栏以及日历设置组件元素以及dock设置用的是 Sierra-light gnome shell 主题，下载地址在[这里](https://www.gnome-look.org/p/1013714/ "这里")。下载文件：Sierra-light.tar.xz、Fonts - MyraidSetPro.tar.xz 和 MacOSX-icon-theme.tar.xz，第一个主题文件解压之后。放在 /home/<username>/.themes中，第二个字体文件解压之后，所有字体文件放到 /home/<username>/.local/share/font/ 目录中，第三个是图标资源，放在 /usr/share/icons 目录下。然后打开 gnome-tweak-tool,切换 Appearance 页面，看到下面的 shell theme 项可以选了，选择Sierra-light。然后切换 Fonts 页面，界面字体修改为 MyriadSetPro-Semibold。要使其生效还需要安装：sudo apt-get install gtk2-engines-murrine gtk2-engines-pixbuf，最后注销再登录就能看到效果了。

（7）dock的设置需要在 gnome-tweak-tool 的 extensions 页上的 Dash to dock 扩展这一行上面的设置按钮上进行详细设置。点击设置按钮，打开 Dash to Dock 的详细设置页，如图：

文件:Dash to Dock.png
，其中最重要的一个设置就是：切换到 Appearance 页，禁用 Use built-in theme 选项，禁用了之后，dock组件便会采用 Sierria-light 主题所设置的样式了。

（8）至此，所有的设置都已成功，后面的继续折腾之路，就靠你自己了。

PS：如果字体显示不平滑，需要在 gnome-tweak-tool 中设置 Fonts-Hinting 的值为 slight。

## 如何卸载 GNOME？

``` shell
$ sudo apt-get remove gnome-shell
```

## 如何查看 GNOME 版本？

``` shell
$  gnome-shell --version
```