---
title: RabbitMQ实现延时任务
date: 2020-03-06
order: -1
---

**场景**：下单之后的15分钟内如果没有下单，则自动取消订单。

第一个想到的方法是开启一个定时任务，每隔1分钟就去扫描订单状态，如果有符合条件的，则取消之。这种方式缺点很明显，很浪费资源，因为大部分查询的结果都是无效的。

下面进入正题：使用 RabbitMQ 的死信队列（Dead Letter Exchange）来实现延时任务。

## 什么是死信？

首先，什么是**死信**？一个消息在一个队列中处于下列三种状态：（1）消息被拒绝并且不再重新投递.（2）消息超期。（3）队列超载。就变成了死信。如果队列中出现了死信，就会被重新投递到另一个交换机，那么该队列就是**死信队列**。该交换机根据绑定规则转发到对应的队列上，监听该队列就可以重新消费。简单地说，就是（因为某些原因）没有被消费的消息换个地方重新被消费。



RabbitMQ 的队列有下列三个参数：

* x-message-ttl
* x-dead-letter-exchange
* x-dead-letter-routing-key

当设置了这三个参数之后，这个队列便是一个合格的死信队列，它会把队列内超过 x-message-ttl (ms)时间的消息通过 x-dead-letter-routing-key 转发到 x-dead-letter-exchange 交换机上面。

x-dead-letter-exchange 所指定的交换机便是死信交换机

## 使用死信队列实现延迟任务

假设有队列 queue1 设置参数为：

* x-message-ttl:900000（单位ms）
* x-dead-letter-exchange:exchange1
* x-dead-letter-routing-key:r.1

此时，创建一个订单后，便生产一个消息 msg1，msg1 中包含订单号，添加到 queue1（死信队列） 中，经过 15min 时间，queue1 自动将 msg1 通过路由key r.1 转发到交换机 exchange1（死信交换机） 上面。

同时，绑定一个工作 queue2 到 exchange1，让来自 r.1 路由的消息直接转发到 queue2，然后我们的取消订单的逻辑就作为一个消费者不断消费 queue2 中的消息，从消息中获取订单id，判断订单状态，如果未支付则直接取消。

这样处理，每个订单只需要处理一次，也不用轮询扫描订单表了。缺点就是引入了 rabbitMQ，增加了维护成本。另外要注意的是，如果有不同的时间维度需要处理，那么需要多个死信队列，设置不同的 x-message-ttl 参数值。