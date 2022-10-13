import{_ as l}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as t,c as r,a as s,b as e,d as a,e as i,r as o}from"./app.6f7e30ef.js";const c={},d={href:"https://capistranorb.com/",target:"_blank",rel:"noopener noreferrer"},p=i(`<p>\u9996\u5148\u662F\u5B89\u88C5\uFF0C\u5176\u5B9E Ubuntu \u4E0A\u9762\u5B89\u88C5 Capistrano \u975E\u5E38\u7B80\u5355\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ gem <span class="token function">install</span> capistrano
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u7136\u540E\uFF0C\u8FDB\u5165\u9879\u76EE\u76EE\u5F55\uFF0C\u8FD0\u884C\u4E0B\u9762\u547D\u4EE4\u751F\u6210 Capistrano \u7684\u914D\u7F6E\u6587\u4EF6\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ cap <span class="token function">install</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u8FD9\u4E2A\u547D\u4EE4\u4F1A\u521B\u5EFA\u4E0B\u9762\u8FD9\u4E9B\u6587\u4EF6\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>Capfile
config/
    deploy/
        production.rb
        staging.rb
    deploy.rb
lib/
    capistrano/
        tasks/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5728 <code>config</code> \u4E2D\u5B58\u653E\u7684\u7684\u5404\u4E2A\u73AF\u5883\u7684\u914D\u7F6E\u6587\u4EF6\uFF0C\u800C\u6211\uFF0C\u5C31\u662F\u5728\u914D\u7F6E\u8FD9\u4E2A\u7684\u65F6\u5019\u4EA7\u751F\u7684\u95EE\u9898\u3002</p><p><code>deploy</code> \u6587\u4EF6\u914D\u7F6E\u5982\u4E0B\uFF1A</p><div class="language-ruby ext-rb line-numbers-mode"><pre class="language-ruby"><code><span class="token comment"># config valid for current version and patch releases of Capistrano</span>
lock <span class="token string-literal"><span class="token string">&quot;~&gt; 3.11.0&quot;</span></span>

set <span class="token symbol">:application</span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">&quot;KFB&quot;</span></span>
set <span class="token symbol">:repo_url</span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">&quot;git@&lt;my-server-1&gt;:&lt;my-account&gt;/&lt;my-project&gt;.git&quot;</span></span>

<span class="token comment"># Default branch is :master</span>
<span class="token comment"># ask :branch, \`git rev-parse --abbrev-ref HEAD\`.chomp</span>
set <span class="token symbol">:branch</span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">&quot;dev&quot;</span></span>

<span class="token comment"># Default deploy_to directory is /var/www/my_app_name</span>
set <span class="token symbol">:deploy_to</span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">&quot;/home/KFB-API&quot;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u800C <code>staging.rb</code> \u6587\u4EF6\u5982\u4E0B\uFF1A</p><div class="language-ruby ext-rb line-numbers-mode"><pre class="language-ruby"><code><span class="token comment"># server-based syntax</span>
<span class="token comment"># ======================</span>
<span class="token comment"># Defines a single server with a list of roles and multiple properties.</span>
<span class="token comment"># You can define all roles on a single server, or split them:</span>

<span class="token comment"># server &quot;example.com&quot;, user: &quot;deploy&quot;, roles: %w{app db web}, my_property: :my_value</span>
<span class="token comment"># server &quot;example.com&quot;, user: &quot;deploy&quot;, roles: %w{app web}, other_property: :other_value</span>
<span class="token comment"># server &quot;db.example.com&quot;, user: &quot;deploy&quot;, roles: %w{db}</span>

<span class="token comment"># role-based syntax</span>
<span class="token comment"># ==================</span>

<span class="token comment"># Defines a role with one or multiple servers. The primary server in each</span>
<span class="token comment"># group is considered to be the first unless any hosts have the primary</span>
<span class="token comment"># property set. Specify the username and a domain or IP for the server.</span>
<span class="token comment"># Don&#39;t use \`:all\`, it&#39;s a meta role.</span>

<span class="token comment"># role :app, %w{deploy@example.com}, my_property: :my_value</span>
<span class="token comment"># role :web, %w{user1@primary.com user2@additional.com}, other_property: :other_value</span>
<span class="token comment"># role :db,  %w{deploy@example.com}</span>
role <span class="token symbol">:web</span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">%w{&lt;my-user&gt;@&lt;my-server&gt;}</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5C31\u914D\u7F6E\u8FD9\u4E00\u884C\u5C31\u53EF\u4EE5\u4E86\u3002\u6309\u7167\u6CE8\u91CA\u6240\u8BF4\uFF0C\u5B83\u6709\u4E24\u79CD\u65B9\u5F0F\u914D\u7F6E\uFF0C\u4F46\u5176\u5B9E\u90FD\u53EA\u5E72\u4E86\u4E00\u4EF6\u4E8B\uFF0C\u5C31\u662F\u914D\u7F6E\u90E8\u7F72\u670D\u52A1\u5668\u3002</p><p>\u6211\u4E4B\u524D\u9519\u8BEF\u5C31\u662F\u5728\u8FD9\u91CC\u914D\u4E86\u4E24\u4E2A\u8BBE\u7F6E\uFF0C\u7136\u540E\u6267\u884C</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ cap staging deploy
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u65F6\u59CB\u7EC8\u4F1A\u62A5\u8FD9\u51E0\u4E2A\u9519\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment">#\u9519\u8BEF\u4E00\uFF1Afatal: unable to access &#39;http://&lt;my-server&gt;/&lt;my-account&gt;/&lt;my-project&gt;.git/&#39;: The requested URL returned error: 500</span>
<span class="token comment">#\u9519\u8BEF\u4E8C\uFF1Afatal: repository &#39;http://&lt;my-server&gt;/&lt;my-account&gt;/&lt;my-project&gt;.git/&#39; not found</span>
<span class="token comment">#\u9519\u8BEF\u4E09\uFF1ANet::SSH::AuthenticationFailed: Authentication failed for user &lt;my-user&gt;@&lt;my-project&gt;</span>
<span class="token comment">#\u9519\u8BEF\u56DB\uFF1APermission denied (publickey,password)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u53D1\u751F\u9519\u8BEF\u6839\u672C\u539F\u56E0\u6709\u4E24\u4E2A\uFF0C\u4E00\u4E2A\u662F\u672C\u5730\u8FDE\u63A5\u8FDC\u7A0B\u670D\u52A1\u5668\u4E0D\u901A\uFF0C\u7B2C\u4E8C\u4E2A\u662F\u8FDC\u7A0B\u670D\u52A1\u5668\u8FDE\u63A5 Git \u670D\u52A1\u5668\u4E0D\u901A\uFF0C\u56E0\u4E3A Capistrano \u7684\u8FD0\u884C\u539F\u7406\u5C31\u662F\u4ECE\u672C\u5730\u8FDE\u63A5\u8FDC\u7A0B\u670D\u52A1\u5668\uFF0C\u7136\u540E\u5728\u8FDC\u7A0B\u670D\u52A1\u5668\u4E0A\u6267\u884C Git \u547D\u4EE4\uFF0C\u514B\u9686\u6700\u65B0\u4EE3\u7801\u5230\u8FDC\u7A0B\u670D\u52A1\u5668\u7684\u53D1\u5E03\u76EE\u5F55\u4E0A\u9762\u3002\u8FD9\u91CC\u90FD\u662F\u4F7F\u7528\u7684 ssh key \u7684\u65B9\u5F0F\u8FDB\u884C\u8FDE\u63A5\u3002</p>`,17),m={href:"http://feiffy.cc/ssh-key-login-server-and-git",target:"_blank",rel:"noopener noreferrer"},u=i(`<p>\u5BF9\u4E8E\u8FDE\u63A5 Git \u670D\u52A1\u5668\u7684\u95EE\u9898\uFF0C\u6B64\u65F6\u7684 Git \u670D\u52A1\u5668\u662F\u7528 Gitlab \u642D\u5EFA\u7684\u4E00\u4E2A\u9879\u76EE\uFF0C\u53EF\u4EE5\u901A\u8FC7 Web \u8BBF\u95EE\uFF1B\u7528\u4E0A\u9762\u540C\u6837\u7684\u65B9\u6CD5\u751F\u6210\u4E24\u4E2A Key\uFF0C\u516C\u94A5\u5728 Gitlab \u4E2D\u7684\u4E2A\u4EBA\u8BBE\u7F6E\u4E2D\uFF08\u4E0B\u56FE\uFF09\u8BBE\u7F6E\uFF0C\u79C1\u94A5\u653E\u5728\u8FDC\u7A0B\u670D\u52A1\u5668\u8BBF\u95EE Git \u670D\u52A1\u5668\u7684\u7528\u6237\u76EE\u5F55\u7684 <code>.ssh/</code> \u76EE\u5F55\u4E0B\u9762\u3002</p><p><img src="http://cdn.feiffy.cc/blog/2018/07/03/auto-deploy-with-capistrano.png" alt="" loading="lazy"> \u914D\u7F6E\u5B8C\u4E4B\u540E\uFF0C\u53EF\u4EE5\u5148\u7528</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ <span class="token function">git</span> clone git@<span class="token operator">&lt;</span>my-server<span class="token operator">&gt;</span>:<span class="token operator">&lt;</span>my-account<span class="token operator">&gt;</span>/<span class="token operator">&lt;</span>my-project<span class="token operator">&gt;</span>.git 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u6D4B\u8BD5\u4E00\u4E0B\uFF0C\u6B63\u5E38\u7684\u8BDD\u5E94\u8BE5\u80FD\u76F4\u63A5\u514B\u9686\u9879\u76EE\u800C\u4E0D\u9700\u8981\u518D\u8F93\u5165\u5BC6\u7801\u4E86\u3002</p><p>\u6700\u540E\u5168\u90E8\u914D\u7F6E\u597D\u4E86\u4E4B\u540E\uFF0C\u518D\u8FD0\u884C</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ cap staging deploy
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u8F93\u51FA\u4E00\u5927\u5806\u547D\u4EE4\uFF0C\u6700\u540E\u663E\u793A\u6210\u529F\u3002\u6839\u636E\u5148\u524D\u7684\u8BBE\u7F6E\uFF0C\u81EA\u52A8\u90E8\u7F72\u4E4B\u540E\u7684\u8FDC\u7A0B\u670D\u52A1\u5668\u4E0A\u7684\u4EE3\u7801\u76EE\u5F55\u7ED3\u6784\u662F\u8FD9\u6837\u7684\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>KFB-API/
    revisions.log
    releases/
        0180703070947/
            <span class="token comment"># \u8FD9\u91CC\u662F\u9879\u76EE\u7684\u5177\u4F53\u5185\u5BB9\uFF0C\u76F8\u5F53\u4E8E\u539F\u6765\u7684 KFB-API/ \u4E0B\u9762\u7684\u5185\u5BB9</span>
    current/ -<span class="token operator">&gt;</span> ./releases/20180703070947
    repo
    shared
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,8);function v(b,g){const n=o("ExternalLinkIcon");return t(),r("div",null,[s("p",null,[e("\u6700\u8FD1\u5728\u6298\u817E\u8FD9\u4E2A\uFF0C\u5F04\u4E86\u597D\u591A\u6B21\u90FD\u4E0D\u6210\u529F\uFF0C\u770B\u4E86"),s("a",d,[e("\u5B98\u65B9\u6587\u6863"),a(n)]),e("\u548C\u5F88\u591A\u535A\u5BA2\uFF0C\u90FD\u6CA1\u6709\u8BF4\u6E05\u695A\uFF0C\u56E0\u6B64\uFF0C\u6211\u89C9\u5F97\u6709\u5FC5\u8981\u628A\u5B83\u8BB0\u5F55\u4E0B\u6765\uFF0C\u4EE5\u5E2E\u52A9\u66F4\u591A\u50CF\u6211\u8FD9\u6837\u88AB\u5F04\u5F97\u70E6\u8E81\u7684\u4EBA\u3002")]),p,s("p",null,[e("\u672C\u5730\u8FDE\u63A5\u8FDC\u7A0B\u670D\u52A1\u5668\u4E0D\u901A\uFF0C\u53EF\u4EE5\u53C2\u8003 "),s("a",m,[e("\u8BBE\u7F6E SSH Key \u767B\u5F55\u670D\u52A1\u5668\u548C Git \u670D\u52A1\u5668"),a(n)]),e(" \u5728\u672C\u5730\u751F\u6210\u4E24\u4E2A Key\uFF0C\u628A\u516C\u94A5\u653E\u670D\u52A1\u5668\u4E0A\uFF0C\u79C1\u94A5\u653E\u672C\u5730\u3002\u8FD9\u91CC\u8FD8\u6709\u4E00\u4E2A\u5751\uFF0C\u5982\u679C\u4F60\u5728\u751F\u6210\u5BC6\u94A5\u6587\u4EF6\u65F6\u6307\u5B9A\u4E86\u6587\u4EF6\u540D\u7684\u8BDD\uFF0C\u90A3\u662F\u4E0D\u80FD\u76F4\u63A5\u4F7F\u7528\u7684\uFF0C\u5177\u4F53\u5982\u4F55\u4F7F\u7528\u6211\u6682\u65F6\u6CA1\u5F04\u6E05\u695A\uFF0C\u6240\u4EE5\u76F4\u63A5\u4F7F\u7528\u9ED8\u8BA4\u7684\u6587\u4EF6\u540D id_rsa \u5C31\u884C\u5566\u3002")]),u])}const y=l(c,[["render",v],["__file","2018-07-03-auto-deploy-with-capistrano.html.vue"]]);export{y as default};