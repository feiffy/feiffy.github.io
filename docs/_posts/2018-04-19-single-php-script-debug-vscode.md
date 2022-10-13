---
title: 使用 VSCode 调试单个 PHP 文件
date: 2018-04-19
order: -1
---

突然发现是可以使用 VSCode 调试单个 PHP 文件的，今天之前一直没有弄成功，还以为 VSCode 是不能调试单文件呢。这里记录一下今天这个“突然发现”的过程。

开始，是在看 _Modern PHP_ 这本书，看到 "Built-in HTTP Server" 一节，自己测试了启动PHP内置服务器软件的命令：`php -S localhost:4000`，成功看到浏览器页面显示出相关页面。与 Apache 设置的 Web 网站的效果是一样的。

然后我**突然**就想到，能不能调试在内置服务器中运行的PHP代码呢？此时，我并没有意识到相关的东西。只是在网络上搜索 **xdebug php build-in server** 等关键词，找到了别人已经在 stackoverflow 上提过的[问题](https://stackoverflow.com/questions/27496543/is-it-possible-to-use-xdebug-with-the-built-in-php-test-server)，这很正常，通常你能提出的问题，别人可能早已经提过了。这个问题下面有个人给出了一个链接：[vim-xdebug-and-php-54s-development-server](http://stevephillips.me/blog/vim-xdebug-and-php-54s-development-server) ，点进去看了一下，部分原文引用如下：

> I recently began using xdebug and vim for debugging and breakpoints. I had been using Eclipse and xdebug, and missed this feature when I switched back to vim.
> 
> I found a few articles on the subject, but most were fairly old, missed some key points and didn't mention the 5.4 development server. I used this article as my starting point, but I had to fill in a few gaps.
>
> 1. First off, make sure xdebug is installed by checking phpinfo for the section on xdebug. I use the ppa/ondrej repository for managing PHP installations and was able to install xdebug through apt. Installation was as simple as apt-get install php5-xdebug.
> 2. Once you have xdebug installed, you'll need to install the vim remote debugger interface. It is a straightforward install - just copy the files into your plugin directory. For me, this was ~/.vim/plugin.
> 3. Now, you have to modify your php.ini file in order to allow remote debugging. I also turned on remote autostart so I don't have to deal with the ?XDEBUG_SESSION_START query string on my development server. Since I was using the PHP 5.4 development server, > I had to do some extra work to find out where my php.ini file was located.
Open up phpinfo again and check for the "Loaded Configuration File" entry. When you do this, make sure you access phpinfo as served by the 5.4 development server. If you access a phpinfo served through Apache2, it may not be the same file. For me, the correct file > was the default /etc/php5/cli/php.ini.
>
> Add these lines to your php.ini to turn on remote debugging and remote autostart. 
>
> xdebug.remote_enable=On
> xdebug.remote_autostart=On
>
> 4. Now that you've got all of that set up, you can give vim and xdebug a try. Open a file in vim and press F5 to initiate the connection. Then go to your browser and navigate to a page that is being served by the PHP 5.4 development server and go back to vim. If all works well, you should see that a connection has been established. Press enter to begin debugging.

按照他的步骤，第一步安装了 php-xdebug 模块，第二步我使用的是 VSCode 的 xdebug 插件，该插件与 xdebug 进行通信，第三步要修改 php.ini，我打开内置服务器上的 phpinfo() 输出页面，找到加载的 php.ini 文件路径：/etc/php/7.0/cli/php.ini，打开 php.ini 添加了两行配置：
``` sh
xdebug.remote_enable=1
xdebug.remote_autostart=1
```
保存了之后重启内置PHP服务器。xDebug 就算配置好了。

然后在 VSCode 添加一个调试配置，就像之前调试 Apache Web 网站一样，打开对 xDebug 端口的监听：

test.php 页面设置断点后，打开浏览器，访问：http://localhost:4000/test.php ，就能自动运行到断点处了。

至此，已经成功地调试内置PHP服务器中的代码。

但是我自然地想到，这里没有 Apache Web 站点，也能成功调试，原因很显然是安装了 php-xdebug 扩展，修改了 php.ini 的配置，等等！，修改了 php.ini 的配置！**这个 php.ini 的配置是 CLI 下PHP的配置，那么，也就是说，直接命令行执行PHP脚本文件应该也能调试。**

于是在 VSCode 中增加了调试单个文件的配置：在 .vscode/launch.json 中增加下面代码：
``` json
    "configurations": [
        {
            "name": "Launch currently open script",
            "type": "php",
            "request": "launch",
            "program": "${file}",
            "cwd": "${fileDirname}",
            "port": 9000
        }
    ]
```
这个配置就是 VSCode 的 xDebug 插件的默认生成的调试PHP单文件的配置，其插件文档里面有说明，早就看到了，但是并不能调试，一点调试按钮就运行完了。也就是说，中间缺少了某些东西，这些东西能够让 xDebug 插件捕获到 xDebug 调试进程。现在，增加了 CLI版本的 php.ini 的配置以后，一点调试，果真成功运行到断点。

所以最终实现了，打开一个PHP文件，直接 F5 开启调试，脚本就能运行到断点了。实现了一键调试PHP单文件脚本。