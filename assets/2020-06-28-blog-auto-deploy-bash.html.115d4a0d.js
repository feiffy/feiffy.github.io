import{_ as s}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as n,c as a,e}from"./app.6f7e30ef.js";const l={},p=e(`<p>\u65B0\u7684\u535A\u5BA2\u4F7F\u7528 mweb \u751F\u6210\u9759\u6001\u6587\u4EF6\uFF0C\u7136\u540E\u5199\u4E86\u4E00\u4E2A\u81EA\u52A8\u53D1\u5E03\u7684\u811A\u672C\uFF0C\u5F53\u5728 mweb \u4E2D\u5199\u5B8C\u5185\u5BB9\uFF0C\u5E76\u751F\u6210\u7F51\u7AD9\u4E4B\u540E\uFF0C\u76F4\u63A5\u6267\u884C\u4E0B\u9762\u7684\u811A\u672C\u6587\u4EF6\uFF0C\u5C31\u80FD\u5728\u7F51\u7AD9\u4E0A\u770B\u5230\u6548\u679C\u4E86\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token shebang important">#! /bin/bash</span>

<span class="token builtin class-name">cd</span> /Users/feiffy/Sites/mweb

<span class="token comment"># \u5FFD\u7565 assets \u6587\u4EF6, 0-\u5FFD\u7565\uFF0C1-\u4E0D\u5FFD\u7565</span>
<span class="token assign-left variable">withAssets</span><span class="token operator">=</span><span class="token number">0</span>
<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-n</span> <span class="token string">&quot;<span class="token variable">$1</span>&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">&quot;--with-assets&quot;</span> <span class="token operator">=</span> <span class="token variable">$1</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">withAssets</span><span class="token operator">=</span><span class="token number">1</span>
    <span class="token keyword">fi</span>
<span class="token keyword">fi</span>

<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token operator">!</span> <span class="token parameter variable">-d</span> <span class="token string">&quot;blog_deploy&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
    <span class="token function">mkdir</span> <span class="token string">&quot;blog_deploy&quot;</span>
<span class="token keyword">fi</span>

<span class="token comment"># clean</span>
<span class="token function">rm</span> <span class="token parameter variable">-rf</span> blog_deploy/*

<span class="token comment"># copy</span>
<span class="token function">cp</span> ./blog/* blog_deploy/
<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$withAssets</span> <span class="token parameter variable">-eq</span> <span class="token number">1</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
    <span class="token function">cp</span> <span class="token parameter variable">-r</span> ./blog/asset blog_deploy/
<span class="token keyword">fi</span>

<span class="token comment"># tar</span>
<span class="token function">tar</span> <span class="token parameter variable">-czf</span> blog_deploy.tar.gz blog_deploy

<span class="token builtin class-name">echo</span> <span class="token string">&#39;uploading...&#39;</span>

<span class="token comment"># upload to server</span>
<span class="token function">scp</span> blog_deploy.tar.gz <span class="token operator">&lt;</span>user<span class="token operator">&gt;</span>@<span class="token operator">&lt;</span>domain<span class="token operator">&gt;</span>:/var/www/upload

<span class="token comment"># deploy</span>
<span class="token function">ssh</span> <span class="token operator">&lt;</span>user<span class="token operator">&gt;</span>@<span class="token operator">&lt;</span>domain<span class="token operator">&gt;</span> <span class="token operator">&gt;</span> /dev/null <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span><span class="token file-descriptor important">&amp;1</span> <span class="token operator">&lt;&lt;</span> <span class="token string">eeooff
cd /var/www/upload
tar -xzf blog_deploy.tar.gz
rm blog_deploy.tar.gz

cp -r blog_deploy/* /var/www/html/
rm -rf blog_deploy

exit
eeooff</span>

<span class="token builtin class-name">echo</span> <span class="token string">&#39;deploy succ&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),o=[p];function i(t,c){return n(),a("div",null,o)}const v=s(l,[["render",i],["__file","2020-06-28-blog-auto-deploy-bash.html.vue"]]);export{v as default};
