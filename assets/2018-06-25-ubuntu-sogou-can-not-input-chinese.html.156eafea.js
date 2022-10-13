import{_ as e}from"./_plugin-vue_export-helper.cdc0426e.js";import{o,c as t,a as n,b as s,d as i,e as l,r as p}from"./app.6f7e30ef.js";const c={},r=l(`<p>Ubuntu \u91CC\u9762\u867D\u7136\u5B89\u88C5\u597D\u4E86\u641C\u72D7\u8F93\u5165\u6CD5\uFF0C\u53EF\u4EE5\u7528\uFF0C\u4F46\u6709\u7684\u65F6\u5019\uFF0C\u4F1A\u7A81\u7136\u5931\u6548\uFF0C\u5BFC\u81F4\u53EA\u80FD\u8F93\u5165\u82F1\u6587\u6216\u8005\u5019\u9009\u8BCD\u53D8\u6210\u4E71\u7801\u4E86\u3002</p><p>\u4E4B\u524D\u7684\u89E3\u51B3\u65B9\u6CD5\u662F\u91CD\u542F\u7CFB\u7EDF\uFF0C\u91CD\u542F\u4E4B\u540E\u5C31\u597D\u4E86\uFF0C\u4F46\u4ECA\u5929\u8FDE\u7EED\u5931\u6548\u4E86\u4E24\u6B21\uFF0C\u5B9E\u5728\u53D7\u4E0D\u4E86\u4E86\uFF0C\u6240\u4EE5\u7814\u7A76\u4E86\u4E00\u4E0B\u5982\u4F55\u901A\u8FC7\u547D\u4EE4\u6765\u89E3\u51B3\u8FD9\u4E2A\u95EE\u9898</p><p>\u7B2C\u4E00\u4E2A\uFF0C\u76F4\u63A5\u91CD\u542Ffcitx</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>fcitx <span class="token parameter variable">-r</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u7B2C\u4E8C\u4E2A\uFF0C\u6267\u884C\u4E0B\u9762\u7684\u811A\u672C</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token shebang important">#!/bin/sh</span>
<span class="token comment"># \u83B7\u5F97fcitx\u7684\u8FDB\u7A0Bid\u5E76kill</span>
pidof fcitx <span class="token operator">|</span> <span class="token function">xargs</span> <span class="token function">kill</span>
pidof sogou-qimpanel <span class="token operator">|</span> <span class="token function">xargs</span> <span class="token function">kill</span>
<span class="token comment"># \u91CD\u65B0\u540E\u53F0\u6A21\u5F0F\u6253\u5F00fcitx</span>
<span class="token function">nohup</span> fcitx  <span class="token operator"><span class="token file-descriptor important">1</span>&gt;</span>/dev/null <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span>/dev/null <span class="token operator">&amp;</span>
<span class="token function">nohup</span> sogou-qimpanel  <span class="token operator"><span class="token file-descriptor important">1</span>&gt;</span>/dev/null <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span>/dev/null <span class="token operator">&amp;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5C06\u4EE5\u4E0A\u5185\u5BB9\u4FDD\u5B58\u5230 restart_sogou\uFF0C\u5E76\u590D\u5236\u5230/usr/bin\uFF0C\u5E76\u6DFB\u52A0\u53EF\u6267\u884C\u6743\u9650\uFF0C\u5373\u53EF\u5728\u4EFB\u610F\u5730\u65B9\u4ECE\u547D\u4EE4\u884C\u6267\u884C restart_sogou \u6765\u91CD\u542F\u641C\u72D7\u9762\u677F</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ <span class="token function">sudo</span> <span class="token function">cp</span> ./restart_sogou /usr/bin/
$ <span class="token function">sudo</span> <span class="token function">chmod</span> a+x /usr/bin/restart_sogou
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,8),d={href:"https://blog.csdn.net/o_guolin/article/details/79367211",target:"_blank",rel:"noopener noreferrer"};function u(m,v){const a=p("ExternalLinkIcon");return o(),t("div",null,[r,n("p",null,[s("\u53C2\u8003\uFF1A"),n("a",d,[s("https://blog.csdn.net/o_guolin/article/details/79367211"),i(a)])])])}const f=e(c,[["render",u],["__file","2018-06-25-ubuntu-sogou-can-not-input-chinese.html.vue"]]);export{f as default};