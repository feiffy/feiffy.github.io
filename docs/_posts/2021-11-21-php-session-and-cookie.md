---
title: PHP session 和 cookie
date: 2021-11-21
order: -1
---

## session 和 cookie 的区别（关系）

| #   | Cookie                                                               | Session                                                                             |
| --- | -------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| 1   | Cookie 是客户端文件，可以在浏览器上存储一些数据                      | Session 是服务器端文件，可以在服务器上存储一些数据。                                |
| 2   | Cookie 的过期时间是在 `setCookie` 的第三个参数里面设置的             | Session 的过期时间通常是 1440s（24min），php.ini 中指定                             |
| 3   | PHP 使用 `\$_COOKIE` 获取cookie数据                                  | `\$_SEESION` 可以用来获取和设置 session 数据                                        |
| 4   | 可以直接使用                                                         | 使用 `\$_SESSION` 前必须要先调用 `session_start()`                                  |
| 5   | 大多数浏览器的cookie大小限制是4KB                                    | session 没有限制，取决于内存限制，默认为 128MB                                      |
| 6   | 还是使用`set_cookie()`方法来删除cookie传入一个过期时间，就能自动删除 | `session_destroy()`用于删除 session 中的所有数据，`unset()`函数可以用来删除某个数据 | 

- session 使用一个 session id 来标识某个用户的信息，这个 session id 通常存储在浏览器的 cookie 中。浏览器只存一个 session id，session id 所表示的信息都是存在服务端 session 里面的，然后浏览器每次发请求时会带上 cookie，服务端读取 cookie 中的 session id，从而获取用户的数据，做一些操作。
- session 比 cookie 更安全
- session 必须先使用 session_start()
    - 使用 session 前必须要先调用 session_start()，这个函数就是告诉 PHP  去启动一个新的 session 或者访问已有的 session。
    - session_start 调用后，就可以使用 `$_SESSION` 数组来存取 session 数据了。
- session_start 是如何使用 cookie 的
    - session_start 启动时，它会发送一个名为 PHPSESSID，值类似 a30f8670baa8e10a44c878df89a2044b 的 cookie，这就是一个32位的 session 唯一标识 ID。因为 cookie 必须要在任何数据输出之前发送到浏览器，所以 session_start 必须要在任何数据输出之前调用。
    - **问题**::session_start 启动时，如果请求传来 PHPSESSID 的 cookie 数据了，还会发送吗？

## 如果没有 cookie 支持，session 单独能起作用吗？如果能，那么 php 如何实现。

- 能
- php 通过两种方式实现
    - 对于表单`<form>`提交，可以在里面添加个 `<input>` 元素，name 就是 phpsessionid：`<input type="hidden" name="PHPSESSID" value="12345678" >`
    - 对于所有链接 GET 请求，在 URL 后面贴上 &PHPSESSIONID=sessionid 的参数 `<a href="http://www.example.com?PHPSESSID=72aa95axyz6cd67d82ba0f809277326dd">Go to this link</>`

## 没有 cookie 支持的 session 有哪些劣势？

- 劣势就是如果你把这个待PHP SESSION ID 的链接分享给别人的时候，别人就能获取到你的 session 信息，很危险。

## php 如何删除 cookie

- [^3] php 删除 cookie 有趣的一点是，删除 cookie 用的函数与创建 cookie 用的函数是一样的，都是 `setcookie()`
- setcookie 实际上有六个参数，但只有第一个参数是必需的——那就是cookie 名字。如果调用 setcookie 只传一个 cookie 名，那么作用就是删除这个 cookie 名所代表的 cookie，

[^3]: https://www.programmerinterview.com/php-questions/how-to-delete-cookies-in-php/

