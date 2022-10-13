import{_ as n}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as s,c as a,e}from"./app.6f7e30ef.js";const p={},t=e(`<p>CI \u7684\u914D\u7F6E\u6587\u4EF6\u7EDF\u4E00\u653E\u5728 <code>application/config/</code> \u76EE\u5F55\u4E0B\u9762\uFF0C\u6846\u67B6\u6709\u4E00\u4E2A\u9ED8\u8BA4\u7684\u4E3B\u914D\u7F6E\u6587\u4EF6 <code>application/config/config.php</code>\u3002\u5176\u90E8\u5206\u5185\u5BB9\u5982\u4E0B\uFF1A</p><div class="language-php ext-php line-numbers-mode"><pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
<span class="token variable">$config</span><span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;uri_protocol&#39;</span><span class="token punctuation">]</span>	<span class="token operator">=</span> <span class="token string single-quoted-string">&#39;REQUEST_URI&#39;</span><span class="token punctuation">;</span>

<span class="token comment">// ...</span>

<span class="token variable">$config</span><span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;charset&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string single-quoted-string">&#39;UTF-8&#39;</span><span class="token punctuation">;</span>

<span class="token comment">// ...</span>

<span class="token variable">$config</span><span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;subclass_prefix&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string single-quoted-string">&#39;My_&#39;</span><span class="token punctuation">;</span>
</span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u53EF\u4EE5\u770B\u5230\u6240\u6709\u7684\u914D\u7F6E\u4FE1\u606F\u90FD\u653E\u5728 <code>$config</code> \u6570\u7EC4\u91CC\u3002\u6846\u67B6\u9ED8\u8BA4\u4F1A\u52A0\u8F7D\u8FD9\u4E2A\u914D\u7F6E\u6587\u4EF6\uFF0C\u6240\u4EE5\u4F7F\u7528\u65F6\u76F4\u63A5\u7528 <code>item()</code> \u8C03\u7528\uFF1A</p><div class="language-php ext-php line-numbers-mode"><pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
<span class="token variable">$this</span><span class="token operator">-&gt;</span><span class="token property">config</span><span class="token operator">-&gt;</span><span class="token function">item</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;uri_protocol&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// &#39;REQUEST_URI&#39;</span>
</span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u81EA\u5B9A\u4E49\u914D\u7F6E" tabindex="-1"><a class="header-anchor" href="#\u81EA\u5B9A\u4E49\u914D\u7F6E" aria-hidden="true">#</a> \u81EA\u5B9A\u4E49\u914D\u7F6E</h2><p>\u5982\u679C\u4F60\u4E0D\u60F3\u4F7F\u7528\u9ED8\u8BA4\u7684\u914D\u7F6E\u6587\u4EF6\uFF0C\u800C\u662F\u81EA\u5DF1\u521B\u5EFA\u4E00\u4E2A\u65B0\u7684\u914D\u7F6E\u6587\u4EF6\uFF0C\u90A3\u4E5F\u662F\u53EF\u4EE5\u7684\u3002\u5728 <code>application/config/</code> \u76EE\u5F55\u4E0B\u9762\u521B\u5EFA\u4E00\u4E2A <code>custom.php</code>\uFF1A</p><div class="language-php ext-php line-numbers-mode"><pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
<span class="token variable">$config</span><span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;index_page&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string single-quoted-string">&#39;welcome&#39;</span><span class="token punctuation">;</span>
</span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4F7F\u7528\u65F6\uFF0C\u9700\u8981\u5148\u52A0\u8F7D <code>custom.php</code> \u6587\u4EF6\uFF0C\u7136\u540E\u83B7\u53D6\u914D\u7F6E\u5185\u5BB9\uFF1A</p><div class="language-php ext-php line-numbers-mode"><pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
<span class="token variable">$this</span><span class="token operator">-&gt;</span><span class="token property">config</span><span class="token operator">-&gt;</span><span class="token function">load</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;custom&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token variable">$index_page</span> <span class="token operator">=</span> <span class="token variable">$this</span><span class="token operator">-&gt;</span><span class="token property">config</span><span class="token operator">-&gt;</span><span class="token function">item</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;index_page&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// &#39;welcome&#39;</span>
</span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4ECE\u524D\u9762\u4E24\u4E2A\u4F8B\u5B50\u4E2D\u53EF\u4EE5\u770B\u5230\u914D\u7F6E\u4FE1\u606F\u90FD\u662F <code>$config</code> \u6570\u7EC4\u7684\u952E\u6307\u5B9A\u7684\uFF0C\u90A3\u4E48\u662F\u5426\u53EF\u4EE5\u81EA\u5B9A\u4E49\u4E00\u4E2A\u53D8\u91CF\u6765\u6307\u5B9A\u914D\u7F6E\u4FE1\u606F\u5462\uFF1F\u7B54\u6848\u662F&#39;&#39;&#39;\u4E0D\u53EF\u4EE5&#39;&#39;&#39;\uFF0C\u65E0\u8BBA\u662F\u7CFB\u7EDF\u7684 <code>config.php</code> \u8FD8\u662F\u81EA\u5B9A\u4E49\u7684\u914D\u7F6E\u6587\u4EF6\uFF0C\u90FD\u5FC5\u987B\u5728 <code>$config</code> \u6570\u7EC4\u4E2D\u5B9A\u4E49\u914D\u7F6E\u9879\uFF0C\u56E0\u4E3A CI Config \u5728\u52A0\u8F7D\u914D\u7F6E\u6587\u4EF6\u65F6\u4F1A\u68C0\u67E5\u662F\u5426\u542B\u6709 <code>$config</code> \u6570\u7EC4\uFF0C\u5982\u679C\u6CA1\u6709\uFF0C\u5C31\u62A5\u9519\uFF1A<code>&#39;Your &#39;.$file_path.&#39; file does not appear to contain a valid configuration array.&#39;</code>\u3002</p><h2 id="\u907F\u514D\u91CD\u590D\u952E\u51B2\u7A81" tabindex="-1"><a class="header-anchor" href="#\u907F\u514D\u91CD\u590D\u952E\u51B2\u7A81" aria-hidden="true">#</a> \u907F\u514D\u91CD\u590D\u952E\u51B2\u7A81</h2><p>\u5F53\u52A0\u8F7D\u591A\u4E2A\u914D\u7F6E\u6587\u4EF6\u65F6\uFF0C\u8FD9\u4E9B\u914D\u7F6E\u6587\u4EF6\u4E2D\u7684 <code>$config</code> \u4F1A\u5408\u5E76\uFF0C\u6240\u4EE5\u5982\u679C\u5728\u4E0D\u540C\u7684\u914D\u7F6E\u6587\u4EF6\u4E2D\u5982\u679C\u6709\u76F8\u540C\u7684\u952E\u7684\u8BDD\uFF0C\u5C31\u4F1A\u4EA7\u751F\u51B2\u7A81\uFF08\u5148\u52A0\u8F7D\u7684\u914D\u7F6E\u4F1A\u88AB\u540E\u52A0\u8F7D\u7684\u914D\u7F6E\u8986\u76D6\uFF09\u3002\u8FD9\u53EF\u4EE5\u901A\u8FC7\u6307\u5B9A <code>load()</code> \u7684\u7B2C\u4E8C\u4E2A\u53C2\u6570\u6765\u89E3\u51B3\u3002</p><p>\u5047\u8BBE\u73B0\u5728\u6709\u4E24\u4E2A\u914D\u7F6E\u6587\u4EF6\uFF1A<code>custom1.php</code> \u548C <code>custom2.php</code>\uFF0C\u5B83\u4EEC\u7684\u5185\u5BB9\u5982\u4E0B\uFF1A</p><div class="language-php ext-php line-numbers-mode"><pre class="language-php"><code><span class="token comment">// custom1.php</span>
<span class="token variable">$config</span><span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;index_page&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string single-quoted-string">&#39;welcome1&#39;</span><span class="token punctuation">;</span>

<span class="token comment">// custom2.php</span>
<span class="token variable">$config</span><span class="token punctuation">[</span><span class="token string single-quoted-string">&#39;index_page&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string single-quoted-string">&#39;welcome2&#39;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5728\u52A0\u8F7D\u65F6\u6307\u5B9A <code>load()</code> \u7B2C\u4E8C\u4E2A\u53C2\u6570\u4E3A TRUE\uFF0C\u6765\u5206\u522B\u4FDD\u5B58\u914D\u7F6E\u9879\u7684\u503C\u5230\u4E0D\u540C\u7684\u6570\u7EC4\u4E2D\uFF08\u800C\u4E0D\u662F\u539F\u6765\u7684\u7684 <code>$config</code>\uFF09\uFF1A</p><div class="language-php ext-php line-numbers-mode"><pre class="language-php"><code><span class="token variable">$this</span><span class="token operator">-&gt;</span><span class="token property">config</span><span class="token operator">-&gt;</span><span class="token function">load</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;custom1.php&#39;</span><span class="token punctuation">,</span> <span class="token constant boolean">TRUE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token variable">$this</span><span class="token operator">-&gt;</span><span class="token property">config</span><span class="token operator">-&gt;</span><span class="token function">load</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;custom2.php&#39;</span><span class="token punctuation">,</span> <span class="token constant boolean">TRUE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>\u7136\u540E\u5728\u83B7\u53D6\u914D\u7F6E\u9879\u65F6\uFF0C\u5728 <code>item()</code> \u7B2C\u4E8C\u4E2A\u53C2\u6570\u6307\u5B9A\u914D\u7F6E\u6587\u4EF6\u540D\u5C31\u53EF\u4EE5\u6B63\u786E\u83B7\u53D6\u5230\u914D\u7F6E\u9879\u4E86\uFF1A</p><div class="language-php ext-php line-numbers-mode"><pre class="language-php"><code><span class="token variable">$this</span><span class="token operator">-&gt;</span><span class="token property">config</span><span class="token operator">-&gt;</span><span class="token function">item</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;index_page&#39;</span><span class="token punctuation">,</span> <span class="token string single-quoted-string">&#39;custom1&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// &#39;welcome1&#39;</span>
<span class="token variable">$this</span><span class="token operator">-&gt;</span><span class="token property">config</span><span class="token operator">-&gt;</span><span class="token function">item</span><span class="token punctuation">(</span><span class="token string single-quoted-string">&#39;index_page&#39;</span><span class="token punctuation">,</span> <span class="token string single-quoted-string">&#39;custom2&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// &#39;welcome2&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,18),o=[t];function c(i,l){return s(),a("div",null,o)}const u=n(p,[["render",c],["__file","2019-06-04-codeignitor-config-class-tutorial.html.vue"]]);export{u as default};