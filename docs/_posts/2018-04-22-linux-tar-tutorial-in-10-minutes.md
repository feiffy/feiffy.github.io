---
title: Linux Tar 简明教程
date: 2018-04-22
code: true
---

Tar 命令经常用但是它的各种参数又总是记不住，因此彻底梳理了一下，再也不会忘记。

  

Tar 是 Linux 中的（压缩）归档工具。

  

归档的意思与打包相同，就是把文件或目录或者多个文件和目录打包为一个文件，以便于传输。通常打包过程中会进行压缩操作，所以tar也附带了压缩的选项。压缩后的文件更小，以便于网络传输，减少等待时间。

  

## 选项1

tar 的第一个选项参数必须是下列（Acdrtux）之一：

  

-c, --create

创建一个新的归档

-x, --extract

从归档中提取文件

-t, --list

列出归档内容

  

## 选项2

  

-C, --directory DIR

改变目录为DIR

-f, --file ARCHIVE

使用归档文件

-j, --bzip2

处理 .bz2 文件（压缩/解压缩）

-J, --xz

处理 .xz 文件（压缩/解压缩）

-O, --to-stdout

提取文件到标准输出（通常是显示器）

-v, --verbose

详细列出每个文件的处理情况

-z, --gzip, --ungzip

处理 .zip 文件（压缩/解压缩）

  
  

## 示例

  

### 从文件foo和bar创建归档archive.tar

``` sh

tar -cf archive.tar foo bar

```

-c 创建新的归档文件

-f ARCHIVE 使用归档文件

  

### 从目录/home/demo/创建归档demo.tar

tar -cf demo.tar /home/demo/

-c 创建新的归档文件

-f ARCHIVE 使用归档文件

如果想看到每个文件的处理过程，那么可以加上 -v 选项。

  

### 详细列出archive.tar中的所有文件

``` sh

tar -tvf archive.tar

```

-t 列出归档内容

-v 显示文件详细信息

-f ARCHIVE 使用归档文件

  

### 提取archive.tar中的所有文件

``` sh

tar -xf archive.tar

```

-x 提取归档文件

-f ARCHIVE 使用归档文件

如果想看到每个文件的处理过程，那么可以加上 -v 选项。

  

### 【最常用】从目录/home/demo/创建gzip压缩归档demo.tar.gz

``` sh

tar -czf demo.tar.gz /home/demo/

```

-c 创建新的归档文件

-z 处理zip压缩

-f ARCHIVE 使用归档文件

如果想看到每个文件的处理过程，那么可以加上 -v 选项。

  

### 从多个目录/home/demo1 /home/demo2和文件hi.txt创建gzip压缩归档demo.tar.gz

``` sh

tar -czf demo.tar.gz /home/demo1 /home/demo2 hi.txt

```

-c 创建新的归档文件

-z 处理zip压缩

-f ARCHIVE 使用归档文件

如果想看到每个文件的处理过程，那么可以加上 -v 选项。

  

### 从目录/home/demo创建bzip2压缩归档demo.tar.bz2

``` sh

tar -cjf demo.tar.gz /home/demo

```

-c 创建新的归档文件

-j 处理bzip2压缩文件

-f ARCHIVE 使用归档文件

如果想看到每个文件的处理过程，那么可以加上 -v 选项。

bzip2比gzip压缩文件更小，但压缩时间变长了

  

### 【最常用】提取gzip压缩归档test.tar.gz的内容到指定目录/home/demo/中

``` sh

tar -xzf test.tar.gz -C /home/demo/

```

-x 提取归档内容

-z 处理gzip压缩文件

-f ARCHIVE 使用归档文件

-C DIR：改变目录到DIR

  

### 提取bzip2压缩归档test.tar.bz2的内容到指定目录/home/demo/中

``` sh

tar -xjf test.tar.bz2 -C /home/demo/

```

-x 提取归档内容

-j 处理bzip2压缩文件

-f ARCHIVE 使用归档文件

-C DIR：改变目录到DIR

  

### 提取xz压缩归档test.tar.xz的内容到指定目录/home/demo/中

``` sh

tar -xJf test.tar.xz -C /home/demo/

```

-x 提取归档内容

-J 处理xz压缩文件

-f ARCHIVE 使用归档文件

-C DIR：改变目录到DIR

  

## FAQs

### tar: Removing leading `/’ from member names

其原因是tar默认为相对路径，使用绝对路径的话就回报这个错，可以使用-P参数（注意大写）解决这个问题

``` shell

$ tar -zcPf /backup/$WebBakName $WEB_DATA

```