``` php
# create a cookie
setcookie('first_name', 'Robert');

# deleted the cookie
setcookie('first_name');
```
- 但是通常来说为了更加安全一点，我们可以设置一个参数：过期时间为过去某个时间：
``` php
setcookie('first_time', '', time() - 300);
```
- 删除 cookie 时必需传入创建它时的同样的参数，比如如果你创建 cookie 时设置了 domain 和 path 参数，那么删除该 cookie 时也要带上这两个参数。
- 删除 cookie 时，并没有真正删除，直到页面重新加载或者新页面打开时，才删除。

## 调用了session_write_close()之后再使用$_SESSION会发生什么？

@date 2020-11-19

> 背景：CI 框架，使用 redis session driver。
> 问题1：在使用 session_write_close() 之后再使用 $_SESSION 会发生什么？
> 问题2：在使用 session_write_close() 之后再使用 session_destroy() 会发生什么？
> 问题3：Session: Error while trying to free lock for SESSION:cp_che300_com:053ca1c432b38003d34ba660c693fe0673e11bde:lock


* 问题1：使用了 session_write_close() 之后，`$_SESSION` 变量本身不会变化，可以继续使用的。但是对 `$_SESSION` 的修改不会自动发送给 session save handler 进行序列化存储了。
* 问题2：直接报 warning 级别的错误 `session_destroy(): Trying to destroy uninitialized session`。但仍然不影响 `$_SESSION` 变量的使用，它仅仅是一个全局变量而已。这里错误中的未初始化 session 应该指的是没有 `session_start()` 吧。
* 问题3：这个是 CI 框架中 redis session driver 在释放锁的时候，释放失败时报的错。释放锁用的是 redis 的 `DEL` 方法，这个方法在 key 不存在时，返回 0。[^1]，而下面的代码，返回 0 的时候会报错。也就是说，在释放锁的时候，已经提前被释放过了。那么问题就转化为什么时候会释放锁？

``` php
if ( ! $this->_redis->delete($this->_lock_key))
{
				log_message('error', 'Session: Error while trying to free lock for '.$this->_lock_key);
				return FALSE;
}
```

* 那就打 log 看一下，猜测一下 session_write_close 和 session_destroy。

## Session 函数详解

* **原理**：通过为每个独立用户分配唯一的会话 ID，可以实现针对不同用户分别存储数据的功能。
* **用途**：会话通常被用来在多个页面请求之间保存及共享信息。
* **session id**：一般来说，会话 ID 通过 cookie 的方式发送到浏览器，并且在服务器端也是通过会话 ID 来取回会话中的数据。 如果请求中不包含会话 ID 信息，那么 PHP 就会创建一个新的会话，并为新创建的会话分配新的 ID。
* **会话的工作流程**：`session_at()` 之后
	* PHP 通过请求中的 ID（通常来自 session cookie） 取回之前保存的 session 数据，如果请求中没有 ID，则创建一个新  session 
  * PHP 将 session 数据赋值到 `$_SESSION` 全局变量。
  * 当 PHP 脚本结束时，它会自动读取 `$_SESSION` 中的内容，并将其序列化，然后发送给 `session save handler` 进行存储。
* **锁的问题**：基于 file 存储的session（默认），当 `session_start()` 之后会锁住这个 session 文件。一旦锁住，其他的脚本就不能读取此 session，直到第一个脚本执行结束或者调用了 `session_write_close()`。对于大量使用 Ajax 或者并发请求的网站而言，这可能是一个严重的问题。 解决这个问题最简单的做法是如果修改了会话中的变量， 那么应该尽快调用 `session_write_close()` 来保存会话数据并释放文件锁。 还有一种选择就是使用支持并发操作的会话保存管理器来替代文件会话保存管理器。

> session_start()
> 定义：session_start() 会创建新会话或者重用现有会话。 如果通过 GET 或者 POST 方式，或者使用 cookie 提交了会话 ID， 则会重用现有会话。

当使用 `session_start` 时，PHP 内部会调用会话管理器的 `open` 和 `read` 回调函数。通过 `read` 回调函数返回的现有会话数据（使用特殊的序列化格式存储）， PHP 会自动反序列化数据并且填充 `$_SESSION` 超级全局变量。

