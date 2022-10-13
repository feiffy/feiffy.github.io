---
title: ubuntu 中 apache 开启 rewrite 模块
date: 2017-08-11
order: -1
---

ubuntu14.04中安装好apache2.4之后默认rewrite模块是不开启的，项目public目录下的.htaccess文件就用不了，在浏览器中访问网页总是报500错误，原因就是这个。

执行下面的命令，开启rewrite模块：
``` sh
$ sudo a2enmod rewrite
$ sudo service apache2 restart
```

然后再刷新页面，Works！

这个问题在很早以前第一次建立项目的时候就遇到过，当时花半天找到原因解决了，然后也没记下来，直到今天，想在本地的新装的系统上弄个小项目，又遇到了这个问题，又搞了半天，所以就记录在此。