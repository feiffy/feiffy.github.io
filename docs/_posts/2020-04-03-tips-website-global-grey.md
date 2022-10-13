---
title: 国家哀悼日网站全局变灰
date: 2020-04-03
---

国务院公告：4月4日举行全国性哀悼活动，哀悼抗疫牺牲烈士和逝世同胞。因此，在自己网站上加上下面一段CSS代码，就能把网站全局变灰了。

![](/blog/imgs/523a7ae348a023a246ef0c5e1b530203.jpg)

``` html
<style type="text/css">
    html {
        filter: grayscale(100%);
        -webkit-filter: grayscale(100%);
        -moz-filter: grayscale(100%);
        -ms-filter: grayscale(100%);
        -o-filter: grayscale(100%);
        filter: url("data:image/svg+xml;utf8,#grayscale");
        filter: progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);
        -webkit-filter: grayscale(1);
    }
</style>
```