> session_write_close()
> 定义：End the current session and store session data.

* Q：这里的 `End` 怎么理解呢？是 `$_SESSION` 变量没有了吗？
	* A: 经过试验发现：这里的 `End` 应该是指调用了这个方法之后，那么在脚本结束之后不会再 发送 `$_SESSION` 给 session save handler 进行保存。所以说之后再对 `$_SESSION` 进行的修改操作是不会序列化的，下次请求再来获取时是没有的。但是 `End` 并不影响当前脚本中对 `$_SESSION` 变量的读写，就当成一个普通变量来看就行。

> session_destroy()
> 定义：销毁当前会话中的全部数据， 但是不会重置当前会话所关联的全局变量($_SESSION)， 也不会重置会话 cookie(session cookie id)。 如果需要再次使用会话变量， 必须重新调用 session_start() 函数。

* Note: 通常情况下，在你的代码中不必调用 session_destroy() 函数， 可以直接清除 $_SESSION 数组中的数据来实现会话数据清理。清空 $_SESSION 数组中的数据，然后脚本结束时自动将空数据序列化并存储。
* Q：`如果需要再次使用会话变量， 必须重新调用 session_start() 函数。`，这句话的意思是什么？
	* A：说明 `session_destroy()` 的作用其实就是 清空了 session save handler 存储中的数据，并且 `End` session（同上面的`End`），并没有影响当前 `$_SESSION` 的内容和对它的读写操作，但是对它的写操作不会再发送给 session save handler 进行保存了。

> session_regenerate_id
> 定义：在不修改当前会话中数据的前提下使用新的 ID 替换原有会话 ID。

* Q: `使用新生成的会话 ID 更新现有会话 ID` 这句话什么意思，干了什么？为什么会有这个函数？
	* A：这个函数主要是用来防范`会话固定攻击`的[^2]。会话固定攻击，是利用那些登录前和登录之后sessionId没有变化的漏洞来获取登录态，进而获取用户的相关信息。那么防范的措施就是每次用户登录成功之后就用这个函数重新设置一个 sessionId，保证每次 sessionId 都不同。那么在什么时候使用呢？回答是：会话ID必须在身份验证状态的任何转换中都只能在身份验证转换时更改，也就是登录时。
  * A：而在 CI 框架中，重设 sessionId 的时机是可以配置的，目前是每隔 10 分钟更新一次。
  
> session_register_shutdown
> 定义：register_shutdown_function('session_write_close') 的缩写

[^1]: http://doc.redisfans.com/key/del.html
[^2]: https://stackoverflow.com/questions/22965067/when-and-why-i-should-use-session-regenerate-id

* Q: 总算搞清楚了原因！原来是 CI 框架中 session_redis_drivers 中判断锁 ttl > 0 时就要 sleep(1) ！，如果重写一下 drivers 然后改为 usleep(20000) 就应该解决了！

> session_abort
> finishes session without saving data. Thus the original values in session data are kept.

- 很容易理解，忽略 $_SESSION 中的修改，然后关闭会话。

> session_reset
> reinitializes a session with original values stored in session storage. This function requires an active session and discards changes in $_SESSION.

- 很容易理解，使用之前会话中的数据，再次初始化该会话（忽略掉$_SESSION中的修改）

## 会话的工作流程

