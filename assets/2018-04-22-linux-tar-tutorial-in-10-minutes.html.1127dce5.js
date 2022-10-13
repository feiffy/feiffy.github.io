import{_ as e}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as a,c as s,e as n}from"./app.e38b608e.js";const i={},r=n(`<p>Tar \u547D\u4EE4\u7ECF\u5E38\u7528\u4F46\u662F\u5B83\u7684\u5404\u79CD\u53C2\u6570\u53C8\u603B\u662F\u8BB0\u4E0D\u4F4F\uFF0C\u56E0\u6B64\u5F7B\u5E95\u68B3\u7406\u4E86\u4E00\u4E0B\uFF0C\u518D\u4E5F\u4E0D\u4F1A\u5FD8\u8BB0\u3002</p><p>Tar \u662F Linux \u4E2D\u7684\uFF08\u538B\u7F29\uFF09\u5F52\u6863\u5DE5\u5177\u3002</p><p>\u5F52\u6863\u7684\u610F\u601D\u4E0E\u6253\u5305\u76F8\u540C\uFF0C\u5C31\u662F\u628A\u6587\u4EF6\u6216\u76EE\u5F55\u6216\u8005\u591A\u4E2A\u6587\u4EF6\u548C\u76EE\u5F55\u6253\u5305\u4E3A\u4E00\u4E2A\u6587\u4EF6\uFF0C\u4EE5\u4FBF\u4E8E\u4F20\u8F93\u3002\u901A\u5E38\u6253\u5305\u8FC7\u7A0B\u4E2D\u4F1A\u8FDB\u884C\u538B\u7F29\u64CD\u4F5C\uFF0C\u6240\u4EE5tar\u4E5F\u9644\u5E26\u4E86\u538B\u7F29\u7684\u9009\u9879\u3002\u538B\u7F29\u540E\u7684\u6587\u4EF6\u66F4\u5C0F\uFF0C\u4EE5\u4FBF\u4E8E\u7F51\u7EDC\u4F20\u8F93\uFF0C\u51CF\u5C11\u7B49\u5F85\u65F6\u95F4\u3002</p><h2 id="\u9009\u98791" tabindex="-1"><a class="header-anchor" href="#\u9009\u98791" aria-hidden="true">#</a> \u9009\u98791</h2><p>tar \u7684\u7B2C\u4E00\u4E2A\u9009\u9879\u53C2\u6570\u5FC5\u987B\u662F\u4E0B\u5217\uFF08Acdrtux\uFF09\u4E4B\u4E00\uFF1A</p><p>-c, --create</p><p>\u521B\u5EFA\u4E00\u4E2A\u65B0\u7684\u5F52\u6863</p><p>-x, --extract</p><p>\u4ECE\u5F52\u6863\u4E2D\u63D0\u53D6\u6587\u4EF6</p><p>-t, --list</p><p>\u5217\u51FA\u5F52\u6863\u5185\u5BB9</p><h2 id="\u9009\u98792" tabindex="-1"><a class="header-anchor" href="#\u9009\u98792" aria-hidden="true">#</a> \u9009\u98792</h2><p>-C, --directory DIR</p><p>\u6539\u53D8\u76EE\u5F55\u4E3ADIR</p><p>-f, --file ARCHIVE</p><p>\u4F7F\u7528\u5F52\u6863\u6587\u4EF6</p><p>-j, --bzip2</p><p>\u5904\u7406 .bz2 \u6587\u4EF6\uFF08\u538B\u7F29/\u89E3\u538B\u7F29\uFF09</p><p>-J, --xz</p><p>\u5904\u7406 .xz \u6587\u4EF6\uFF08\u538B\u7F29/\u89E3\u538B\u7F29\uFF09</p><p>-O, --to-stdout</p><p>\u63D0\u53D6\u6587\u4EF6\u5230\u6807\u51C6\u8F93\u51FA\uFF08\u901A\u5E38\u662F\u663E\u793A\u5668\uFF09</p><p>-v, --verbose</p><p>\u8BE6\u7EC6\u5217\u51FA\u6BCF\u4E2A\u6587\u4EF6\u7684\u5904\u7406\u60C5\u51B5</p><p>-z, --gzip, --ungzip</p><p>\u5904\u7406 .zip \u6587\u4EF6\uFF08\u538B\u7F29/\u89E3\u538B\u7F29\uFF09</p><h2 id="\u793A\u4F8B" tabindex="-1"><a class="header-anchor" href="#\u793A\u4F8B" aria-hidden="true">#</a> \u793A\u4F8B</h2><h3 id="\u4ECE\u6587\u4EF6foo\u548Cbar\u521B\u5EFA\u5F52\u6863archive-tar" tabindex="-1"><a class="header-anchor" href="#\u4ECE\u6587\u4EF6foo\u548Cbar\u521B\u5EFA\u5F52\u6863archive-tar" aria-hidden="true">#</a> \u4ECE\u6587\u4EF6foo\u548Cbar\u521B\u5EFA\u5F52\u6863archive.tar</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>
<span class="token function">tar</span> <span class="token parameter variable">-cf</span> archive.tar foo bar

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>-c \u521B\u5EFA\u65B0\u7684\u5F52\u6863\u6587\u4EF6</p><p>-f ARCHIVE \u4F7F\u7528\u5F52\u6863\u6587\u4EF6</p><h3 id="\u4ECE\u76EE\u5F55-home-demo-\u521B\u5EFA\u5F52\u6863demo-tar" tabindex="-1"><a class="header-anchor" href="#\u4ECE\u76EE\u5F55-home-demo-\u521B\u5EFA\u5F52\u6863demo-tar" aria-hidden="true">#</a> \u4ECE\u76EE\u5F55/home/demo/\u521B\u5EFA\u5F52\u6863demo.tar</h3><p>tar -cf demo.tar /home/demo/</p><p>-c \u521B\u5EFA\u65B0\u7684\u5F52\u6863\u6587\u4EF6</p><p>-f ARCHIVE \u4F7F\u7528\u5F52\u6863\u6587\u4EF6</p><p>\u5982\u679C\u60F3\u770B\u5230\u6BCF\u4E2A\u6587\u4EF6\u7684\u5904\u7406\u8FC7\u7A0B\uFF0C\u90A3\u4E48\u53EF\u4EE5\u52A0\u4E0A -v \u9009\u9879\u3002</p><h3 id="\u8BE6\u7EC6\u5217\u51FAarchive-tar\u4E2D\u7684\u6240\u6709\u6587\u4EF6" tabindex="-1"><a class="header-anchor" href="#\u8BE6\u7EC6\u5217\u51FAarchive-tar\u4E2D\u7684\u6240\u6709\u6587\u4EF6" aria-hidden="true">#</a> \u8BE6\u7EC6\u5217\u51FAarchive.tar\u4E2D\u7684\u6240\u6709\u6587\u4EF6</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>
<span class="token function">tar</span> <span class="token parameter variable">-tvf</span> archive.tar

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>-t \u5217\u51FA\u5F52\u6863\u5185\u5BB9</p><p>-v \u663E\u793A\u6587\u4EF6\u8BE6\u7EC6\u4FE1\u606F</p><p>-f ARCHIVE \u4F7F\u7528\u5F52\u6863\u6587\u4EF6</p><h3 id="\u63D0\u53D6archive-tar\u4E2D\u7684\u6240\u6709\u6587\u4EF6" tabindex="-1"><a class="header-anchor" href="#\u63D0\u53D6archive-tar\u4E2D\u7684\u6240\u6709\u6587\u4EF6" aria-hidden="true">#</a> \u63D0\u53D6archive.tar\u4E2D\u7684\u6240\u6709\u6587\u4EF6</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>
<span class="token function">tar</span> <span class="token parameter variable">-xf</span> archive.tar

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>-x \u63D0\u53D6\u5F52\u6863\u6587\u4EF6</p><p>-f ARCHIVE \u4F7F\u7528\u5F52\u6863\u6587\u4EF6</p><p>\u5982\u679C\u60F3\u770B\u5230\u6BCF\u4E2A\u6587\u4EF6\u7684\u5904\u7406\u8FC7\u7A0B\uFF0C\u90A3\u4E48\u53EF\u4EE5\u52A0\u4E0A -v \u9009\u9879\u3002</p><h3 id="\u3010\u6700\u5E38\u7528\u3011\u4ECE\u76EE\u5F55-home-demo-\u521B\u5EFAgzip\u538B\u7F29\u5F52\u6863demo-tar-gz" tabindex="-1"><a class="header-anchor" href="#\u3010\u6700\u5E38\u7528\u3011\u4ECE\u76EE\u5F55-home-demo-\u521B\u5EFAgzip\u538B\u7F29\u5F52\u6863demo-tar-gz" aria-hidden="true">#</a> \u3010\u6700\u5E38\u7528\u3011\u4ECE\u76EE\u5F55/home/demo/\u521B\u5EFAgzip\u538B\u7F29\u5F52\u6863demo.tar.gz</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>
<span class="token function">tar</span> <span class="token parameter variable">-czf</span> demo.tar.gz /home/demo/

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>-c \u521B\u5EFA\u65B0\u7684\u5F52\u6863\u6587\u4EF6</p><p>-z \u5904\u7406zip\u538B\u7F29</p><p>-f ARCHIVE \u4F7F\u7528\u5F52\u6863\u6587\u4EF6</p><p>\u5982\u679C\u60F3\u770B\u5230\u6BCF\u4E2A\u6587\u4EF6\u7684\u5904\u7406\u8FC7\u7A0B\uFF0C\u90A3\u4E48\u53EF\u4EE5\u52A0\u4E0A -v \u9009\u9879\u3002</p><h3 id="\u4ECE\u591A\u4E2A\u76EE\u5F55-home-demo1-home-demo2\u548C\u6587\u4EF6hi-txt\u521B\u5EFAgzip\u538B\u7F29\u5F52\u6863demo-tar-gz" tabindex="-1"><a class="header-anchor" href="#\u4ECE\u591A\u4E2A\u76EE\u5F55-home-demo1-home-demo2\u548C\u6587\u4EF6hi-txt\u521B\u5EFAgzip\u538B\u7F29\u5F52\u6863demo-tar-gz" aria-hidden="true">#</a> \u4ECE\u591A\u4E2A\u76EE\u5F55/home/demo1 /home/demo2\u548C\u6587\u4EF6hi.txt\u521B\u5EFAgzip\u538B\u7F29\u5F52\u6863demo.tar.gz</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>
<span class="token function">tar</span> <span class="token parameter variable">-czf</span> demo.tar.gz /home/demo1 /home/demo2 hi.txt

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>-c \u521B\u5EFA\u65B0\u7684\u5F52\u6863\u6587\u4EF6</p><p>-z \u5904\u7406zip\u538B\u7F29</p><p>-f ARCHIVE \u4F7F\u7528\u5F52\u6863\u6587\u4EF6</p><p>\u5982\u679C\u60F3\u770B\u5230\u6BCF\u4E2A\u6587\u4EF6\u7684\u5904\u7406\u8FC7\u7A0B\uFF0C\u90A3\u4E48\u53EF\u4EE5\u52A0\u4E0A -v \u9009\u9879\u3002</p><h3 id="\u4ECE\u76EE\u5F55-home-demo\u521B\u5EFAbzip2\u538B\u7F29\u5F52\u6863demo-tar-bz2" tabindex="-1"><a class="header-anchor" href="#\u4ECE\u76EE\u5F55-home-demo\u521B\u5EFAbzip2\u538B\u7F29\u5F52\u6863demo-tar-bz2" aria-hidden="true">#</a> \u4ECE\u76EE\u5F55/home/demo\u521B\u5EFAbzip2\u538B\u7F29\u5F52\u6863demo.tar.bz2</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>
<span class="token function">tar</span> <span class="token parameter variable">-cjf</span> demo.tar.gz /home/demo

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>-c \u521B\u5EFA\u65B0\u7684\u5F52\u6863\u6587\u4EF6</p><p>-j \u5904\u7406bzip2\u538B\u7F29\u6587\u4EF6</p><p>-f ARCHIVE \u4F7F\u7528\u5F52\u6863\u6587\u4EF6</p><p>\u5982\u679C\u60F3\u770B\u5230\u6BCF\u4E2A\u6587\u4EF6\u7684\u5904\u7406\u8FC7\u7A0B\uFF0C\u90A3\u4E48\u53EF\u4EE5\u52A0\u4E0A -v \u9009\u9879\u3002</p><p>bzip2\u6BD4gzip\u538B\u7F29\u6587\u4EF6\u66F4\u5C0F\uFF0C\u4F46\u538B\u7F29\u65F6\u95F4\u53D8\u957F\u4E86</p><h3 id="\u3010\u6700\u5E38\u7528\u3011\u63D0\u53D6gzip\u538B\u7F29\u5F52\u6863test-tar-gz\u7684\u5185\u5BB9\u5230\u6307\u5B9A\u76EE\u5F55-home-demo-\u4E2D" tabindex="-1"><a class="header-anchor" href="#\u3010\u6700\u5E38\u7528\u3011\u63D0\u53D6gzip\u538B\u7F29\u5F52\u6863test-tar-gz\u7684\u5185\u5BB9\u5230\u6307\u5B9A\u76EE\u5F55-home-demo-\u4E2D" aria-hidden="true">#</a> \u3010\u6700\u5E38\u7528\u3011\u63D0\u53D6gzip\u538B\u7F29\u5F52\u6863test.tar.gz\u7684\u5185\u5BB9\u5230\u6307\u5B9A\u76EE\u5F55/home/demo/\u4E2D</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>
<span class="token function">tar</span> <span class="token parameter variable">-xzf</span> test.tar.gz <span class="token parameter variable">-C</span> /home/demo/

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>-x \u63D0\u53D6\u5F52\u6863\u5185\u5BB9</p><p>-z \u5904\u7406gzip\u538B\u7F29\u6587\u4EF6</p><p>-f ARCHIVE \u4F7F\u7528\u5F52\u6863\u6587\u4EF6</p><p>-C DIR\uFF1A\u6539\u53D8\u76EE\u5F55\u5230DIR</p><h3 id="\u63D0\u53D6bzip2\u538B\u7F29\u5F52\u6863test-tar-bz2\u7684\u5185\u5BB9\u5230\u6307\u5B9A\u76EE\u5F55-home-demo-\u4E2D" tabindex="-1"><a class="header-anchor" href="#\u63D0\u53D6bzip2\u538B\u7F29\u5F52\u6863test-tar-bz2\u7684\u5185\u5BB9\u5230\u6307\u5B9A\u76EE\u5F55-home-demo-\u4E2D" aria-hidden="true">#</a> \u63D0\u53D6bzip2\u538B\u7F29\u5F52\u6863test.tar.bz2\u7684\u5185\u5BB9\u5230\u6307\u5B9A\u76EE\u5F55/home/demo/\u4E2D</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>
<span class="token function">tar</span> <span class="token parameter variable">-xjf</span> test.tar.bz2 <span class="token parameter variable">-C</span> /home/demo/

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>-x \u63D0\u53D6\u5F52\u6863\u5185\u5BB9</p><p>-j \u5904\u7406bzip2\u538B\u7F29\u6587\u4EF6</p><p>-f ARCHIVE \u4F7F\u7528\u5F52\u6863\u6587\u4EF6</p><p>-C DIR\uFF1A\u6539\u53D8\u76EE\u5F55\u5230DIR</p><h3 id="\u63D0\u53D6xz\u538B\u7F29\u5F52\u6863test-tar-xz\u7684\u5185\u5BB9\u5230\u6307\u5B9A\u76EE\u5F55-home-demo-\u4E2D" tabindex="-1"><a class="header-anchor" href="#\u63D0\u53D6xz\u538B\u7F29\u5F52\u6863test-tar-xz\u7684\u5185\u5BB9\u5230\u6307\u5B9A\u76EE\u5F55-home-demo-\u4E2D" aria-hidden="true">#</a> \u63D0\u53D6xz\u538B\u7F29\u5F52\u6863test.tar.xz\u7684\u5185\u5BB9\u5230\u6307\u5B9A\u76EE\u5F55/home/demo/\u4E2D</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>
<span class="token function">tar</span> <span class="token parameter variable">-xJf</span> test.tar.xz <span class="token parameter variable">-C</span> /home/demo/

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>-x \u63D0\u53D6\u5F52\u6863\u5185\u5BB9</p><p>-J \u5904\u7406xz\u538B\u7F29\u6587\u4EF6</p><p>-f ARCHIVE \u4F7F\u7528\u5F52\u6863\u6587\u4EF6</p><p>-C DIR\uFF1A\u6539\u53D8\u76EE\u5F55\u5230DIR</p><h2 id="faqs" tabindex="-1"><a class="header-anchor" href="#faqs" aria-hidden="true">#</a> FAQs</h2><h3 id="tar-removing-leading-from-member-names" tabindex="-1"><a class="header-anchor" href="#tar-removing-leading-from-member-names" aria-hidden="true">#</a> tar: Removing leading \`/\u2019 from member names</h3><p>\u5176\u539F\u56E0\u662Ftar\u9ED8\u8BA4\u4E3A\u76F8\u5BF9\u8DEF\u5F84\uFF0C\u4F7F\u7528\u7EDD\u5BF9\u8DEF\u5F84\u7684\u8BDD\u5C31\u56DE\u62A5\u8FD9\u4E2A\u9519\uFF0C\u53EF\u4EE5\u4F7F\u7528-P\u53C2\u6570\uFF08\u6CE8\u610F\u5927\u5199\uFF09\u89E3\u51B3\u8FD9\u4E2A\u95EE\u9898</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>
$ <span class="token function">tar</span> <span class="token parameter variable">-zcPf</span> /backup/<span class="token variable">$WebBakName</span> <span class="token variable">$WEB_DATA</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,87),d=[r];function p(t,l){return a(),s("div",null,d)}const h=e(i,[["render",p],["__file","2018-04-22-linux-tar-tutorial-in-10-minutes.html.vue"]]);export{h as default};
