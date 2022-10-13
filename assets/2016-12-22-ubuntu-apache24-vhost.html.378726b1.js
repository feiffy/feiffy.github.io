import{_ as a}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as c,c as d,a as s,b as e,d as n,e as o,r as i}from"./app.6f7e30ef.js";const r={},l=s("p",null,"\u6BCF\u6B21\u91CD\u88C5\u7CFB\u7EDF\u5982\u4F55\u914D\u7F6E\u90FD\u4E0A\u7F51\u627E\uFF0C\u641E\u534A\u5929\uFF0C\u90FD\u662F\u4E0D\u5BF9\u7684\uFF0C\u8FD8\u4E0D\u5982\u81EA\u5DF1\u8BB0\u4E0B\u6765\uFF0C\u4EE5\u4F5C\u53C2\u8003\u5462\u3002",-1),h=s("code",null,"/home/feiffy/demo/test/public",-1),p={href:"http://test.com",target:"_blank",rel:"noopener noreferrer"},u={href:"http://test.com",target:"_blank",rel:"noopener noreferrer"},m=o(`<p>\u4E0B\u9762\u662F\u914D\u7F6E\u7684\u6B65\u9AA4\uFF1A</p><p>1\uFF09\u5148\u4FDD\u8BC1\u81EA\u5DF1\u9879\u76EE\u76EE\u5F55\u5B58\u5728\u554A\uFF1A<code>$ mkdir /home/feiffy/demo/test</code></p><p>2\uFF09\u8FDB\u5165apache\u7684\u914D\u7F6E\u6587\u4EF6\u76EE\u5F55\uFF1A<code>$ cd /etc/apache2/sites-available/</code></p><p>3\uFF09\u5EFA\u7ACB\u4E00\u4E2A\u4EE5[\u57DF\u540D.conf]\u4E3A\u540D\u7684\u914D\u7F6E\u6587\u4EF6\uFF1A<code>$ sudo gedit test.com.conf</code>\uFF0C\u8F93\u5165\u4EE5\u4E0B\u4EE3\u7801\u5E76\u4FDD\u5B58\uFF1A</p><div class="language-conf ext-conf line-numbers-mode"><pre class="language-conf"><code>&lt;VirtualHost *:80&gt;
# \u8BBE\u7F6E\u57DF\u540D
ServerName test.com
# \u8BBE\u7F6E\u9879\u76EE\u76EE\u5F55
DocumentRoot /home/feiffy/demo/test/public

# \u8BBE\u7F6E\u76EE\u5F55\u6743\u9650
&lt;Directory /home/feiffy/demo/test/public&gt;
AllowOverride All
Require all granted
&lt;/Directory&gt;
&lt;/VirtualHost&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>4\uFF09\u542F\u7528\u914D\u7F6E\uFF1A<code>$ sudo a2ensite test.com</code></p><p>5\uFF09\u91CD\u542F apache2\uFF1A<code>$ sudo service apache2 reload</code></p><p>6\uFF09\u6253\u5F00host\u6587\u4EF6\uFF1A<code>$ sudo gedit /etc/hosts</code> \u6DFB\u52A0\u4E00\u884C\uFF1A<code>127.0.0.1 test.com</code></p>`,8),v={href:"http://test.com",target:"_blank",rel:"noopener noreferrer"},f=o(`<h2 id="faqs" tabindex="-1"><a class="header-anchor" href="#faqs" aria-hidden="true">#</a> FAQs</h2><ul><li><strong>\u6253\u5F00\u6D4F\u89C8\u5668\u8F93\u5165 <code>test.com/index.html</code> \u51FA\u73B0\uFF1A<code>&quot;Forbidden You don&#39;t have permission to access /index.html on this server&quot;</code>.</strong></li></ul><p>\u8FD9\u662F\u6CA1\u6709\u6743\u9650\u7684\u95EE\u9898\uFF0C\u8BBE\u7F6E\u9879\u76EE\u76EE\u5F55\u6743\u9650\u5373\u53EF</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ <span class="token function">chown</span> www-data <span class="token parameter variable">-R</span> /home/feiffy/demo/test/public
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li><strong>\u914D\u7F6E\u4E86\u65B0\u7684\u7AEF\u53E38001\uFF0C\u4E00\u76F4\u6CA1\u6709\u6548\u679C\u3002</strong></li></ul><p>\u8FD9\u662F\u56E0\u4E3A\u6CA1\u6709\u914D\u7F6E\u76D1\u542C\uFF0C\u9700\u8981\u5728 apache2.conf \u6216\u8005 port.conf \u589E\u52A0\u4E00\u884C\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>Listen <span class="token number">8001</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="\u53C2\u8003" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003" aria-hidden="true">#</a> \u53C2\u8003</h2>`,8),b={href:"https://httpd.apache.org/docs/2.4/vhosts/examples.html",target:"_blank",rel:"noopener noreferrer"};function _(g,x){const t=i("ExternalLinkIcon");return c(),d("div",null,[l,s("p",null,[e("\u6211\u7684\u9879\u76EE\u76EE\u5F55\u662F "),h,e("\uFF0C\u6620\u5C04\u7684\u57DF\u540D\u662F "),s("a",p,[e("test.com"),n(t)]),e("\uFF0C\u8FD9\u6837\u5728\u6D4F\u89C8\u5668\u8F93\u5165 "),s("a",u,[e("test.com"),n(t)]),e(" \u5C31\u53EF\u4EE5\u76F4\u63A5\u6253\u5F00\u6211\u7684\u9879\u76EE\u5566\u3002")]),m,s("p",null,[e("7\uFF09\u6700\u540E\u5728\u6D4F\u89C8\u5668\u8F93\u5165 "),s("a",v,[e("test.com"),n(t)]),e("\uFF0C\u5C31\u6253\u5F00\u4E86\u4E3B\u9875\u6587\u6863 index.html\uFF0C\u6D4B\u8BD5\u6210\u529F")]),f,s("ul",null,[s("li",null,[s("a",b,[e("https://httpd.apache.org/docs/2.4/vhosts/examples.html"),n(t)]),e(" \u5B98\u65B9\u793A\u4F8B")])])])}const V=a(r,[["render",_],["__file","2016-12-22-ubuntu-apache24-vhost.html.vue"]]);export{V as default};