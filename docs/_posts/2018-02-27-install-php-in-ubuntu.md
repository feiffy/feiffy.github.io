---
title: 一文彻底解决Ubuntu上PHP的安装以及版本切换
date: 2018-02-27
---

Ubuntu上官方的源，比如 Ubuntu14.04 默认源中的是 PHP5.6.x、Ubuntu16.04 默认源中的是 PHP7.0.x，那么如果想在 Ubuntu16.04 上安装 PHP7.1，PHP7.2，应该怎么办呢？

答案是通过第三方的源来安装，[ppa:ondrej/php](https://launchpad.net/~ondrej/+archive/php) 是一个比较知名的PHP源（目前维护php5.6,php7.0,php7.1,php7.2）。下面就用这个源来安装自己想要的PHP版本。

1. 通过源安装PHP
``` bash
sudo add-apt-repository ppa:ondrej/php
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install php7.1   # for PHP 7.1
sudo apt-get install php7.0   # for PHP 7.0
sudo apt-get install php5.6   # for PHP 5.6
```
2. 安装相关版本的PHP模块
``` bash
sudo apt-cache search php7*
...
php-all-dev - package depending on all supported PHP development packages
php7.0 - server-side, HTML-embedded scripting language (metapackage)
php7.0-cgi - server-side, HTML-embedded scripting language (CGI binary)
php7.0-cli - ⌘-line interpreter for the PHP scripting language
php7.0-common - documentation, examples and common module for PHP
php7.0-curl - CURL module for PHP
php7.0-dev - Files for PHP7.0 module development
php7.0-gd - GD module for PHP
php7.0-gmp - GMP module for PHP
...
...
...
php7.1-xml - DOM, SimpleXML, WDDX, XML, and XSL module for PHP
php7.1-xmlrpc - XMLRPC-EPI module for PHP
php7.1-zip - Zip module for PHP
php7.1-opcache - Zend OpCache module for PHP
php7.1 - server-side, HTML-embedded scripting language (metapackage)
php7.1-xsl - XSL module for PHP (dummy)
...
...
php7.2-bcmath - Bcmath module for PHP
php7.2-bz2 - bzip2 module for PHP
php7.2-cgi - server-side, HTML-embedded scripting language (CGI binary)
php7.2-cli - ⌘-line interpreter for the PHP scripting language
php7.2-common - documentation, examples and common module for PHP
php7.2-curl - CURL module for PHP
php7.2-dba - DBA module for PHP
```
3. 选择需要的模块，安装之
``` sh
sudo apt-get install php7.2-curl php7.2-dev php7.2-gd php7.2-imap php7.2-intl php7.2-mbstring php7.2-mysql php7.2-xml php7.2-zip
```
4. 切换PHP版本
``` sh
sudo update-alternatives --config php
```
5. 设置Apache与正确的PHP版本一起运行
``` sh
sudo a2dismod php7.1         # unload the current version
sudo a2enmod  php5.6         # load the version you need
sudo service apache2 restart # restart webserver to apply
```

到此结束，再也不用担心安装PHP，切换PHP版本这些事情啦。

参考：

- [https://askubuntu.com/questions/109404/how-do-i-install-different-upgrade-or-downgrade-php-version-in-still-supported](https://askubuntu.com/questions/109404/how-do-i-install-different-upgrade-or-downgrade-php-version-in-still-supported "https://askubuntu.com/questions/109404/how-do-i-install-different-upgrade-or-downgrade-php-version-in-still-supported")
- [https://tecadmin.net/install-php-7-on-ubuntu/](https://tecadmin.net/install-php-7-on-ubuntu/ "https://tecadmin.net/install-php-7-on-ubuntu/")