import{_ as n}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as s,c as a,e}from"./app.e38b608e.js";const t={},o=e(`<p>\u4ECA\u5929\u5728\u770B Laravel \u7684\u5BB9\u5668\uFF08Container\uFF09\u5B9E\u73B0\u65F6\uFF0C\u53D1\u73B0\u4E86\u8FD9\u4E48\u4E00\u6BB5\u7A81\u7136\u4E0D\u80FD\u7406\u89E3\u7684\u4EE3\u7801\uFF1A</p><div class="language-php ext-php line-numbers-mode"><pre class="language-php"><code><span class="token operator">**</span>
<span class="token operator">*</span> Set the globally available instance of the container<span class="token operator">.</span>
<span class="token operator">*</span>
<span class="token operator">*</span> @<span class="token keyword">return</span> <span class="token keyword">static</span>
<span class="token operator">*</span><span class="token operator">/</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">function</span> <span class="token function-definition function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">is_null</span><span class="token punctuation">(</span><span class="token keyword static-context">static</span><span class="token operator">::</span><span class="token variable">$instance</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword static-context">static</span><span class="token operator">::</span><span class="token variable">$instance</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">static</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> <span class="token keyword static-context">static</span><span class="token operator">::</span><span class="token variable">$instance</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD9\u4E2A\u51FD\u6570\u7684\u529F\u80FD\u5F88\u5BB9\u6613\u77E5\u9053\u7684\uFF0C\u5C31\u662F\u5B9E\u4F8B\u5316\u4E00\u4E2A\u5168\u5C40\u552F\u4E00\u7684\u5BB9\u5668\uFF0C\u4E0D\u7406\u89E3\u4E4B\u5904\u5728\u4E8E\uFF1A<code>new static</code>\uFF0C\u8FD9\u4E2A\u8868\u8FBE\u5F0F\u3002\u4E4B\u524D\u6211\u4EEC\u81EA\u5DF1\u5199\u5355\u4F8B\u7684\u65F6\u5019\u90FD\u662F\u7528 <code>new self</code>\uFF0C\u4E5F\u5E76\u6CA1\u6709\u4EC0\u4E48\u4E0D\u5BF9\u3002</p><p>google\u4E86\u4E00\u4E0B\uFF0C\u53D1\u73B0\u8FD9\u4E0D\u5C31\u662F\u4E4B\u524D\u6240\u8BF4\u7684\u5EF6\u8FDF\u9759\u6001\u7ED1\u5B9A\u5417\uFF1F\u8FD9\u4E2A\u6982\u5FF5\u6211\u662F\u61C2\u7684\uFF0C\u53EF\u662F\u5728\u770B\u5B9E\u9645\u5E94\u7528\u65F6\u5374\u4E00\u65F6\u6CA1\u53CD\u5E94\u8FC7\u6765\u3002</p><p>\u8FD9\u8BF4\u660E\u4E86\u4E00\u4EF6\u4E8B\uFF1A\u81EA\u4EE5\u4E3A\u61C2\u7684\u4E1C\u897F\uFF0C\u53EF\u80FD\u5176\u5B9E\u5E76\u4E0D\u61C2\u3002\u53EA\u6709\u5728\u5B9E\u9645\u73AF\u5883\u4E2D\u591A\u770B\u3001\u591A\u5B9E\u8DF5\u3001\u591A\u603B\u7ED3\uFF0C\u624D\u80FD\u907F\u514D\u8FD9\u79CD\u534A\u61C2\u4E0D\u61C2\u7684\u72B6\u6001\uFF0C\u624D\u80FD\u6DF1\u523B\u7406\u89E3\u4E00\u4EF6\u4E8B\u60C5\u3002</p><p>\u53E6\u5916\uFF0C<code>new self</code> \u548C <code>new static</code> \u7684\u533A\u522B\uFF1A\u4E24\u8005\u90FD\u662F\u5B9E\u4F8B\u5316\u81EA\u8EAB\uFF0C\u533A\u522B\u5728\u4E8E\u7EE7\u627F\u3002\u5982\u679C\u6CA1\u6709\u7EE7\u627F\uFF0C\u5219\u4E24\u8005\u8FD4\u56DE\u7684\u5B9E\u4F8B\u90FD\u662F\u5C5E\u4E8E\u4E00\u4E2A\u7C7B\uFF1B\u5982\u679C\u6709\u7EE7\u627F\uFF0C\u5B50\u7C7B\u8C03\u7528\u8BE5\u65B9\u6CD5\uFF0C<code>new self</code> \u4ECD\u7136\u8FD4\u56DE\u539F\u7C7B\u7684\u5B9E\u4F8B\uFF0C\u800C <code>new static</code> \u8FD4\u56DE\u5B9E\u9645\u5B50\u7C7B\u7684\u5B9E\u4F8B\u3002\u8FD9\u5C31\u662F\u5EF6\u8FDF\u9759\u6001\u7ED1\u5B9A\uFF0Cstatic \u7684\u503C\uFF0C\u4F7F\u7528\u7684\u662F\u6700\u540E\u5B9E\u9645\u8C03\u7528\u90A3\u4E2A\u65B9\u6CD5\u7684\u7C7B\u3002</p>`,6),p=[o];function c(i,l){return s(),a("div",null,p)}const u=n(t,[["render",c],["__file","2018-08-11-understand-php-new-static.html.vue"]]);export{u as default};
