---
title: Ubuntu 16.04 LAMP server 指南 - 配置 Apache2.4,PHP7,和MariaDB（而不是MySQL）
date: 2016-12-09
---

原文：[https://www.howtoforge.com/tutorial/install-apache-with-php-and-mysql-on-ubuntu-16-04-lamp/](https://www.howtoforge.com/tutorial/install-apache-with-php-and-mysql-on-ubuntu-16-04-lamp/)

昨天在虚拟机里面安装ubuntu server ，然后配置php开发环境，参考了这篇文章，一次性把所有的东西都安装配置好了，所以想把这篇文章记录下来。希望能够帮助到初学者一次性搞定这些配置（避免纠结），然后就可以愉快地编程了，嘿嘿。

以下是我翻译的内容，完全对照原文，没有自己改动的部分（因为原文已经很完美了）：

**LAMP** 是 Linux,Apache,MySQL,PHP的缩写。本文教你如何在 ubuntu 16.04(Xenial Xerus) server 上安装 Apache2，PHP7（mod_php）和MySQL。此外，还将安装 PHPMyAdmin 工具用于管理 MySQL。

### 说明
本文中，我使用 server1.example.com 作为主机名，IP为：192.168.1.100。你如果跟我不同，在相应的地方替换就行了。

我推荐使用 minimal Ubuntu server 作为本文操作的基础。

我在root权限下运行所有的命令，所以确保你使用的是root账户：
``` sh
$ sudo su
```

### 安装 MariaDB 作为 MySQL 的替换
我安装的是 MariaDB 而不是 MySQL。MariaDB 是 MySQL 的作者 Monty Widenius 所维护的 MySQL 分支版本。MariaDB 兼容 MySQL，并且增加了功能，提高了性能。运行下面的命令来安装 MariaDB-server 和 client:
``` sh
$ apt-get install mariadb-server mariadb-client
```
然后设置 MariaDB 的 root 密码：
``` sh
$ mysql_secure_installation
```
然后，出现一些提示,按照红色提示来操作就行了：
``` sh
Enter current password for root (enter for none): <-- press enter
Set root password? [Y/n] <-- y
New password: <-- Enter the new MariaDB root password here
Re-enter new password: <-- Repeat the password
Remove anonymous users? [Y/n] <-- y
Disallow root login remotely? [Y/n] <-- y
Reload privilege tables now? [Y/n] <-- y
```
使用 mysql 命令测试是否能登录 MariaDB：
``` sh
$ mysql -u root -p
```
 再输入上面设置 root 密码，就会出现如下所示：

![](https://images2015.cnblogs.com/blog/941616/201612/941616-20161209182512710-1592568295.png)

要离开 MariaDB shell，输入 quit 和 回车键就行了。

### 安装 Apache 2.4
Apache 2 可以直接从 Ubuntu 包中获取，只要这样：
``` sh
$ apt-get install apache2
```
现在打开浏览器，输入 http://192.168.1.100 ，就能看到 Apache 2 默认页面：

![](https://images2015.cnblogs.com/blog/941616/201612/941616-20161209182823679-1160699445.png)

apache 默认文章根目录是 /var/www/html，其主要配置文件为：/etc/apache2/apache2.conf。其配置系统的说明文档在 /usr/share/doc/apache2/README.Debian.gz.

### 安装 PHP 7
安装 PHP 7 和 Apache PHP 模块：
``` sh
$ apt-get install php7.0 libapache2-mod-php7.0
```
然后重启 Apache
``` sh
$ systemctl restart apache2
```

### 测试 PHP 获得一些细节信息
 默认web站点的文档根目录是 /var/www/html ，我在该目录创建一个info.php文件，然后在浏览器中访问它。这个文件能够显示有关PHP安装的详细信息。
``` sh
$ vim /var/www/html/info.php
```
输入文件内容：
``` php
<?php
phpinfo();
```
改变info.php文件的所有者为 www-data 用户和组
``` sh
$ chown www-data:www-data /var/www/html/info.php
```
现在我们可以在浏览器中访问 http://192.168.1.100/info.php ，结果如下图所示：

![](https://images2015.cnblogs.com/blog/941616/201612/941616-20161209184720585-809940705.png)

如你所看到的，PHP7.0 正在运行，从 Server API 行可以看出，它是通过 Apache 2.0 Handler 运行的，继续向下滚动页面，你就看见所有已经启用的模块。MySQL并不在其中，这是因为我们还没有对PHP添加MySQL/MariaDB支持。

### PHP 启用 MySQL / MariaDB 支持
为了使 PHP 支持 MySQL，可以安装 php7.0-mysql 包。同时也可以安装其他所需要的 PHP 模块，使用下面命令来搜索可用的 PHP 模块：
``` sh
$ apt-cache search php7.0
```
选择一些模块，安装之：
``` sh
$ apt-get -y install php7.0-mysql php7.0-curl php7.0-gd php7.0-intl php-pear php-imagick php7.0-imap php7.0-mcrypt php-memcache  php7.0-pspell php7.0-recode php7.0-sqlite3 php7.0-tidy php7.0-xmlrpc php7.0-xsl php7.0-mbstring php-gettext
```
 重启 Apache2
``` sh
$ systemctl restart apache2
```
![](https://images2015.cnblogs.com/blog/941616/201612/941616-20161209190557179-563578384.png)

如上图所示，PHP已经启用了 MySQL/MariaDB 支持。

### 安装 APCu PHP 缓存来加速 PHP 运行
APCu 是一个免费的 PHP opcode cacher 用来缓存和优化 PHP 中间代码。推荐安装它来加速PHP速度。

安装：
``` sh
$ apt-get install php-apcu
```
重启 Apache：
``` sh
$ systemctl restart apache2
```
刷新一下 http://192.168.1.100/info.php，看到 apcu 模块：

![](https://images2015.cnblogs.com/blog/941616/201612/941616-20161209191033163-1143529792.png)

请删除 info.php 文件，它会显示你服务器的敏感信息。运行下面的命令来删除：
``` sh
$ rm -f /var/www/html/info.php
```
### 启用 Apache 的 SSL 网站支持
 SSL/TLS 是一个安全层，用于加密浏览器与服务器之间的连接。使用下面的命令以启用 https:// 支持
``` sh
$ a2enmod ssl
$ a2ensite default-ssl
```
这两行命令启用了 ssl 模块，并在 /etc/apache2/sites-enabled 文件夹中添加了 /etc/apache2/sites-available/default-ssl.conf 的链接，以将其包括到apache 配置之中。然后重启apache来启用新配置：
``` sh
$ systemctl restart apache2
```
现在浏览器打开 https://192.168.1.100 ，看到：

![](https://images2015.cnblogs.com/blog/941616/201612/941616-20161209191755616-43146619.png)

你看到了一个 SSL 警告：该服务器的 SSL 证书 是 “自己颁发给自己的”，这表示浏览器不信任该证书，所以你必须先接受安全警告，然后才能打开apache 默认页面：

![](https://images2015.cnblogs.com/blog/941616/201612/941616-20161209191955913-207794574.png)

浏览器地址栏URL前面的 “绿色的锁”表明连接是经过加密的。要想解除 SSL 警告，可以从 SSL 证书颁发机构获得一个官方签名的SSL证书，然后替换默认自带的证书：/etc/ssl/certs/ssl-cert-snakeoil.pem。

### 安装 phpMyAdmin
通过phpMyAdmin可以操作MySQL数据库。安装命令：
``` sh
$ apt-get install phpmyadmin
```
然后看到这些提示，按照红色提示输入就行了：
``` sh
Web server to configure automatically: <-- Select the option: apache2
Configure database for phpmyadmin with dbconfig-common? <-- Yes
MySQL application password for phpmyadmin: <-- Press enter, apt will create a random password automatically.
```
MariaDB 默认为root用户启用了“unix_socket”插件，这个插件会阻止root用户登录phpmyadmin和root用户到MySQL的TCP连接。因此，使用命令禁用了它：

``` sh
echo "update user set plugin='' where User='root'; flush privileges;" | mysql -u root -p mysql
```
然后输入 MariaDB root 密码。

之后，你就可以通过 http://192.168.1.100/phpmyadmin/ 来访问：

![](https://images2015.cnblogs.com/blog/941616/201612/941616-20161209192856772-78104055.png)

![](https://images2015.cnblogs.com/blog/941616/201612/941616-20161209192906351-426799837.png)

---

另外，说明一些操作过程中可能会遇到的问题以及解决办法。

（1）安装完访问 phpmyadmin 时，出现错误：The reqeusted URL /phpmyadmin was not found on this server

我的解决办法在这里：[PHPMYADMIN NOT FOUND](phpmyadmin-not-found.md)