---
title: phpmyadmin not found
date: 2016-11-16
code: true
---

在 ubuntu 14.04 中使用：

``` shell
$ sudo apt-get install phpmyadmin
```

安装好 phpmyadmin 之后，打开 http://localhost/phpmyadmin ，不能访问，显示 404 Not Found，这不是逗我吗？

搜索一番解决该问题：

打开配置文件

``` shell
$ sudo gedit /etc/apache2/apache2.conf
```

在最后添加一行：

``` shell
Include /etc/phpmyadmin/apache.conf
```

然后重启apche2

``` shell
$ sudo service apache2 restart
```

### 参考

* http://askubuntu.com/questions/55280/phpmyadmin-is-not-working-after-i-installed-it