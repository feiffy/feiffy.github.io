---
title: Linux 常见问题
date: 2020-01-01 
code: true
---

## 查看磁盘占用

``` bash
$ df -hl
```

## scp 传输文件夹

``` bash
$ scp -r ./* <username>@<host>:<path>
```

## CLI：执行当前目录下脚本
 
注意，一定要写成 ./test.sh，而不是 test.sh，运行其它二进制的程序也一样，直接写 test.sh，linux 系统会去 PATH 里寻找有没有叫 test.sh 的，而只有 /bin, /sbin, /usr/bin，/usr/sbin 等在 PATH 里，你的当前目录通常不在 PATH 里，所以写成 test.sh 是会找不到命令的，要用 ./test.sh 告诉系统说，就在当前目录找。

## 查看当前目录下文件和文件夹的大小

``` bash
$ du -h --max-depth=1 work/testing
```