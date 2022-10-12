---
title: redis设置锁,(20)秒还未设置成功,请检查redis是否正常
date: 2022-06-29
order: -10
---

### 问题

昨晚上线之后，出现了不少次邮件告警：

``` pre
您好  
#redis设置锁,(20)秒还未设置成功,请检查redis是否正常  
key: per:sorce-do-task:task_id:task_scanuser_id:8268817, value: per:sorce-do-task:task_id:task_scanuser_id:8268817
```

### 分析

看告警内容，是 redis 设置锁没有成功，一直等待这个锁。看了一下告警处的代码：

```php

/**
 * 设置锁,一定要返回成功,否则一直等待
 * @param $key
 * @param $value
 * @param int $ttl 过期时间
 * @param int $maxsleeptime 最长等待时间,超过该时间发邮件提醒
 * @return mixed
 */
function set_synchronized_lock($key, $value, $ttl = 0, $maxsleeptime = 20)
{
	$CI = &get_instance();
	$CI->load->driver('cache');
	$sleep = 0;
	while (!$CI->cache->redis->savenx($key, $value, $ttl)) {
		sleep(1);
		$sleep++;
		if ($sleep > $maxsleeptime) {
			$content = "#redis设置锁,($maxsleeptime)秒还未设置成功,请检查redis是否正常<br>key: $key, value: $value";
			send_email('REDIS_LOCK_NOTIFY', [], [$content]);
			break;
		}
	}
	return true;
}

```

这里循环间隔1s不断用 `savenx` 方法来设置锁（获取锁），然后它失败了，每次失败sleep+1，等到sleep超过最大$maxsleeptime时间（预设为20s）时就发邮件告警。

是哪些原因会导致它失败呢？

进入 `savenx` 源码看，实际上调用的是 redis 的 [setnx](https://redis.io/commands/setnx) 命令，这个命令的官方说明是：

``` bash
Return Integer reply, specifically:

1 if the key was set
0 if the key was not set
```

也就是说在不断循环的尝试过程中，这个 key 表示的值已经存在，也就是说锁一直在被别人占用。

这个时候，我们需要去看是谁占用了这个 key，我们通过告警邮件中的 key-value 信息找到报错业务处的代码：

``` php
public function do_task_post()
{
	$lock_key = 'per:sorce-do-task:task_id:' . $task_ids . 'user_id:' . $this->userData['user_id'];  
	$this->set_lock($lock_key, '做积分任务加锁');
	try {
		...	
		return $this->sendFail(null, '没有可完成的任务');
	} catch(Exception $e) {
		...
	} finally() {
		$this->release_lock($lock_key, '做积分任务解锁');
	}
}
```

这个业务加解锁相关的业务抽象如上，第4行是加锁，第12行是解锁。

这个业务之前一直正常，理论上锁不应该一直占用。唯一释放锁的地方就是 `finally` 语句块中的 `release_lock()`，这个方法本身没有改动过，应该不会突然就一直释放失败了。还有一种可能就是它没有执行。

是不是因为有慢查询导致它没有执行？这次没有修改到这个业务，看了业务代码，没有慢查询。这个原因PASS。

我们看到 `try` 中有 `return` 语句，是不是这个 `return` 语句提前返回了？

本地调试了几次确实提前返回了，切换到上线前的分支版本又调试了几次，发现是先释放锁再返回的。仔细对比代码，发现这次修改了 `$this->sendFail()` 方法，把里面的 `return` 改为了 `exit` 了。原来是这个原因？是它影响了 `finally` 语句块的执行。

``` php
public function sendFail($data , $msg){  
    $response = [  
        'code' => -1,  
        'data' => $data,  
        'msg'  => $msg  
    ];  
    return; // 昨晚上线后是 exit;
}

```

那么 `finally` 语句跟 `return` 和 `exit` 有什么关系呢？我找了下官方文档看，果然有解释：官方文档关于 `finally` 解释如下：

> finally 代码块可以放在 catch 之后，或者直接代替它。 无论是否抛出了异常，在 try 和 catch 之后、在执行后续代码之前， 放在 finally 里的代码总是会执行。
> 
> **值得注意的是 finally 和 return 语句之间存在相互影响。 如果在 try 或 catch 里遇到 return，仍然会执行 finally 里的代码。 而且，遇到 return 语句时，会先执行 finally 再返回结果。 此外，如果 finally 里也包含了 return 语句，将返回 finally 里的值。**


## 总结

- `try-catch-finally` 的执行顺序是：try 语句 - (exit) -  finally语句 -（finally return） - (try return) 
- 改基类代码时要慎重，测试覆盖全。
- 禁止使用 exit，因为有的框架可能还会在控制器返回之后，会有后置默认处理。