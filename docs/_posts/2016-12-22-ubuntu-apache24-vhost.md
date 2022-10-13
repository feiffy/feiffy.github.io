---
title: Ubuntu apache2.4 设置虚拟主机
date: 2016-12-22
---

每次重装系统如何配置都上网找，搞半天，都是不对的，还不如自己记下来，以作参考呢。

我的项目目录是 `/home/feiffy/demo/test/public`，映射的域名是 test.com，这样在浏览器输入 test.com 就可以直接打开我的项目啦。

下面是配置的步骤：

1）先保证自己项目目录存在啊：`$ mkdir /home/feiffy/demo/test`

2）进入apache的配置文件目录：`$ cd /etc/apache2/sites-available/`

3）建立一个以[域名.conf]为名的配置文件：`$ sudo gedit test.com.conf`，输入以下代码并保存：

``` conf
<VirtualHost *:80>
# 设置域名
ServerName test.com
# 设置项目目录
DocumentRoot /home/feiffy/demo/test/public

# 设置目录权限
<Directory /home/feiffy/demo/test/public>
AllowOverride All
Require all granted
</Directory>
</VirtualHost>
```

4）启用配置：`$ sudo a2ensite test.com`

5）重启 apache2：`$ sudo service apache2 reload`

6）打开host文件：`$ sudo gedit /etc/hosts`
添加一行：`127.0.0.1 test.com`

7）最后在浏览器输入 test.com，就打开了主页文档 index.html，测试成功

## FAQs

- **打开浏览器输入 `test.com/index.html` 出现：`"Forbidden You don't have permission to access /index.html on this server"`.**

这是没有权限的问题，设置项目目录权限即可

``` bash
$ chown www-data -R /home/feiffy/demo/test/public
```

- **配置了新的端口8001，一直没有效果。**

这是因为没有配置监听，需要在 apache2.conf 或者 port.conf 增加一行：

``` bash
Listen 8001
```

## 参考

* https://httpd.apache.org/docs/2.4/vhosts/examples.html 官方示例