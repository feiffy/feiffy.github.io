---
title: Hello 2022, Hello my txt blog
date: 2022-05-23
---

之前在 v2ex 上看到对于 txt blog 讨论的[帖子](https://www.v2ex.com/t/851940?p=2)，想到自己折腾了这么久，心也累。即使是纯前端生成的各种静态博客，也疲倦了，样式什么的，都不在意了。是时候回归原始了。

这一次很简单，创建了一个新的 blog 目录，目录结构如下：

```txt
blog/
    bin/
        md2html # markdown => html 的转换工具
    src/
        2022/
            05/
                23/
                    my-blog.md
    public
        2022/
            05/
                23/
                    my-blog.html 
        img/
        js/
        css/ 
```

用 `PhpStorm` 打开这个目录，配置好 sftp 路径，直接 `public` 映射到远程服务器的 `/var/www/html/blog/` 目录。

本地编辑完 markdown 文件，用 md2html 工具生成好 html 之后自动上传完事。

## 额外

- [x] 引入 `highlight.js` 用来高亮代码。

- [x] 引入 `valine.js` 以支持评论。