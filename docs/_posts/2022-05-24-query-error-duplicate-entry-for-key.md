---
title: Query error：Duplicate entry 'XXXXXXXXXXXXXXXX' for key 'uniq_order_id'
date: 2022-05-24
order: -1
---

## 问题及原因

线上日志报了个错：

``` txt
Query error: Duplicate entry 'XXXXXXXXXXXXXXXX' for key 'uniq_order_id' - Invalid query: INSERT INTO `xxx_result` (`sign`, `expire_at`, `order_id`) VALUES ('VNEZvnetZ0cib84s1Io206rp9vuF1keXGsTKoDeEtPw6oLpmnSfi/KNlYkq+EfpV', '2025-05-23 08:12:29', 'XXXXXXXXXXXXXXXX')
```

出错代码如下：「先查询一下，如果有则更新，否则插入」，报错应该是第5行，同时有多个进程插入同样的数据，后插入的那个报错了。

``` php
$info = $this->model->get_row($where);
if ($info) {
    $this->model->update($data, $where);
} else {
	$this->model->insert($data);
}
```

那么为什么会有同样的进程在执行呢？

往上层调用查看，发现是消费队列常驻消费者进程代码调用的。那么消费者进程为什么会有多个同时在执行呢？

再看日志，搜索订单号，查看相关日志，发现有一个远程API回调几乎是同一时刻回调了两次，两次回调的内容是一样的，回调的内容会被添加到消息队列中。也就是说消息队列中有两个一样的消息。

但我记得在 supersivor 配置文件中 numproc=1 应该只有一个进程啊，按顺序消费也不至于报错。为什么会有多个进程？

后来问了一下运维，消费者进程部署在了不同的机器（4个）上面，每个机器的限制是一个，但同时可能会有多个。

终于原因找到了。

## 解决

那么如何解决呢？

想到两个方案，一个是在代码中加锁，另一个是使用 rabbitmq 的「单一活跃者队列」。

### 代码加锁

想到两种加锁方式，一种是不等待，一种是等待。

不等待加锁代码如下：

``` php
$info = $this->model->get_row($where);
if ($info) {
    $this->model->update($data, $where);
} else {
	if (lock::get($uni_key, 5)) {
		$this->model->insert($data);
	} else {
		log();
		exit();
	}
}
```

获取一个维持5秒的锁，如果获取不到，说明这时已经有进程在处理同样的数据，直接记日志并退出处理。如果获取到了锁，则执行插入。

等待的加锁（阻塞）

``` php
$info = $this->model->get_row($where);
if ($info) {
    $this->model->update($data, $where);
} else {
    lock::wait_get($uni_key, 60))
    $info = $this->model->get_row($where);
    if (!$info) {
        $this->model->insert($data);
    }
    lock::release_lock($uni_key)
}
```

获取一个超时时间为20秒的锁，如果获取不到，则内部报错记日志。20秒内，一直等待直到获取锁，获取到锁之后，再查一遍，如果查不到，再插入，结束之后释放锁。

### 单一消费者队列

rabbitmq 有一个配置是 `'x-single-active-consumer' => true`，设置之后，一个队列如果有多个消费者的，那么同时只能有一个消费者活跃，即消费消息。[^1] 在代码的消费者中修改声明队列的方法，添加上述配置。

[^1]: https://www.rabbitmq.com/consumers.html#single-active-consumer

线上现有的队列已经生成，无法添加队列属性，有两个做法，

一个是删掉线上队列，上线新代码之后，重新启动消费者进程，重新创建队列。但这样可能会导致丢消息。

另一个是修改一下队列配置中的队列名，上线新代码之后，重新启动消费者进程，创建新队列。这种比较可行。

## 总结

代码修改方式比较灵活，但是容易出 bug，并且每个业务涉及的地方都需要改，出错概率也很大。

单一消费者队列配置比较简单，但是也限制了队列的吞吐量，对于需要多个消费者的队列并不适用。