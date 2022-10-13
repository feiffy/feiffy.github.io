---
title: blog 自动发布脚本
date: 2020-06-28
order: -1
---

新的博客使用 mweb 生成静态文件，然后写了一个自动发布的脚本，当在 mweb 中写完内容，并生成网站之后，直接执行下面的脚本文件，就能在网站上看到效果了：

``` sh
#! /bin/bash

cd /Users/feiffy/Sites/mweb

# 忽略 assets 文件, 0-忽略，1-不忽略
withAssets=0
if [ -n "$1" ]; then
    if [ "--with-assets" = $1 ]; then
        withAssets=1
    fi
fi

if [ ! -d "blog_deploy" ]; then
    mkdir "blog_deploy"
fi

# clean
rm -rf blog_deploy/*

# copy
cp ./blog/* blog_deploy/
if [ $withAssets -eq 1 ]; then
    cp -r ./blog/asset blog_deploy/
fi

# tar
tar -czf blog_deploy.tar.gz blog_deploy

echo 'uploading...'

# upload to server
scp blog_deploy.tar.gz <user>@<domain>:/var/www/upload

# deploy
ssh <user>@<domain> > /dev/null 2>&1 << eeooff
cd /var/www/upload
tar -xzf blog_deploy.tar.gz
rm blog_deploy.tar.gz

cp -r blog_deploy/* /var/www/html/
rm -rf blog_deploy

exit
eeooff

echo 'deploy succ'
```