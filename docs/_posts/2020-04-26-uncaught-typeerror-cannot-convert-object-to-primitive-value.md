---
title: Uncaught TypeError Cannot convert object to primitive value
date: 2020-04-26
---

最近发现我的博客页面移动端上下拉菜单失效了，调试了一下，只要一点击下拉菜单就会报这个错误：

![](/blog/imgs/a68cc8b219eba74ce08d15883b882aee.png)

下拉菜单使用 bootstrap，部分代码如下：



``` html
<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
</button>
<div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav ml-auto">
        <li class="nav-item ">
            <a class="nav-link" href="/program">编程技术</a>
        </li>
        <li class="nav-item ">
            <a class="nav-link" href="/tips">折腾笔记</a>
        </li>
        <li class="nav-item ">
            <a class="nav-link" href="/about">关于</a>
        </li>
    </ul>
</div>
```

我百思不得其解，这里的代码已经很久没有修改过了，怎么会突然报错呢？又对比了一下 bootstrap 上的折叠导航栏示例代码，发现是没有问题的。

。。。

搜索了一下，发现有人已经提了这个问题：

- [https://stackoverflow.com/questions/61177140/uncaught-typeerror-cannot-convert-object-to-primitive-valuezone-evergreen-js1](https://stackoverflow.com/questions/61177140/uncaught-typeerror-cannot-convert-object-to-primitive-valuezone-evergreen-js1)
- [Bootstrap v4.4.1 collapse doesn't work with jQuery v3.5.0](https://github.com/twbs/bootstrap/issues/30553)

终于找到了**原因** 可能是最近发布的 jQuery 3.5 导致的问题，jQuery 3.5 会导致 bootstrap 4 collapse 的功能失效。

**解决** 那么把依赖换成上个版本 jQuery 3.4.1，就可以临时解决问题了。

看了引入jQuery的地方：

``` html
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/jquery/dist/jquery.min.js"></script>
```

改为以下就可以了。

``` html
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/jquery@3.4.1/dist/jquery.min.js"></script>
```