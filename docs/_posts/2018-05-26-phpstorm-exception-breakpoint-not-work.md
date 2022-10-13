---
title: Phpstorm 无法自动断点 Exception
date: 2018-05-26
---

困扰了很久的问题了。

  

...

  

今天终于解决了，直接说解决方案吧。

  

在 php.ini 中增加一行配置： `xdebug.default_enable = 1`，然后重启Apache服务器： `sudo service apache2 restart`

1. **注意**: 要找对应的 php.ini 配置，在 Ubuntu 中，PHP7.0 的配置文件在：/etc/php/7.0/apache2/php.ini，而相应 CLI 的版本在：/etc/php/7.0/cli/php.ini，其他以此推测。

2. 如果这个设置无效，可以先将其值设置为0，重启Apache，然后再设置为1，再重启Apache之后再试试看

  

打开 phpstorm，选择: 菜单栏 -> Run -> View Breakpoints，打开界面如下：

  

![](/blog/imgs/2112ed87ae129b4f62590c5117bb625c.png)

  

，点击左上角的“+”号，选择 add php exception breakpoint，添加一个断点，之前困惑我许久的就是这个添加断点的输入框，没有可供选择 notcie、warning、exception 的地方，后来看了别人的设置，突然明白了，直接输入 Notice 名就可以了。名为 Notice 就表示 Notices 断点，如下图所示：

  

![](/blog/imgs/55e505339725afcbf8cf5c31fed445f2.png)

  

，自动出现的提示也说明了这一点。

  

使用一段代码测试一下：

``` php

$foo = 42 / 0;

  

$a = 1;

```

  

结果，成功自动断点到 Warning 错误。

  

![](http://feiffy.cc/w/images/5/5b/Phpstorm-003.png)

  

参考：<a href="https://intellij-support.jetbrains.com/hc/en-us/community/posts/115000020804-Exception-Breakpoints-not-breaking-execution" target="_blank" rel="noopener noreferrer"> Exception-Breakpoints-not-breaking-execution</a>