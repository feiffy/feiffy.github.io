---
title: Ubuntu16.04 中 Vscode 如何断点调试C语言程序
date: 2018-03-22
order: -1
---

问题：环境是 Ubuntu16.04，如何使用 Vscode 断点调试C语言程序。

写代码没有调试环境是不能忍受的，所以折腾了一下，最后成功了。折腾的过程是这样的：

1、 首先安装 C/C++ 扩展，直接搜索第一个就是，或者点此 <a  href="https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools" target="_blank" rel="noopener noreferrer">链接</a> 查看其帮助文档进行安装。

![](/blog/imgs/403bb2df2f9263206caf41a04f03c605.png)

2、然后打开当前项目目录，左边点调试选项，点击添加配置，生成了一个launch.json文件，其内容如下：
``` json
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
    {
        "name": "(gdb) Launch",
        "type": "cppdbg",
        "request": "launch",
        "program": "${workspaceFolder}/LearnC/bin/a.out",
        "args": [],
        "stopAtEntry": false,
        "cwd": "${workspaceFolder}",
        "environment": [],
        "externalConsole": true,
        "MIMode": "gdb",
        "setupCommands": [
            {
                "description": "Enable pretty-printing for gdb",
                "text": "-enable-pretty-printing",
                "ignoreFailures": true
            }
        ]
    }]
}
```
所有内容都是默认生成的配置，我只是修改了"program"这一行，指定为编译后的可执行文件。这样，调试的时候默认调试这个文件。

相关操作截图：

![](/blog/imgs/30a63f3c117cb55618162a956935376d.png)

选择 add configuration

![](/blog/imgs/d51427ece2203d98f6f94d26dee5c871.png)

选择 C++(GDB/LLDB)

3、编辑代码，完成后，首先要编译，命令如下：
``` sh
$ gcc -g -o /path/LearnC/bin/a.out [[SOURCE_FILE]]
```
第一个路径指定生成后的文件，一定要是之前program参数指定的文件路径，SOURCE_FILE表示C语言文件路径。

4、然后打开调试，我的快捷键是F5，打开之后，就能直接运行到断点处了，效果如下：

![](/blog/imgs/469da5ef9b4cd39fc0d81a1647d46f09.png)