---
title: Visual Studio Code 的 xDebug 扩展如何取消 Notice 自动断点
date: 2017-09-16
order: -1
---

使用vscode作为php开发的主要工具也有一段时间了，但是有个问题始终存在：那就是使用vscode的xdebug扩展进行调试的时候，每当notice错误就会自动断点；这一点一开始很让我恼火。不过时间长了也能适应，遇到notice错误能改掉的就尽量改掉吧，毕竟notice也算是一种警告错误了，说不定以后升级php版本之后就会变成必须要改的错误也未可知。

适应了之后，使用vscode度过了一段愉快的时光……

好景不长，最近新加入了一个项目，一调试，妈呀，一开始的初始化代码几乎每一行都报错Notice: Undefined index: setseller，每一行都要自动中断一下，必须要按一下继续(F9)才能继续调试下去的样子，吓得我立刻换成了phpstorm压压惊，神奇的是phpstorm遇到notice错误不会中断或停下，直接就运行过去了。

但是，我终究还是不喜欢phpstorm，它的调试也有很多问题，不知道为什么有的错误发生了却不显示，比如数据库连接之类的，要么直接运行完了，要么直接运行完了然后项目挂掉，vscode却能一下子直接在错误处断点，并且很清晰地显示出错误原因。

今天，无事突然想在Google上搜索一下有没有其他人遇到这种notice强制断点的问题，其实一开始遇到该问题的时候已经搜索过好多次，都没有解决问题，导致我还以为大家都认为是notice错误必须要改呢。这次的搜索词是vscode xdebug stop notice breakpoint，这其实是第二次搜索后的优化过的词，第二个结果就解决了我的问题。

## 解决

vscode是可以设置断点的，如下图：

![]()

窗口左下角的就是BREAKPOINTS，用于设置断点的（以前看了那么多次都忽略了），默认选中的everything，也就是说notices,warnings,errors,exceptions都会自动断点。下面怎么做应该不用我说了吧。

参考：<a href="https://github.com/felixfbecker/vscode-php-debug/issues/56" target="_blank" rel="noopener noreferrer">Option to disable automatic exception breakpoints, break only at explicit points · Issue #56 · felixfbecker/vscode-php-debug</a>

所以说，这一次解决问题最大的收获是如何准确描述问题，设置合理的搜索关键词以搜到已经想要的结果。

## 附：Phpstorm 和 VS Code 比较
* VS Code 在调试上的优点：插入不合符的数据类型的数据到数据库，会提示错误信息，但特么 Phpstorm 就没有，真蛋疼。''（2018-06-04，现在已经解决这个问题了，所以用phpstorm来调试没有劣势了）''
* PhpStorm 在调式上的优点就是当前行高亮颜色看起来很明显。
* PhpStorm 支持PHP代码转到定义，而 VS Code 不支持。。。（装了插件之后就支持了）
* VS Code 在配置快捷键以后，调试体验与 Phpstorm 无异。
* 相比phpstorm，VS code的弱点就是php不支持自动提示和代码跳转，错误检查功能也很弱，写代码有点累。