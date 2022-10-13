---
title: ERROR 1698 (28000) Access denied for user 'root'@'localhost'
date: 2018-10-21
code: true
---

在新版的 Ubuntu （如 16.04，18.04）中，安装好 MySQL 后直接用下面的命令连接总是会报错：

``` shell
$ mysql
ERROR 1045 (28000): Access denied for user 'feiffy'@'localhost' (using password: NO)
$ mysql -u root
ERROR 1698 (28000): Access denied for user 'root'@'localhost'
```
这是因为 mysql 默认的 root 用户使用了 UNIX <a href="https://dev.mysql.com/doc/refman/5.7/en/socket-pluggable-authentication.html" target="_blank" rel="noopener noreferrer">auth_socket_plugin</a> 的用户认证方式。

下面使用 sudo 权限登录 mysql，验证这一点：

``` shell
$ sudo mysql -u root

mysql> USE mysql;
mysql> SELECT user, host, plugin FROM user;
+------------------+-----------+-----------------------+
| user             | host      | plugin                |
+------------------+-----------+-----------------------+
| root             | localhost | auth_socket           |
| mysql.session    | localhost | mysql_native_password |
| mysql.sys        | localhost | mysql_native_password |
| debian-sys-maint | localhost | mysql_native_password |
+------------------+-----------+-----------------------+
```
如上所示，root 用户使用 auth_socket 方式，而另外一种用户认证方式是 mysql_native_password，这个才是 mysql 正常的用户名密码登录方式。

auth_socket 使用 Unix socket 文件来验证本地的用户身份。

有两种方式可以解决这个问题：
1. 修改 root 用户认证方式为 mysql_native_password plugin，即改为使用密码登录
2. 使用系统当前的用户名创建一个数据库用户（推荐）



**方式1**：

``` shell
$ sudo mysql -u root

mysql> USE mysql;
mysql> UPDATE user SET plugin='mysql_native_password' WHERE user='root';
mysql> FLUSH PRIVILEGES;
mysql> exit;

$ sudo service mysql restart

$ mysql -u root  # 初始安装并没有设置密码，所以直接就能登录了

mysql>
```
或者在修改时直接设置密码：
``` sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
```


**方式2**：（系统当前用户为 feiffy，所以我创建一个数据库用户为 feiffy，并且设置 unix socket 认证的方式，这样，在系统用户环境下，直接使用 feiffy 就能登录 mysql 而不需要使用密码了）

``` shell
$ sudo mysql -u root

mysql> USE mysql;
mysql> CREATE USER 'feiffy'@'localhost' IDENTIFIED BY '';
mysql> GRANT ALL PRIVILEGES ON *.* TO 'feiffy'@'localhost';
mysql> UPDATE user SET plugin='auth_socket' WHERE user='feiffy';
mysql> FLUSH PRIVILEGES;
mysql> exit;

$ sudo service mysql restart

$ mysql # 直接登录成功

mysql>
```
直接登录成功，这是因为不输入用户名的情况下，默认使用当前系统用户名（此时为 feiffy）登录 mysql，这个 feiffy 这个用户使用 auth_socket 认证。此时，mysql 通过当前系统认证的方式来认证用户 feiffy，只要当前用户 feiffy 登录了系统，就能直接登录 mysql。同样的道理，要登录 mysql 的 root 用户，当前系统也必须要登录 root 用户，而系统切换到 root 用户使用 sudo 命令，所以，也就能解释了命令 sudo mysql -u root 能够直接登录 mysql 的原因。

在某些系统上（比如：Debian stretch），'auth_socket' 也被叫做 'unix_socket'，所以相关 SQL 就要被改为 'mysql> UPDATE user SET plugin='unix_socket' WHERE user='feiffy';'

## 参考

- [mysql - ERROR 1698 (28000): Access denied for user 'root'@'localhost' - Stack Overflow](https://stackoverflow.com/questions/39281594/error-1698-28000-access-denied-for-user-rootlocalhost)
- [auth_socket_plugin](https://dev.mysql.com/doc/refman/5.7/en/socket-pluggable-authentication.html)