---
title: Ubuntu 搜狗输入法突然无法输入中文
date: 2018-06-25
code: true
---

Ubuntu 里面虽然安装好了搜狗输入法，可以用，但有的时候，会突然失效，导致只能输入英文或者候选词变成乱码了。

之前的解决方法是重启系统，重启之后就好了，但今天连续失效了两次，实在受不了了，所以研究了一下如何通过命令来解决这个问题

第一个，直接重启fcitx
``` shell
fcitx -r
```
第二个，执行下面的脚本
``` shell
#!/bin/sh
# 获得fcitx的进程id并kill
pidof fcitx | xargs kill
pidof sogou-qimpanel | xargs kill
# 重新后台模式打开fcitx
nohup fcitx  1>/dev/null 2>/dev/null &
nohup sogou-qimpanel  1>/dev/null 2>/dev/null &
```
将以上内容保存到 restart_sogou，并复制到/usr/bin，并添加可执行权限，即可在任意地方从命令行执行 restart_sogou 来重启搜狗面板
``` shell
$ sudo cp ./restart_sogou /usr/bin/
$ sudo chmod a+x /usr/bin/restart_sogou
```

参考：https://blog.csdn.net/o_guolin/article/details/79367211