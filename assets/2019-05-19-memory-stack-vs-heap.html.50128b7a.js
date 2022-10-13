import{_ as p}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as t,c as o,a as n,b as a,d as e,e as c,r as l}from"./app.e38b608e.js";const i={},u=c(`<p>\u6700\u8FD1\u5728\u770BPHP\u6E90\u7801\u89E3\u6790\uFF0C\u6D89\u53CA\u5230\u5806\u6808\u5B58\u50A8\u533A\u7684\u77E5\u8BC6\uFF0C\u800C\u6211\u5BF9\u4E8E\u8FD9\u4E2A\u5374\u4E0D\u592A\u6E05\u695A\uFF0C\u56E0\u6B64\uFF0C\u770B\u4E86\u4E00\u4E0B\u76F8\u5173\u8D44\u6599\uFF0C\u603B\u7ED3\u4E00\u4E0B\u3002</p><h2 id="\u6808" tabindex="-1"><a class="header-anchor" href="#\u6808" aria-hidden="true">#</a> \u6808</h2><p>\u6808\uFF0C\u5B58\u50A8\u51FD\u6570\u4E2D\u7684\u5C40\u90E8\u53D8\u91CF\uFF08\u4E34\u65F6\u53D8\u91CF\uFF09\uFF0C\u5B58\u50A8\u51FD\u6570\u5730\u5740\uFF0C\u6808\u662F\u540E\u8FDB\u5148\u51FA\u7684\u7ED3\u6784\uFF0C\u7531CPU\u7BA1\u7406\u548C\u4F18\u5316\u3002</p><p>\u4F7F\u7528\u6808\u5B58\u50A8\u53D8\u91CF\u7684\u4F18\u52BF\u5728\u4E8E\uFF1A\u4F60\u4E0D\u7528\u518D\u7BA1\u7406\u5185\u5B58\u4E86\uFF0C\u4E0D\u5FC5\u624B\u52A8\u5206\u914D\u5185\u5B58\u6216\u91CA\u653E\u5B83\uFF0C\u6B64\u5916\uFF0C\u7531\u4E8ECPU\u76F8\u5173\u7684\u4F18\u5316\uFF0C\u8BFB\u53D6\u5199\u5165\u7684\u6548\u7387\u4E5F\u5F88\u9AD8\u3002</p><p>\u5173\u4E8E\u6808\u9700\u8981\u6CE8\u610F\u7684\u4E00\u70B9\u662F\uFF1A\u5B58\u50A8\u5728\u6808\u4E0A\u7684\u53D8\u91CF\u7684\u5927\u5C0F\u662F\u6709\u9650\u5236\u7684\uFF0C\u800C\u5806\u5374\u4E0D\u662F\u3002</p><h2 id="\u5806" tabindex="-1"><a class="header-anchor" href="#\u5806" aria-hidden="true">#</a> \u5806</h2><p>\u5806\u662F\u8BA1\u7B97\u673A\u5185\u5B58\u7684\u4E00\u5757\u533A\u57DF\uFF0C\u4E0D\u4F1A\u81EA\u52A8\u4E3A\u4F60\u7BA1\u7406\u5185\u5B58\uFF0C\u4E5F\u4E0D\u662F\u7531CPU\u4E25\u683C\u7BA1\u7406\u7684\u3002\u5B83\u662F\u4E00\u4E2A\u66F4\u81EA\u7531\u7684\u5185\u5B58\u533A\u57DF\uFF08\u5E76\u4E14\u66F4\u5927\uFF09\u3002\u8981\u5728\u5806\u4E0A\u5206\u914D\u5185\u5B58\uFF0C\u5FC5\u987B\u4F7F\u7528 <code>malloc</code> \u6216 <code>calloc</code>\uFF0C\u5B83\u4EEC\u662F\u5185\u7F6E\u7684C\u51FD\u6570\u3002\u4E00\u65E6\u5728\u5806\u4E0A\u5206\u914D\u4E86\u5185\u5B58\uFF0C\u4F60\u5C31\u8D1F\u8D23\u5728\u4E0D\u9700\u8981\u5B83\u65F6\u4F7F\u7528 <code>free()</code>\u91CA\u653E\u5185\u5B58\u3002\u5982\u679C\u6CA1\u6709\u505A\u5230\u8FD9\u4E00\u70B9\uFF0C\u7A0B\u5E8F\u5C06\u4F1A\u51FA\u73B0\u6240\u8C13\u7684 <strong>\u5185\u5B58\u6CC4\u6F0F</strong>\uFF0C\u4E5F\u5C31\u662F\u8BF4\uFF0C\u5806\u4E0A\u7684\u5185\u5B58\u4ECD\u88AB\u4FDD\u7559\uFF0C\u4F46\u5176\u4ED6\u8FDB\u7A0B\u65E0\u6CD5\u4F7F\u7528\u3002</p><h2 id="\u793A\u4F8B" tabindex="-1"><a class="header-anchor" href="#\u793A\u4F8B" aria-hidden="true">#</a> \u793A\u4F8B</h2><p>\u4E0B\u9762\u8FD9\u4E2A\u4F8B\u5B50\u5C55\u793A\u4E86\u5728\u6808\u4E0A\u521B\u5EFA\u53D8\u91CF\u7684\u60C5\u51B5\uFF1A</p><div class="language-c ext-c line-numbers-mode"><pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdio.h&gt;</span></span>

<span class="token keyword">double</span> <span class="token function">multiplyByTwo</span> <span class="token punctuation">(</span><span class="token keyword">double</span> input<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">double</span> twice <span class="token operator">=</span> input <span class="token operator">*</span> <span class="token number">2.0</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> twice<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">main</span> <span class="token punctuation">(</span><span class="token keyword">int</span> argc<span class="token punctuation">,</span> <span class="token keyword">char</span> <span class="token operator">*</span>argv<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  <span class="token keyword">int</span> age <span class="token operator">=</span> <span class="token number">30</span><span class="token punctuation">;</span>
  <span class="token keyword">double</span> salary <span class="token operator">=</span> <span class="token number">12345.67</span><span class="token punctuation">;</span>
  <span class="token keyword">double</span> myList<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">1.2</span><span class="token punctuation">,</span> <span class="token number">2.3</span><span class="token punctuation">,</span> <span class="token number">3.4</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

  <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;double your salary is %.3f\\n&quot;</span><span class="token punctuation">,</span> <span class="token function">multiplyByTwo</span><span class="token punctuation">(</span>salary<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u7B2C10,11,12\u884C\u521B\u5EFA\u4E86\u53D8\u91CF\uFF1Aint\u3001double\u548Cdouble\u6570\u7EC4\u3002\u8FD9\u4E9B\u53D8\u91CF\u88AB\u63A8\u5165\u6808\u4E2D\uFF0C\u5F53main\u9000\u51FA\u65F6\uFF0C\u8FD9\u4E9B\u53D8\u91CF\u81EA\u52A8\u4ECE\u6808\u4E2D\u5F39\u51FA\u3002\u7C7B\u4F3C\u7684\uFF0C\u51FD\u6570<code>multiplyByTwo()</code>\u4E2D\u7684twice\u53D8\u91CF\u88AB\u63A8\u5165\u6808\u4E2D\uFF08\u5F53<code>multiplyByTwo()</code>\u88AB\u8C03\u7528\u65F6\uFF09\uFF0C<code>\u5F53multiplyByTwo()</code>\u9000\u51FA\u65F6\uFF0Ctwice\u88AB\u5F39\u51FA\u5E76\u4E14\u6D88\u5931\u4E0D\u89C1\u3002</p><p>\u4E0B\u9762\u662F\u4E00\u4E2A\u5728\u5806\u4E0A\u5206\u914D\u5185\u5B58\u7684\u4F8B\u5B50\uFF1A</p><div class="language-c ext-c line-numbers-mode"><pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdio.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdlib.h&gt;</span></span>

<span class="token keyword">double</span> <span class="token operator">*</span><span class="token function">multiplyByTwo</span> <span class="token punctuation">(</span><span class="token keyword">double</span> <span class="token operator">*</span>input<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">double</span> <span class="token operator">*</span>twice <span class="token operator">=</span> <span class="token function">malloc</span><span class="token punctuation">(</span><span class="token keyword">sizeof</span><span class="token punctuation">(</span><span class="token keyword">double</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token operator">*</span>twice <span class="token operator">=</span> <span class="token operator">*</span>input <span class="token operator">*</span> <span class="token number">2.0</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> twice<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">main</span> <span class="token punctuation">(</span><span class="token keyword">int</span> argc<span class="token punctuation">,</span> <span class="token keyword">char</span> <span class="token operator">*</span>argv<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  <span class="token keyword">int</span> <span class="token operator">*</span>age <span class="token operator">=</span> <span class="token function">malloc</span><span class="token punctuation">(</span><span class="token keyword">sizeof</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token operator">*</span>age <span class="token operator">=</span> <span class="token number">30</span><span class="token punctuation">;</span>
  <span class="token keyword">double</span> <span class="token operator">*</span>salary <span class="token operator">=</span> <span class="token function">malloc</span><span class="token punctuation">(</span><span class="token keyword">sizeof</span><span class="token punctuation">(</span><span class="token keyword">double</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token operator">*</span>salary <span class="token operator">=</span> <span class="token number">12345.67</span><span class="token punctuation">;</span>
  <span class="token keyword">double</span> <span class="token operator">*</span>myList <span class="token operator">=</span> <span class="token function">malloc</span><span class="token punctuation">(</span><span class="token number">3</span> <span class="token operator">*</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span><span class="token keyword">double</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  myList<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">1.2</span><span class="token punctuation">;</span>
  myList<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">2.3</span><span class="token punctuation">;</span>
  myList<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">3.4</span><span class="token punctuation">;</span>

  <span class="token keyword">double</span> <span class="token operator">*</span>twiceSalary <span class="token operator">=</span> <span class="token function">multiplyByTwo</span><span class="token punctuation">(</span>salary<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;double your salary is %.3f\\n&quot;</span><span class="token punctuation">,</span> <span class="token operator">*</span>twiceSalary<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token function">free</span><span class="token punctuation">(</span>age<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">free</span><span class="token punctuation">(</span>salary<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">free</span><span class="token punctuation">(</span>myList<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">free</span><span class="token punctuation">(</span>twiceSalary<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u4F55\u65F6\u4F7F\u7528\u5806" tabindex="-1"><a class="header-anchor" href="#\u4F55\u65F6\u4F7F\u7528\u5806" aria-hidden="true">#</a> \u4F55\u65F6\u4F7F\u7528\u5806\uFF1F</h2><p>\u4EC0\u4E48\u65F6\u5019\u5E94\u5F53\u4F7F\u7528\u5806\uFF0C\u4EC0\u4E48\u65F6\u5019\u4F7F\u7528\u6808\uFF1F\u5982\u679C\u4F60\u9700\u8981\u5206\u914D\u5927\u5757\u5185\u5B58\uFF08\u4E00\u4E2A\u5927\u6570\u7EC4\uFF0C\u5927\u7684\u7ED3\u6784\u4F53\uFF09\uFF0C\u5E76\u4E14\u4F60\u60F3\u4FDD\u6301\u76F8\u5F53\u957F\u7684\u65F6\u95F4\uFF0C\u6B64\u65F6\u5E94\u5F53\u4F7F\u7528\u5806\u3002\u5982\u679C\u4F60\u53EA\u5904\u7406\u76F8\u5BF9\u5C0F\u7684\u53D8\u91CF\uFF0C\u53EA\u5728\u51FD\u6570\u7684\u8303\u56F4\u5185\u4F7F\u7528\uFF0C\u90A3\u4E48\u4F7F\u7528\u6808\uFF0C\u5B83\u66F4\u5BB9\u6613\u4E5F\u66F4\u5FEB\u3002\u5982\u679C\u4F60\u9700\u8981\u53D8\u91CF\u7C7B\u4F3C\u52A8\u6001\u5927\u5C0F\u7684\u6570\u7EC4\u6216\u7ED3\u6784\u4F53\uFF0C\u90A3\u4E48\u5E94\u5F53\u4F7F\u7528\u5806\u3002</p><h2 id="references" tabindex="-1"><a class="header-anchor" href="#references" aria-hidden="true">#</a> References</h2>`,16),r={href:"https://www.gribblelab.org/CBootCamp/7_Memory_Stack_vs_Heap.html",target:"_blank",rel:"noopener noreferrer"},k={href:"https://www.learncpp.com/cpp-tutorial/79-the-stack-and-the-heap",target:"_blank",rel:"noopener noreferrer"};function d(m,v){const s=l("ExternalLinkIcon");return t(),o("div",null,[u,n("ul",null,[n("li",null,[n("p",null,[n("a",r,[a("https://www.gribblelab.org/CBootCamp/7_Memory_Stack_vs_Heap.html"),e(s)])])]),n("li",null,[n("p",null,[n("a",k,[a("https://www.learncpp.com/cpp-tutorial/79-the-stack-and-the-heap"),e(s)])])])])])}const h=p(i,[["render",d],["__file","2019-05-19-memory-stack-vs-heap.html.vue"]]);export{h as default};
