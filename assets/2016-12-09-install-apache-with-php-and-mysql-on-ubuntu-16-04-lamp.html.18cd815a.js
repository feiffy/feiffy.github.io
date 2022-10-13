import{_ as t}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as r,c as o,a,b as e,d as s,w as d,e as p,r as i}from"./app.6f7e30ef.js";const c={},h={href:"https://www.howtoforge.com/tutorial/install-apache-with-php-and-mysql-on-ubuntu-16-04-lamp/",target:"_blank",rel:"noopener noreferrer"},u=a("p",null,"\u6628\u5929\u5728\u865A\u62DF\u673A\u91CC\u9762\u5B89\u88C5ubuntu server \uFF0C\u7136\u540E\u914D\u7F6Ephp\u5F00\u53D1\u73AF\u5883\uFF0C\u53C2\u8003\u4E86\u8FD9\u7BC7\u6587\u7AE0\uFF0C\u4E00\u6B21\u6027\u628A\u6240\u6709\u7684\u4E1C\u897F\u90FD\u5B89\u88C5\u914D\u7F6E\u597D\u4E86\uFF0C\u6240\u4EE5\u60F3\u628A\u8FD9\u7BC7\u6587\u7AE0\u8BB0\u5F55\u4E0B\u6765\u3002\u5E0C\u671B\u80FD\u591F\u5E2E\u52A9\u5230\u521D\u5B66\u8005\u4E00\u6B21\u6027\u641E\u5B9A\u8FD9\u4E9B\u914D\u7F6E\uFF08\u907F\u514D\u7EA0\u7ED3\uFF09\uFF0C\u7136\u540E\u5C31\u53EF\u4EE5\u6109\u5FEB\u5730\u7F16\u7A0B\u4E86\uFF0C\u563F\u563F\u3002",-1),m=a("p",null,"\u4EE5\u4E0B\u662F\u6211\u7FFB\u8BD1\u7684\u5185\u5BB9\uFF0C\u5B8C\u5168\u5BF9\u7167\u539F\u6587\uFF0C\u6CA1\u6709\u81EA\u5DF1\u6539\u52A8\u7684\u90E8\u5206\uFF08\u56E0\u4E3A\u539F\u6587\u5DF2\u7ECF\u5F88\u5B8C\u7F8E\u4E86\uFF09\uFF1A",-1),b=a("p",null,[a("strong",null,"LAMP"),e(" \u662F Linux,Apache,MySQL,PHP\u7684\u7F29\u5199\u3002\u672C\u6587\u6559\u4F60\u5982\u4F55\u5728 ubuntu 16.04(Xenial Xerus) server \u4E0A\u5B89\u88C5 Apache2\uFF0CPHP7\uFF08mod_php\uFF09\u548CMySQL\u3002\u6B64\u5916\uFF0C\u8FD8\u5C06\u5B89\u88C5 PHPMyAdmin \u5DE5\u5177\u7528\u4E8E\u7BA1\u7406 MySQL\u3002")],-1),v=a("h3",{id:"\u8BF4\u660E",tabindex:"-1"},[a("a",{class:"header-anchor",href:"#\u8BF4\u660E","aria-hidden":"true"},"#"),e(" \u8BF4\u660E")],-1),g={href:"http://server1.example.com",target:"_blank",rel:"noopener noreferrer"},f=p(`<p>\u6211\u63A8\u8350\u4F7F\u7528 minimal Ubuntu server \u4F5C\u4E3A\u672C\u6587\u64CD\u4F5C\u7684\u57FA\u7840\u3002</p><p>\u6211\u5728root\u6743\u9650\u4E0B\u8FD0\u884C\u6240\u6709\u7684\u547D\u4EE4\uFF0C\u6240\u4EE5\u786E\u4FDD\u4F60\u4F7F\u7528\u7684\u662Froot\u8D26\u6237\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ <span class="token function">sudo</span> <span class="token function">su</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="\u5B89\u88C5-mariadb-\u4F5C\u4E3A-mysql-\u7684\u66FF\u6362" tabindex="-1"><a class="header-anchor" href="#\u5B89\u88C5-mariadb-\u4F5C\u4E3A-mysql-\u7684\u66FF\u6362" aria-hidden="true">#</a> \u5B89\u88C5 MariaDB \u4F5C\u4E3A MySQL \u7684\u66FF\u6362</h3><p>\u6211\u5B89\u88C5\u7684\u662F MariaDB \u800C\u4E0D\u662F MySQL\u3002MariaDB \u662F MySQL \u7684\u4F5C\u8005 Monty Widenius \u6240\u7EF4\u62A4\u7684 MySQL \u5206\u652F\u7248\u672C\u3002MariaDB \u517C\u5BB9 MySQL\uFF0C\u5E76\u4E14\u589E\u52A0\u4E86\u529F\u80FD\uFF0C\u63D0\u9AD8\u4E86\u6027\u80FD\u3002\u8FD0\u884C\u4E0B\u9762\u7684\u547D\u4EE4\u6765\u5B89\u88C5 MariaDB-server \u548C client:</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ <span class="token function">apt-get</span> <span class="token function">install</span> mariadb-server mariadb-client
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u7136\u540E\u8BBE\u7F6E MariaDB \u7684 root \u5BC6\u7801\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ mysql_secure_installation
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u7136\u540E\uFF0C\u51FA\u73B0\u4E00\u4E9B\u63D0\u793A,\u6309\u7167\u7EA2\u8272\u63D0\u793A\u6765\u64CD\u4F5C\u5C31\u884C\u4E86\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>Enter current password <span class="token keyword">for</span> root <span class="token punctuation">(</span>enter <span class="token keyword">for</span> none<span class="token punctuation">)</span>: <span class="token operator">&lt;</span>-- press enter
Set root password? <span class="token punctuation">[</span>Y/n<span class="token punctuation">]</span> <span class="token operator">&lt;</span>-- y
New password: <span class="token operator">&lt;</span>-- Enter the new MariaDB root password here
Re-enter new password: <span class="token operator">&lt;</span>-- Repeat the password
Remove anonymous users? <span class="token punctuation">[</span>Y/n<span class="token punctuation">]</span> <span class="token operator">&lt;</span>-- y
Disallow root login remotely? <span class="token punctuation">[</span>Y/n<span class="token punctuation">]</span> <span class="token operator">&lt;</span>-- y
Reload privilege tables now? <span class="token punctuation">[</span>Y/n<span class="token punctuation">]</span> <span class="token operator">&lt;</span>-- y
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4F7F\u7528 mysql \u547D\u4EE4\u6D4B\u8BD5\u662F\u5426\u80FD\u767B\u5F55 MariaDB\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ mysql <span class="token parameter variable">-u</span> root <span class="token parameter variable">-p</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u518D\u8F93\u5165\u4E0A\u9762\u8BBE\u7F6E root \u5BC6\u7801\uFF0C\u5C31\u4F1A\u51FA\u73B0\u5982\u4E0B\u6240\u793A\uFF1A</p><p><img src="https://images2015.cnblogs.com/blog/941616/201612/941616-20161209182512710-1592568295.png" alt="" loading="lazy"></p><p>\u8981\u79BB\u5F00 MariaDB shell\uFF0C\u8F93\u5165 quit \u548C \u56DE\u8F66\u952E\u5C31\u884C\u4E86\u3002</p><h3 id="\u5B89\u88C5-apache-2-4" tabindex="-1"><a class="header-anchor" href="#\u5B89\u88C5-apache-2-4" aria-hidden="true">#</a> \u5B89\u88C5 Apache 2.4</h3><p>Apache 2 \u53EF\u4EE5\u76F4\u63A5\u4ECE Ubuntu \u5305\u4E2D\u83B7\u53D6\uFF0C\u53EA\u8981\u8FD9\u6837\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ <span class="token function">apt-get</span> <span class="token function">install</span> apache2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,18),k={href:"http://192.168.1.100",target:"_blank",rel:"noopener noreferrer"},y=p(`<p><img src="https://images2015.cnblogs.com/blog/941616/201612/941616-20161209182823679-1160699445.png" alt="" loading="lazy"></p><p>apache \u9ED8\u8BA4\u6587\u7AE0\u6839\u76EE\u5F55\u662F /var/www/html\uFF0C\u5176\u4E3B\u8981\u914D\u7F6E\u6587\u4EF6\u4E3A\uFF1A/etc/apache2/apache2.conf\u3002\u5176\u914D\u7F6E\u7CFB\u7EDF\u7684\u8BF4\u660E\u6587\u6863\u5728 /usr/share/doc/apache2/README.Debian.gz.</p><h3 id="\u5B89\u88C5-php-7" tabindex="-1"><a class="header-anchor" href="#\u5B89\u88C5-php-7" aria-hidden="true">#</a> \u5B89\u88C5 PHP 7</h3><p>\u5B89\u88C5 PHP 7 \u548C Apache PHP \u6A21\u5757\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ <span class="token function">apt-get</span> <span class="token function">install</span> php7.0 libapache2-mod-php7.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u7136\u540E\u91CD\u542F Apache</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ systemctl restart apache2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="\u6D4B\u8BD5-php-\u83B7\u5F97\u4E00\u4E9B\u7EC6\u8282\u4FE1\u606F" tabindex="-1"><a class="header-anchor" href="#\u6D4B\u8BD5-php-\u83B7\u5F97\u4E00\u4E9B\u7EC6\u8282\u4FE1\u606F" aria-hidden="true">#</a> \u6D4B\u8BD5 PHP \u83B7\u5F97\u4E00\u4E9B\u7EC6\u8282\u4FE1\u606F</h3><p>\u9ED8\u8BA4web\u7AD9\u70B9\u7684\u6587\u6863\u6839\u76EE\u5F55\u662F /var/www/html \uFF0C\u6211\u5728\u8BE5\u76EE\u5F55\u521B\u5EFA\u4E00\u4E2Ainfo.php\u6587\u4EF6\uFF0C\u7136\u540E\u5728\u6D4F\u89C8\u5668\u4E2D\u8BBF\u95EE\u5B83\u3002\u8FD9\u4E2A\u6587\u4EF6\u80FD\u591F\u663E\u793A\u6709\u5173PHP\u5B89\u88C5\u7684\u8BE6\u7EC6\u4FE1\u606F\u3002</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ <span class="token function">vim</span> /var/www/html/info.php
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u8F93\u5165\u6587\u4EF6\u5185\u5BB9\uFF1A</p><div class="language-php ext-php line-numbers-mode"><pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
<span class="token function">phpinfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6539\u53D8info.php\u6587\u4EF6\u7684\u6240\u6709\u8005\u4E3A www-data \u7528\u6237\u548C\u7EC4</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ <span class="token function">chown</span> www-data:www-data /var/www/html/info.php
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,14),_={href:"http://192.168.1.100/info.php",target:"_blank",rel:"noopener noreferrer"},w=p(`<p><img src="https://images2015.cnblogs.com/blog/941616/201612/941616-20161209184720585-809940705.png" alt="" loading="lazy"></p><p>\u5982\u4F60\u6240\u770B\u5230\u7684\uFF0CPHP7.0 \u6B63\u5728\u8FD0\u884C\uFF0C\u4ECE Server API \u884C\u53EF\u4EE5\u770B\u51FA\uFF0C\u5B83\u662F\u901A\u8FC7 Apache 2.0 Handler \u8FD0\u884C\u7684\uFF0C\u7EE7\u7EED\u5411\u4E0B\u6EDA\u52A8\u9875\u9762\uFF0C\u4F60\u5C31\u770B\u89C1\u6240\u6709\u5DF2\u7ECF\u542F\u7528\u7684\u6A21\u5757\u3002MySQL\u5E76\u4E0D\u5728\u5176\u4E2D\uFF0C\u8FD9\u662F\u56E0\u4E3A\u6211\u4EEC\u8FD8\u6CA1\u6709\u5BF9PHP\u6DFB\u52A0MySQL/MariaDB\u652F\u6301\u3002</p><h3 id="php-\u542F\u7528-mysql-mariadb-\u652F\u6301" tabindex="-1"><a class="header-anchor" href="#php-\u542F\u7528-mysql-mariadb-\u652F\u6301" aria-hidden="true">#</a> PHP \u542F\u7528 MySQL / MariaDB \u652F\u6301</h3><p>\u4E3A\u4E86\u4F7F PHP \u652F\u6301 MySQL\uFF0C\u53EF\u4EE5\u5B89\u88C5 php7.0-mysql \u5305\u3002\u540C\u65F6\u4E5F\u53EF\u4EE5\u5B89\u88C5\u5176\u4ED6\u6240\u9700\u8981\u7684 PHP \u6A21\u5757\uFF0C\u4F7F\u7528\u4E0B\u9762\u547D\u4EE4\u6765\u641C\u7D22\u53EF\u7528\u7684 PHP \u6A21\u5757\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ <span class="token function">apt-cache</span> search php7.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u9009\u62E9\u4E00\u4E9B\u6A21\u5757\uFF0C\u5B89\u88C5\u4E4B\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ <span class="token function">apt-get</span> <span class="token parameter variable">-y</span> <span class="token function">install</span> php7.0-mysql php7.0-curl php7.0-gd php7.0-intl php-pear php-imagick php7.0-imap php7.0-mcrypt php-memcache  php7.0-pspell php7.0-recode php7.0-sqlite3 php7.0-tidy php7.0-xmlrpc php7.0-xsl php7.0-mbstring php-gettext
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u91CD\u542F Apache2</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ systemctl restart apache2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://images2015.cnblogs.com/blog/941616/201612/941616-20161209190557179-563578384.png" alt="" loading="lazy"></p><p>\u5982\u4E0A\u56FE\u6240\u793A\uFF0CPHP\u5DF2\u7ECF\u542F\u7528\u4E86 MySQL/MariaDB \u652F\u6301\u3002</p><h3 id="\u5B89\u88C5-apcu-php-\u7F13\u5B58\u6765\u52A0\u901F-php-\u8FD0\u884C" tabindex="-1"><a class="header-anchor" href="#\u5B89\u88C5-apcu-php-\u7F13\u5B58\u6765\u52A0\u901F-php-\u8FD0\u884C" aria-hidden="true">#</a> \u5B89\u88C5 APCu PHP \u7F13\u5B58\u6765\u52A0\u901F PHP \u8FD0\u884C</h3><p>APCu \u662F\u4E00\u4E2A\u514D\u8D39\u7684 PHP opcode cacher \u7528\u6765\u7F13\u5B58\u548C\u4F18\u5316 PHP \u4E2D\u95F4\u4EE3\u7801\u3002\u63A8\u8350\u5B89\u88C5\u5B83\u6765\u52A0\u901FPHP\u901F\u5EA6\u3002</p><p>\u5B89\u88C5\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ <span class="token function">apt-get</span> <span class="token function">install</span> php-apcu
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u91CD\u542F Apache\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ systemctl restart apache2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,17),P={href:"http://192.168.1.100/info.php%EF%BC%8C%E7%9C%8B%E5%88%B0",target:"_blank",rel:"noopener noreferrer"},x=p(`<p><img src="https://images2015.cnblogs.com/blog/941616/201612/941616-20161209191033163-1143529792.png" alt="" loading="lazy"></p><p>\u8BF7\u5220\u9664 info.php \u6587\u4EF6\uFF0C\u5B83\u4F1A\u663E\u793A\u4F60\u670D\u52A1\u5668\u7684\u654F\u611F\u4FE1\u606F\u3002\u8FD0\u884C\u4E0B\u9762\u7684\u547D\u4EE4\u6765\u5220\u9664\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ <span class="token function">rm</span> <span class="token parameter variable">-f</span> /var/www/html/info.php
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="\u542F\u7528-apache-\u7684-ssl-\u7F51\u7AD9\u652F\u6301" tabindex="-1"><a class="header-anchor" href="#\u542F\u7528-apache-\u7684-ssl-\u7F51\u7AD9\u652F\u6301" aria-hidden="true">#</a> \u542F\u7528 Apache \u7684 SSL \u7F51\u7AD9\u652F\u6301</h3><p>SSL/TLS \u662F\u4E00\u4E2A\u5B89\u5168\u5C42\uFF0C\u7528\u4E8E\u52A0\u5BC6\u6D4F\u89C8\u5668\u4E0E\u670D\u52A1\u5668\u4E4B\u95F4\u7684\u8FDE\u63A5\u3002\u4F7F\u7528\u4E0B\u9762\u7684\u547D\u4EE4\u4EE5\u542F\u7528 https:// \u652F\u6301</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ a2enmod ssl
$ a2ensite default-ssl
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD9\u4E24\u884C\u547D\u4EE4\u542F\u7528\u4E86 ssl \u6A21\u5757\uFF0C\u5E76\u5728 /etc/apache2/sites-enabled \u6587\u4EF6\u5939\u4E2D\u6DFB\u52A0\u4E86 /etc/apache2/sites-available/default-ssl.conf \u7684\u94FE\u63A5\uFF0C\u4EE5\u5C06\u5176\u5305\u62EC\u5230apache \u914D\u7F6E\u4E4B\u4E2D\u3002\u7136\u540E\u91CD\u542Fapache\u6765\u542F\u7528\u65B0\u914D\u7F6E\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ systemctl restart apache2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,8),M={href:"https://192.168.1.100",target:"_blank",rel:"noopener noreferrer"},S=p(`<p><img src="https://images2015.cnblogs.com/blog/941616/201612/941616-20161209191755616-43146619.png" alt="" loading="lazy"></p><p>\u4F60\u770B\u5230\u4E86\u4E00\u4E2A SSL \u8B66\u544A\uFF1A\u8BE5\u670D\u52A1\u5668\u7684 SSL \u8BC1\u4E66 \u662F \u201C\u81EA\u5DF1\u9881\u53D1\u7ED9\u81EA\u5DF1\u7684\u201D\uFF0C\u8FD9\u8868\u793A\u6D4F\u89C8\u5668\u4E0D\u4FE1\u4EFB\u8BE5\u8BC1\u4E66\uFF0C\u6240\u4EE5\u4F60\u5FC5\u987B\u5148\u63A5\u53D7\u5B89\u5168\u8B66\u544A\uFF0C\u7136\u540E\u624D\u80FD\u6253\u5F00apache \u9ED8\u8BA4\u9875\u9762\uFF1A</p><p><img src="https://images2015.cnblogs.com/blog/941616/201612/941616-20161209191955913-207794574.png" alt="" loading="lazy"></p><p>\u6D4F\u89C8\u5668\u5730\u5740\u680FURL\u524D\u9762\u7684 \u201C\u7EFF\u8272\u7684\u9501\u201D\u8868\u660E\u8FDE\u63A5\u662F\u7ECF\u8FC7\u52A0\u5BC6\u7684\u3002\u8981\u60F3\u89E3\u9664 SSL \u8B66\u544A\uFF0C\u53EF\u4EE5\u4ECE SSL \u8BC1\u4E66\u9881\u53D1\u673A\u6784\u83B7\u5F97\u4E00\u4E2A\u5B98\u65B9\u7B7E\u540D\u7684SSL\u8BC1\u4E66\uFF0C\u7136\u540E\u66FF\u6362\u9ED8\u8BA4\u81EA\u5E26\u7684\u8BC1\u4E66\uFF1A/etc/ssl/certs/ssl-cert-snakeoil.pem\u3002</p><h3 id="\u5B89\u88C5-phpmyadmin" tabindex="-1"><a class="header-anchor" href="#\u5B89\u88C5-phpmyadmin" aria-hidden="true">#</a> \u5B89\u88C5 phpMyAdmin</h3><p>\u901A\u8FC7phpMyAdmin\u53EF\u4EE5\u64CD\u4F5CMySQL\u6570\u636E\u5E93\u3002\u5B89\u88C5\u547D\u4EE4\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ <span class="token function">apt-get</span> <span class="token function">install</span> phpmyadmin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u7136\u540E\u770B\u5230\u8FD9\u4E9B\u63D0\u793A\uFF0C\u6309\u7167\u7EA2\u8272\u63D0\u793A\u8F93\u5165\u5C31\u884C\u4E86\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>Web server to configure automatically: <span class="token operator">&lt;</span>-- Select the option: apache2
Configure database <span class="token keyword">for</span> phpmyadmin with dbconfig-common? <span class="token operator">&lt;</span>-- Yes
MySQL application password <span class="token keyword">for</span> phpmyadmin: <span class="token operator">&lt;</span>-- Press enter, <span class="token function">apt</span> will create a random password automatically.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>MariaDB \u9ED8\u8BA4\u4E3Aroot\u7528\u6237\u542F\u7528\u4E86\u201Cunix_socket\u201D\u63D2\u4EF6\uFF0C\u8FD9\u4E2A\u63D2\u4EF6\u4F1A\u963B\u6B62root\u7528\u6237\u767B\u5F55phpmyadmin\u548Croot\u7528\u6237\u5230MySQL\u7684TCP\u8FDE\u63A5\u3002\u56E0\u6B64\uFF0C\u4F7F\u7528\u547D\u4EE4\u7981\u7528\u4E86\u5B83\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token string">&quot;update user set plugin=&#39;&#39; where User=&#39;root&#39;; flush privileges;&quot;</span> <span class="token operator">|</span> mysql <span class="token parameter variable">-u</span> root <span class="token parameter variable">-p</span> mysql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u7136\u540E\u8F93\u5165 MariaDB root \u5BC6\u7801\u3002</p>`,12),L={href:"http://192.168.1.100/phpmyadmin/",target:"_blank",rel:"noopener noreferrer"},A=a("p",null,[a("img",{src:"https://images2015.cnblogs.com/blog/941616/201612/941616-20161209192856772-78104055.png",alt:"",loading:"lazy"})],-1),H=a("p",null,[a("img",{src:"https://images2015.cnblogs.com/blog/941616/201612/941616-20161209192906351-426799837.png",alt:"",loading:"lazy"})],-1),q=a("hr",null,null,-1),B=a("p",null,"\u53E6\u5916\uFF0C\u8BF4\u660E\u4E00\u4E9B\u64CD\u4F5C\u8FC7\u7A0B\u4E2D\u53EF\u80FD\u4F1A\u9047\u5230\u7684\u95EE\u9898\u4EE5\u53CA\u89E3\u51B3\u529E\u6CD5\u3002",-1),D=a("p",null,"\uFF081\uFF09\u5B89\u88C5\u5B8C\u8BBF\u95EE phpmyadmin \u65F6\uFF0C\u51FA\u73B0\u9519\u8BEF\uFF1AThe reqeusted URL /phpmyadmin was not found on this server",-1);function $(Q,z){const n=i("ExternalLinkIcon"),l=i("RouterLink");return r(),o("div",null,[a("p",null,[e("\u539F\u6587\uFF1A"),a("a",h,[e("https://www.howtoforge.com/tutorial/install-apache-with-php-and-mysql-on-ubuntu-16-04-lamp/"),s(n)])]),u,m,b,v,a("p",null,[e("\u672C\u6587\u4E2D\uFF0C\u6211\u4F7F\u7528 "),a("a",g,[e("server1.example.com"),s(n)]),e(" \u4F5C\u4E3A\u4E3B\u673A\u540D\uFF0CIP\u4E3A\uFF1A192.168.1.100\u3002\u4F60\u5982\u679C\u8DDF\u6211\u4E0D\u540C\uFF0C\u5728\u76F8\u5E94\u7684\u5730\u65B9\u66FF\u6362\u5C31\u884C\u4E86\u3002")]),f,a("p",null,[e("\u73B0\u5728\u6253\u5F00\u6D4F\u89C8\u5668\uFF0C\u8F93\u5165 "),a("a",k,[e("http://192.168.1.100"),s(n)]),e(" \uFF0C\u5C31\u80FD\u770B\u5230 Apache 2 \u9ED8\u8BA4\u9875\u9762\uFF1A")]),y,a("p",null,[e("\u73B0\u5728\u6211\u4EEC\u53EF\u4EE5\u5728\u6D4F\u89C8\u5668\u4E2D\u8BBF\u95EE "),a("a",_,[e("http://192.168.1.100/info.php"),s(n)]),e(" \uFF0C\u7ED3\u679C\u5982\u4E0B\u56FE\u6240\u793A\uFF1A")]),w,a("p",null,[e("\u5237\u65B0\u4E00\u4E0B "),a("a",P,[e("http://192.168.1.100/info.php\uFF0C\u770B\u5230"),s(n)]),e(" apcu \u6A21\u5757\uFF1A")]),x,a("p",null,[e("\u73B0\u5728\u6D4F\u89C8\u5668\u6253\u5F00 "),a("a",M,[e("https://192.168.1.100"),s(n)]),e(" \uFF0C\u770B\u5230\uFF1A")]),S,a("p",null,[e("\u4E4B\u540E\uFF0C\u4F60\u5C31\u53EF\u4EE5\u901A\u8FC7 "),a("a",L,[e("http://192.168.1.100/phpmyadmin/"),s(n)]),e(" \u6765\u8BBF\u95EE\uFF1A")]),A,H,q,B,D,a("p",null,[e("\u6211\u7684\u89E3\u51B3\u529E\u6CD5\u5728\u8FD9\u91CC\uFF1A"),s(l,{to:"/_posts/phpmyadmin-not-found.html"},{default:d(()=>[e("PHPMYADMIN NOT FOUND")]),_:1})])])}const R=t(c,[["render",$],["__file","2016-12-09-install-apache-with-php-and-mysql-on-ubuntu-16-04-lamp.html.vue"]]);export{R as default};