- 会话的工作流程很简单。当开始一个会话时，PHP 会尝试从请求中查找会话 ID （通常通过会话 cookie），如果请求中不包含会话 ID 信息，PHP 就会创建一个新的会话。 会话开始之后，PHP 就会将会话中的数据设置到 `$_SESSION` 变量中。 当 PHP 停止的时候，它会自动读取 `$_SESSION` 中的内容，并将其进行序列化， 然后发送给会话保存管理器来进行保存。
    - 开始会话：可以通过调用函数 `session_start()` 来手动开始一个会话。 如果配置项 `session.auto_start` 设置为1， 那么请求开始的时候，会话会自动开始。
    - 会话保存管理器：默认情况下，PHP 使用内置的`文件会话保存管理器`（files）来完成会话的保存。 也可以通过配置项 `session.save_handler` 来修改所要采用的会话保存管理器。 对于文件会话保存管理器，会将会话数据保存到配置项 `session.save_path` 所指定的位置。
    - PHP 脚本执行完毕之后，会话会自动关闭。 同时，也可以通过调用函数 `session_write_close()` 来手动关闭会话。
        - 关闭会话：读取 `$_SESSION` 中的内容，并将其进行序列化，然后发送到会话保存管理进行保存。
        - 关闭会话后，`$_SESSION` 这个超全局变量还存在的，只是会话机制不可用了，不能进行自动序列化等操作了。
    - **警告**：千万不要使用 `unset($_SESSION)` 来复位超级变量 `$_SESSION`， 因为这样会导致无法继续在 `$_SESSION` 中注册会话变量。
    - **警告**：由于无法将一个引用恢复到另外一个变量， 所以不可以将引用保存到会话变量中。
    - **注意:**
        - 无论是通过调用函数 session_start() 手动开启会话， 还是使用配置项 session.auto_start 自动开启会话， 对于基于文件的会话数据保存（PHP 的默认行为）而言， 在会话开始的时候都会给会话数据文件加锁， 直到 PHP 脚本执行完毕或者显式调用 session_write_close() 来保存会话数据。 在此期间，其他脚本不可以访问同一个会话数据文件。
        - 对于大量使用 Ajax 或者并发请求的网站而言，这可能是一个严重的问题。 解决这个问题最简单的做法是如果修改了会话中的变量， 那么应该尽快调用 session_write_close() 来保存会话数据并释放文件锁。 还有一种选择就是使用支持并发操作的会话保存管理器来替代文件会话保存管理器。
    - 传送会话 ID：PHP 支持两种方式用来传送会话 ID：Cookies 和 URL 参数，无需开发人员干预，PHP 就可以自动处理 URL 传送会话 ID 的场景。 如果启用了 `session.use_trans_sid` 选项， PHP 将会自动在相对 URI 中包含会话 ID。
    - 自定义会话管理器：如果需要在数据库中或者以其他方式存储会话数据，需要使用 `session_set_save_handler()` 函数来创建一系列用户级存储函数。PHP 5.4.0 之后，你可以使用 `SessionHandlerInterface`  或者通过继承 `SessionHandler` 类来扩展内置的管理器，从而达到自定义会话保存机制的目的。
        - 函数 `session_set_save_handler()` 的参数即为在会话生命周期内要调用的一组回调函数： `open`， `read`， `write` 以及 `close`。 还有一些回调函数被用来完成垃圾清理：`destroy` 用来删除会话， `gc` 用来进行周期性的垃圾收集。
        - 会话开始的时候，PHP 会调用 `open` 管理器，然后再调用 `read` 回调函数来读取内容，该回调函数返回已经经过编码的字符串。 然后 PHP 会将这个字符串解码，并且产生一个数组对象，然后保存至 `$_SESSION` 超级全局变量。
        - 当 PHP 关闭的时候（或者调用了 `session_write_close()` 之后）， PHP 会对 `$_SESSION` 中的数据进行编码， 然后和会话 ID 一起传送给 `write` 回调函数。 `write` 回调函数调用完毕之后，PHP 内部将调用 `close` 回调函数。
        - 销毁会话时，PHP 会调用 `destroy` 回调函数。
        - 根据会话生命周期时间的设置，PHP 会不时地调用 `gc` 回调函数。 该函数会从持久化存储中删除超时的会话数据。 超时是指会话最后一次访问时间距离当前时间超过了 `$lifetime` 所指定的值。
        
        
  ## Session 安全
  
  - 有很多种方式都可以导致**会话 ID 被泄露给第三方**。 例如，JavaScript 注入，URL 中包含会话 ID，数据包侦听， 或者直接访问你的物理设备等。
  - 如果会话 ID 被泄漏给第三方， 那么他们就可以访问这个会话 ID 可以访问的全部资源。
  - 首先，如果在 URL 中包含了会话 ID， 并且访问了外部的站点， 那么你的会话 ID 可能在外部站点的访问日志中被记录（referrer 请求头）。 另外，攻击者也可以监听你的网络通信，如果通信未加密， 那么会话 ID 将会在网络中以明文的形式进行传输。 针对这种情况的解决方案就是在服务端配置 SSL/TLS， 另外，使用 HSTS 可以达到更高的安全性。
  
  - 新增加了一个配置项： session.use_strict_mode。 当启用这个配置项，并且你所用的会话存储处理器支持的话，未经初始化的会话 ID 会被拒绝， 并为其生成一个全新的会话，这可以避免攻击者使用一个已知的会话 ID 来进行攻击。 例如，攻击者可以通过邮件给受害者发送一个包含会话 ID 的链接： http://example.com/page.php?PHPSESSID=123456789。 如果启用了 session.use_trans_sid 配置项， 那么受害者将会使用攻击者所提供的会话 ID 开始一个新的会话。 如果启用了 session.use_strict_mode 选项，就可以降低风险。
  - 虽然 session.use_strict_mode 配置项可以降低风险，但是还不够。为了确保会话安全，开发者还需要使用 session_regenerate_id() 函数。
  - `session.use_strict_mode=On`
      - 虽然启用 session.use_strict_mode 是必不可少的，但是默认情况下，这个配置项是未启用的。
      - 此设置防止会话模块使用未初始化的会话 ID。 也就是说， 会话模块仅接受由它自己创建的有效的会话 ID， 而拒绝由用户自己提供的会话 ID。
      - 攻击者可以自行设置 cookie 或者使用 JavaScript 注入的方式 来设置会话 ID 进行攻击。 启用 session.use_strict_mode 配置项 可以阻止使用未经会话模块初始化的会话 ID。
      - 攻击者可以使用自己的设备产生会话 ID，也可以使用受害者的会话 ID。 攻击者也可以通过一些后续操作保证会话活跃。 因此，启用 session.use_strict_mode 配置项 可以降低这种风险。
  - 会话 ID 重生机制可以有效的降低会话被窃取的风险， 所以，必须周期性的调用 session_regenerate_id() 函数 来重新生成会话 ID， 例如，对于机密内容，每隔 15 分钟就重新生成会话 ID。 这样一来，即使会话 ID 被窃取， 那么攻击者所得到的会话 ID 也会很快的过期， 如果他们进一步访问，就会产生对过期会话数据访问的错误。
  - 当用户成功通过认证之后，必须为其重新生成会话 ID。 并且，必须在向 `$_SESSION` 中保存用户认证信息之前 调用 session_regenerate_id() 函数（ session_regenerate_id() 函数 会自动将重生之前的会话数据保存到新生成的会话）。 请确保只有新的会话包含用户认证信息。
  - 开发者不可过分依赖 session.gc_maxlifetime 配置项。 因为攻击者可以在受害者的会话过期之前访问系统， 并且维持这个会话的活动，以保证这个会话不会过期。
  - 默认情况下，`session_regenerate_id()` 函数 不会删除旧的会话， 所以即使重生了会话 ID，旧的会话可能还是可用的。开发者需要使用时间戳等机制， 来确保旧的会话数据不会再次被访问。
  
  - `session.cookie_httponly=On`，禁止 JavaScript 访问会话 cookie。 此设置项可以保护 cookie 不被 JavaScript 窃取。
 
  
  ## 参考
  
  - 参考链接：https://www.programmerinterview.com/php-questions/php-cookie-versus-session/
  - 参考链接：https://tutorialsclass.com/faq/difference-between-cookies-and-session/