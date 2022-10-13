import{_ as p}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as l,c,a as n,b as s,d as e,e as t,r as o}from"./app.e38b608e.js";const i={},u=t(`<h2 id="\u95EE\u9898" tabindex="-1"><a class="header-anchor" href="#\u95EE\u9898" aria-hidden="true">#</a> \u95EE\u9898</h2><p>\u4F7F\u7528 Laravel Validator \u9A8C\u8BC1\u53C2\u6570\u4EE5\u540E\uFF0C\u5BF9\u4E8E\u67D0\u4E9B\u53C2\u6570\u9700\u8981\u624B\u52A8\u8F6C\u6362\u4E3A\u5BF9\u5E94\u7684\u7C7B\u578B\uFF08\u6BD4\u5982 int\uFF0Cfloat\uFF09\uFF0C\u90A3\u4E48\u80FD\u4E0D\u80FD\u5728\u9A8C\u8BC1\u4E4B\u524D\u5148\u81EA\u52A8\u8FC7\u6EE4\u4E00\u4E0B\u53C2\u6570\u7C7B\u578B\u5462\uFF1F</p><h2 id="\u89E3\u51B3" tabindex="-1"><a class="header-anchor" href="#\u89E3\u51B3" aria-hidden="true">#</a> \u89E3\u51B3</h2><p>\u4F7F\u7528\u4E2D\u95F4\u4EF6\u53EF\u4EE5\u5B9E\u73B0\u5728 Controller \u5904\u7406\u903B\u8F91\u4E4B\u524D\u5148\u8FC7\u6EE4\u4E00\u4E0B\u53C2\u6570\u3002</p><h3 id="\u521B\u5EFA\u4E00\u4E2A\u4E2D\u95F4\u4EF6\u7C7B" tabindex="-1"><a class="header-anchor" href="#\u521B\u5EFA\u4E00\u4E2A\u4E2D\u95F4\u4EF6\u7C7B" aria-hidden="true">#</a> \u521B\u5EFA\u4E00\u4E2A\u4E2D\u95F4\u4EF6\u7C7B</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ php artisan make:middleware FilterParams
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="\u6CE8\u518C\u4E2D\u95F4\u4EF6" tabindex="-1"><a class="header-anchor" href="#\u6CE8\u518C\u4E2D\u95F4\u4EF6" aria-hidden="true">#</a> \u6CE8\u518C\u4E2D\u95F4\u4EF6</h3><p>\u5728 <code>App/Http/Kernel.php</code> \u6CE8\u518C\u4E00\u4E0B\u5168\u5C40\u4E2D\u95F4\u4EF6\uFF0C\u8FD9\u91CC\u6211\u662F\u5F53\u5168\u5C40\u7528\u7684\uFF0C\u4F60\u5F53\u7136\u53EF\u4EE5\u5728\u8DEF\u7531\u4E2D\u81EA\u7531\u4F7F\u7528\u3002</p><div class="language-php ext-php line-numbers-mode"><pre class="language-php"><code><span class="token keyword">class</span> <span class="token class-name-definition class-name">Kernel</span> <span class="token keyword">extends</span> <span class="token class-name">HttpKernel</span>
<span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * The application&#39;s global HTTP middleware stack.
     *
     * These middleware are run during every request to your application.
     *
     * <span class="token keyword">@var</span> <span class="token class-name"><span class="token keyword">array</span></span>
     */</span>
    <span class="token keyword">protected</span> <span class="token variable">$middleware</span> <span class="token operator">=</span> <span class="token punctuation">[</span>
        <span class="token class-name class-name-fully-qualified static-context"><span class="token punctuation">\\</span>App<span class="token punctuation">\\</span>Http<span class="token punctuation">\\</span>Middleware<span class="token punctuation">\\</span>TrustProxies</span><span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">,</span>
        <span class="token class-name class-name-fully-qualified static-context"><span class="token punctuation">\\</span>App<span class="token punctuation">\\</span>Http<span class="token punctuation">\\</span>Middleware<span class="token punctuation">\\</span>CheckForMaintenanceMode</span><span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">,</span>
        <span class="token class-name class-name-fully-qualified static-context"><span class="token punctuation">\\</span>Illuminate<span class="token punctuation">\\</span>Foundation<span class="token punctuation">\\</span>Http<span class="token punctuation">\\</span>Middleware<span class="token punctuation">\\</span>ValidatePostSize</span><span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">,</span>
        <span class="token class-name class-name-fully-qualified static-context"><span class="token punctuation">\\</span>App<span class="token punctuation">\\</span>Http<span class="token punctuation">\\</span>Middleware<span class="token punctuation">\\</span>TrimStrings</span><span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">,</span>
        <span class="token class-name class-name-fully-qualified static-context"><span class="token punctuation">\\</span>Illuminate<span class="token punctuation">\\</span>Foundation<span class="token punctuation">\\</span>Http<span class="token punctuation">\\</span>Middleware<span class="token punctuation">\\</span>ConvertEmptyStringsToNull</span><span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">,</span>
        <span class="token class-name static-context">FilterParameters</span><span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token comment">// \u589E\u52A0\u8FD9\u4E00\u884C\uFF0C\u6CE8\u518C\u4E3A\u5168\u5C40\u4E2D\u95F4\u4EF6</span>
    <span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u4E2D\u95F4\u4EF6\u4EE3\u7801" tabindex="-1"><a class="header-anchor" href="#\u4E2D\u95F4\u4EF6\u4EE3\u7801" aria-hidden="true">#</a> \u4E2D\u95F4\u4EF6\u4EE3\u7801</h3>`,10),r=n("code",null,"replace()",-1),d={href:"https://learnku.com/docs/laravel/7.x/middleware/7459",target:"_blank",rel:"noopener noreferrer"},k=t(`<div class="language-php ext-php line-numbers-mode"><pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>

<span class="token keyword">namespace</span> <span class="token package">App<span class="token punctuation">\\</span>Http<span class="token punctuation">\\</span>Middleware</span><span class="token punctuation">;</span>

<span class="token keyword">use</span> <span class="token package">Closure</span><span class="token punctuation">;</span>
<span class="token keyword">use</span> <span class="token package">Illuminate<span class="token punctuation">\\</span>Support<span class="token punctuation">\\</span>Str</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name-definition class-name">FilterParameters</span>
<span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * Handle an incoming request.
     *
     * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">\\</span>Illuminate<span class="token punctuation">\\</span>Http<span class="token punctuation">\\</span>Request</span> <span class="token parameter">$request</span>
     * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">\\</span>Closure</span> <span class="token parameter">$next</span>
     * <span class="token keyword">@return</span> <span class="token class-name"><span class="token keyword">mixed</span></span>
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function-definition function">handle</span><span class="token punctuation">(</span><span class="token variable">$request</span><span class="token punctuation">,</span> <span class="token class-name type-declaration">Closure</span> <span class="token variable">$next</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token variable">$filteredParams</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token variable">$request</span><span class="token operator">-&gt;</span><span class="token function">all</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">as</span> <span class="token variable">$key</span> <span class="token operator">=&gt;</span> <span class="token variable">$value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token variable">$filteredParams</span><span class="token punctuation">[</span><span class="token variable">$key</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token variable">$this</span><span class="token operator">-&gt;</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token variable">$key</span><span class="token punctuation">,</span> <span class="token variable">$value</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token variable">$request</span><span class="token operator">-&gt;</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token variable">$filteredParams</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token variable">$next</span><span class="token punctuation">(</span><span class="token variable">$request</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * filter params
     * <span class="token keyword">@param</span> <span class="token class-name"><span class="token keyword">int</span></span> <span class="token parameter">$key</span>
     * <span class="token keyword">@param</span> <span class="token parameter">$value</span>
     * <span class="token keyword">@return</span> <span class="token class-name"><span class="token keyword">mixed</span></span> $filteredValue
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">function</span> <span class="token function-definition function">filter</span><span class="token punctuation">(</span><span class="token variable">$key</span><span class="token punctuation">,</span> <span class="token variable">$value</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">// \u6CA1\u4F20\u53C2\u6570\u5176\u503C\u4E3Anull\uFF0C\u5219\u4E0D\u5904\u7406\u4ECD\u7136\u8FD4\u56DEnull</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">is_null</span><span class="token punctuation">(</span><span class="token variable">$value</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token variable">$value</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name static-context">Str</span><span class="token operator">::</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token variable">$key</span><span class="token punctuation">,</span> <span class="token punctuation">[</span>
            <span class="token string single-quoted-string">&#39;id&#39;</span><span class="token punctuation">,</span>
            <span class="token string single-quoted-string">&#39;quantity&#39;</span>
        <span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token keyword type-casting">int</span><span class="token punctuation">)</span><span class="token variable">$value</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name static-context">Str</span><span class="token operator">::</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token variable">$key</span><span class="token punctuation">,</span> <span class="token string single-quoted-string">&#39;price&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token keyword type-casting">float</span><span class="token punctuation">)</span><span class="token variable">$value</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">return</span> <span class="token variable">$value</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u53C2\u8003" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003" aria-hidden="true">#</a> \u53C2\u8003</h2>`,2),v={href:"https://segmentfault.com/q/1010000014198634",target:"_blank",rel:"noopener noreferrer"},m={href:"http://blog.dreamlikes.cn/archives/342",target:"_blank",rel:"noopener noreferrer"};function b(h,f){const a=o("ExternalLinkIcon");return l(),c("div",null,[u,n("p",null,[s("\u4EE3\u7801\u5982\u4E0B\uFF0C\u8FD9\u91CC\u4E3B\u8981\u7528\u5230\u4E86\u4E00\u4E2A "),r,s(" \u65B9\u6CD5\uFF0C\u8BE5\u65B9\u6CD5\u4F1A\u4F7F\u7528\u8F93\u5165\u7684\u53C2\u6570\u66FF\u4EE3\u539F\u6709\u7684\u53C2\u6570\u3002\u4E2D\u95F4\u4EF6\u7684\u4F7F\u7528\u8BF7\u53C2\u8003\u300C"),n("a",d,[s("\u6587\u6863"),e(a)]),s("\u300D\u3002")]),k,n("ul",null,[n("li",null,[n("a",v,[s("https://segmentfault.com/q/1010000014198634"),e(a)])]),n("li",null,[n("a",m,[s("http://blog.dreamlikes.cn/archives/342"),e(a)])])])])}const g=p(i,[["render",b],["__file","2020-04-04-laravel-middleware-filter-params.html.vue"]]);export{g as default};
